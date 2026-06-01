// AI Chat Modal - Islamic Coach powered by MiniMax-M2.5

import { useState, useRef, useEffect } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Pressable,
    TextInput, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS } from '../src/shared/constants';
import { useAppStore, useChatHistory, useNafsState, useActiveTraits } from '../src/infrastructure/store';
import { chatWithCoach, getReflectionQuestions } from '../src/infrastructure/ai/coach';
import type { ChatMessage } from '../src/domain/entities';
import { v4 as uuidv4 } from 'uuid';

const SUGGESTED_TOPICS = [
    '😤 I feel angry right now',
    '😰 I\'m anxious about something',
    '😠 I\'m struggling with envy',
    '😔 I feel hopeless',
    '🤲 Help me make a dua',
    '🌱 How do I improve my nafs?',
];

export default function ChatScreen() {
    const router = useRouter();
    const chatHistory = useChatHistory();
    const nafsState = useNafsState();
    const activeTraits = useActiveTraits();
    const recentEmotions = useAppStore((s) => s.recentEmotions);
    const progress = useAppStore((s) => s.progress);
    const addChatMessage = useAppStore((s) => s.addChatMessage);

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(chatHistory.length === 0);

    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        // Auto-scroll to bottom on new messages
        scrollRef.current?.scrollToEnd({ animated: true });
    }, [chatHistory]);

    const handleSend = async (text?: string) => {
        const messageText = (text ?? input).trim();
        if (!messageText || isLoading) return;

        setInput('');
        setShowSuggestions(false);
        setIsLoading(true);

        // Add user message
        const userMsg: ChatMessage = {
            id: uuidv4(),
            role: 'user',
            content: messageText,
            timestamp: new Date(),
        };
        addChatMessage(userMsg);

        try {
            const context = {
                nafsState: nafsState ?? {
                    id: 'default',
                    type: 'lawwamah' as const,
                    score: 50,
                    percentage: { ammarah: 30, lawwamah: 50, mutmainna: 20 },
                    dominantTraits: [],
                    areasForImprovement: [],
                    lastUpdated: new Date(),
                },
                recentEmotions: recentEmotions.slice(0, 5),
                activeTraits,
                currentStreak: progress?.streak ?? 0,
                conversationHistory: chatHistory.slice(-10),
            };

            const aiResponse = await chatWithCoach(messageText, context);

            const aiMsg: ChatMessage = {
                id: uuidv4(),
                role: 'assistant',
                content: aiResponse.message,
                timestamp: new Date(),
            };
            addChatMessage(aiMsg);
        } catch {
            const errorMsg: ChatMessage = {
                id: uuidv4(),
                role: 'assistant',
                content: 'I apologize — I\'m having trouble responding right now. Please try again, or consult a qualified Islamic scholar for personal guidance.',
                timestamp: new Date(),
            };
            addChatMessage(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backIcon}>✕</Text>
                </Pressable>
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>Islamic AI Coach</Text>
                    <Text style={styles.headerSubtitle}>Powered by MiniMax-M2.5</Text>
                </View>
                <Pressable onPress={() => useAppStore.getState().clearChatHistory()} style={styles.clearButton}>
                    <Text style={styles.clearText}>Clear</Text>
                </Pressable>
            </View>

            {/* Disclaimer Banner */}
            <View style={styles.disclaimerBanner}>
                <Text style={styles.disclaimerText}>
                    📚 All Islamic references are from authentic sources. For religious rulings (fatwa), please consult a qualified scholar.
                </Text>
            </View>

            <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                {/* Messages */}
                <ScrollView
                    ref={scrollRef}
                    style={styles.messagesArea}
                    contentContainerStyle={styles.messagesContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Welcome message */}
                    {chatHistory.length === 0 && (
                        <View style={styles.welcomeMsg}>
                            <Text style={styles.welcomeArabic}>السَّلاَمُ عَلَيْكُمْ</Text>
                            <Text style={styles.welcomeText}>
                                As-salamu Alaykum! I'm your Tazkiyah coach. Share what's on your heart,
                                and I'll guide you with wisdom from the Quran and authentic Hadith.
                            </Text>
                        </View>
                    )}

                    {/* Suggested topics */}
                    {showSuggestions && (
                        <View style={styles.suggestionsContainer}>
                            <Text style={styles.suggestionsTitle}>How can I help?</Text>
                            {SUGGESTED_TOPICS.map((topic, i) => (
                                <Pressable key={i} style={styles.suggestionChip} onPress={() => handleSend(topic)}>
                                    <Text style={styles.suggestionText}>{topic}</Text>
                                </Pressable>
                            ))}
                        </View>
                    )}

                    {/* Chat messages */}
                    {chatHistory.map((msg) => (
                        <View
                            key={msg.id}
                            style={[styles.bubble, msg.role === 'user' ? styles.userBubble : styles.aiBubble]}
                        >
                            {msg.role === 'assistant' && (
                                <Text style={styles.aiLabel}>🤲 Coach</Text>
                            )}
                            <Text style={[styles.bubbleText, msg.role === 'user' && styles.userBubbleText]}>
                                {msg.content}
                            </Text>
                            <Text style={[styles.timestamp, msg.role === 'user' && styles.userTimestamp]}>
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                        </View>
                    ))}

                    {/* Loading indicator */}
                    {isLoading && (
                        <View style={styles.aiBubble}>
                            <ActivityIndicator color={COLORS.primary} size="small" />
                            <Text style={styles.thinkingText}>Reflecting...</Text>
                        </View>
                    )}
                </ScrollView>

                {/* Input */}
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.textInput}
                        value={input}
                        onChangeText={setInput}
                        placeholder="Share what's on your heart..."
                        placeholderTextColor={COLORS.textSecondary}
                        multiline
                        maxLength={500}
                        returnKeyType="send"
                        onSubmitEditing={() => handleSend()}
                    />
                    <Pressable
                        style={[styles.sendButton, (!input.trim() || isLoading) && styles.sendButtonDisabled]}
                        onPress={() => handleSend()}
                        disabled={!input.trim() || isLoading}
                    >
                        <Text style={styles.sendIcon}>→</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    flex: { flex: 1 },
    header: {
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16,
        paddingVertical: 12, backgroundColor: COLORS.surface,
        borderBottomWidth: 1, borderBottomColor: '#E0E0E0',
    },
    backButton: { padding: 8 },
    backIcon: { fontSize: 18, color: COLORS.textSecondary },
    headerCenter: { flex: 1, alignItems: 'center' },
    headerTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },
    headerSubtitle: { fontSize: 11, color: COLORS.textSecondary },
    clearButton: { padding: 8 },
    clearText: { color: COLORS.textSecondary, fontSize: 13 },
    disclaimerBanner: {
        backgroundColor: COLORS.primary + '10', paddingHorizontal: 16, paddingVertical: 8,
    },
    disclaimerText: { fontSize: 11, color: COLORS.primary, lineHeight: 16 },
    messagesArea: { flex: 1 },
    messagesContent: { paddingHorizontal: 16, paddingVertical: 16, gap: 12 },
    welcomeMsg: {
        backgroundColor: COLORS.primary, borderRadius: 16, padding: 20, alignItems: 'center',
    },
    welcomeArabic: { fontSize: 22, color: '#FFF', marginBottom: 8 },
    welcomeText: { color: '#FFFFFFCC', textAlign: 'center', lineHeight: 22 },
    suggestionsContainer: { gap: 8 },
    suggestionsTitle: { fontWeight: '700', color: COLORS.textSecondary, fontSize: 13 },
    suggestionChip: {
        backgroundColor: COLORS.surface, borderRadius: 20, paddingVertical: 12,
        paddingHorizontal: 16, borderWidth: 1, borderColor: '#E0E0E0',
    },
    suggestionText: { color: COLORS.text, fontSize: 14 },
    bubble: { borderRadius: 16, padding: 16, maxWidth: '85%' },
    userBubble: { backgroundColor: COLORS.primary, alignSelf: 'flex-end', borderBottomRightRadius: 4 },
    aiBubble: {
        backgroundColor: COLORS.surface, alignSelf: 'flex-start', borderBottomLeftRadius: 4,
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
    },
    aiLabel: { fontSize: 11, color: COLORS.primary, fontWeight: '700', marginBottom: 6 },
    bubbleText: { fontSize: 14, color: COLORS.text, lineHeight: 22 },
    userBubbleText: { color: '#FFF' },
    timestamp: { fontSize: 10, color: COLORS.textSecondary, marginTop: 6, alignSelf: 'flex-end' },
    userTimestamp: { color: '#FFFFFF80' },
    thinkingText: { color: COLORS.textSecondary, fontSize: 13, marginTop: 8 },
    inputRow: {
        flexDirection: 'row', alignItems: 'flex-end', gap: 10,
        paddingHorizontal: 16, paddingVertical: 12,
        backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: '#E0E0E0',
    },
    textInput: {
        flex: 1, backgroundColor: COLORS.background, borderRadius: 20,
        paddingHorizontal: 16, paddingVertical: 12, fontSize: 14,
        color: COLORS.text, maxHeight: 100,
    },
    sendButton: {
        width: 44, height: 44, borderRadius: 22,
        backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center',
    },
    sendButtonDisabled: { backgroundColor: '#CCCCCC' },
    sendIcon: { color: '#FFF', fontSize: 18, fontWeight: '700' },
});