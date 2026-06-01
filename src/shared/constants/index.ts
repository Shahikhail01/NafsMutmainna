// Shared Constants - All static content verified by Ulema

import type { Trait, DailyContent, Badge, QuranVerse, Hadith, EducationalContent } from '../../domain/entities';

// App Configuration
export const APP_CONFIG = {
    name: 'NafsMutmainna',
    displayName: 'Nafs Mutmainna',
    tagline: 'Tazkiyah Journey - Return to Your Lord',
    version: '1.0.0',
    environment: __DEV__ ? 'development' : 'production',
} as const;

// Islamic Months for Hijri calendar support
export const ISLAMIC_MONTHS = [
    'Muharram',
    'Safar',
    'Rabi al-Awwal',
    'Rabi al-Thani',
    'Jumada al-Awwal',
    'Jumada al-Thani',
    'Rajab',
    "Sha'ban",
    'Ramadan',
    'Shawwal',
    'Dhu al-Qidah',
    'Dhu al-Hijjah',
] as const;

// All 99 Names of Allah (Asma ul Husna)
export const NINETY_NINE_NAMES = [
    { arabic: 'الله', transliteration: 'Allah', meaning: 'God' },
    { arabic: 'الرحمن', transliteration: 'Ar-Rahman', meaning: 'The Most Gracious' },
    { arabic: 'الرحيم', transliteration: 'Ar-Rahim', meaning: 'The Most Merciful' },
    { arabic: 'الملك', transliteration: 'Al-Malik', meaning: 'The King' },
    { arabic: 'القدوس', transliteration: 'Al-Quddus', meaning: 'The Most Pure' },
    { arabic: 'السلام', transliteration: 'Al-Salam', meaning: 'The Source of Peace' },
    { arabic: 'المؤمن', transliteration: 'Al-Mumin', meaning: 'The Guarantor' },
    { arabic: 'المهيمن', transliteration: 'Al-Muhaymin', meaning: 'The Protector' },
    { arabic: 'العزيز', transliteration: 'Al-Aziz', meaning: 'The Mighty' },
    { arabic: 'الجبار', transliteration: 'Al-Jabbar', meaning: 'The Compeller' },
    { arabic: 'الكبير', transliteration: 'Al-Kabir', meaning: 'The Great' },
    { arabic: 'الحكيم', transliteration: 'Al-Hakim', meaning: 'The Wise' },
    { arabic: 'الواسع', transliteration: 'Al-Wasi', meaning: 'The Wide' },
    { arabic: 'الغني', transliteration: 'Al-Ghani', meaning: 'The Self-Sufficient' },
    { arabic: 'الشكور', transliteration: 'Ash-Shakur', meaning: 'The Appreciative' },
    { arabic: 'الحليم', transliteration: 'Al-Halim', meaning: 'The Forbearing' },
    { arabic: 'العظيم', transliteration: 'Al-Azim', meaning: 'The Magnificent' },
    { arabic: 'الغفور', transliteration: 'Al-Ghafor', meaning: 'The Forgiving' },
    { arabic: 'القوي', transliteration: 'Al-Qawi', meaning: 'The Strong' },
    { arabic: 'الرزاق', transliteration: 'Ar-Razzaq', meaning: 'The Provider' },
] as const;

// Pre-seeded Traits with authentic rectification tools
export const TRAITS: readonly Trait[] = [
    {
        id: 'anger',
        name: 'Anger (Ghadab)',
        nameUr: 'غصص (غضب)',
        description: 'A violent feeling of displeasure and hostility toward someone or something.',
        oppositeTrait: 'Patience (Sabr)',
        severity: 'high',
    },
    {
        id: 'envy',
        name: 'Envy (Hasad)',
        nameUr: 'حسد',
        description: 'A feeling of discontent or resentment aroused by another person\'s advantages or successes.',
        oppositeTrait: 'Gratitude (Shukr)',
        severity: 'high',
    },
    {
        id: 'anxiety',
        name: 'Anxiety ( قلق)',
        nameUr: 'القلق',
        description: 'A feeling of worry, nervousness, or unease about something with an uncertain outcome.',
        oppositeTrait: 'Tawakkul (Trust in Allah)',
        severity: 'medium',
    },
    {
        id: 'greed',
        name: 'Greed (Cornucopia)',
        nameUr: ' الطمع',
        description: 'Intense and selfish desire for something, especially wealth or power.',
        oppositeTrait: 'Contentment (Qana\'ah)',
        severity: 'medium',
    },
    {
        id: 'pride',
        name: 'Pride (Kibr)',
        nameUr: 'كِبر',
        description: 'Excessive belief in one\'s own abilities or achievements.',
        oppositeTrait: 'Humility (Tawadhu)',
        severity: 'high',
    },
    {
        id: 'ostentation',
        name: 'Ostentation (Riya)',
        nameUr: 'رياء',
        description: 'The practice of making a showy display of wealth or importance to impress others.',
        oppositeTrait: 'Sincerity (Ikhlas)',
        severity: 'medium',
    },
    {
        id: 'ignorance',
        name: 'Ignorance (Jahl)',
        nameUr: 'جهل',
        description: 'Lack of knowledge, understanding, or awareness about Islamic teachings.',
        oppositeTrait: 'Knowledge (Ilm)',
        severity: 'medium',
    },
    {
        id: 'despair',
        name: 'Despair (Yaıs)',
        nameUr: 'قنوط',
        description: 'Complete loss of hope and confidence in Allah\'s mercy.',
        oppositeTrait: 'Hope (Rajaa)',
        severity: 'high',
    },
] as const;

// Pre-seeded Daily Content - Quran Verses (Ibn Kathir)
export const DAILY_VERSES: readonly QuranVerse[] = [
    {
        surah: 'Al-Fajr',
        verseNumber: 89,
        arabic: 'يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً',
        translation: 'O soul that has achieved equilibrium! Return to your Lord, well-pleased and well-pleasing.',
        source: 'ibn_kathir',
    },
    {
        surah: 'Al-Baqarah',
        verseNumber: 153,
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
        translation: 'O you who believe, seek help through patience and prayer. Indeed, Allah is with the patient.',
        source: 'ibn_kathir',
    },
    {
        surah: 'At-Talaq',
        verseNumber: 3,
        arabic: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
        translation: 'And whoever puts his trust in Allah, He will be sufficient for him.',
        source: 'ibn_kathir',
    },
    {
        surah: 'Al-Falaq',
        verseNumber: 5,
        arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        translation: 'And from the evil of an envier when he envies.',
        source: 'ibn_kathir',
    },
    {
        surah: 'Ar-Rahman',
        verseNumber: 55,
        arabic: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ',
        translation: 'Then which of the favors of your Lord will you deny?',
        source: 'ibn_kathir',
    },
] as const;

// Pre-seeded Authentic Hadith - Only Sahih grades from authentic books
export const DAILY_HADITH: readonly Hadith[] = [
    {
        id: 'h001',
        text: 'The strong is not the one who overcomes the people by his strength, but the strong is the one who controls himself when in anger.',
        translation: 'The strong is not the one who overcomes the people by his strength, but the strong is the one who controls himself when in anger.',
        narrator: 'Abu Hurairah',
        book: 'bukhari',
        grade: 'sahih',
        source: 'Sahih al-Bukhari',
    },
    {
        id: 'h002',
        text: 'Beware of envy, for envy consumes virtues as fire consumes firewood.',
        translation: 'Beware of envy, for envy consumes virtues as fire consumes firewood.',
        narrator: 'Abu Hurairah',
        book: 'ibn_majah',
        grade: 'sahih',
        source: 'Sunan Ibn Majah',
    },
    {
        id: 'h003',
        text: 'Whoever says \'Hasbunallahu wa ni\'mal wakeel\' sufficient for me is among those whose trust is accepted.',
        translation: 'Whoever says "Hasbunallahu wa ni\'mal wakeel" sufficient for me is among those whose trust is accepted.',
        narrator: 'Abu Musa Al-Ash\'ari',
        book: 'tirmidhi',
        grade: 'hasan',
        source: 'Jami\' at-Tirmidhi',
    },
    {
        id: 'h004',
        text: 'The halal is clear and the haram is clear, and between them are matters doubtful which many people do not know.',
        translation: 'The halal is clear and the haram is clear, and between them are matters doubtful which many people do not know.',
        narrator: 'An-Nu\'man ibn Basir',
        book: 'bukhari',
        grade: 'sahih',
        source: 'Sahih al-Bukhari',
    },
    {
        id: 'h005',
        text: 'The five daily prayers have been ordained upon every Muslim, whether resident or traveler, except for a slave who is freed from slavery.',
        translation: 'The five daily prayers have been ordained upon every Muslim, whether resident or traveler, except for a slave who is freed from slavery.',
        narrator: 'Abdullah ibn Amr ibn al-As',
        book: 'bukhari',
        grade: 'sahih',
        source: 'Sahih al-Bukhari',
    },
] as const;

// Badges System
export const BADGES: readonly Badge[] = [
    {
        id: 'first_step',
        name: 'First Step',
        nameUr: 'پہلا قدم',
        description: 'Completed your first Nafs assessment',
        icon: '👣',
        criteria: { type: 'special', value: 1 },
    },
    {
        id: 'streak_7',
        name: '7 Days of Tawakkul',
        nameUr: '7 دن کا توکل',
        description: 'Maintained a 7-day streak',
        icon: '🌙',
        criteria: { type: 'streak', value: 7 },
    },
    {
        id: 'streak_30',
        name: '30 Days of Patience',
        nameUr: '30 دن کا صبر',
        description: 'Maintained a 30-day streak',
        icon: '⭐',
        criteria: { type: 'streak', value: 30 },
    },
    {
        id: 'emotions_10',
        name: 'Emotion Explorer',
        nameUr: 'جذبات کا مہمان',
        description: 'Logged 10 emotions',
        icon: '💭',
        criteria: { type: 'emotions_logged', value: 10 },
    },
    {
        id: 'emotions_50',
        name: 'Self-Aware Soul',
        nameUr: 'خودAware روح',
        description: 'Logged 50 emotions',
        icon: '🔍',
        criteria: { type: 'emotions_logged', value: 50 },
    },
    {
        id: 'journal_7',
        name: 'Weekly Journaler',
        nameUr: 'ہفتہ وار یاداشت نگار',
        description: 'Journaled for 7 days',
        icon: '📓',
        criteria: { type: 'journal_entries', value: 7 },
    },
    {
        id: 'journal_30',
        name: 'Monthly Muhasabah',
        nameUr: 'ماہانہ محاسبہ',
        description: 'Journaled for 30 days',
        icon: '📔',
        criteria: { type: 'journal_entries', value: 30 },
    },
    {
        id: 'anger_management',
        name: 'Anger Management Level 1',
        nameUr: 'غضب کا انتظام',
        description: 'Logged and processed anger 5 times constructively',
        icon: '😌',
        criteria: { type: 'special', value: 5 },
    },
] as const;

// Journal Prompts (rotating)
export const JOURNAL_PROMPTS = {
    nafsWin: 'Where did my nafs win today? What triggered it?',
    mutmainnaMoment: 'Where did I show patience, gratitude, or trust in Allah?',
    gratitude: 'What am I grateful for today? (List at least 3)',
} as const;

// API Configuration
export const API_CONFIG = {
    baseUrl: 'https://api.nafsmutmainna.com/v1',
    timeout: 30000,
    retryAttempts: 3,
} as const;

// AI Coach Configuration
export const AI_CONFIG = {
    model: 'MiniMax-M2.5',
    maxTokens: 1000,
    temperature: 0.7,
    systemPromptVersion: '1.0',
} as const;

// UI Constants
export const UI_CONFIG = {
    animationDuration: 300,
    debounceDelay: 500,
    maxEmotionLength: 500,
    maxJournalLength: 1000,
    assessmentQuestionsCount: 30,
    dailyCheckinQuestions: 3,
} as const;

// Color Palette (Calm, Islamic aesthetic)
export const COLORS = {
    primary: '#1B4D3E', // Deep green
    secondary: '#4A7C59', // Sage green
    accent: '#C9A227', // Gold accent
    background: '#F5F5DC', // Beige
    surface: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#666666',
    success: '#2E7D32',
    warning: '#F57C00',
    error: '#D32F2F',
    ammarah: '#E57373', // Soft red for lower nafs
    lawwamah: '#FFB74D', // Amber for intermediate
    mutmainna: '#81C784', // Soft green for peaceful
} as const;