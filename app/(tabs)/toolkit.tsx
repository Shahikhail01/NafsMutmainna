// Rectification Toolkit Screen - Core daily feature

import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TRAITS } from '../../src/shared/constants';
import { useAppStore } from '../../src/infrastructure/store';
import type { Trait, TraitType } from '../../src/domain/entities';

const IMMEDIATE_TOOLS: Record<TraitType, { dhikr: string; arabic: string; count: number; instruction: string }[]> = {
    anger: [
        { dhikr: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', count: 33, instruction: 'Sit down, take 3 deep breaths, then recite' },
        { dhikr: 'A\'udhu billahi min ash-shaytan ir-rajeem', arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ', count: 3, instruction: 'Seek refuge from Shaytan first' },
    ],
    envy: [
        { dhikr: 'Allahumma barik lahu', arabic: 'اللَّهُمَّ بَارِكْ لَهُ', count: 7, instruction: 'Pray for the person you feel envious of' },
        { dhikr: 'Alhamdulillah ala kulli hal', arabic: 'الْحَمْدُ لِلَّهِ عَلَى كُلِّ حَالٍ', count: 33, instruction: 'Count your own blessings' },
    ],
    anxiety: [
        { dhikr: 'Hasbunallahu wa ni\'mal wakeel', arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', count: 100, instruction: 'Recite slowly, connecting with meaning' },
        { dhikr: 'La hawla wa la quwwata illa billah', arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', count: 33, instruction: 'Remember: No power except through Allah' },
    ],
    greed: [
        { dhikr: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', count: 100, instruction: 'Focus on what you already have' },
    ],
    pride: [
        { dhikr: 'Subhanaka Allahumma wa bihamdik', arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ', count: 33, instruction: 'Glorify Allah, remember your dependence' },
    ],
    ostentation: [
        { dhikr: 'La ilaha illa Allah wahdahu la sharika lah', arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ', count: 10, instruction: 'Renew sincerity of intention' },
    ],
    ignorance: [
        { dhikr: 'Rabbi zidni ilma', arabic: 'رَبِّ زِدْنِي عِلْمًا', count: 33, instruction: 'Ask Allah to increase your knowledge' },
    ],
    despair: [
        { dhikr: 'Inna lillahi wa inna ilayhi raji\'un', arabic: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ', count: 7, instruction: 'Return everything to Allah' },
        { dhikr: 'La ilaha illa anta subhanaka inni kuntu min adh-dhalimin', arabic: 'لَا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ', count: 40, instruction: 'The dua of Prophet Yunus ﷺ' },
    ],
};

const SHORT_TERM_ACTIONS: Record<TraitType, string[]> = {
    anger: ['Fast on Monday & Thursday', 'Recite Surah Al-Kahf on Friday', 'Give sadaqah today'],
    envy: ['Give charity to someone better-off', 'Visit someone in need', 'Write 5 blessings in your journal'],
    anxiety: ['Pray 2 rakat Salat al-Hajjah', 'Read Surah Al-Inshirah (94)', 'Talk to a trusted person'],
    greed: ['Give away something you love', 'Volunteer for the community', 'Read about the life of the Ansar'],
    pride: ['Greet someone younger than you first', 'Help someone without telling anyone', 'Visit a cemetery for perspective'],
    ostentation: ['Perform a good deed in secret', 'Delete a social media post you made for praise', 'Check your Niyyah before each prayer'],
    ignorance: ['Read 1 page of Quran with tafseer', 'Listen to one lecture by Dr. Israr Ahmed', 'Ask a scholar one question'],
    despair: ['Read about the mercy of Allah (Surah Az-Zumar 39:53)', 'Make dua before Fajr', 'Speak to a trusted scholar or counselor'],
};

const LONG_TERM_HABITS: Record<TraitType, string[]> = {
    anger: ['Establish consistent morning adhkar', 'Practice Tahajjud', 'Study Seerah of Prophet ﷺ on patience'],
    envy: ['Daily gratitude journal (30 days)', 'Weekly sadaqah habit', 'Limit social media consumption'],
    anxiety: ['Morning & evening adhkar every day', 'Establish Tahajjud', 'Study Tawakkul (Molana Maududi)'],
    greed: ['Monthly Zakat calculation habit', 'Study life of Sahaba on contentment', 'Regular fasting'],
    pride: ['Weekly visit to poor or sick', 'Study Kibr by Dr. Israr Ahmed', 'Practice Istighfar 100x daily'],
    ostentation: ['Keep worship between you and Allah', 'Study Ikhlas (Surah Al-Ikhlas reflection)', 'Avoid sharing acts of worship on social media'],
    ignorance: ['Daily Quran (1 page minimum)', 'Weekly halaqah or study circle', 'Read one Islamic book per month'],
    despair: ['Daily connection with Allah via dua', 'Study stories of Prophet Ayyub (as)', 'Seek professional counseling if needed'],
};

export default function ToolkitScreen() {
    const activeTraits = useAppStore((s) => s.activeTraits);
    const [selectedTrait, setSelectedTrait] = useState<TraitType>(activeTraits[0] || 'anger');
    const [activeTab, setActiveTab] = useState<'immediate' | 'shortTerm' | 'longTerm'>('immediate');

    const traitInfo = TRAITS.find((t) => t.id === selectedTrait);
    const immediateTools = IMMEDIATE_TOOLS[selectedTrait] || [];
    const shortTermActions = SHORT_TERM_ACTIONS[selectedTrait] || [];
    const longTermHabits = LONG_TERM_HABITS[selectedTrait] || [];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.title}>Rectification Toolkit</Text>
                <Text style={styles.subtitle}>Practical remedies from authentic Islamic sources</Text>
            </View>

            {/* Trait Selector */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.traitScroll} contentContainerStyle={styles.traitScrollContent}>
                {TRAITS.map((trait) => (
                    <Pressable
                        key={trait.id}
                        style={[styles.traitChip, selectedTrait === trait.id && styles.traitChipActive]}
                        onPress={() => setSelectedTrait(trait.id)}
                    >
                        <Text style={[styles.traitChipText, selectedTrait === trait.id && styles.traitChipTextActive]}>
                            {trait.name.split(' ')[0]}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
                {/* Trait Info */}
                {traitInfo && (
                    <View style={styles.traitInfoCard}>
                        <Text style={styles.traitName}>{traitInfo.name}</Text>
                        <Text style={styles.traitNameUr}>{traitInfo.nameUr}</Text>
                        <Text style={styles.traitDescription}>{traitInfo.description}</Text>
                        <View style={styles.oppositeRow}>
                            <Text style={styles.oppositeLabel}>Path to: </Text>
                            <Text style={styles.oppositeTrait}>{traitInfo.oppositeTrait}</Text>
                        </View>
                    </View>
                )}

                {/* Tab Selector */}
                <View style={styles.tabRow}>
                    {(['immediate', 'shortTerm', 'longTerm'] as const).map((tab) => (
                        <Pressable
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.tabActive]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                                {tab === 'immediate' ? '⚡ Now' : tab === 'shortTerm' ? '📅 Days' : '🌱 Habit'}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                {/* Immediate Tools */}
                {activeTab === 'immediate' && (
                    <View style={styles.toolsSection}>
                        <Text style={styles.toolsSectionTitle}>Immediate Dhikr & Actions</Text>
                        {immediateTools.map((tool, i) => (
                            <View key={i} style={styles.dhikrCard}>
                                <Text style={styles.dhikrInstruction}>{tool.instruction}</Text>
                                <Text style={styles.dhikrArabic}>{tool.arabic}</Text>
                                <Text style={styles.dhikrTranslit}>{tool.dhikr}</Text>
                                <View style={styles.countRow}>
                                    <Text style={styles.countBadge}>✕ {tool.count}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Short Term Actions */}
                {activeTab === 'shortTerm' && (
                    <View style={styles.toolsSection}>
                        <Text style={styles.toolsSectionTitle}>Short-Term Actions (1-7 Days)</Text>
                        {shortTermActions.map((action, i) => (
                            <View key={i} style={styles.actionCard}>
                                <Text style={styles.actionNumber}>{i + 1}</Text>
                                <Text style={styles.actionText}>{action}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Long Term Habits */}
                {activeTab === 'longTerm' && (
                    <View style={styles.toolsSection}>
                        <Text style={styles.toolsSectionTitle}>Long-Term Sunnah Habits</Text>
                        {longTermHabits.map((habit, i) => (
                            <View key={i} style={styles.habitCard}>
                                <View style={styles.habitDot} />
                                <Text style={styles.habitText}>{habit}</Text>
                            </View>
                        ))}
                    </View>
                )}

                <View style={{ height: 32 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
    title: { fontSize: 24, fontWeight: '700', color: COLORS.text },
    subtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
    traitScroll: { maxHeight: 52, marginTop: 12 },
    traitScrollContent: { paddingHorizontal: 16, gap: 8 },
    traitChip: {
        paddingHorizontal: 16, paddingVertical: 10,
        backgroundColor: COLORS.surface, borderRadius: 20,
        borderWidth: 1, borderColor: '#E0E0E0',
    },
    traitChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
    traitChipText: { fontSize: 13, fontWeight: '500', color: COLORS.textSecondary },
    traitChipTextActive: { color: '#FFF' },
    content: { flex: 1, paddingHorizontal: 16, marginTop: 16 },
    traitInfoCard: {
        backgroundColor: COLORS.surface, borderRadius: 16,
        padding: 20, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: COLORS.primary,
    },
    traitName: { fontSize: 20, fontWeight: '700', color: COLORS.text },
    traitNameUr: { fontSize: 16, color: COLORS.textSecondary, marginTop: 2 },
    traitDescription: { fontSize: 14, color: COLORS.textSecondary, marginTop: 8, lineHeight: 20 },
    oppositeRow: { flexDirection: 'row', marginTop: 12, alignItems: 'center' },
    oppositeLabel: { fontSize: 13, color: COLORS.textSecondary },
    oppositeTrait: { fontSize: 13, fontWeight: '700', color: COLORS.success },
    tabRow: { flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: 12, padding: 4, marginBottom: 16 },
    tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
    tabActive: { backgroundColor: COLORS.primary },
    tabText: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
    tabTextActive: { color: '#FFF' },
    toolsSection: { gap: 12 },
    toolsSectionTitle: { fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 4 },
    dhikrCard: {
        backgroundColor: COLORS.surface, borderRadius: 16, padding: 20,
        alignItems: 'center', borderTopWidth: 3, borderTopColor: COLORS.accent,
    },
    dhikrInstruction: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 12 },
    dhikrArabic: { fontSize: 28, lineHeight: 48, color: COLORS.primary, textAlign: 'center', fontFamily: 'System' },
    dhikrTranslit: { fontSize: 14, color: COLORS.text, marginTop: 8, textAlign: 'center', fontStyle: 'italic' },
    countRow: { marginTop: 12 },
    countBadge: {
        backgroundColor: COLORS.primary + '20', color: COLORS.primary,
        paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, fontWeight: '700',
    },
    actionCard: {
        flexDirection: 'row', alignItems: 'flex-start', backgroundColor: COLORS.surface,
        borderRadius: 12, padding: 16, gap: 12,
    },
    actionNumber: {
        width: 28, height: 28, borderRadius: 14,
        backgroundColor: COLORS.primary, color: '#FFF',
        textAlign: 'center', lineHeight: 28, fontWeight: '700', fontSize: 14,
    },
    actionText: { flex: 1, fontSize: 14, color: COLORS.text, lineHeight: 22 },
    habitCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: COLORS.surface, borderRadius: 12, padding: 16 },
    habitDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.secondary },
    habitText: { flex: 1, fontSize: 14, color: COLORS.text, lineHeight: 20 },
});