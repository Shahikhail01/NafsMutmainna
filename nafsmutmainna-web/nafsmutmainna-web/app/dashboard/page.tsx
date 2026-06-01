"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLocalCheckin, getAllCheckinDates, getEmotionFrequency, getLocalCheckinRange, type LocalCheckin } from "@/lib/localDB";

type NafsStage = "ammarah" | "lawwamah" | "mutmainna";

interface DailyCheckin {
    overall_mood: number | null;
    nafs_stage_today: string;
}

interface Profile {
    full_name: string | null;
    nafs_stage: string;
}

interface NafsAttribute {
    id: string;
    name: string;
    description: string;
}

// Emotion → Nafs attribute name mapping for Option C
const EMOTION_NAFS_MAP: Record<string, string[]> = {
    anger: ["Ghadab (Anger)"],
    envy: ["Hasad (Envy)"],
    anxiety: ["Jaza (Chronic Anxiety)"],
    sadness: ["Huzn al-Mamduh (Paralyzing Despair)"],
    greed: ["Tama (Covetousness)"],
    pride: ["Kibr (Arrogance)"],
    frustration: ["Ghadab (Anger)"],
    discontent: ["Malal (Spiritual Boredom)"],
};

// Which negative nafs traits to recommend per Nafs stage
const STAGE_FOCUS_TRAITS: Record<NafsStage, string[]> = {
    ammarah: [],  // filled from Supabase — all negative traits
    lawwamah: [], // filled from Supabase
    mutmainna: [], // filled from Supabase
};

const STAGE_DHIKR: Record<NafsStage, { dhikr: string; arabic: string; count: number; note: string }[]> = {
    ammarah: [
        {
            dhikr: "Astaghfirullah al-Adheem wa atubu ilayh",
            arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ وَأَتُوبُ إِلَيْهِ",
            count: 100,
            note: "Seek heavy repentance for the commanding soul",
        },
        {
            dhikr: "Rabbi inni dhalamtu nafsi faghfir li",
            arabic: "رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي",
            count: 40,
            note: "Supplication of turning back to Allah",
        },
    ],
    lawwamah: [
        {
            dhikr: "Hasbunallahu wa ni'mal wakeel",
            arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
            count: 70,
            note: "For self-accountability and reliance on Allah",
        },
        {
            dhikr: "La ilaha illa anta subhanaka inni kuntu min adh-dhalimeen",
            arabic: "لَا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
            count: 40,
            note: "Dua of Yunus — repentance and recognition",
        },
    ],
    mutmainna: [
        {
            dhikr: "Alhamdulillahi Rabbil Alameen",
            arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
            count: 33,
            note: "Gratitude dhikr to sustain your tranquil state",
        },
        {
            dhikr: "Subhanallahi wa bihamdihi Subhanallahil Adheem",
            arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ",
            count: 100,
            note: "The two phrases heaviest on the Scale",
        },
    ],
};

const STAGE_INFO: Record<NafsStage, {
    label: string; colorClass: string; bgClass: string; borderClass: string; emoji: string; desc: string; pct: number;
}> = {
    ammarah: {
        label: "Nafs Ammarah",
        colorClass: "text-red-600 dark:text-red-400",
        bgClass: "bg-red-50 dark:bg-red-900/20",
        borderClass: "border-red-200 dark:border-red-800",
        emoji: "🔴",
        desc: "The commanding soul — prone to base desires",
        pct: 16,
    },
    lawwamah: {
        label: "Nafs Lawwamah",
        colorClass: "text-amber-600 dark:text-amber-400",
        bgClass: "bg-amber-50 dark:bg-amber-900/20",
        borderClass: "border-amber-200 dark:border-amber-800",
        emoji: "🟡",
        desc: "The self-reproaching soul — aware and striving",
        pct: 50,
    },
    mutmainna: {
        label: "Nafs Mutmainna",
        colorClass: "text-emerald-600 dark:text-emerald-400",
        bgClass: "bg-emerald-50 dark:bg-emerald-900/20",
        borderClass: "border-emerald-200 dark:border-emerald-800",
        emoji: "🟢",
        desc: "The tranquil soul — at peace with Allah",
        pct: 84,
    },
};

const NAV_ITEMS = [
    { href: "/assessment", icon: "📊", label: "Daily Check-in" },
    { href: "/emotions", icon: "💭", label: "Emotions" },
    { href: "/journal", icon: "📝", label: "Journal" },
    { href: "/toolkit", icon: "🛠️", label: "Toolkit" },
    { href: "/analytics", icon: "📈", label: "Analytics" },
];

function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
}

function normalizeStage(s: string | null | undefined): NafsStage {
    const lower = (s ?? "").toLowerCase();
    if (lower === "lawwamah") return "lawwamah";
    if (lower === "mutmainna") return "mutmainna";
    return "ammarah";
}

export default function DashboardPage() {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [todayCheckin, setTodayCheckin] = useState<DailyCheckin | null>(null);
    const [focusTraits, setFocusTraits] = useState<NafsAttribute[]>([]);
    const [journalStreak, setJournalStreak] = useState(0);

    useEffect(() => {
        async function load() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { router.push("/auth/login"); return; }
            setUser(user);

            const today = new Date().toISOString().slice(0, 10);

            const [profileRes, traitsRes] = await Promise.all([
                supabase.from("profiles").select("full_name, nafs_stage").eq("user_id", user.id).maybeSingle(),
                supabase.from("nafs_attributes").select("id, name, description, category").eq("category", "negative").order("name"),
            ]);

            setProfile(profileRes.data);

            // ── Journal streak from localDB ─────────────────────────────────
            const allCheckinDates = getAllCheckinDates(user.id);
            if (allCheckinDates.length > 0) {
                let streak = 0;
                let cursor = new Date();
                cursor.setHours(0, 0, 0, 0);
                for (const dateStr of allCheckinDates.slice().sort().reverse()) {
                    const d = new Date(dateStr + "T00:00:00");
                    const diff = Math.round((cursor.getTime() - d.getTime()) / 86400000);
                    if (diff <= 1) { streak++; cursor = d; }
                    else break;
                }
                setJournalStreak(streak);
            }

            // ── Option C: emotion-based traits (14+ days of data) ───────────
            const fourteenDaysAgo = new Date();
            fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 13);
            const last14 = Array.from({ length: 14 }, (_, i) => {
                const d = new Date(fourteenDaysAgo);
                d.setDate(fourteenDaysAgo.getDate() + i);
                return d.toISOString().slice(0, 10);
            });
            const emotionFreq = getEmotionFrequency(user.id, last14);
            const emotionDaysCount = Object.keys(emotionFreq).length;

            // ── Option A: stage-based traits (always available) ──────────────
            const localCheckin = getLocalCheckin(user.id, today);
            const activeStage = (localCheckin?.stage ?? profileRes.data?.nafs_stage ?? "ammarah") as NafsStage;
            const moodScore = localCheckin?.mood ?? 0;

            setTodayCheckin(localCheckin ? { overall_mood: localCheckin.mood, nafs_stage_today: localCheckin.stage } : null);

            // ── Build focus traits list ───────────────────────────────────────
            if (traitsRes.data) {
                let traits: NafsAttribute[] = [];

                if (emotionDaysCount >= 14) {
                    // Option C: top emotions from last 14 days → map to nafs traits
                    const sortedEmotions = Object.entries(emotionFreq)
                        .sort((a, b) => b[1] - a[1])
                        .map(([emotion]) => emotion)
                        .slice(0, 3);

                    const matchedTraitNames = new Set<string>();
                    for (const emotion of sortedEmotions) {
                        const nafsNames = EMOTION_NAFS_MAP[emotion] ?? [];
                        for (const name of nafsNames) {
                            const t = traitsRes.data.find((tr: any) => tr.name === name);
                            if (t) matchedTraitNames.add(name);
                        }
                    }

                    // Fill remaining from stage traits
                    if (matchedTraitNames.size < 3) {
                        const stageTraits = traitsRes.data.filter((t: any) => t.stage === activeStage);
                        for (const t of stageTraits) {
                            if (matchedTraitNames.size >= 3) break;
                            matchedTraitNames.add(t.name);
                        }
                    }

                    traits = traitsRes.data.filter((t: any) => matchedTraitNames.has(t.name)).slice(0, 3);
                } else {
                    // Option A: stage-based — negative traits filtered by current stage
                    // Map stage to approximate Nafs level for filtering
                    const stageLevel: Record<NafsStage, number> = { ammarah: 1, lawwamah: 2, mutmainna: 3 };
                    const level = stageLevel[activeStage];
                    // For ammarah stage, show traits most commonly problematic
                    // Use mood as sub-signal: low mood → more remedial traits
                    const allNeg = traitsRes.data as NafsAttribute[];
                    if (level === 1) {
                        // Ammarah — pick from a seed, split by mood
                        const seed = Math.floor(Date.now() / 86400000);
                        const start = (seed * 3) % Math.max(1, allNeg.length - 2);
                        traits = allNeg.slice(start, start + 3);
                    } else if (level === 2) {
                        // Lawwamah — pick middle-tier traits (seeded rotation)
                        const seed = Math.floor(Date.now() / 86400000);
                        const start = (seed * 3) % Math.max(1, allNeg.length - 2);
                        traits = allNeg.slice(start, start + 3);
                    } else {
                        // Mutmainna — suggest positive reinforcement traits (fallback to negative for reference)
                        const seed = Math.floor(Date.now() / 86400000);
                        const start = (seed * 3) % Math.max(1, allNeg.length - 2);
                        traits = allNeg.slice(start, start + 3);
                    }
                }

                setFocusTraits(traits);
            }

            setLoading(false);
        }
        load();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white dark:from-zinc-950 dark:to-zinc-900">
                <div className="text-emerald-600 text-lg animate-pulse">Loading...</div>
            </div>
        );
    }

    if (!user) return null;

    const activeStage = normalizeStage(todayCheckin?.nafs_stage_today ?? profile?.nafs_stage);
    const stageInfo = STAGE_INFO[activeStage];
    const dhikrList = STAGE_DHIKR[activeStage];
    const displayName = profile?.full_name ?? user.email?.split("@")[0] ?? "Friend";
    const moodScore = todayCheckin?.overall_mood ?? 0;

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-zinc-950 dark:to-zinc-900">
            {/* Header */}
            <header className="bg-white dark:bg-zinc-800 shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-emerald-800 dark:text-emerald-400">NafsMutmainna</span>
                    <div className="flex items-center gap-3">
                        <span className={`hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${stageInfo.bgClass} ${stageInfo.colorClass} ${stageInfo.borderClass}`}>
                            {stageInfo.emoji} {stageInfo.label}
                        </span>
                        <button onClick={handleSignOut} className="text-xs text-zinc-400 hover:text-red-500 transition-colors">
                            Sign out
                        </button>
                    </div>
                </div>

                {/* Compact nav menu */}
                <div className="border-t border-zinc-100 dark:border-zinc-700">
                    <div className="container mx-auto px-4">
                        <nav className="flex overflow-x-auto gap-1 py-2" style={{ scrollbarWidth: "none" }}>
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap"
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Greeting + streak */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
                            {getGreeting()}, {displayName} 🌙
                        </h1>
                        <p className="text-sm text-zinc-500 mt-1">Track your spiritual journey — one day at a time</p>
                    </div>
                    {journalStreak > 0 && (
                        <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-2 flex-shrink-0">
                            <span className="text-2xl">🔥</span>
                            <div className="text-center">
                                <div className="text-xl font-bold text-amber-600 dark:text-amber-400 leading-tight">{journalStreak}</div>
                                <div className="text-xs text-amber-500">day streak</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Nafs Meter */}
                <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm mb-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-bold text-zinc-800 dark:text-zinc-200 text-lg">Today&apos;s Nafs Meter</h2>
                        {!todayCheckin && (
                            <Link href="/assessment" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                                Do check-in →
                            </Link>
                        )}
                    </div>

                    {/* Gradient track */}
                    <div className="relative mb-5">
                        <div className="h-5 rounded-full bg-gradient-to-r from-red-400 via-amber-400 to-emerald-500 shadow-inner">
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border-4 border-zinc-700 dark:border-zinc-200 shadow-lg transition-all duration-700"
                                style={{ left: `calc(${stageInfo.pct}% - 14px)` }}
                            />
                        </div>
                        <div className="flex justify-between mt-2.5 text-xs font-semibold">
                            <span className="text-red-500">Ammarah</span>
                            <span className="text-amber-500">Lawwamah</span>
                            <span className="text-emerald-600">Mutmainna</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`font-semibold text-base ${stageInfo.colorClass}`}>{stageInfo.label}</p>
                            <p className="text-sm text-zinc-500 mt-0.5">{stageInfo.desc}</p>
                        </div>
                        <div className="text-right">
                            {moodScore > 0 ? (
                                <>
                                    <div className="flex gap-0.5 justify-end">
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <span key={n} className={`text-xl ${n <= moodScore ? "text-amber-400" : "text-zinc-200 dark:text-zinc-600"}`}>★</span>
                                        ))}
                                    </div>
                                    <p className="text-xs text-zinc-400 mt-0.5">Today&apos;s mood</p>
                                </>
                            ) : (
                                <span className="text-xs text-zinc-400">No check-in yet</span>
                            )}
                        </div>
                    </div>

                    {!todayCheckin && (
                        <div className={`mt-4 p-3 rounded-xl border flex items-center justify-between ${stageInfo.bgClass} ${stageInfo.borderClass}`}>
                            <p className={`text-sm ${stageInfo.colorClass}`}>Complete today&apos;s check-in to personalize your dashboard</p>
                            <Link href="/assessment" className="ml-3 flex-shrink-0 text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-lg font-medium transition-colors">
                                Start →
                            </Link>
                        </div>
                    )}
                </div>

                {/* Azkār + Focus Traits */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Today's Azkār */}
                    <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm">
                        <h2 className="font-bold text-zinc-800 dark:text-zinc-200 mb-1">Today&apos;s Azkār</h2>
                        <p className="text-xs text-zinc-500 mb-4">Recommended for your {stageInfo.label} stage</p>
                        <div className="space-y-4">
                            {dhikrList.map((d, i) => (
                                <div key={i} className={`rounded-xl p-4 border ${stageInfo.bgClass} ${stageInfo.borderClass}`}>
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 leading-snug">{d.dhikr}</span>
                                        <span className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-zinc-700 ${stageInfo.colorClass}`}>×{d.count}</span>
                                    </div>
                                    <p className="text-2xl text-right mb-2 text-zinc-700 dark:text-zinc-300 leading-loose">{d.arabic}</p>
                                    <p className="text-xs text-zinc-500 italic">{d.note}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Focus Traits */}
                    <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-sm">
                        <h2 className="font-bold text-zinc-800 dark:text-zinc-200 mb-1">Traits to Work On Today</h2>
                        <p className="text-xs text-zinc-500 mb-4">Rotates daily — explore in Toolkit</p>
                        <div className="space-y-3">
                            {focusTraits.length === 0 ? (
                                <div className="space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-16 bg-zinc-100 dark:bg-zinc-700 rounded-xl animate-pulse" />
                                    ))}
                                </div>
                            ) : (
                                focusTraits.map((t, i) => (
                                    <Link
                                        key={t.id}
                                        href="/toolkit"
                                        className="flex items-start gap-3 p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-700 hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all group"
                                    >
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold flex items-center justify-center">
                                            {i + 1}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{t.name}</p>
                                            <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">{t.description}</p>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                        <Link href="/toolkit" className="mt-4 inline-block text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                            Browse all 200 traits →
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}