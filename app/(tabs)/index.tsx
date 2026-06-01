// Home Screen - Dashboard with daily content and quick actions

import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS, DAILY_VERSES, DAILY_HADITH, BADGES } from '../../src/shared/constants';
import { useAppStore, useNafsState, useProgress } from '../../src/infrastructure/store';

export default function HomeScreen() {
    const router = useRouter();
    const nafsState = useNafsState();
    const progress = useProgress();
    const isOnboarded = useAppStore((s) => s.isOnboarded);

    // Redirect to onboarding if not completed
    useEffect(() => {
        if (!isOnboarded) {
            router.replace('/onboarding');
        }
    }, [isOnboarded]);

    const todaysVerse = DAILY_VERSES[new Date().getDay() % DAILY_VERSES.length];
    const todaysHadith = DAILY_HADITH[new Date().getDay() % DAILY_HADITH.length];

    const getNafsColor = () => {
        switch (nafsState?.type) {
            case 'mutmainna':
                return COLORS.mutmainna;
            case 'lawwamah':
                return COLORS.lawwamah;
            default:
                return COLORS.ammarah;
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.greeting}>Assalamu Alaikum</Text>
                    <Text style={styles.subtitle}>How is your Nafs today?</Text>
                </View>

                {/* Nafs State Card */}
                <Pressable style={[styles.nafsCard, { borderLeftColor: getNafsColor() }]}>
                    <View style={styles.nafsHeader}>
                        <Text style={styles.nafsTitle}>Your Nafs State</Text>
                        <View style={[styles.nafsBadge, { backgroundColor: getNafsColor() }]}>
                            <Text style={styles.nafsBadgeText}>
                                {nafsState?.type === 'mutmainna'
                                    ? 'Mutmainna ✨'
                                    : nafsState?.type === 'lawwamah'
                                        ? 'Lawwamah 🌱'
                                        : 'Ammarah ⚠️'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View
                                style={[
                                    styles.progressFill,
                                    {
                                        width: `${nafsState?.score ?? 30}%`,
                                        backgroundColor: getNafsColor(),
                                    },
                                ]}
                            />
                        </View>
                        <Text style={styles.progressText}>{nafsState?.score ?? 30}/100</Text>
                    </View>
                    <Text style={styles.nafsDescription}>
                        {nafsState?.type === 'mutmainna'
                            ? 'Your soul is at peace. Continue maintaining your spiritual practices.'
                            : nafsState?.type === 'lawwamah'
                                ? 'Your soul blames itself. Keep working on self-improvement.'
                                : 'Your soul commands evil. Focus on repentance and dhikr.'}
                    </Text>
                </Pressable>

                {/* Daily Content */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Today's Reflection</Text>

                    {/* Quran Verse Card */}
                    <View style={styles.contentCard}>
                        <Text style={styles.contentLabel}>📖 Quran</Text>
                        <Text style={styles.arabicText}>{todaysVerse.arabic}</Text>
                        <Text style={styles.verseRef}>
                            Surah {todaysVerse.surah} {todaysVerse.verseNumber}
                        </Text>
                        <Text style={styles.translation}>{todaysVerse.translation}</Text>
                        <Text style={styles.source}>— Ibn Kathir Tafsir</Text>
                    </View>

                    {/* Hadith Card */}
                    <View style={styles.contentCard}>
                        <Text style={styles.contentLabel}>📚 Authentic Hadith</Text>
                        <Text style={styles.hadithText}>{todaysHadith.text}</Text>
                        <Text style={styles.hadithMeta}>
                            Narrated by {todaysHadith.narrator}
                        </Text>
                        <Text style={styles.hadithGrade}>
                            {todaysHadith.book.charAt(0).toUpperCase() + todaysHadith.book.slice(1)} •{' '}
                            {todaysHadith.grade.charAt(0).toUpperCase() + todaysHadith.grade.slice(1)}
                        </Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.quickActions}>
                        <Pressable
                            style={styles.actionButton}
                            onPress={() => router.push('/emotions')}
                        >
                            <Text style={styles.actionIcon}>💭</Text>
                            <Text style={styles.actionText}>Log Feeling</Text>
                        </Pressable>
                        <Pressable
                            style={styles.actionButton}
                            onPress={() => router.push('/journal')}
                        >
                            <Text style={styles.actionIcon}>📝</Text>
                            <Text style={styles.actionText}>Journal</Text>
                        </Pressable>
                        <Pressable
                            style={styles.actionButton}
                            onPress={() => router.push('/chat')}
                        >
                            <Text style={styles.actionIcon}>💬</Text>
                            <Text style={styles.actionText}>AI Coach</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Progress Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Your Progress</Text>
                    <View style={styles.progressGrid}>
                        <View style={styles.progressItem}>
                            <Text style={styles.progressValue}>{progress?.streak ?? 0}</Text>
                            <Text style={styles.progressLabel}>Day Streak</Text>
                        </View>
                        <View style={styles.progressItem}>
                            <Text style={styles.progressValue}>{progress?.odex ?? 0}</Text>
                            <Text style={styles.progressLabel}>ODEX</Text>
                        </View>
                        <View style={styles.progressItem}>
                            <Text style={styles.progressValue}>{progress?.badges.length ?? 0}</Text>
                            <Text style={styles.progressLabel}>Badges</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
    },
    greeting: {
        fontSize: 28,
        fontWeight: '700',
        color: COLORS.primary,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        marginTop: 4,
    },
    nafsCard: {
        margin: 16,
        padding: 20,
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    nafsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    nafsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text,
    },
    nafsBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    nafsBadgeText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        marginRight: 12,
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    nafsDescription: {
        fontSize: 14,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },
    section: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    contentCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    contentLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: 8,
    },
    arabicText: {
        fontSize: 22,
        lineHeight: 36,
        textAlign: 'center',
        color: COLORS.primary,
        marginVertical: 8,
        fontFamily: 'System',
    },
    verseRef: {
        fontSize: 12,
        color: COLORS.accent,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
    },
    translation: {
        fontSize: 14,
        color: COLORS.text,
        lineHeight: 22,
        textAlign: 'center',
    },
    source: {
        fontSize: 11,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: 8,
        fontStyle: 'italic',
    },
    hadithText: {
        fontSize: 14,
        color: COLORS.text,
        lineHeight: 22,
        marginBottom: 8,
    },
    hadithMeta: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    hadithGrade: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '600',
        marginTop: 4,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    actionButton: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        width: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    actionIcon: {
        fontSize: 28,
        marginBottom: 8,
    },
    actionText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.text,
    },
    progressGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 16,
    },
    progressItem: {
        alignItems: 'center',
    },
    progressValue: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.primary,
    },
    progressLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 4,
    },
});