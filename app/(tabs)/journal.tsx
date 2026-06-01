// Journal / Muhasabah Screen - Nightly guided reflection

import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, JOURNAL_PROMPTS } from '../../src/shared/constants';
import { useAppStore } from '../../src/infrastructure/store';
import type { JournalEntry } from '../../src/domain/entities';
import { v4 as uuidv4 } from 'uuid';

const MOOD_OPTIONS: { value: 1 | 2 | 3 | 4 | 5; label: string; emoji: string }[] = [
    { value: 1, label: 'Very Hard', emoji: '😔' },
    { value: 2, label: 'Hard', emoji: '😕' },
    { value: 3, label: 'Okay', emoji: '😐' },
    { value: 4, label: 'Good', emoji: '🙂' },
    { value: 5, label: 'Peaceful', emoji: '😊' },
];

export default function JournalScreen() {
    const setTodayJournal = useAppStore((s) => s.setTodayJournal);
    const todayJournal = useAppStore((s) => s.todayJournal);
    const addOdex = useAppStore((s) => s.addOdex);
    const updateStreak = useAppStore((s) => s.updateStreak);

    const today = new Date().toISOString().split('T')[0];
    const isAlreadyJournaled = todayJournal?.date === today;

    const [nafsWin, setNafsWin] = useState(todayJournal?.nafsWin ?? '');
    const [mutmainnaMoment, setMutmainnaMoment] = useState(todayJournal?.mutmainnaMoment ?? '');
    const [gratitude1, setGratitude1] = useState(todayJournal?.gratitude[0] ?? '');
    const [gratitude2, setGratitude2] = useState(todayJournal?.gratitude[1] ?? '');
    const [gratitude3, setGratitude3] = useState(todayJournal?.gratitude[2] ?? '');
    const [mood, setMood] = useState<1 | 2 | 3 | 4 | 5>(todayJournal?.moodRating ?? 3);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        const entry: JournalEntry = {
            id: todayJournal?.id ?? uuidv4(),
            date: today,
            nafsWin,
            mutmainnaMoment,
            gratitude: [gratitude1, gratitude2, gratitude3].filter(Boolean),
            moodRating: mood,
            createdAt: todayJournal?.createdAt ?? new Date(),
            updatedAt: new Date(),
        };

        setTodayJournal(entry);
        addOdex(10); // Reward for journaling
        updateStreak();
        setSaved(true);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Muhasabah</Text>
                    <Text style={styles.subtitle}>Daily Self-Accountability</Text>
                    <Text style={styles.date}>
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </Text>
                </View>

                {/* Inspiration */}
                <View style={styles.quoteBox}>
                    <Text style={styles.quoteText}>
                        "Hold yourself accountable before you are held accountable."
                    </Text>
                    <Text style={styles.quoteSource}>— Umar ibn al-Khattab ؓ</Text>
                </View>

                {/* Saved Banner */}
                {saved && (
                    <View style={styles.savedBanner}>
                        <Text style={styles.savedText}>✅ Muhasabah saved! +10 ODEX earned. Jazakallahu khairan.</Text>
                    </View>
                )}

                {/* Mood Check */}
                <View style={styles.section}>
                    <Text style={styles.prompt}>How peaceful was your heart today?</Text>
                    <View style={styles.moodRow}>
                        {MOOD_OPTIONS.map((m) => (
                            <Pressable
                                key={m.value}
                                style={[styles.moodButton, mood === m.value && styles.moodButtonActive]}
                                onPress={() => setMood(m.value)}
                            >
                                <Text style={styles.moodEmoji}>{m.emoji}</Text>
                                <Text style={[styles.moodLabel, mood === m.value && styles.moodLabelActive]}>{m.label}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                {/* Prompt 1: Where did the nafs win? */}
                <View style={styles.section}>
                    <View style={styles.promptHeader}>
                        <Text style={styles.promptNumber}>01</Text>
                        <Text style={styles.prompt}>{JOURNAL_PROMPTS.nafsWin}</Text>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        multiline
                        numberOfLines={4}
                        placeholder="Be honest with yourself. The nafs that blames itself (Lawwamah) is the path to growth..."
                        placeholderTextColor={COLORS.textSecondary}
                        value={nafsWin}
                        onChangeText={setNafsWin}
                        textAlignVertical="top"
                    />
                </View>

                {/* Prompt 2: Mutmainna moments */}
                <View style={styles.section}>
                    <View style={styles.promptHeader}>
                        <Text style={styles.promptNumber}>02</Text>
                        <Text style={styles.prompt}>{JOURNAL_PROMPTS.mutmainnaMoment}</Text>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        multiline
                        numberOfLines={4}
                        placeholder="Even small moments of patience, gratitude or trust in Allah count..."
                        placeholderTextColor={COLORS.textSecondary}
                        value={mutmainnaMoment}
                        onChangeText={setMutmainnaMoment}
                        textAlignVertical="top"
                    />
                </View>

                {/* Prompt 3: Gratitude (3 items) */}
                <View style={styles.section}>
                    <View style={styles.promptHeader}>
                        <Text style={styles.promptNumber}>03</Text>
                        <Text style={styles.prompt}>{JOURNAL_PROMPTS.gratitude}</Text>
                    </View>
                    <TextInput
                        style={[styles.textInput, styles.gratitudeInput]}
                        placeholder="Blessing 1..."
                        placeholderTextColor={COLORS.textSecondary}
                        value={gratitude1}
                        onChangeText={setGratitude1}
                    />
                    <TextInput
                        style={[styles.textInput, styles.gratitudeInput]}
                        placeholder="Blessing 2..."
                        placeholderTextColor={COLORS.textSecondary}
                        value={gratitude2}
                        onChangeText={setGratitude2}
                    />
                    <TextInput
                        style={[styles.textInput, styles.gratitudeInput]}
                        placeholder="Blessing 3..."
                        placeholderTextColor={COLORS.textSecondary}
                        value={gratitude3}
                        onChangeText={setGratitude3}
                    />
                    <Text style={styles.gratitudeHint}>
                        "If you are grateful, I will surely increase you in favor." — Surah Ibrahim 14:7 (Ibn Kathir)
                    </Text>
                </View>

                {/* Save Button */}
                <Pressable
                    style={[styles.saveButton, saved && styles.saveButtonDone]}
                    onPress={handleSave}
                    disabled={saved}
                >
                    <Text style={styles.saveButtonText}>
                        {saved ? '✓ Muhasabah Complete' : 'Save Today\'s Muhasabah'}
                    </Text>
                </Pressable>

                {/* Already journaled indicator */}
                {isAlreadyJournaled && !saved && (
                    <Text style={styles.alreadyDoneText}>
                        You've already journaled today. You can update your entry.
                    </Text>
                )}

                <View style={{ height: 32 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 4 },
    title: { fontSize: 28, fontWeight: '700', color: COLORS.primary },
    subtitle: { fontSize: 16, color: COLORS.text, fontWeight: '500' },
    date: { fontSize: 13, color: COLORS.textSecondary, marginTop: 4 },
    quoteBox: {
        marginHorizontal: 16, marginTop: 16, padding: 16,
        backgroundColor: COLORS.primary + '12', borderRadius: 12,
        borderLeftWidth: 3, borderLeftColor: COLORS.accent,
    },
    quoteText: { fontSize: 14, color: COLORS.text, lineHeight: 22, fontStyle: 'italic' },
    quoteSource: { fontSize: 12, color: COLORS.textSecondary, marginTop: 6, fontWeight: '600' },
    savedBanner: {
        marginHorizontal: 16, marginTop: 8, padding: 14,
        backgroundColor: COLORS.success + '15', borderRadius: 10,
        borderLeftWidth: 4, borderLeftColor: COLORS.success,
    },
    savedText: { color: COLORS.success, fontWeight: '600' },
    section: { paddingHorizontal: 16, marginTop: 24 },
    moodRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
    moodButton: {
        alignItems: 'center', paddingVertical: 12, paddingHorizontal: 8,
        borderRadius: 12, backgroundColor: COLORS.surface, flex: 1, marginHorizontal: 3,
    },
    moodButtonActive: { backgroundColor: COLORS.primary },
    moodEmoji: { fontSize: 24 },
    moodLabel: { fontSize: 10, color: COLORS.textSecondary, marginTop: 4, fontWeight: '500', textAlign: 'center' },
    moodLabelActive: { color: '#FFF' },
    promptHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
    promptNumber: {
        fontSize: 11, fontWeight: '700', color: COLORS.accent,
        backgroundColor: COLORS.accent + '20', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4,
    },
    prompt: { flex: 1, fontSize: 15, fontWeight: '600', color: COLORS.text, lineHeight: 22 },
    textInput: {
        backgroundColor: COLORS.surface, borderRadius: 12, padding: 16,
        fontSize: 14, color: COLORS.text, borderWidth: 1, borderColor: '#E0E0E0',
        minHeight: 100,
    },
    gratitudeInput: { minHeight: 48, marginBottom: 8 },
    gratitudeHint: { fontSize: 12, color: COLORS.textSecondary, fontStyle: 'italic', marginTop: 4, textAlign: 'center' },
    saveButton: {
        marginHorizontal: 16, marginTop: 32,
        backgroundColor: COLORS.primary, paddingVertical: 18,
        borderRadius: 14, alignItems: 'center',
    },
    saveButtonDone: { backgroundColor: COLORS.success },
    saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
    alreadyDoneText: { textAlign: 'center', color: COLORS.textSecondary, fontSize: 12, marginTop: 12 },
});