// Onboarding Screen - 30-question Nafs Assessment

import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS } from '../src/shared/constants';
import { useAppStore } from '../src/infrastructure/store';
import { v4 as uuidv4 } from 'uuid';
import type { NafsType, NafsState } from '../src/domain/entities';

// 30 questions mapped to Nafs traits (10 per category)
const ASSESSMENT_QUESTIONS = [
    // === Emotional State (1-10) ===
    { id: 'q1', text: 'When things don\'t go my way, I usually feel...', category: 'emotional', trait: 'patience' },
    { id: 'q2', text: 'When I see others succeed, my first reaction is...', category: 'emotional', trait: 'gratitude' },
    { id: 'q3', text: 'When I face a difficult situation, I tend to...', category: 'emotional', trait: 'tawakkul' },
    { id: 'q4', text: 'My general mood throughout the day is...', category: 'emotional', trait: 'contentment' },
    { id: 'q5', text: 'When someone hurts me, I...', category: 'emotional', trait: 'forgiveness' },
    { id: 'q6', text: 'My relationship with material possessions is...', category: 'emotional', trait: 'detachment' },
    { id: 'q7', text: 'When I make a mistake, I...', category: 'emotional', trait: 'accountability' },
    { id: 'q8', text: 'My reaction to unexpected news is usually...', category: 'emotional', trait: 'equanimity' },
    { id: 'q9', text: 'When I\'m under pressure, my nafs tends to...', category: 'emotional', trait: 'patience' },
    { id: 'q10', text: 'How often do you feel inner peace and contentment?', category: 'emotional', trait: 'peace' },

    // === Relation with Allah (11-20) ===
    { id: 'q11', text: 'My daily Salah consistency is...', category: 'worship', trait: 'salah' },
    { id: 'q12', text: 'When I\'m in difficulty, my trust in Allah is...', category: 'worship', trait: 'tawakkul' },
    { id: 'q13', text: 'I remember Allah through dhikr and dua...', category: 'worship', trait: 'dhikr' },
    { id: 'q14', text: 'When I receive blessings, my gratitude to Allah is...', category: 'worship', trait: 'shukr' },
    { id: 'q15', text: 'My Quran recitation and reflection is...', category: 'worship', trait: 'quran' },
    { id: 'q16', text: 'When I sin, I turn to Allah in repentance...', category: 'worship', trait: 'tawbah' },
    { id: 'q17', text: 'My connection with Allah during trials is...', category: 'worship', trait: 'sabr' },
    { id: 'q18', text: 'My intention (Niyyah) before good deeds is...', category: 'worship', trait: 'ikhlas' },
    { id: 'q19', text: 'I seek Islamic knowledge consistently...', category: 'worship', trait: 'ilm' },
    { id: 'q20', text: 'My night prayers (Tahajjud) are...', category: 'worship', trait: 'qiyam' },

    // === Behavior (21-30) ===
    { id: 'q21', text: 'My treatment of family members is...', category: 'behavior', trait: 'kindness' },
    { id: 'q22', text: 'I give charity and help others...', category: 'behavior', trait: 'generosity' },
    { id: 'q23', text: 'When I disagree with someone, I respond...', category: 'behavior', trait: 'hikmah' },
    { id: 'q24', text: 'My honesty in daily affairs is...', category: 'behavior', trait: 'truthfulness' },
    { id: 'q25', text: 'I lower my gaze and guard my tongue...', category: 'behavior', trait: 'haya' },
    { id: 'q26', text: 'My arrogance or pride in achievements is...', category: 'behavior', trait: 'tawadhu' },
    { id: 'q27', text: 'I backbite or speak negatively about others...', category: 'behavior', trait: 'gheebah' },
    { id: 'q28', text: 'My fulfillment of promises and trusts is...', category: 'behavior', trait: 'amanah' },
    { id: 'q29', text: 'I show compassion and mercy to others...', category: 'behavior', trait: 'rahma' },
    { id: 'q30', text: 'Overall, I feel my heart is inclined toward...', category: 'behavior', trait: 'overall' },
];

const ANSWER_OPTIONS = [
    { value: 1, label: 'Never / Very Rarely', nafsImpact: -2 },
    { value: 2, label: 'Sometimes', nafsImpact: -1 },
    { value: 3, label: 'Often', nafsImpact: 1 },
    { value: 4, label: 'Usually', nafsImpact: 2 },
    { value: 5, label: 'Always / Consistently', nafsImpact: 3 },
];

function computeNafsState(answers: Record<string, number>): NafsState {
    const totalAnswers = Object.values(answers);
    const totalScore = totalAnswers.reduce((a, b) => a + b, 0);
    const maxScore = totalAnswers.length * 5;
    const percentageScore = (totalScore / maxScore) * 100;

    let type: NafsType;
    let ammarah: number;
    let lawwamah: number;
    let mutmainna: number;

    if (percentageScore < 35) {
        type = 'ammarah';
        ammarah = 70;
        lawwamah = 25;
        mutmainna = 5;
    } else if (percentageScore < 65) {
        type = 'lawwamah';
        ammarah = 25;
        lawwamah = 55;
        mutmainna = 20;
    } else {
        type = 'mutmainna';
        ammarah = 10;
        lawwamah = 30;
        mutmainna = 60;
    }

    return {
        id: uuidv4(),
        type,
        score: Math.round(percentageScore),
        percentage: { ammarah, lawwamah, mutmainna },
        dominantTraits: ['patience', 'tawakkul', 'gratitude'],
        areasForImprovement: type === 'ammarah'
            ? ['consistency in salah', 'controlling anger', 'reducing envy']
            : type === 'lawwamah'
                ? ['consistency in dhikr', 'night prayers', 'gratitude practice']
                : ['maintaining current practices', 'guiding others', 'increasing in knowledge'],
        lastUpdated: new Date(),
    };
}

export default function OnboardingScreen() {
    const router = useRouter();
    const setNafsState = useAppStore((s) => s.setNafsState);
    const setOnboarded = useAppStore((s) => s.setOnboarded);
    const setAnonymousId = useAppStore((s) => s.setAnonymousId);
    const setProgress = useAppStore((s) => s.setProgress);

    const [step, setStep] = useState<'welcome' | 'questions' | 'result'>('welcome');
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [result, setResult] = useState<NafsState | null>(null);

    const progress = (currentQ / ASSESSMENT_QUESTIONS.length) * 100;
    const currentQuestion = ASSESSMENT_QUESTIONS[currentQ];

    const handleAnswer = (value: number) => {
        const updatedAnswers = { ...answers, [currentQuestion.id]: value };
        setAnswers(updatedAnswers);

        if (currentQ < ASSESSMENT_QUESTIONS.length - 1) {
            setCurrentQ((q) => q + 1);
        } else {
            // Compute result
            const nafsState = computeNafsState(updatedAnswers);
            setResult(nafsState);
            setStep('result');
        }
    };

    const handleComplete = () => {
        if (!result) return;

        const id = uuidv4();
        setAnonymousId(id);
        setNafsState(result);
        setProgress({
            odex: 50, // Onboarding bonus
            streak: 1,
            longestStreak: 1,
            totalEmotionsLogged: 0,
            totalJournalEntries: 0,
            badges: [],
            weeklyData: [],
            lastActiveDate: new Date().toISOString().split('T')[0],
        });
        setOnboarded(true);
        router.replace('/(tabs)');
    };

    if (step === 'welcome') {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.welcomeContent}>
                    <Text style={styles.welcomeArabic}>نَفْس مُطْمَئِنَّة</Text>
                    <Text style={styles.welcomeTitle}>NafsMutmainna</Text>
                    <Text style={styles.welcomeTagline}>Tazkiyah Journey — Return to Your Lord</Text>

                    <View style={styles.verseBox}>
                        <Text style={styles.verseArabic}>
                            يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ
                        </Text>
                        <Text style={styles.verseText}>
                            "O soul that has achieved equilibrium!"
                        </Text>
                        <Text style={styles.verseRef}>— Surah Al-Fajr 89:27</Text>
                    </View>

                    <Text style={styles.welcomeDescription}>
                        This app helps you identify your current spiritual state and guides you
                        through authentic Islamic practices toward inner peace — the Nafs Mutmainna.
                    </Text>

                    <Text style={styles.welcomeNote}>
                        📖 All content verified from authentic sources: Bukhari, Muslim, Tirmidhi,
                        Abu Dawud, Nasai, Ibn Majah, Ibn Kathir, Dr. Israr Ahmed & Molana Maududi.
                    </Text>

                    <Pressable style={styles.startButton} onPress={() => setStep('questions')}>
                        <Text style={styles.startButtonText}>Begin Assessment →</Text>
                    </Pressable>

                    <Text style={styles.anonymousNote}>
                        🔒 No account required. Completely anonymous.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    if (step === 'questions') {
        return (
            <SafeAreaView style={styles.container}>
                {/* Progress Bar */}
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.progressText}>
                    Question {currentQ + 1} of {ASSESSMENT_QUESTIONS.length}
                </Text>

                <ScrollView contentContainerStyle={styles.questionContent}>
                    {/* Category Badge */}
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>
                            {currentQuestion.category === 'emotional'
                                ? '❤️ Emotional State'
                                : currentQuestion.category === 'worship'
                                    ? '🤲 Relation with Allah'
                                    : '🌿 Behavior & Character'}
                        </Text>
                    </View>

                    {/* Question */}
                    <Text style={styles.questionText}>{currentQuestion.text}</Text>

                    {/* Answer Options */}
                    <View style={styles.answersContainer}>
                        {ANSWER_OPTIONS.map((option) => (
                            <Pressable
                                key={option.value}
                                style={styles.answerButton}
                                onPress={() => handleAnswer(option.value)}
                            >
                                <View style={styles.answerDot}>
                                    <Text style={styles.answerValue}>{option.value}</Text>
                                </View>
                                <Text style={styles.answerLabel}>{option.label}</Text>
                            </Pressable>
                        ))}
                    </View>

                    {/* Back button */}
                    {currentQ > 0 && (
                        <Pressable style={styles.backButton} onPress={() => setCurrentQ((q) => q - 1)}>
                            <Text style={styles.backButtonText}>← Previous</Text>
                        </Pressable>
                    )}
                </ScrollView>
            </SafeAreaView>
        );
    }

    if (step === 'result' && result) {
        const nafsColor =
            result.type === 'mutmainna' ? COLORS.mutmainna : result.type === 'lawwamah' ? COLORS.lawwamah : COLORS.ammarah;
        const nafsLabel =
            result.type === 'mutmainna' ? 'Nafs Mutmainna' : result.type === 'lawwamah' ? 'Nafs Lawwamah' : 'Nafs Ammarah';

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.resultContent}>
                    <Text style={styles.resultTitle}>Your Nafs Assessment</Text>
                    <Text style={styles.resultSubtitle}>Bismillah — your journey begins here</Text>

                    {/* Nafs Type */}
                    <View style={[styles.nafsResultCard, { borderColor: nafsColor }]}>
                        <Text style={[styles.nafsResultLabel, { color: nafsColor }]}>{nafsLabel}</Text>
                        <Text style={styles.nafsScore}>{result.score}%</Text>
                        <Text style={styles.nafsScoreLabel}>Toward Mutmainna</Text>

                        {/* Percentage Bars */}
                        {(['ammarah', 'lawwamah', 'mutmainna'] as const).map((stage) => (
                            <View key={stage} style={styles.barRow}>
                                <Text style={styles.barLabel}>{stage.charAt(0).toUpperCase() + stage.slice(1)}</Text>
                                <View style={styles.barBg}>
                                    <View
                                        style={[
                                            styles.barFill,
                                            {
                                                width: `${result.percentage[stage]}%`,
                                                backgroundColor: stage === 'ammarah' ? COLORS.ammarah : stage === 'lawwamah' ? COLORS.lawwamah : COLORS.mutmainna,
                                            },
                                        ]}
                                    />
                                </View>
                                <Text style={styles.barPct}>{result.percentage[stage]}%</Text>
                            </View>
                        ))}
                    </View>

                    {/* Areas for Improvement */}
                    <View style={styles.improvementCard}>
                        <Text style={styles.improvementTitle}>Areas to Focus On</Text>
                        {result.areasForImprovement.map((area, i) => (
                            <View key={i} style={styles.improvementRow}>
                                <Text style={styles.improvementDot}>🌱</Text>
                                <Text style={styles.improvementText}>{area}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Encouragement */}
                    <View style={styles.encourageBox}>
                        <Text style={styles.encourageText}>
                            "Indeed, Allah does not change the condition of a people until they change what is in themselves."
                        </Text>
                        <Text style={styles.encourageRef}>— Surah Ar-Ra'd 13:11 (Ibn Kathir)</Text>
                    </View>

                    <Pressable style={styles.startButton} onPress={handleComplete}>
                        <Text style={styles.startButtonText}>Begin My Journey →</Text>
                    </Pressable>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    welcomeContent: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 40, paddingBottom: 32 },
    welcomeArabic: { fontSize: 36, color: COLORS.primary, marginBottom: 8, textAlign: 'center' },
    welcomeTitle: { fontSize: 28, fontWeight: '800', color: COLORS.text },
    welcomeTagline: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4, textAlign: 'center' },
    verseBox: {
        backgroundColor: COLORS.primary, borderRadius: 20, padding: 24,
        alignItems: 'center', width: '100%', marginVertical: 28,
    },
    verseArabic: { fontSize: 22, lineHeight: 40, color: '#FFF', textAlign: 'center' },
    verseText: { color: '#FFFFFFCC', textAlign: 'center', marginTop: 12, fontSize: 15 },
    verseRef: { color: COLORS.accent, fontWeight: '600', marginTop: 8, fontSize: 12 },
    welcomeDescription: { textAlign: 'center', color: COLORS.text, lineHeight: 22, marginBottom: 16 },
    welcomeNote: {
        textAlign: 'center', color: COLORS.textSecondary, fontSize: 12, lineHeight: 20,
        backgroundColor: '#FFF', padding: 14, borderRadius: 12, marginBottom: 28,
    },
    startButton: {
        backgroundColor: COLORS.primary, paddingVertical: 18, paddingHorizontal: 48,
        borderRadius: 14, marginBottom: 16,
    },
    startButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
    anonymousNote: { fontSize: 12, color: COLORS.textSecondary },
    progressBarContainer: {
        height: 4, backgroundColor: '#E0E0E0', marginHorizontal: 0,
    },
    progressBarFill: { height: 4, backgroundColor: COLORS.primary },
    progressText: { textAlign: 'center', color: COLORS.textSecondary, fontSize: 12, marginTop: 8, marginBottom: 4 },
    questionContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
    categoryBadge: {
        alignSelf: 'flex-start', backgroundColor: COLORS.primary + '15',
        borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, marginBottom: 20,
    },
    categoryText: { color: COLORS.primary, fontWeight: '600', fontSize: 13 },
    questionText: { fontSize: 20, fontWeight: '700', color: COLORS.text, lineHeight: 30, marginBottom: 28 },
    answersContainer: { gap: 12 },
    answerButton: {
        flexDirection: 'row', alignItems: 'center', gap: 14,
        backgroundColor: COLORS.surface, borderRadius: 14, padding: 18,
        borderWidth: 1, borderColor: '#E0E0E0',
    },
    answerDot: {
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: COLORS.primary + '15', justifyContent: 'center', alignItems: 'center',
    },
    answerValue: { fontWeight: '700', color: COLORS.primary },
    answerLabel: { flex: 1, fontSize: 15, color: COLORS.text },
    backButton: { marginTop: 20, alignSelf: 'center' },
    backButtonText: { color: COLORS.textSecondary, fontSize: 14 },
    resultContent: { paddingHorizontal: 20, paddingTop: 28, paddingBottom: 40 },
    resultTitle: { fontSize: 26, fontWeight: '800', color: COLORS.text, textAlign: 'center' },
    resultSubtitle: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 4, marginBottom: 24 },
    nafsResultCard: {
        backgroundColor: COLORS.surface, borderRadius: 20, padding: 24,
        borderWidth: 2, marginBottom: 20,
    },
    nafsResultLabel: { fontSize: 22, fontWeight: '800', textAlign: 'center' },
    nafsScore: { fontSize: 52, fontWeight: '800', color: COLORS.text, textAlign: 'center', marginTop: 8 },
    nafsScoreLabel: { color: COLORS.textSecondary, textAlign: 'center', marginBottom: 20 },
    barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
    barLabel: { width: 80, fontSize: 12, color: COLORS.textSecondary, textTransform: 'capitalize' },
    barBg: { flex: 1, height: 8, backgroundColor: '#E0E0E0', borderRadius: 4 },
    barFill: { height: 8, borderRadius: 4 },
    barPct: { width: 35, fontSize: 12, color: COLORS.textSecondary, textAlign: 'right' },
    improvementCard: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 20, marginBottom: 20 },
    improvementTitle: { fontWeight: '700', color: COLORS.text, marginBottom: 12, fontSize: 16 },
    improvementRow: { flexDirection: 'row', gap: 8, marginBottom: 8, alignItems: 'center' },
    improvementDot: { fontSize: 16 },
    improvementText: { flex: 1, color: COLORS.text, fontSize: 14, textTransform: 'capitalize' },
    encourageBox: {
        backgroundColor: COLORS.primary + '10', borderRadius: 14, padding: 18,
        marginBottom: 24, borderLeftWidth: 3, borderLeftColor: COLORS.accent,
    },
    encourageText: { fontStyle: 'italic', color: COLORS.text, lineHeight: 22 },
    encourageRef: { color: COLORS.textSecondary, fontSize: 12, marginTop: 8, fontWeight: '600' },
});