// ─── Local-only data store ───────────────────────────────────────────────────
// All data here stays on-device and NEVER leaves the browser.
// Key format: {prefix}:{userId}:{date/ID}
// prefix "checkin"  → daily check-in record
// prefix "emotion"  → individual emotion log entry

export interface LocalCheckin {
    mood: number | null;  // 1-5, null if not set
    stage: string;        // "ammarah" | "lawwamah" | "mutmainna"
    notes: string;
    time: string;          // ISO
}

export interface LocalEmotionLog {
    emotion: string;    // e.g. "anger", "anxiety"
    intensity: number;   // 1-5
    trigger: string;
    reflection: string;
    time: string;        // ISO
}

export interface DayRecord {
    checkin?: LocalCheckin;
    emotions?: LocalEmotionLog[];
    entry?: { title: string; content: string; mood: number; time: string };
}

// ─── Check-in helpers ─────────────────────────────────────────────────────────

function checkinKey(userId: string, date: string) { return `checkin:${userId}:${date}`; }

export function saveLocalCheckin(userId: string, date: string, data: LocalCheckin) {
    localStorage.setItem(checkinKey(userId, date), JSON.stringify(data));
}

export function getLocalCheckin(userId: string, date: string): LocalCheckin | null {
    try {
        const raw = localStorage.getItem(checkinKey(userId, date));
        return raw ? JSON.parse(raw) : null;
    } catch { return null; }
}

export function getLocalCheckinRange(userId: string, dates: string[]): Record<string, LocalCheckin | null> {
    const result: Record<string, LocalCheckin | null> = {};
    for (const d of dates) result[d] = getLocalCheckin(userId, d);
    return result;
}

// ─── Emotion log helpers ──────────────────────────────────────────────────────

function emotionKey(userId: string, date: string) { return `emotion:${userId}:${date}`; }

export function appendLocalEmotionLog(userId: string, date: string, log: LocalEmotionLog) {
    const key = emotionKey(userId, date);
    try {
        const existing: LocalEmotionLog[] = JSON.parse(localStorage.getItem(key) || "[]");
        existing.push(log);
        localStorage.setItem(key, JSON.stringify(existing));
    } catch { localStorage.setItem(key, JSON.stringify([log])); }
}

export function getLocalEmotionLogs(userId: string, date: string): LocalEmotionLog[] {
    try {
        const raw = localStorage.getItem(emotionKey(userId, date));
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

// Returns emotion counts over a window of dates (for pattern analysis)
export function getEmotionFrequency(userId: string, dates: string[]): Record<string, number> {
    const freq: Record<string, number> = {};
    for (const d of dates) {
        const logs = getLocalEmotionLogs(userId, d);
        for (const log of logs) {
            freq[log.emotion] = (freq[log.emotion] ?? 0) + 1;
        }
    }
    return freq;
}

// ─── All check-in dates for a user ───────────────────────────────────────────
// Scans localStorage keys — used for streak, history, etc.

export function getAllCheckinDates(userId: string): string[] {
    const prefix = `checkin:${userId}:`;
    const dates: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(prefix)) dates.push(key.replace(prefix, ""));
    }
    return dates.sort().reverse();
}

// ─── Emotion log date range ───────────────────────────────────────────────────

export function getAllEmotionDates(userId: string): string[] {
    const prefix = `emotion:${userId}:`;
    const dates: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(prefix)) dates.push(key.replace(prefix, ""));
    }
    return dates.sort().reverse();
}