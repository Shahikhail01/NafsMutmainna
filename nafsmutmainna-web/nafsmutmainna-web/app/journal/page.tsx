"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

// ─── localStorage schema ──────────────────────────────────────────────────────
// Key:   journal:{userId}:{YYYY-MM-DD}
// Value: { checkin?: { mood, stage, notes, time }, entry?: { title, content, mood, time } }

type NafsStage = "ammarah" | "lawwamah" | "mutmainna";

interface StoredCheckin { mood: number; stage: NafsStage; notes: string; time: string; }
interface StoredEntry { title: string; content: string; mood: number; time: string; }
interface DayRecord { checkin?: StoredCheckin; entry?: StoredEntry; }

const MOOD_EMOJI: Record<number, string> = { 1: "😔", 2: "😕", 3: "😐", 4: "🙂", 5: "😊" };
const STAGE_EMOJI: Record<NafsStage, string> = { ammarah: "🔴", lawwamah: "🟡", mutmainna: "🟢" };
const STAGE_LABEL: Record<NafsStage, string> = { ammarah: "Ammarah", lawwamah: "Lawwamah", mutmainna: "Mutmainna" };

const JOURNAL_PROMPTS = [
    "What is one moment today where you felt close to Allah?",
    "What nafs-related struggle did you face today, and how did you respond?",
    "What are three things you're grateful for right now?",
    "Describe a moment today where you could have been more patient.",
    "What good deed did you do today, even if small?",
    "Where did you feel your Nafs pulling you away from goodness?",
    "What would Prophet Yusuf (as) have done in your toughest moment today?",
    "Write a dua for something weighing on your heart.",
];

// ─── localStorage helpers ────────────────────────────────────────────────────

function lsKey(userId: string, date: string) { return `journal:${userId}:${date}`; }

function loadDay(userId: string, date: string): DayRecord {
    try {
        const raw = localStorage.getItem(lsKey(userId, date));
        return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
}

function saveDay(userId: string, date: string, partial: Partial<DayRecord>) {
    const existing = loadDay(userId, date);
    localStorage.setItem(lsKey(userId, date), JSON.stringify({ ...existing, ...partial }));
}

function loadRange(userId: string, dates: string[]): Record<string, DayRecord> {
    const result: Record<string, DayRecord> = {};
    for (const d of dates) result[d] = loadDay(userId, d);
    return result;
}

function dateStr(d: Date) { return d.toISOString().slice(0, 10); }

function buildCalendarDays(year: number, month: number): Date[] {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: Date[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(new Date(year, month, -(firstDay - 1 - i)));
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    while (cells.length % 7 !== 0) cells.push(new Date(year, month + 1, cells.length - firstDay - daysInMonth + 1));
    return cells;
}

// ─── Calendar ────────────────────────────────────────────────────────────────

interface CalendarProps {
    userId: string;
    today: Date;
    calYear: number;
    calMonth: number;
    onNavigate: (y: number, m: number) => void;
    onSelectDay: (d: string) => void;
    selectedDay: string;
}

function Calendar({ userId, today, calYear, calMonth, onNavigate, onSelectDay, selectedDay }: CalendarProps) {
    const [range, setRange] = useState<Record<string, DayRecord>>({});
    const days = buildCalendarDays(calYear, calMonth);
    const todayStr = dateStr(today);

    useEffect(() => {
        setRange(loadRange(userId, days.map(dateStr)));
    }, [userId, calYear, calMonth]);

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
                <button onClick={() => { const m = calMonth === 0 ? 11 : calMonth - 1; const y = calMonth === 0 ? calYear - 1 : calYear; onNavigate(y, m); }} className="w-7 h-7 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-colors">‹</button>
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{new Date(calYear, calMonth, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                <button onClick={() => { const m = calMonth === 11 ? 0 : calMonth + 1; const y = calMonth === 11 ? calYear + 1 : calYear; onNavigate(y, m); }} className="w-7 h-7 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-colors">›</button>
            </div>
            <div className="grid grid-cols-7 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (<div key={d} className="text-center text-[10px] font-semibold text-zinc-400 uppercase mb-2">{d}</div>))}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
                {days.map((d, idx) => {
                    const ds = dateStr(d);
                    const isSelected = ds === selectedDay;
                    const isToday = ds === todayStr;
                    const isCurrentMonth = d.getMonth() === calMonth;
                    const hasCheckin = !!range[ds]?.checkin;
                    const hasEntry = !!range[ds]?.entry;
                    return (
                        <button key={idx} onClick={() => onSelectDay(ds)} className={`relative flex flex-col items-center justify-center rounded-lg transition-all aspect-square ${isSelected ? "bg-emerald-100 dark:bg-emerald-900/40 ring-1 ring-emerald-400" : isToday ? "bg-zinc-100 dark:bg-zinc-700" : "hover:bg-zinc-50 dark:hover:bg-zinc-700"} ${!isCurrentMonth ? "opacity-30" : ""}`}>
                            <span className={`text-xs font-medium ${isSelected ? "text-emerald-700 dark:text-emerald-400 font-bold" : isToday ? "text-white font-bold" : isCurrentMonth ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-400"}`}>{d.getDate()}</span>
                            {hasCheckin && <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-amber-400" />}
                            {hasEntry && !hasCheckin && <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-emerald-500" />}
                        </button>
                    );
                })}
            </div>
            <div className="flex gap-4 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-700">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /><span className="text-[11px] text-zinc-500">Check-in</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[11px] text-zinc-500">Journal</span></div>
            </div>
        </div>
    );
}

// ─── Day Detail ──────────────────────────────────────────────────────────────

interface DayDetailProps {
    dayRecord: DayRecord;
    mood: number | null; onMoodChange: (m: number | null) => void;
    title: string; onTitleChange: (v: string) => void;
    content: string; onContentChange: (v: string) => void;
    saving: boolean; onSave: () => void; error: string;
    selectedDateStr: string; isToday: boolean; onClearCheckin: () => void;
}

function DayDetail({ dayRecord, mood, onMoodChange, title, onTitleChange, content, onContentChange, saving, onSave, error, selectedDateStr, isToday, onClearCheckin }: DayDetailProps) {
    const formattedDate = new Date(selectedDateStr + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    const dayHasEntry = !!dayRecord?.entry;

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{formattedDate}</h2>
                    {isToday && <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium ml-2">Today</span>}
                </div>
                {dayHasEntry && <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">✓ Saved</span>}
            </div>

            {dayRecord?.checkin && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">{STAGE_EMOJI[dayRecord.checkin.stage as NafsStage]}</span>
                            <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">Nafs {STAGE_LABEL[dayRecord.checkin.stage as NafsStage]}</span>
                        </div>
                        <button onClick={onClearCheckin} className="text-[10px] text-zinc-400 hover:text-red-400 transition-colors">clear</button>
                    </div>
                    <div className="flex gap-0.5 mb-2">{[1, 2, 3, 4, 5].map((n) => (<span key={n} className={`text-lg ${n <= dayRecord.checkin!.mood ? "text-amber-400" : "text-zinc-200"}`}>★</span>))}</div>
                    {dayRecord.checkin.notes && <p className="text-xs text-zinc-600 dark:text-zinc-400 italic mt-2 border-l-2 border-amber-300 pl-3">{dayRecord.checkin.notes}</p>}
                </div>
            )}

            <div className="bg-white dark:bg-zinc-800 rounded-xl p-5 shadow-sm mb-4">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">How are you feeling?</p>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <button key={n} onClick={() => onMoodChange(mood === n ? null : n)} className={`flex-1 py-2.5 rounded-xl text-2xl transition-all border-2 ${mood === n ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 scale-105" : "border-zinc-200 dark:border-zinc-600 hover:border-emerald-300"}`}>{MOOD_EMOJI[n]}</button>
                    ))}
                </div>
            </div>

            <input type="text" value={title} onChange={(e) => onTitleChange(e.target.value)} placeholder="Entry title (optional)" className="w-full bg-white dark:bg-zinc-800 rounded-xl px-5 py-3 shadow-sm text-base font-semibold text-zinc-800 dark:text-zinc-200 placeholder-zinc-300 dark:placeholder-zinc-500 focus:outline-none border border-zinc-100 dark:border-zinc-700 mb-3" />

            <div className="flex-1 bg-white dark:bg-zinc-800 rounded-xl p-5 shadow-sm mb-4 border border-zinc-100 dark:border-zinc-700">
                <textarea value={content} onChange={(e) => onContentChange(e.target.value)} placeholder="Write your thoughts freely — what's on your heart? What did you learn about your Nafs today? What are you grateful for?" rows={8} className="w-full h-full bg-transparent text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none resize-none leading-relaxed" />
            </div>

            {error && <div className="mb-3 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

            <button onClick={onSave} disabled={saving || (!content.trim() && !mood)} className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white py-3.5 rounded-xl font-semibold transition-colors">
                {saving ? "Saving..." : dayHasEntry ? "Update Entry" : "Save Entry"}
            </button>
        </div>
    );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function JournalPage() {
    const router = useRouter();
    const supabase = createClient();
    const today = new Date();

    const [userId, setUserId] = useState<string | null>(null);
    const [calYear, setCalYear] = useState(today.getFullYear());
    const [calMonth, setCalMonth] = useState(today.getMonth() as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11);
    const [selectedDay, setSelectedDay] = useState(dateStr(today));
    const [tab, setTab] = useState<"calendar" | "write" | "history">("calendar");
    const [mood, setMood] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    const [todayPrompt] = useState(() => JOURNAL_PROMPTS[Math.floor(Math.random() * JOURNAL_PROMPTS.length)]);

    useEffect(() => {
        (async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { router.push("/auth/login"); return; }
            setUserId(user.id);
        })();
    }, []);

    useEffect(() => {
        if (!userId) return;
        const record = loadDay(userId, selectedDay);
        setMood(record.entry?.mood ?? null);
        setTitle(record.entry?.title ?? "");
        setContent(record.entry?.content ?? "");
    }, [userId, selectedDay]);

    const handleSave = useCallback(async () => {
        if (!userId) return;
        if (!content.trim() && !mood) { setError("Write something or pick a mood."); return; }
        setSaving(true);
        setError("");
        saveDay(userId, selectedDay, {
            entry: { title: title.trim(), content: content.trim(), mood: mood ?? 0, time: new Date().toISOString() },
        });
        setHistory((prev) => {
            const updated = [selectedDay, ...prev.filter((d) => d !== selectedDay)];
            return updated.slice(0, 60);
        });
        setSaving(false);
    }, [userId, selectedDay, title, content, mood]);

    const handleClearCheckin = () => {
        if (!userId) return;
        const record = loadDay(userId, selectedDay);
        const { checkin: _, ...rest } = record;
        localStorage.setItem(lsKey(userId, selectedDay), JSON.stringify(rest));
        const r = loadDay(userId, selectedDay);
        setMood(r.entry?.mood ?? null);
        setTitle(r.entry?.title ?? "");
        setContent(r.entry?.content ?? "");
    };

    useEffect(() => {
        if (!userId) return;
        if (tab !== "history") return;
        setLoadingHistory(true);
        const all: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith(`journal:${userId}:`)) all.push(key.replace(`journal:${userId}:`, ""));
        }
        setHistory(all.sort().reverse());
        setLoadingHistory(false);
    }, [tab, userId]);

    if (!userId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white dark:from-zinc-950 dark:to-zinc-900">
                <div className="text-emerald-600 animate-pulse">Loading...</div>
            </div>
        );
    }

    const record = loadDay(userId, selectedDay);
    const dayIsToday = selectedDay === dateStr(today);

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-zinc-950 dark:to-zinc-900 flex flex-col">
            <header className="bg-white dark:bg-zinc-800 shadow-sm flex-shrink-0">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/dashboard" className="text-xl font-bold text-emerald-800 dark:text-emerald-400">NafsMutmainna</Link>
                    <div className="flex items-center gap-1">
                        {(["calendar", "write", "history"] as const).map((t) => (
                            <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === t ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}>
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                        <Link href="/dashboard" className="ml-2 text-sm text-zinc-400 hover:text-emerald-600 transition-colors">← Dashboard</Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">

                {tab === "calendar" && (
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-72 flex-shrink-0">
                            <Calendar userId={userId} today={today} calYear={calYear} calMonth={calMonth}
                                onNavigate={(y, m) => { setCalYear(y); setCalMonth(m as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11); }}
                                onSelectDay={setSelectedDay} selectedDay={selectedDay} />
                            <div className="mt-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-2">Today&apos;s Prompt</p>
                                <p className="text-sm italic text-zinc-700 dark:text-zinc-300 leading-snug">"{JOURNAL_PROMPTS[Math.floor(Date.now() / 86400000) % JOURNAL_PROMPTS.length]}"</p>
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <DayDetail dayRecord={record} mood={mood} onMoodChange={setMood} title={title} onTitleChange={setTitle}
                                content={content} onContentChange={setContent} saving={saving} onSave={handleSave} error={error}
                                selectedDateStr={selectedDay} isToday={dayIsToday} onClearCheckin={handleClearCheckin} />
                        </div>
                    </div>
                )}

                {tab === "write" && (
                    <div className="max-w-xl mx-auto">
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 mb-6">
                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Today&apos;s Reflection Prompt</p>
                            <p className="text-zinc-700 dark:text-zinc-300 italic text-base leading-relaxed">"{todayPrompt}"</p>
                        </div>
                        <DayDetail dayRecord={loadDay(userId, selectedDay)} mood={mood} onMoodChange={setMood} title={title} onTitleChange={setTitle}
                            content={content} onContentChange={setContent} saving={saving} onSave={handleSave} error={error}
                            selectedDateStr={selectedDay} isToday={dayIsToday} onClearCheckin={handleClearCheckin} />
                    </div>
                )}

                {tab === "history" && (
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-6">Past Entries</h2>
                        {loadingHistory ? (
                            <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="h-20 bg-zinc-100 dark:bg-zinc-800 rounded-xl animate-pulse" />)}</div>
                        ) : history.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-5xl mb-4">📖</div>
                                <p className="text-zinc-400">No entries yet — select a day on the calendar to start</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {history.map((ds) => {
                                    const rec = loadDay(userId, ds);
                                    const date = new Date(ds + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
                                    return (
                                        <div key={ds} className="bg-white dark:bg-zinc-800 rounded-xl p-5 shadow-sm">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <p className="text-sm text-zinc-500">{date}</p>
                                                    {rec.checkin && (
                                                        <div className="flex items-center gap-1.5 mt-1">
                                                            <span>{STAGE_EMOJI[rec.checkin.stage as NafsStage]}</span>
                                                            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Nafs {STAGE_LABEL[rec.checkin.stage as NafsStage]}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                {rec.entry?.mood && <span className="text-2xl">{MOOD_EMOJI[rec.entry.mood]}</span>}
                                            </div>
                                            {rec.entry?.title && <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-1">{rec.entry.title}</h3>}
                                            {rec.entry?.content && <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 whitespace-pre-wrap">{rec.entry.content}</p>}
                                            <button onClick={() => { setSelectedDay(ds); setTab("calendar"); }} className="mt-3 text-xs text-emerald-600 hover:text-emerald-700 font-medium">Edit entry →</button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

            </main>
        </div>
    );
}
