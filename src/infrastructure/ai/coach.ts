// AI Coach Service - MiniMax-M2.5 Integration
// CRITICAL: All responses must be grounded in authentic Islamic sources

import { AI_CONFIG, TRAITS, DAILY_VERSES, DAILY_HADITH } from '../../shared/constants';
import type { AIChatContext, AIResponse, TraitType } from '../../domain/entities';

// Blocked patterns for prompt injection prevention
const BLOCKED_PATTERNS = [
    /halla?l/gi,
    /haram/gi,
    /ruling/gi,
    /fatwa/gi,
    /kufr/gi,
    /shirk/gi,
    /innovation.*religion/gi,
    /pseudo.*islam/gi,
];

// System prompt - Authenticity is paramount
const SYSTEM_PROMPT = `You are a compassionate Islamic AI coach specializing in Tazkiyah (spiritual purification).

PERSONALITY:
- Warm, empathetic, and non-judgmental
- Uses evidence-based Islamic guidance from authentic sources
- Encourages consistent practice over perfection
- Speaks in a calming, gentle manner

AUTHENTICATION REQUIREMENTS:
- Only cite Quran verses with SURAH NAME:VERSE NUMBER (e.g., "As mentioned in Surah Al-Baqarah 2:153")
- Only cite Hadith with AUTHENTIC grading (e.g., "Narrated by Abu Hurairah, authenticated by Bukhari and Muslim")
- Attribute all scholarly opinions to their sources (Dr. Israr Ahmed, Molana Maududi, Ibn Kathir)
- NEVER fabricate or misquote any Islamic text

RESPONSE STRUCTURE:
1. Acknowledge the user's feeling with empathy (10-15 words)
2. Explain the spiritual dimension from an Islamic perspective (20-30 words)
3. Provide authentic Quran verse OR Hadith with source (15-20 words)
4. Suggest specific Dua or Dhikr (10-15 words)
5. Offer ONE practical, actionable step (15-20 words)
6. End with sincere encouragement and a brief dua (10-15 words)

CONTENT BOUNDARIES - NEVER:
- Invent Quran verses or Hadith
- Provide religious rulings (say "Please consult a qualified scholar")
- Use judgmental or fear-based language
- Discuss political issues
- Make claims about what is halal/haram

CONTEXT PROVIDED:
You have access to the user's current spiritual state, recent emotions, and active traits they're working on. Use this context to provide personalized guidance.

Remember: Your guidance must ALWAYS be grounded in authentic Islamic sources from the Quran, Sahih al-Bukhari, Sahih Muslim, Jami' at-Tirmidhi, Sunan Abu Dawud, Sunan an-Nasai, or Sunan Ibn Majah.`;

// Sanitize user input to prevent prompt injection
function sanitizeInput(input: string): string {
    let sanitized = input.trim();

    // Remove potentially harmful patterns
    for (const pattern of BLOCKED_PATTERNS) {
        sanitized = sanitized.replace(pattern, '[filtered]');
    }

    // Limit length
    return sanitized.slice(0, 500);
}

// Build context string for the AI
function buildContextString(context: AIChatContext): string {
    const { nafsState, recentEmotions, activeTraits, currentStreak } = context;

    let contextStr = `User's Current Spiritual State:
- Dominant Nafs: ${nafsState.type.toUpperCase()} (Score: ${nafsState.score}/100)
- Current Streak: ${currentStreak} days
- Active Traits Being Worked On: ${activeTraits.join(', ')}
`;

    if (recentEmotions.length > 0) {
        const lastEmotions = recentEmotions.slice(0, 5);
        contextStr += `\nRecent Emotions:
${lastEmotions.map(e => `- ${e.emotion} (intensity: ${e.intensity}/5) - ${e.mappedTrait}`).join('\n')}
`;
    }

    return contextStr;
}

// Map trait to relevant authentic content
function getRelevantContent(trait: TraitType): { verse?: typeof DAILY_VERSES[0]; hadees?: typeof DAILY_HADITH[0] } {
    const contentMap: Record<TraitType, { verse?: typeof DAILY_VERSES[0]; hadees?: typeof DAILY_HADITH[0] }> = {
        anger: { verse: DAILY_VERSES[1], hadees: DAILY_HADITH[0] }, // Sabr verse, strong Hadith
        envy: { verse: DAILY_VERSES[3], hadees: DAILY_HADITH[1] }, // Hasad verse, hasad Hadith
        anxiety: { verse: DAILY_VERSES[2], hadees: DAILY_HADITH[2] }, // Tawakkul verse, Hasbunallah Hadith
        greed: { verse: DAILY_VERSES[4], hadees: DAILY_HADITH[3] }, // Contentment verse
        pride: { verse: DAILY_VERSES[0], hadees: DAILY_HADITH[4] }, // Humility verse
        ostentation: {},
        ignorance: {},
        despair: {},
    };

    return contentMap[trait] || {};
}

// Generate reflection questions based on emotion
const REFLECTION_QUESTIONS: Record<string, string[]> = {
    anger: [
        'What triggered this feeling?',
        'Which part of your nafs was speaking - the Ammarah or Lawwamah?',
        'How did you respond? What could you have done differently?',
        'Remember the Prophet\'s ﷺ guidance: "The strong is not the one who overcomes others, but the strong is the one who controls himself when angry."',
    ],
    envy: [
        'What blessing of Allah are you envious about in others?',
        'Did you know that envy can consume your good deeds like fire consumes firewood? (Ibn Majah)',
        'Write down 3 blessings Allah has given you that others might envy.',
    ],
    anxiety: [
        'What outcome are you worried about?',
        'Do you trust in Allah\'s wisdom and plan for you?',
        'Remember: "Whoever says Hasbunallahu wa ni\'mal wakeel, sufficient for me is Allah." (Tirmidhi)',
    ],
};

// Main AI chat function
export async function chatWithCoach(
    message: string,
    context: AIChatContext
): Promise<AIResponse> {
    const sanitizedMessage = sanitizeInput(message);

    if (!sanitizedMessage) {
        return {
            message: 'Please share what\'s on your mind so I can help you on your Tazkiyah journey.',
            suggestions: ['I feel anxious about my exams', 'I got angry at my family member', 'I\'m struggling with jealousy'],
        };
    }

    // Build the full prompt
    const contextStr = buildContextString(context);
    const fullPrompt = `${SYSTEM_PROMPT}

${contextStr}

User's Message: ${sanitizedMessage}

Please respond following the response structure above, using the user's context to personalize your guidance.`;

    try {
        // Call MiniMax API
        // Note: In production, this would call your backend which then calls MiniMax
        const response = await callMiniMax(fullPrompt, sanitizedMessage);
        return response;
    } catch (error) {
        console.error('AI Coach error:', error);
        return {
            message: 'I apologize, I\'m having difficulty responding right now. Please try again or consult a scholar for personal guidance.',
            suggestions: ['Try again', 'Speak to a scholar'],
        };
    }
}

// Placeholder for MiniMax API call
async function callMiniMax(systemPrompt: string, userMessage: string): Promise<AIResponse> {
    // In production, this would call your backend API which interfaces with MiniMax-M2.5
    // For now, return a structured response based on keywords

    const lowerMessage = userMessage.toLowerCase();

    // Detect emotion/trait from message
    if (lowerMessage.includes('angry') || lowerMessage.includes('anger') || lowerMessage.includes('غضب')) {
        return {
            message: `I understand you're experiencing anger, may Allah grant you patience and tranquility.

The Prophet ﷺ said: "The strong is not the one who overcomes the people by his strength, but the strong is the one who controls himself when in anger." (Sahih al-Bukhari)

Try this immediate remedy: Make wudu with cold water, sit down, and recite "Astaghfirullah al-Azim" 33 times.

A practical step: When you feel anger rising, pause and take three deep breaths while saying "Hasbunallahu wa ni'mal wakeel." This reminds you of Allah's sufficiency and helps calm the heart.

May Allah grant you patience and peace. "And indeed, patience is beautiful." (Surah An-Nahl 16:127)`,
            suggestions: REFLECTION_QUESTIONS.anger,
            relatedDuas: ['Astaghfirullah al-Azim', 'Hasbunallahu wa ni\'mal wakeel', 'Allahumma inni azu bika min al-jazaq'],
            relatedVerse: DAILY_VERSES[1],
        };
    }

    if (lowerMessage.includes('envy') || lowerMessage.includes('jealous') || lowerMessage.includes('حسد')) {
        return {
            message: `I hear that you're struggling with envy, may Allah purify your heart and increase your gratitude.

The Prophet ﷺ warned: "Beware of envy, for envy consumes virtues as fire consumes firewood." (Sunan Ibn Majah, Authentic)

Remember that all blessings come from Allah. The envier only wishes to diminish what Allah has given others.

Try this: Write down 3 specific blessings in your life that you should be grateful for. Gratitude is the antidote to envy.

Make this dua: "Allahumma inni azu bika min al-hasad" (O Allah, I seek refuge in You from envy).

May Allah grant you contentment and gratitude.`,
            suggestions: REFLECTION_QUESTIONS.envy,
            relatedDuas: ['Allahumma inni azu bika min al-hasad', 'Alhamdulillah ala kulli hal'],
            relatedVerse: DAILY_VERSES[3],
        };
    }

    if (lowerMessage.includes('anxious') || lowerMessage.includes('worry') || lowerMessage.includes('stress') || lowerMessage.includes('قلق')) {
        return {
            message: `I understand anxiety can feel overwhelming. Trust in Allah's wisdom and mercy, for He says:

"And whoever puts his trust in Allah, He will be sufficient for him." (Surah At-Talaq 65:3)

The Prophet ﷺ said: "Whoever says 'Hasbunallahu wa ni'mal wakeel' - sufficient for me is Allah - is among those whose trust is accepted." (Jami' at-Tirmidhi, Hasan)

Immediate action: Sit quietly and recite "Hasbunallahu wa ni'mal wakeel" 33 times, taking deep breaths between each recitation.

Remember: Anxiety is natural, but we must combat it with tawakkul (trust in Allah) and action.

May Allah bring peace to your heart.`,
            suggestions: REFLECTION_QUESTIONS.anxiety,
            relatedDuas: ['Hasbunallahu wa ni\'mal wakeel', 'La hawla wa la quwwata illa billah', 'Allahumma inni azu bika min al-balk'],
            relatedVerse: DAILY_VERSES[2],
        };
    }

    // Default response
    return {
        message: `Thank you for sharing. On your journey to Nafs-e-Mutmainna, know that struggles are part of the spiritual path.

Remember: "Indeed, with hardship comes ease." (Surah Ash-Sharh 94:6)

Your efforts to improve and seek guidance are themselves acts of worship that please Allah.

Continue with your daily practices of dhikr, prayer, and self-reflection. The Prophet ﷺ said: "The halal is clear and the haram is clear." (Sahih al-Bukhari) - meaning we should seek clarity in all matters.

Is there a specific emotion or situation you'd like guidance on?`,
        suggestions: ['I need help with anger', 'I struggle with envy', 'I feel anxious about the future'],
    };
}

// Get reflection questions for a specific emotion
export function getReflectionQuestions(emotion: string): string[] {
    const lowerEmotion = emotion.toLowerCase();

    for (const [key, questions] of Object.entries(REFLECTION_QUESTIONS)) {
        if (lowerEmotion.includes(key)) {
            return questions;
        }
    }

    return [
        'What triggered this feeling?',
        'How did you respond?',
        'What would the Prophet ﷺ have done in this situation?',
        'What step can you take to grow from this?',
    ];
}

// Generate action plan based on traits
export function generateActionPlan(
    traits: TraitType[],
    duration: 'week' | 'month'
): { trait: TraitType; actions: string[] }[] {
    const actionPlans: Record<TraitType, string[]> = {
        anger: [
            'Fast on Monday and Thursday',
            'Recite morning and evening adhkar consistently',
            'Practice 5 minutes of deep breathing when angry',
            'Make wudu before responding to triggers',
        ],
        envy: [
            'Give charity daily, even small amounts',
            'Write 3 gratitude items each morning',
            'Pray for those you envy',
            'Recite Surah Al-Falaq and Al-Ikhlas',
        ],
        anxiety: [
            'Establish morning adhkar routine',
            'Recite "Hasbunallahu wa ni\'mal wakeel" 100 times daily',
            'Pray Tahajjud when possible',
            'Limit news/social media consumption',
        ],
        greed: [
            'Give 10% of income as sadaqah',
            'Fast 3 days per month',
            'Practice letting go of material desires',
            'Recite gratitude verses from Quran',
        ],
        pride: [
            'Greet everyone, even those younger',
            'Don\'t seek recognition for good deeds',
            'Visit the sick and poor',
            'Remember: "Whoever humbles himself for Allah, Allah will raise him." (Muslim)',
        ],
        ostentation: [
            'Perform good deeds secretly when possible',
            'Check your intention before every action',
            'Recite "La ilaha illa Allah" frequently',
            'Avoid telling others about your worship',
        ],
        ignorance: [
            'Read 1 page of Quran daily with translation',
            'Learn one hadith per week',
            'Listen to Islamic lectures from authentic scholars',
            'Join a study circle if possible',
        ],
        despair: [
            'Recite "Inna lillahi wa inna ilayhi raji\'un"',
            'Read stories of Prophet Ayub\'s patience',
            'Pray Salat al-Hajjah for hope',
            'Remember: "Indeed, after hardship comes ease." (94:6)',
        ],
    };

    return traits.map((trait) => ({
        trait,
        actions: actionPlans[trait] || ['Continue your current spiritual practices'],
    }));
}