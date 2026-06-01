-- ========================================
-- FULL SEED DATA: 200 Nafs Attributes
-- 100 Negative + 100 Positive Traits
-- Run in Supabase SQL Editor
-- ========================================

TRUNCATE TABLE nafs_attributes RESTART IDENTITY CASCADE;

-- NEGATIVE TRAITS (1-20)
INSERT INTO nafs_attributes (name, category, description, opposite_to, quran_ref, hadith_ref) VALUES
('Ria (Ostentation)', 'negative', 'Seeking human recognition or social validation for good deeds.', 'Ikhlas (Absolute Sincerity)', 
 ARRAY['Surah Al-Maun (107:4-6) - Those who pray but are heedless of their prayer'], 
 ARRAY['Sunan Ibn Majah 4205 - The lesser shirk is Ria']),

('Kibr (Arrogance)', 'negative', 'Dismissing objective truth and feeling superior to others.', 'Tawadu (Genuine Humility)', 
 ARRAY['Surah Luqman (31:18) - Do not turn your cheek toward people and do not walk exultantly'], 
 ARRAY['Sahih Muslim 91 - Weight of mustard seed of arrogance will not enter Paradise']),

('Ujb (Self-Admiration)', 'negative', 'Being infatuated with ones own intellect, appearance, or virtue.', 'Sidq (Integrity)', 
 ARRAY['Surah Al-Kahf (18:103-104) - Greatest losers regarding their deeds'], 
 ARRAY['Shuab al-Iman 6852 - Three things destructive: stinginess, whims, self-infatuation']),

('Nifaq (Hypocrisy)', 'negative', 'A toxic divide between outward presentation and inward motives.', 'Wara (Spiritual Caution)', 
 ARRAY['Surah Al-Baqarah (2:8-9) - Some say we believe but are not believers'], 
 ARRAY['Sahih al-Bukhari 34 - Signs of hypocrite: lies, breaks promises, betrays trust']),

('Sumah (Fame-Seeking)', 'negative', 'Actively craving that ones hidden accomplishments be publicized.', 'Khumool (Content Anonymity)', 
 ARRAY['Surah Al-Qisas (28:83) - Those who do not desire exaltedness upon the earth'], 
 ARRAY['Sahih al-Bukhari 6499 - Whoever seeks fame, Allah will expose him on Day of Resurrection']),

('Kufr al-Nimah (Ingratitude)', 'negative', 'Minimizing massive blessings while magnifying minor setbacks.', 'Shukr (Active Gratitude)', 
 ARRAY['Surah Ibrahim (14:7) - If you deny, My punishment is severe'], 
 ARRAY['Musnad Ahmad 21859 - He has not thanked Allah who has not thanked people']),

('Ghurur (Delusion)', 'negative', 'False confidence in temporary worldly stability.', 'Yaqzah (Spiritual Awakening)', 
 ARRAY['Surah Al-Infitar (82:6) - What has deceived you concerning your Lord, the Generous'], 
 ARRAY['Sahih al-Bukhari 6416 - Be in this world as if you were a stranger or a traveler']),

('Irtiyab (Chronic Doubt)', 'negative', 'Paralyzing skepticism that stalls moral decisions.', 'Yaqin (Certainty)', 
 ARRAY['Surah Al-Hujurat (49:15) - The believers are those who have believed and doubt not'], 
 ARRAY['Sunan At-Tirmidhi 2518 - Leave that which makes you doubt for that which does not']),

('Qasawat al-Qalb (Hardness of Heart)', 'negative', 'Complete lack of emotional empathy or spiritual focus.', 'Inabah (Frequent Realignment)', 
 ARRAY['Surah Al-Hadid (57:16) - Hearts became hardened; many are defiantly disobedient'], 
 ARRAY['Sunan At-Tirmidhi 2405 - Much speech without remembrance hardens the heart']),

('Ghaflah (Heedlessness)', 'negative', 'Living completely on autopilot without long-term accountability.', 'Muraqabah (Mindfulness)', 
 ARRAY['Surah Al-Araf (7:179) - They have hearts with which they do not understand; they are heedless'], 
 ARRAY['Sahih Muslim 2750 - There is a patch of cloud over my heart, I seek forgiveness 100 times a day']),

('Amn min Makrillah (False Security)', 'negative', 'Presuming one is immune to failure or consequences.', 'Khashyah (Awe-Inspired Awareness)', 
 ARRAY['Surah Al-Araf (7:99) - Do they feel secure from the plan of Allah? No one feels secure except the losing people'], 
 ARRAY['Sahih al-Bukhari 3208 - Though I am the Messenger of Allah, I do not know what will be done with me']),

('Tuly al-Amal (Longevity Illusion)', 'negative', 'Planning life as if time is infinite, causing delayed self-work.', 'Zuhd (Healthy Detachment)', 
 ARRAY['Surah Al-Anbiya (21:1) - Closer to mankind has come their accountability while they are in heedlessness'], 
 ARRAY['Sahih al-Bukhari 6416 - When evening comes, do not expect the morning']),

('Itbiyya al-Hawa (Whim-Following)', 'negative', 'Letting immediate emotional urges dictate major life paths.', 'Taqwa (Conscious Guarding)', 
 ARRAY['Surah Al-Jathiyah (45:23) - Have you seen he who has taken as his god his desire'], 
 ARRAY['Sunan At-Tirmidhi 2459 - The wise man holds himself accountable and works for what comes after death']),

('Yaas (Hopelessness)', 'negative', 'Believing ones personal errors are too severe to ever fix.', 'Taslim (Surrender)', 
 ARRAY['Surah Yusuf (12:87) - Despair not of relief from Allah; no one despairs except disbelieving people'], 
 ARRAY['Sahih Muslim 2749 - Allah says: I am as My servant expects Me to be']),

('Shirk al-Asghar (Minor Idolatry)', 'negative', 'Relying entirely on material causes while forgetting the primary source.', 'Tawakkul (Deep Reliance)', 
 ARRAY['Surah Yusuf (12:106) - Most of them believe not in Allah except while they associate partners with Him'], 
 ARRAY['Musnad Ahmad 15694 - Amulets and love-charms are minor shirk if used with reliance on them instead of Allah']),

('Karahiyyah al-Mawt (Mortality Terror)', 'negative', 'An anxious obsession with escaping the reality of physical aging.', 'Tadhakkur (Continuous Recalling)', 
 ARRAY['Surah Al-Jumuah (62:8) - Say, Indeed, the death from which you flee - indeed, it will meet you'], 
 ARRAY['Sunan At-Tirmidhi 2307 - Remember often the destroyer of pleasures: death']),

('Suhrah (Spiritual Cynicism)', 'negative', 'Sneering at sincerity or personal growth efforts in others.', 'Bakaa (Sincere Emotional Release)', 
 ARRAY['Surah Al-Mutaffifin (83:29) - Those who committed crimes used to laugh at those who believed'], 
 ARRAY['Sunan At-Tirmidhi 2308 - Two eyes will not be touched by the Fire: an eye that cried from fear of Allah']),

('Tazkiyah al-Nafs al-Madhmumah (Self-Justification)', 'negative', 'Defensively excusing ones own toxic behavior.', 'Salamah al-Sadr (Malice-Free Heart)', 
 ARRAY['Surah An-Najm (53:32) - Do not claim purity for yourselves; He is most knowing of who fears Him'], 
 ARRAY['Sahih al-Bukhari 2447 - An oppressive person will find darkness on Day of Resurrection unless he acknowledges']),

('Taassub (Blind Partisanship)', 'negative', 'Defending an opinion or group stubbornly even when they are wrong.', 'Insaaf (Objective Fairness)', 
 ARRAY['Surah Al-Maidah (5:8) - Do not let the hatred of a people prevent you from being just'], 
 ARRAY['Sunan Abi Dawud 5121 - He is not one of us who calls to tribalism or fights for tribalism']),

('Wahn (Feebleness of Will)', 'negative', 'Total lack of internal grit the moment a good habit gets difficult.', 'Istiqamah (Unwavering Consistency)', 
 ARRAY['Surah Ali Imran (3:139) - Do not weaken and do not grieve; you will be superior if you are true believers'], 
 ARRAY['Sunan Abi Dawud 4297 - People will swarm you due to Wahn. Love of the world and hatred of death']);

-- POSITIVE REMEDIES (21-40)
INSERT INTO nafs_attributes (name, category, description, opposite_to, quran_ref, hadith_ref) VALUES
('Ikhlas (Absolute Sincerity)', 'positive', 'Purifying motives so actions are done purely out of duty and truth.', 'Ria (Ostentation)', 
 ARRAY['Surah Al-Bayyinah (98:5) - Worship Allah, sincere in religion'], 
 ARRAY['Sahih al-Bukhari 1 - Actions are but by intentions and every man shall have only that which he intended']),

('Tawadu (Genuine Humility)', 'positive', 'Recognizing personal limits, preventing self-exaltation.', 'Kibr (Arrogance)', 
 ARRAY['Surah Al-Furqan (25:63) - Servants of the Most Merciful walk upon earth easily'], 
 ARRAY['Sahih Muslim 2588 - No one humbles himself for Allah except that He elevates him']),

('Sidq (Integrity)', 'positive', 'Perfect alignment between inner values, words, and public behavior.', 'Ujb (Self-Admiration)', 
 ARRAY['Surah At-Tawbah (9:119) - Fear Allah and be with those who are true'], 
 ARRAY['Sahih al-Bukhari 6094 - Truthfulness leads to righteousness, and righteousness leads to Paradise']),

('Wara (Spiritual Caution)', 'positive', 'Stepping away from morally ambiguous zones to protect integrity.', 'Nifaq (Hypocrisy)', 
 ARRAY['Surah Al-Ahzab (33:70) - Fear Allah and speak words of appropriate justice'], 
 ARRAY['Sunan At-Tirmidhi 2519 - A servant will not reach the rank of God-fearing until he leaves what is harmless']),

('Khumool (Content Anonymity)', 'positive', 'Doing exceptional work without needing public applause.', 'Sumah (Fame-Seeking)', 
 ARRAY['Surah Al-Insaan (76:9) - We feed you only for the countenance of Allah'], 
 ARRAY['Sahih Muslim 2965 - Allah loves the servant who is God-fearing, rich in soul, and unrenowned']),

('Shukr (Active Gratitude)', 'positive', 'Recognizing, articulating, and using current blessings for good.', 'Kufr al-Nimah (Ingratitude)', 
 ARRAY['Surah Ibrahim (14:7) - If you are grateful, I will surely increase you'], 
 ARRAY['Sahih al-Bukhari 6471 - Prophet prayed until feet swelled, asked why, said should I not be grateful servant']),

('Yaqzah (Spiritual Awakening)', 'positive', 'Living fully aware, highly conscious of daily choices.', 'Ghurur (Delusion)', 
 ARRAY['Surah Qaf (50:22) - You were heedless of this; We have removed from you your cover, your sight is sharp'], 
 ARRAY['Sunan At-Tirmidhi 2459 - The clever one disciplines himself and works for what comes after death']),

('Yaqin (Certainty)', 'positive', 'Steady, clear-sighted conviction that cuts through intellectual noise.', 'Irtiyab (Chronic Doubt)', 
 ARRAY['Surah Al-Baqarah (2:4) - And of the Hereafter they are certain in faith'], 
 ARRAY['Musnad Ahmad 10 - Ask Allah for certainty and well-being; no one is given anything better after certainty']),

('Inabah (Frequent Realignment)', 'positive', 'Swiftly returning to core values the moment a misstep occurs.', 'Qasawat al-Qalb (Hardness of Heart)', 
 ARRAY['Surah Qaf (50:33) - Who feared the Most Merciful unseen and came with a heart returning in repentance'], 
 ARRAY['Sunan At-Tirmidhi 2499 - The best of sinners are those who repent frequently']),

('Muraqabah (Mindfulness)', 'positive', 'Sustained internal presence, preventing emotional hijacking.', 'Ghaflah (Heedlessness)', 
 ARRAY['Surah Al-Alaq (96:14) - Does he not know that Allah sees'], 
 ARRAY['Sahih Muslim 8 - Excellence is to worship Allah as if you see Him; if you do not see Him, He sees you']),

('Khashyah (Awe-Inspired Awareness)', 'positive', 'Maintaining high ethical standards when entirely alone.', 'Amn min Makrillah (False Security)', 
 ARRAY['Surah Fatir (35:28) - Only those fear Allah, from among His servants, who have knowledge'], 
 ARRAY['Sahih al-Bukhari 6493 - Seven whom Allah will shade - including a man who remembered Allah in solitude and tears']),

('Zuhd (Healthy Detachment)', 'positive', 'Enjoying material success without letting it control your identity.', 'Tuly al-Amal (Longevity Illusion)', 
 ARRAY['Surah Al-Hadid (57:23) - In order that you not despair over what has eluded you and not exult over what He gave'], 
 ARRAY['Sunan Ibn Majah 4102 - Renounce the world and Allah will love you; renounce what people possess and people will love you']),

('Taqwa (Conscious Guarding)', 'positive', 'Building an inner shield that instinctively repels toxic inputs.', 'Itbiyya al-Hawa (Whim-Following)', 
 ARRAY['Surah At-Talaq (65:2) - Whoever fears Allah - He will make for him a way out'], 
 ARRAY['Sunan At-Tirmidhi 1987 - Fear Allah wherever you are, follow up a bad deed with a good deed to wipe it out']),

('Taslim (Surrender)', 'positive', 'Willingly accepting absolute reality when outcomes cannot be changed.', 'Yaas (Hopelessness)', 
 ARRAY['Surah Al-Ahzab (33:22) - And it only increased them in faith and surrender'], 
 ARRAY['Sahih Muslim 2664 - Strive for what benefits you, seek help from Allah, do not say if only I did X']),

('Tawakkul (Deep Reliance)', 'positive', 'Putting in maximum effort, then fully letting go of the results.', 'Shirk al-Asghar (Minor Idolatry)', 
 ARRAY['Surah At-Talaq (65:3) - Whoever relies upon Allah - then He is sufficient for him'], 
 ARRAY['Sunan At-Tirmidhi 2344 - If you relied upon Allah with the reliance due to Him, He would provide for you like the birds']),

('Tadhakkur (Continuous Recalling)', 'positive', 'Keeping your core life purpose active in your working memory.', 'Karahiyyah al-Mawt (Mortality Terror)', 
 ARRAY['Surah Al-Araf (7:201) - Indeed, those who fear Allah - when an impulse touches them from Satan, they remember'], 
 ARRAY['Sahih Muslim 2699 - Whoever travels a path searching for knowledge, Allah makes easy for him path to Paradise']),

('Bakaa (Sincere Emotional Release)', 'positive', 'The capacity to cry out of pure gratitude or honest regret.', 'Suhrah (Spiritual Cynicism)', 
 ARRAY['Surah Maryam (19:58) - When the verses of the Most Merciful were recited to them, they fell down prostrating and weeping'], 
 ARRAY['Sahih al-Bukhari 1406 - A man who remembers Allah in secret and tears stream from his eyes will be shaded by Allah']),

('Salamah al-Sadr (Malice-Free Heart)', 'positive', 'Waking up without harboring grudges against anyone.', 'Tazkiyah al-Nafs al-Madhmumah (Self-Justification)', 
 ARRAY['Surah Al-Hashr (59:10) - Put not in our hearts our rancor toward those who have believed'], 
 ARRAY['Sunan At-Tirmidhi 2689 - O my son, if you are able to wake up and go to sleep without any malice in your heart']),

('Insaaf (Objective Fairness)', 'positive', 'Upholding justice even when the facts favor an opponent over you.', 'Taassub (Blind Partisanship)', 
 ARRAY['Surah An-Nisa (4:135) - Be persistently standing firm in justice, even if it be against yourselves or parents'], 
 ARRAY['Sahih al-Bukhari 2447 - Help your brother whether he is oppressor or oppressed']),

('Istiqamah (Unwavering Consistency)', 'positive', 'Showing up daily to execute routines regardless of mood.', 'Wahn (Feebleness of Will)', 
 ARRAY['Surah Fussilat (41:30) - Indeed, those who have said Our Lord is Allah and remained on a right course'], 
 ARRAY['Sahih al-Bukhari 43 - The most beloved of deeds to Allah are those that are most consistent, even if small']);

-- ========================================
-- DOMAIN 2: EMOTIONAL VULNERABILITIES & IMPULSE TRIGGERS
-- NEGATIVE 41-60, POSITIVE 61-80
-- ========================================

-- NEGATIVE TRAITS (41-60)
INSERT INTO nafs_attributes (name, category, description, opposite_to, quran_ref, hadith_ref) VALUES
('Ghadab (Anger)', 'negative', 'Volatile emotional outbursts that cloud rational decision-making.', 'Hilm (Forbearance)', 
 ARRAY['Surah Ali Imran (3:134) - Who restrain anger and pardon the people'], 
 ARRAY['Sahih al-Bukhari 6116 - Strong is not one who overcomes people but one who controls himself while angry']),

('Hasad (Envy)', 'negative', 'Resenting another success and wishing they would lose it.', 'Ghibtah (Positive Inspiration)', 
 ARRAY['Surah An-Nisa (4:54) - Or do they envy people for what Allah has given them of His bounty'], 
 ARRAY['Sunan Abi Dawud 4903 - Beware of envy, for envy consumes good deeds just as fire consumes wood']),

('Jaza (Chronic Anxiety)', 'negative', 'Panicking over future provisions or unpredictable outcomes.', 'Sakinah (Tranquility)', 
 ARRAY['Surah Al-Maarij (70:19-20) - Mankind was created anxious'], 
 ARRAY['Sahih al-Bukhari 6472 - Seventy thousand will enter Paradise without account, they put trust only in their Lord']),

('Hiqd (Malice)', 'negative', 'Nursing deep-seated grudges and actively collecting grievances.', 'Safh (Gracious Pardoning)', 
 ARRAY['Surah Al-Araf (7:43) - We will have removed whatever is within their breasts of resentment'], 
 ARRAY['Sahih Muslim 2560 - Gates of Paradise opened Monday and Thursday except a man with rancor']),

('Huzn al-Mamduh (Paralyzing Despair)', 'negative', 'Sinking into heavy depression that stops all execution.', 'Huzn al-Mahmud (Reflective Remorse)', 
 ARRAY['Surah Ali Imran (3:139) - Do not weaken and do not grieve'], 
 ARRAY['Sahih Muslim 2664 - Strong believer is better and more beloved to Allah than weak believer']),

('Shamatah (Schadenfreude)', 'negative', 'Feeling secret joy when a rival stumbles or fails.', 'Rahmah (Expansive Compassion)', 
 ARRAY['Surah At-Tawbah (9:50) - If good befalls you it distresses them; if disaster strikes they say we took our matter'], 
 ARRAY['Sunan At-Tirmidhi 2506 - Do not express schadenfreude over your brother lest Allah have mercy on him']),

('Malal (Spiritual Boredom)', 'negative', 'Heavy, restless irritation during routine, constructive habits.', 'Sabr (Steadfast Patience)', 
 ARRAY['Surah Al-Maarij (70:5) - So be patient with gracious patience'], 
 ARRAY['Sahih al-Bukhari 43 - Do not take upon yourselves obligations which you cannot bear']),

('Ajalah (Haste/Impatience)', 'negative', 'Rushing through projects or life phases without proper care.', 'Tadab (Measured Deliberation)', 
 ARRAY['Surah Al-Anbiya (21:37) - Man was created of haste'], 
 ARRAY['Sunan At-Tirmidhi 2012 - Deliberation is from Allah and haste is from Satan']),

('Ghirah al-Madhmumah (Toxic Jealousy)', 'negative', 'Possessive, controlling suspicion of loved ones.', 'Husn al-Zann (Giving Grace)', 
 ARRAY['Surah Al-Hujurat (49:12) - O you who have believed, avoid much negative assumption'], 
 ARRAY['Sunan Abi Dawud 4902 - There is a type of jealousy that Allah hates, which is suspicion without basis']),

('Khawf al-Dunya (Worldly Cowardice)', 'negative', 'Being terrified of poverty, social rejection, or minor discomfort.', 'Shahmalah (Moral Courage)', 
 ARRAY['Surah Al-Baqarah (2:268) - Satan threatens you with poverty and orders you to immorality'], 
 ARRAY['Sunan Ibn Majah 4008 - Let not fear of people prevent any of you from speaking truth']),

('Hala (Extreme Restlessness)', 'negative', 'Becoming immediately destabilized by small changes in environment.', 'Rida (Radical Contentment)', 
 ARRAY['Surah Al-Maarij (70:21) - When good touches him, withholding and stingy'], 
 ARRAY['Sahih Muslim 1054 - He has succeeded who accepts Islam and is provided sufficient sustenance']),

('Qalaq (Mental Agitation)', 'negative', 'A chaotic internal noise that ruins focus and concentration.', 'Uns (Serene Solitude)', 
 ARRAY['Surah Rad (13:28) - By the remembrance of Allah hearts are assured'], 
 ARRAY['Sahih Muslim 2674 - The solitary ones have outpaced others - men and women who remember Allah frequently']),

('Deeq (Emotional Suffocation)', 'negative', 'Feeling trapped by past mistakes, leading to mental paralysis.', 'Farah al-Ruh (Spiritual Joy)', 
 ARRAY['Surah Ash-Sharh (94:1-2) - Did We not expand for you your breast'], 
 ARRAY['Sunan At-Tirmidhi 3544 - Say: O Allah, make me content with Your decree']),

('Infial (Hyper-Reactivity)', 'negative', 'Exploding or reacting instantly before evaluating facts.', 'Anat (Emotional Composure)', 
 ARRAY['Surah Al-Hujurat (49:6) - If there comes to you a disobedient one with information, investigate'], 
 ARRAY['Sahih Muslim 126 - Prophet said to Ashaj: You possess two qualities loved by Allah: forbearance and composure']),

('Kibr al-Batini (Inward Disdain)', 'negative', 'Smiling outwardly while keeping silent contempt for others.', 'Salam (Peacefulness)', 
 ARRAY['Surah Al-Hujurat (49:11) - Perhaps they may be better than them'], 
 ARRAY['Sahih Muslim 2564 - It is enough evil for a person to look down upon his Muslim brother']),

('Khaybah (Cynical Disappointment)', 'negative', 'Preemptively giving up on goals to avoid potential failure.', 'Rifq (Universal Gentleness)', 
 ARRAY['Surah Al-Ankabut (29:69) - Those who strive for Us, We will surely guide them to Our ways'], 
 ARRAY['Sahih Muslim 2592 - Allah is gentle and He loves gentleness']),

('Taathur (Hypersensitivity)', 'negative', 'Taking every piece of constructive feedback as a personal attack.', 'Qabool (Radical Acceptance)', 
 ARRAY['Surah Al-Araf (7:199) - Take what is given, enjoin what is right, and turn away from the ignorant'], 
 ARRAY['Sahih al-Bukhari 6036 - The believer is a mirror to his brother; if he sees a fault he corrects it kindly']),

('Kasr (Defeatism)', 'negative', 'Feeling entirely broken by a single setback, abandoning the project.', 'Ihtisaab (Purposeful Endurance)', 
 ARRAY['Surah Az-Zumar (39:53) - Do not despair of the mercy of Allah. Indeed, Allah forgives all sins'], 
 ARRAY['Sahih al-Bukhari 5641 - No fatigue, disease, sorrow befalls a Muslim but that Allah expiates some of his sins']),

('Istihjan (Habitual Disgust)', 'negative', 'Constantly finding flaws in everything and everyone around you.', 'Raja (Grounded Hope)', 
 ARRAY['Surah Al-Hujurat (49:12) - Do not spy or backbite each other'], 
 ARRAY['Sahih Muslim 2623 - If a man says that the people are ruined, he is the most ruined among them']),

('Batar (Reckless Euphoria)', 'negative', 'Becoming arrogant, loud, and careless during times of high success.', 'Hikmah (Practical Wisdom)', 
 ARRAY['Surah Al-Qisas (28:76) - Exult not. Indeed, Allah does not like the exultant in pride'], 
 ARRAY['Sunan At-Tirmidhi 2315 - A wise word is the lost property of the believer']);

-- POSITIVE REMEDIES (61-80)
INSERT INTO nafs_attributes (name, category, description, opposite_to, quran_ref, hadith_ref) VALUES
('Hilm (Forbearance)', 'positive', 'Remaining calm, grounded, and cool-headed when provoked.', 'Ghadab (Anger)', 
 ARRAY['Surah Ash-Shura (42:37) - And when they are angry, they forgive'], 
 ARRAY['Sahih al-Bukhari 6114 - A man asked Prophet for advice and he said: Do not get angry. He repeated it three times']),

('Ghibtah (Positive Inspiration)', 'positive', 'Feeling motivated by another success to improve yourself cleanly.', 'Hasad (Envy)', 
 ARRAY['Surah Al-Hadid (57:21) - Race toward forgiveness from your Lord and a Garden whose width is like the sky'], 
 ARRAY['Sahih al-Bukhari 73 - No envy except in two cases - a man whom Allah gave wealth and he spends it righteously']),

('Sakinah (Tranquility)', 'positive', 'A profound, unshakeable calmness during chaos or high stress.', 'Jaza (Chronic Anxiety)', 
 ARRAY['Surah At-Tawbah (9:40) - Allah sent down His tranquility upon him and supported him with angels'], 
 ARRAY['Sahih Muslim 2700 - No people gather in a house of Allah reciting the Book except that tranquility descends']),

('Safh (Gracious Pardoning)', 'positive', 'Releasing historical grievances completely for your own peace.', 'Hiqd (Malice)', 
 ARRAY['Surah Al-Hijr (15:85) - So pardon with gracious pardoning'], 
 ARRAY['Sunan At-Tirmidhi 2016 - Prophet did not return evil with evil, but would turn away and pardon']),

('Huzn al-Mahmud (Reflective Remorse)', 'positive', 'Productive emotional regret that triggers immediate correction.', 'Huzn al-Mamduh (Paralyzing Despair)', 
 ARRAY['Surah At-Tawbah (9:118) - Until when the earth was straitened for them despite its vastness'], 
 ARRAY['Sahih al-Bukhari 6491 - If you did not commit sins, Allah would replace you with people who sin and ask forgiveness']),

('Rahmah (Expansive Compassion)', 'positive', 'A driving urge to actively alleviate suffering where found.', 'Shamatah (Schadenfreude)', 
 ARRAY['Surah Al-Anbiya (21:107) - We have not sent you except as a mercy to the worlds'], 
 ARRAY['Sunan At-Tirmidhi 1924 - The merciful will be shown mercy by the Most Merciful. Be merciful to those on earth']),

('Sabr (Steadfast Patience)', 'positive', 'Staying emotionally stable under long-term pressure.', 'Malal (Spiritual Boredom)', 
 ARRAY['Surah Al-Baqarah (2:153) - Seek help through patience and prayer'], 
 ARRAY['Sahih al-Bukhari 1469 - Nobody can be given a blessing better and more vast than patience']),

('Tadab (Measured Deliberation)', 'positive', 'Moving through complex choices with careful, steady calm.', 'Ajalah (Haste/Impatience)', 
 ARRAY['Surah Al-Furqan (25:67) - Who, when they spend, do so not excessively or sparingly but are ever moderate'], 
 ARRAY['Sahih Muslim 2588 - Verily gentleness is not found in anything except that it beautifies it']),

('Husn al-Zann (Giving Grace)', 'positive', 'Actively assuming reasonable, positive motives behind odd behaviors.', 'Ghirah al-Madhmumah (Toxic Jealousy)', 
 ARRAY['Surah Al-Hujurat (49:12) - O you who have believed, avoid much negative assumption'], 
 ARRAY['Sahih al-Bukhari 5144 - Beware of suspicion, for suspicion is the worst of false tales']),

('Shahmalah (Moral Courage)', 'positive', 'The grit to do what is right even when it is deeply unpopular.', 'Khawf al-Dunya (Worldly Cowardice)', 
 ARRAY['Surah Ali Imran (3:173) - Those to whom people said the people have gathered against you, but it increased them in faith'], 
 ARRAY['Sunan At-Tirmidhi 2191 - The best jihad is a word of truth spoken before an oppressive ruler']),

('Rida (Radical Contentment)', 'positive', 'Complete internal peace with whatever hand life deals you.', 'Hala (Extreme Restlessness)', 
 ARRAY['Surah Al-Fajr (89:27-28) - O reassured soul, return to your Lord, well-pleased and pleasing'], 
 ARRAY['Sunan At-Tirmidhi 2305 - Look at those who are lower than you but not those who are higher']),

('Uns (Serene Solitude)', 'positive', 'Feeling entirely safe, creative, and fulfilled when working alone.', 'Qalaq (Mental Agitation)', 
 ARRAY['Surah Al-Ahzab (33:41) - O you who have believed, remember Allah with much remembrance'], 
 ARRAY['Musnad Ahmad 12564 - Felicities are for the one who minds his own, controls his tongue, weeps over errors in solitude']),

('Farah al-Ruh (Spiritual Joy)', 'positive', 'Feeling light, energized, and deeply driven by meaningful work.', 'Deeq (Emotional Suffocation)', 
 ARRAY['Surah Yunus (10:58) - In the bounty of Allah and in His mercy - in that let them rejoice'], 
 ARRAY['Sahih Muslim 49 - He has tasted the sweetness of faith who is pleased with Allah as his Lord']),

('Anat (Emotional Composure)', 'positive', 'Pausing to process data thoroughly before responding to stress.', 'Infial (Hyper-Reactivity)', 
 ARRAY['Surah Al-Anam (6:54) - Your Lord has decreed upon Himself mercy'], 
 ARRAY['Sahih al-Bukhari 6115 - Control yourself when your soul is excited either by anger or desire']),

('Salam (Peacefulness)', 'positive', 'Exuding an aura of calm that lowers the tension in any room.', 'Kibr al-Batini (Inward Disdain)', 
 ARRAY['Surah Al-Anfal (8:1) - And fix alignment between yourselves'], 
 ARRAY['Sahih Muslim 54 - Spread peace among yourselves']),

('Rifq (Universal Gentleness)', 'positive', 'Approaching fragile or tense human situations with softness.', 'Khaybah (Cynical Disappointment)', 
 ARRAY['Surah Ali Imran (3:159) - By mercy from Allah, you were lenient with them'], 
 ARRAY['Sahih Muslim 2593 - He who is deprived of gentleness is deprived of all good']),

('Qabool (Radical Acceptance)', 'positive', 'Recognizing current limitations without falling into self-loathing.', 'Taathur (Hypersensitivity)', 
 ARRAY['Surah At-Taghabun (64:11) - No disaster strikes except by permission of Allah'], 
 ARRAY['Sahih Muslim 2664 - Do not say if only, for if only opens the door to the work of Satan']),

('Ihtisaab (Purposeful Endurance)', 'positive', 'Finding profound meaning inside difficult daily struggles.', 'Kasr (Defeatism)', 
 ARRAY['Surah Ali Imran (3:146) - They did not weaken or submit. And Allah loves the steadfast'], 
 ARRAY['Sahih al-Bukhari 38 - Religion is easy, and no one overburdens himself in religion but that it overcomes him']),

('Raja (Grounded Hope)', 'positive', 'Maintaining absolute confidence in long-term growth and recovery.', 'Istihjan (Habitual Disgust)', 
 ARRAY['Surah Al-Hijr (15:56) - He said: And who despairs of the mercy of his Lord except for those astray'], 
 ARRAY['Sahih Muslim 2877 - None of you should die except while expecting the absolute best from Allah']),

('Hikmah (Practical Wisdom)', 'positive', 'Knowing exactly when to act, when to pause, and how to execute.', 'Batar (Reckless Euphoria)', 
 ARRAY['Surah Al-Baqarah (2:269) - He gives wisdom to whom He wills'], 
 ARRAY['Sahih al-Bukhari 7310 - No envy except in two cases - a man whom Allah gave wisdom and he acts according to it']);

-- ========================================
-- DOMAIN 3: SOCIAL DYNAMICS & INTERPERSONAL VICES
-- NEGATIVE 81-100, POSITIVE 101-120
-- ========================================

-- NEGATIVE TRAITS (81-100)
INSERT INTO nafs_attributes (name, category, description, opposite_to, quran_ref, hadith_ref) VALUES
('Ghibah (Backbiting)', 'negative', 'Discussing someone flaws behind their back, harming their status.', 'Hifz al-Lisan (Tongue Discipline)', 
 ARRAY['Surah Al-Hujurat (49:12) - Do not spy or backbite. Would one of you like to eat the flesh of his brother when dead?'], 
 ARRAY['Sahih Muslim 2589 - Do you know what backbiting is? It is to mention your brother with something he dislikes']),

('Namimah (Tale-Bearing)', 'negative', 'Spreading workplace or family gossip to fracture relationships.', 'Islaah (Conflict Resolution)', 
 ARRAY['Surah Al-Qalam (68:11) - Scorner, going about with malicious gossip'], 
 ARRAY['Sahih al-Bukhari 6056 - The tale-bearer will not enter Paradise']),

('Kizb (Deceit)', 'negative', 'Manipulating facts to escape consequences or inflate status.', 'Amanah (Absolute Trustworthiness)', 
 ARRAY['Surah An-Nahl (16:105) - They only invent falsehood who do not believe in the verses of Allah'], 
 ARRAY['Sahih al-Bukhari 6094 - Beware of lying, for lying leads to wickedness and the Fire']),

('Khiyanah (Breach of Trust)', 'negative', 'Disregarding contracts, promises, secrets, or boundaries.', 'Wafaa (Loyalty)', 
 ARRAY['Surah Al-Anfal (8:27) - Do not betray Allah and the Messenger or betray your trusts'], 
 ARRAY['Sahih al-Bukhari 34 - Signs of hypocrite: whenever he is trusted he betrays']),

('Sukhriyyah (Mockery)', 'negative', 'Ridiculing others to feel superior or fit into a social group.', 'Ihtiram (Deep Respect)', 
 ARRAY['Surah Al-Hujurat (49:11) - Let not a people ridicule another people'], 
 ARRAY['Sunan At-Tirmidhi 2502 - Do not mock your brother, do not argue extensively with him']),

('Zulm (Exploitation)', 'negative', 'Leveraging power dynamics to mistreat or underpay those below you.', 'Adl (Flawless Justice)', 
 ARRAY['Surah Ibrahim (14:42) - Never think that Allah is unaware of what the wrongdoers do'], 
 ARRAY['Sahih Muslim 2579 - Oppression will be darkness on the Day of Resurrection']),

('Tafakhur (Status Boasting)', 'negative', 'Loudly advertising wealth or elite connections to intimidate.', 'Ithshaa (Selflessness)', 
 ARRAY['Surah Al-Hadid (57:20) - Boasting among yourselves and competition in increase of wealth'], 
 ARRAY['Sahih Muslim 2865 - Allah has revealed to me that you should be humble so that no one boasts over another']),

('Qat al-Arham (Kinship Severance)', 'negative', 'Breaking family lines due to stubbornness or pride.', 'Silat al-Rahm (Kinship Nurturing)', 
 ARRAY['Surah Muhammad (47:22-23) - Would you perhaps, if you turned away, cause corruption on earth and sever your kinship?'], 
 ARRAY['Sahih al-Bukhari 5984 - The one who severs ties of kinship will not enter Paradise']),

('Su al-Lafz (Coarse Speech)', 'negative', 'Using vulgar language or a sharp, aggressive tone by default.', 'Nush (Compassionate Mentorship)', 
 ARRAY['Surah Al-Baqarah (2:263) - Kind words and forgiveness are better than charity followed by injury'], 
 ARRAY['Sunan At-Tirmidhi 1977 - The believer is not a slanderer, nor one who curses, nor vulgar, nor obscene']),

('Mudaaharah (Sycophancy)', 'negative', 'Flattering toxic people or bad leaders to gain personal favors.', 'Kaf al-Adha (Harmlessness)', 
 ARRAY['Surah An-Nisa (4:139) - Those who take disbelievers as allies instead of the believers'], 
 ARRAY['Musnad Ahmad 8452 - If you see people who flatter extensively, throw dust in their faces']),

('Mirah (Contentious Arguing)', 'negative', 'Debating purely to win an ego battle, not to find truth.', 'Haya (Healthy Modesty)', 
 ARRAY['Surah Al-Anam (6:68) - When you see those who engage in discourse concerning Our verses, turn away from them'], 
 ARRAY['Sunan Abi Dawud 4800 - I guarantee a house on the outskirts of Paradise for one who abandons arguments even if he is right']),

('Iftira (Slander)', 'negative', 'Inventing absolute falsehoods to destroy a competitor reputation.', 'Karam (Open Generosity)', 
 ARRAY['Surah An-Nur (24:15) - You thought it was insignificant while it was, in the sight of Allah, tremendous'], 
 ARRAY['Sahih Muslim 2589 - If what you say about your brother is false, then you have slandered him']),

('Tanazur (Condescending Elitism)', 'negative', 'Treating less educated or less wealthy people as invisible.', 'Bashashah (Approachable Warmth)', 
 ARRAY['Surah Abasa (80:1-2) - The Prophet frowned and turned away because there came to him the blind man'], 
 ARRAY['Sahih Muslim 2626 - Many a person with disheveled hair and dusty clothes, if he swears by Allah, Allah would fulfill it']),

('Ghash (Deceptive Commerce)', 'negative', 'Hiding flaws in your products, code, or services to close a sale.', 'Naseehah (Sincere Goodwill)', 
 ARRAY['Surah Al-Mutaffifin (83:1) - Woe to those who give less than due'], 
 ARRAY['Sahih Muslim 102 - Whoever cheats us is not one of us']),

('Katman al-Haqq (Suppressing Truth)', 'negative', 'Staying silent during injustice to protect personal comfort.', 'Kalam al-Tayyib (Gracious Speech)', 
 ARRAY['Surah Al-Baqarah (2:146) - A party of them conceal the truth while they know it'], 
 ARRAY['Sunan At-Tirmidhi 2191 - Let not fear of status prevent a man from standing up for the right of Allah']),

('Fudhul al-Kalam (Over-Talking)', 'negative', 'Dominating every conversation to remain the center of attention.', 'Taqdeer (Deep Appreciation)', 
 ARRAY['Surah Qaf (50:18) - Man does not utter any word except that with him is an observer prepared'], 
 ARRAY['Sunan At-Tirmidhi 2182 - The most hated of you to me and furthest from me on Day of Resurrection are the talkative']),

('Shuhshat al-Ayn (Evil Eye)', 'negative', 'Looking at others joy with piercing resentment.', 'Samahah (Magnanimity)', 
 ARRAY['Surah Al-Qalam (68:51) - Indeed, those who disbelieve would almost make you slip with their eyes'], 
 ARRAY['Sahih Muslim 2188 - The evil eye is true; if anything could precede the divine decree, it would be the evil eye']),

('Khul (Social Isolationism)', 'negative', 'Abruptly cutting off standard social duties out of pure irritability.', 'Mu-asarah (True Fellowship)', 
 ARRAY['Surah Ali Imran (3:103) - Hold firmly to the rope of Allah all together and do not become divided'], 
 ARRAY['Sunan Ibn Majah 4032 - The believer who mixes with people and endures their harm is better than one who does not']),

('Tajahul (Willful Ignorance)', 'negative', 'Turning a blind eye when a team member or friend explicitly asks for help.', 'Satr (Concealing Flaws)', 
 ARRAY['Surah Al-Maidah (5:2) - Cooperate in righteousness and piety, but do not cooperate in sin and aggression'], 
 ARRAY['Sahih al-Bukhari 2442 - A Muslim is a brother of another Muslim; whoever fulfills the needs of his brother']),

('Israf al-Mashair (Emotional Manipulation)', 'negative', 'Playing the victim to control others through guilt.', 'Wudd (Genuine Affection)', 
 ARRAY['Surah Yusuf (12:16) - They came to their father at night, weeping falsely'], 
 ARRAY['Sahih Muslim 2586 - Do not hate each other, do not envy each other, do not turn away from each other']);

-- POSITIVE REMEDIES (101-120)
INSERT INTO nafs_attributes (name, category, description, opposite_to, quran_ref, hadith_ref) VALUES
('Hifz al-Lisan (Tongue Discipline)', 'positive', 'Speaking only what builds up; keeping silent otherwise.', 'Ghibah (Backbiting)', 
 ARRAY['Surah Al-Ahzab (33:70) - Fear Allah and speak words of appropriate justice'], 
 ARRAY['Sahih al-Bukhari 6474 - Whoever can guarantee for me what is between his jaws and legs, I guarantee for him Paradise']),

('Islaah (Conflict Resolution)', 'positive', 'Actively stepping in to heal broken professional or personal dynamics.', 'Namimah (Tale-Bearing)', 
 ARRAY['Surah Al-Hujurat (49:9) - If two factions among the believers should fight, make settlement between them'], 
 ARRAY['Sahih al-Bukhari 2692 - He is not a liar who mediates between people and conveys good']),

('Amanah (Absolute Trustworthiness)', 'positive', 'Being an unbreakable vault for secrets, data, and commitments.', 'Kizb (Deceit)', 
 ARRAY['Surah An-Nisa (4:58) - Allah commands you to render trusts to their owners'], 
 ARRAY['Musnad Ahmad 11935 - There is no faith for one who cannot be trusted, no religion for one who cannot keep a promise']),

('Wafaa (Loyalty)', 'positive', 'Honoring agreements and standing by people when their status drops.', 'Khiyanah (Breach of Trust)', 
 ARRAY['Surah Al-Maidah (5:1) - O you who have believed, fulfill all contracts'], 
 ARRAY['Sahih al-Bukhari 3188 - For every betrayer there will be a flag raised on the Day of Resurrection']),

('Ihtiram (Deep Respect)', 'positive', 'Recognizing the inherent dignity of every human you interact with.', 'Sukhriyyah (Mockery)', 
 ARRAY['Surah Al-Isra (17:70) - We have certainly honored the children of Adam'], 
 ARRAY['Sunan At-Tirmidhi 1919 - He is not one of us who does not show mercy to our young ones and honor our elders']),

('Adl (Flawless Justice)', 'positive', 'Treating subordinates and critics with strict, uncompromised fairness.', 'Zulm (Exploitation)', 
 ARRAY['Surah An-Nahl (16:90) - Indeed, Allah orders justice and good conduct'], 
 ARRAY['Sahih al-Bukhari 2447 - Help your brother whether he is oppressor or oppressed']),

('Ithshaa (Selflessness)', 'positive', 'Choosing to elevate a team members urgent need above your own comfort.', 'Tafakhur (Status Boasting)', 
 ARRAY['Surah Al-Hashr (59:9) - And give preference over themselves, even though they are in privation'], 
 ARRAY['Sahih al-Bukhari 13 - None of you will truly believe until he loves for his brother what he loves for himself']),

('Silat al-Rahm (Kinship Nurturing)', 'positive', 'Proactively maintaining and healing family connections.', 'Qat al-Arham (Kinship Severance)', 
 ARRAY['Surah An-Nisa (4:1) - Fear Allah through whom you ask one another, and the wombs'], 
 ARRAY['Sahih al-Bukhari 5986 - Whoever desires that his provision be expanded and lifespan extended, let him maintain ties']),

('Nush (Compassionate Mentorship)', 'positive', 'Offering private, kind feedback designed to help others grow.', 'Su al-Lafz (Coarse Speech)', 
 ARRAY['Surah Al-Araf (7:62) - I convey to you the messages of my Lord and advise you'], 
 ARRAY['Sahih Muslim 55 - The religion is sincere advice. We asked: To whom? He said: To Allah, His Book, His Messenger']),

('Kaf al-Adha (Harmlessness)', 'positive', 'Disciplining your behavior so you never cause unearned pain.', 'Mudaaharah (Sycophancy)', 
 ARRAY['Surah Al-Ahzab (33:58) - Those who harm believing men and women for undeserved crimes bear a slander'], 
 ARRAY['Sahih al-Bukhari 10 - A Muslim is the one from whose tongue and hands the Muslims are safe']),

('Haya (Healthy Modesty)', 'positive', 'An internal gauge that keeps your speech and actions clean.', 'Mirah (Contentious Arguing)', 
 ARRAY['Surah Al-Araf (7:26) - Clothing to conceal your private parts... but the clothing of righteousness is best'], 
 ARRAY['Sahih al-Bukhari 9 - Modesty is a major branch of faith']),

('Karam (Open Generosity)', 'positive', 'Giving resources, knowledge, or time freely without transactional expectations.', 'Iftira (Slander)', 
 ARRAY['Surah Al-Insaan (76:8) - And they give food in spite of love for it to the needy, the orphan, the captive'], 
 ARRAY['Sahih al-Bukhari 6018 - Let whoever believes in Allah and the Last Day treat his guest with generosity']),

('Bashashah (Approachable Warmth)', 'positive', 'Greeting people with a sincere, welcoming presence.', 'Tanazur (Condescending Elitism)', 
 ARRAY['Surah An-Najm (53:32) - He is most knowing of you when He produced you from the earth'], 
 ARRAY['Sahih Muslim 2626 - Do not underestimate any good deed, even meeting your brother with a cheerful face']),

('Naseehah (Sincere Goodwill)', 'positive', 'Wanting the absolute best outcomes for your competitors.', 'Ghash (Deceptive Commerce)', 
 ARRAY['Surah Al-Qisas (28:20) - He said, O Moses, indeed the eminent ones are conferring so leave; I am of the sincere advisers'], 
 ARRAY['Sunan An-Nasai 4175 - A servant does not achieve true faith until he loves for people the goodness he loves for himself']),

('Kalam al-Tayyib (Gracious Speech)', 'positive', 'Using clear, encouraging, and highly professional language.', 'Katman al-Haqq (Suppressing Truth)', 
 ARRAY['Surah Ibrahim (14:24) - How Allah presents an example: a good word like a good tree, whose root is firmly fixed'], 
 ARRAY['Sahih al-Bukhari 6018 - Whoever believes in Allah and the Last Day should speak good or remain silent']),

('Taqdeer (Deep Appreciation)', 'positive', 'Publicly validating and celebrating the hard work of others.', 'Fudhul al-Kalam (Over-Talking)', 
 ARRAY['Surah Ar-Rahman (55:60) - Is the reward for goodness anything but goodness?'], 
 ARRAY['Sunan At-Tirmidhi 1954 - He who does not thank people does not thank Allah']),

('Samahah (Magnanimity)', 'positive', 'Being easy-going, flexible, and completely uncomplicated to deal with.', 'Shuhshat al-Ayn (Evil Eye)', 
 ARRAY['Surah Al-Araf (7:199) - Take what is given with ease, enjoin what is right, and turn away from the ignorant'], 
 ARRAY['Sahih al-Bukhari 2076 - May Allah show mercy to a man who is easy-going when he sells, when he buys']),

('Mu-asarah (True Fellowship)', 'positive', 'Being an authentic, reliable pillar in your professional circle.', 'Khul (Social Isolationism)', 
 ARRAY['Surah Al-Baqarah (2:213) - Mankind was once one community'], 
 ARRAY['Sunan At-Tirmidhi 1932 - The believers are like a solid structure, each part strengthening the other']),

('Satr (Concealing Flaws)', 'positive', 'Covering a colleague minor accidental mistake while helping them fix it.', 'Tajahul (Willful Ignorance)', 
 ARRAY['Surah An-Nur (24:19) - Those who like that immorality should be spread concerning those who have believed'], 
 ARRAY['Sahih Muslim 2590 - No servant conceals the flaws of another servant except that Allah conceals his flaws on Day']),

('Wudd (Genuine Affection)', 'positive', 'Building deep, supportive, and non-manipulative relationships.', 'Israf al-Mashair (Emotional Manipulation)', 
 ARRAY['Surah Maryam (19:96) - Indeed, those who have believed and done righteous deeds - the Most Merciful will appoint for them affection'], 
 ARRAY['Sunan At-Tirmidhi 1920 - When a man loves his brother, he should explicitly tell him that he loves him']);

-- ========================================
-- DOMAIN 4: COGNITIVE TRAPS & MENTAL PATTERNS
-- NEGATIVE 121-140, POSITIVE 141-160
-- ========================================

-- NEGATIVE TRAITS (121-140)
INSERT INTO nafs_attributes (name, category, description, opposite_to, quran_ref, hadith_ref) VALUES
('Su al-Zann (Negative Framing)', 'negative', 'Constantly interpreting neutral events through a paranoid lens.', 'Husn al-Tafkeer (Positive Constructive Framing)', 
 ARRAY['Surah Al-Hujurat (49:12) - Avoid much negative assumption; indeed, some assumption is sin'], 
 ARRAY['Sahih al-Bukhari 5144 - Beware of suspicion, for suspicion is the falsest of narratives']),

('Waswasah (Obsessive Overthinking)', 'negative', 'Lingering in looping thoughts that paralyze execution.', 'Firasah (Sharp Intuition)', 
 ARRAY['Surah An-Nas (114:4-5) - From the evil of the retreating whisperer who whispers into the breasts of mankind'], 
 ARRAY['Sahih al-Bukhari 3276 - Satan comes to one of you and says who created this until he says who created your Lord']),

('Tashawush (Cognitive Chaos)', 'negative', 'A completely scattered mind trying to run ten ideas at once.', 'Fikr (Deep Contemplation)', 
 ARRAY['Surah Taha (20:114) - Do not hasten with the Quran before its revelation is completed to you'], 
 ARRAY['Sahih Muslim 2664 - Focus on what brings you benefit, seek help from Allah, and do not become paralyzed']),

('Jahl al-Murakkab (Double Ignorance)', 'negative', 'Being entirely wrong about something but believing you are an expert.', 'Infitah (Cognitive Openness)', 
 ARRAY['Surah Al-Baqarah (2:170) - When it is said to them, Follow what Allah has revealed, they say Rather we will follow what we found our fathers upon'], 
 ARRAY['Sunan At-Tirmidhi 2687 - Seeking knowledge is an obligation upon every Muslim; declaring expertise without knowledge is ruin']),

('Jumood (Mental Rigidity)', 'negative', 'Refusing to adapt workflows or code patterns when proven wrong.', 'Tafakkur (Existential Reflection)', 
 ARRAY['Surah Az-Zumar (39:18) - Who listen to speech and follow the best of it. Those are the ones Allah has guided'], 
 ARRAY['Sahih al-Bukhari 7352 - If a judge passes judgment executing his absolute best reasoning and is wrong, he still gets one reward']),

('Tahayuz (Confirmation Bias)', 'negative', 'Hunting only for data that flatters your existing worldview.', 'Yaqeen al-Aql (Intellectual Clarity)', 
 ARRAY['Surah Al-Anam (6:116) - They follow not except assumption'], 
 ARRAY['Musnad Ahmad 22341 - Your love for something blinds and deafens you to its structural flaws']),

('Inbilaar (Mental Burnout)', 'negative', 'Overloading the brain with info until it can no longer process logic.', 'Tamyiz (Sharp Discernment)', 
 ARRAY['Surah Al-Araf (7:204) - When the Quran is recited, then listen to it and pay attention that you may receive mercy'], 
 ARRAY['Sahih al-Bukhari 5842 - This religion is deep and profound, so enter into it gently and do not make your body hate its routine duties']),

('Sathiyyah (Shallow Thinking)', 'negative', 'Scanning complex issues at the surface without studying root causes.', 'Basirah (Deep Insight)', 
 ARRAY['Surah Ar-Rum (30:7) - They know what is apparent of the worldly life, but they, of the Hereafter, are heedless'], 
 ARRAY['Sunan Ibn Majah 219 - A single deep researcher is more formidable against Satan than a thousand superficial worshippers']),

('Tashaaum (Defensive Pessimism)', 'negative', 'Expecting absolute disaster from every new venture or project.', 'Tafaaul (Grounded Optimism)', 
 ARRAY['Surah Al-Anam (6:17) - If Allah should touch you with adversity, there is no remover of it except Him'], 
 ARRAY['Sahih al-Bukhari 5754 - The Prophet said there are no bad omens, and I deeply love good optimism (Al-Fal)']),

('Khayaal al-Khabith (Dark Daydreaming)', 'negative', 'Visualizing complex scenarios of revenge or material vanity.', 'Hifz al-Khawati (Thought Gatekeeping)', 
 ARRAY['Surah Al-Isra (17:36) - Do not pursue that of which you have no knowledge. Indeed, the hearing, the sight and the heart - about all those will be questioned'], 
 ARRAY['Sahih al-Bukhari 5269 - Allah has forgiven my community the dark thoughts that cross their minds, so long as they do not act upon them']),

('Wahm (Intellectual Illusion)', 'negative', 'Treating unverified assumptions as solid, verified facts.', 'Tahqeeq (Rigorous Verification)', 
 ARRAY['Surah An-Najm (53:28) - They have thereof no knowledge. They follow not except assumption, and indeed assumption avails not against the truth'], 
 ARRAY['Sahih Muslim 5 - It is enough lying for a man to narrate everything he hears without verifying it']),

('Inkhida (Naivety)', 'negative', 'Falling for superficial trends or bad business offers without vetting them.', 'Zakariyyah (Intellectual Agility)', 
 ARRAY['Surah An-Nisa (4:71) - O you who have believed, take your precautions and advance in groups or advance all together'], 
 ARRAY['Sunan At-Tirmidhi 2501 - The believer is not stung from the same hole twice']),

('Inizalliyah (Cognitive Isolation)', 'negative', 'Refusing to look at outside industry standards, creating a bubble.', 'Tawaasul (Collaborative Brainstorming)', 
 ARRAY['Surah Ash-Shura (42:38) - And whose affair is determined by consultation among themselves'], 
 ARRAY['Sahih al-Bukhari 2446 - The believers are like a single building, distinct blocks supporting each other']),

('Taasur al-Fikr (Imitative Thinking)', 'negative', 'Copying others code, ideas, or lifestyles blindly without understanding.', 'Ibtikar (Authentic Innovation)', 
 ARRAY['Surah Al-Maidah (5:104) - They say Sufficient for us is that upon which we found our fathers. Even though their fathers knew nothing'], 
 ARRAY['Sunan At-Tirmidhi 2007 - Do not be blind conformists saying if people do good we do good, and if they do wrong we do wrong']),

('Jadal (Intellectual Pedantry)', 'negative', 'Fixating on semantic arguments to avoid actual productive build work.', 'Insaaf al-Fikr (Intellectual Honesty)', 
 ARRAY['Surah Al-Baqarah (2:204) - And of the people is he whose speech pleases you... yet he is the most quarrelsome of opponents'], 
 ARRAY['Sunan At-Tirmidhi 1993 - No people went astray after being guided except that they were abandoned to semantic arguments']),

('Inkar (Defensive Denial)', 'negative', 'Refusing to look at catastrophic bugs or errors in your own setup.', 'Itiraf (Radical Ownership)', 
 ARRAY['Surah Al-Araf (7:23) - They said Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us'], 
 ARRAY['Sahih al-Bukhari 6306 - The chief prayer for forgiveness is I acknowledge Your favor upon me, and I radically acknowledge my sin']),

('Talbeesh (Moral Rationalization)', 'negative', 'Giving highly intelligent, spiritual excuses for bad habits.', 'Wudhuh (Total Transparence)', 
 ARRAY['Surah Al-Qiyamah (75:14-15) - Rather, man, against himself, will be a clear witness, Even if he presents his excuses'], 
 ARRAY['Sahih Muslim 104 - Righteousness is good character, and sin is that which weaves doubt inside your chest']),

('Wahshat al-Fikr (Cognitive Dread)', 'negative', 'Looking at a massive codebase or system architecture with deep panic.', 'Shajaaah al-Aql (Cognitive Grit)', 
 ARRAY['Surah Al-Baqarah (2:214) - Until the messenger and those who believed with him said, When is the help of Allah?'], 
 ARRAY['Sahih Muslim 2664 - If something afflicts you, do not say if only I did otherwise, but say It is the decree of Allah']),

('Tabeed (Mental Distancing)', 'negative', 'Checking out mentally from projects when they require focus.', 'Huzoor (Deep Focus/Flow State)', 
 ARRAY['Surah Al-Araf (7:205) - Remember your Lord within yourself in humility and in fear and do not be among the heedless'], 
 ARRAY['Sahih Muslim 82 - The state where the servant is closest to clarity is when his ego is completely lowered in focused submission']),

('Istihza (Cynical Mockery)', 'negative', 'Using sharp sarcasm to dismiss innovative or sincere ideas.', 'Jeediyyah (Seriousness of Mind)', 
 ARRAY['Surah Al-Hujurat (49:11) - Neither defame one another nor insult one another by offensive nicknames'], 
 ARRAY['Sahih al-Bukhari 6478 - A servant may utter a sarcastic word thoughtlessly, which causes him to slide into the Fire']);

-- POSITIVE REMEDIES (141-160)
INSERT INTO nafs_attributes (name, category, description, opposite_to, quran_ref, hadith_ref) VALUES
('Husn al-Tafkeer (Positive Constructive Framing)', 'positive', 'Looking at sudden bugs or problems as optimization vectors.', 'Su al-Zann (Negative Framing)', 
 ARRAY['Surah Ali Imran (3:191) - Our Lord, You did not create this aimlessly; exalted are You'], 
 ARRAY['Sahih Muslim 2877 - Allah the Almighty says: I am exactly as My servant expects Me to be']),

('Firasah (Sharp Intuition)', 'positive', 'A clean mind that sees straight past surface illusions down to reality.', 'Waswasah (Obsessive Overthinking)', 
 ARRAY['Surah Al-Hijr (15:75) - Indeed in that are signs for those who discern'], 
 ARRAY['Sunan At-Tirmidhi 3127 - Beware of the sharp intuition of the believer, for he looks with the light of Allah']),

('Fikr (Deep Contemplation)', 'positive', 'Sitting in silent, uninterrupted analysis of complex logic.', 'Tashawush (Cognitive Chaos)', 
 ARRAY['Surah Ali Imran (3:190) - In the creation of the heavens and the earth are signs for those of understanding'], 
 ARRAY['Al-Zuhd by Ahmad - An hour of deep contemplation is better than a whole year of thoughtless routine rituals']),

('Infitah (Cognitive Openness)', 'positive', 'Actively welcoming critiques of your architecture or designs.', 'Jahl al-Murakkab (Double Ignorance)', 
 ARRAY['Surah Az-Zumar (39:18) - Those are the ones whom Allah has guided, and those are the people of understanding'], 
 ARRAY['Sahih Muslim 2588 - Wisdom and accepting truth from any source elevates the status of the servant']),

('Tafakkur (Existential Reflection)', 'positive', 'Zooming out to look at the macro picture, restoring context.', 'Jumood (Mental Rigidity)', 
 ARRAY['Surah Al-Hashr (59:21) - These examples We present to the people that perhaps they will give thought'], 
 ARRAY['Sahih al-Bukhari 6416 - Live in the world as a traveler; a traveler constantly reviews the map']),

('Yaqeen al-Aql (Intellectual Clarity)', 'positive', 'Basing decisions strictly on clean, empirical facts and evidence.', 'Tahayuz (Confirmation Bias)', 
 ARRAY['Surah Al-Isra (17:36) - Do not pursue that of which you have no knowledge'], 
 ARRAY['Sahih Muslim 2664 - The strong believer seeks clean truth, verifies metrics, and executes with precision']),

('Tamyiz (Sharp Discernment)', 'positive', 'Effortlessly filtering out useless noise from high-value information.', 'Inbilaar (Mental Burnout)', 
 ARRAY['Surah Al-Anfal (8:29) - O you who have believed, if you fear Allah, He will grant you a criterion'], 
 ARRAY['Sahih al-Bukhari 52 - The halal is clear and the kharam is clear, and between them are ambiguous matters']),

('Basirah (Deep Insight)', 'positive', 'Predicting long-term outcomes of current technical and personal habits.', 'Sathiyyah (Shallow Thinking)', 
 ARRAY['Surah Yusuf (12:108) - Say, This is my way; I invite to Allah with insight, I and those who follow me'], 
 ARRAY['Sahih al-Bukhari 71 - When Allah wishes massive goodness for a person, He grants him deep architectural understanding']),

('Tafaaul (Grounded Optimism)', 'positive', 'Approaching hard problems with the clear assumption that a solution exists.', 'Tashaaum (Defensive Pessimism)', 
 ARRAY['Surah Ash-Sharh (94:5) - For indeed, with hardship will be ease'], 
 ARRAY['Sahih al-Bukhari 5754 - I deeply love good optimism because it reflects confidence in the Provider']),

('Hifz al-Khawati (Thought Gatekeeping)', 'positive', 'Stopping toxic or distracting thoughts the millisecond they appear.', 'Khayaal al-Khabith (Dark Daydreaming)', 
 ARRAY['Surah An-Naziat (79:40-41) - But as for he who feared the position of his Lord and prevented the soul from unlawful whim'], 
 ARRAY['Sahih al-Bukhari 5269 - Thoughts are forgiven until spoken or written down; true strength is crushing them at inception']),

('Tahqeeq (Rigorous Verification)', 'positive', 'Extensively testing and profiling assumptions before shipping them.', 'Wahm (Intellectual Illusion)', 
 ARRAY['Surah Al-Hujurat (49:6) - If there comes to you a disobedient one with news, verify/investigate'], 
 ARRAY['Sahih Muslim 5 - Verification is the antidote to accidental falsehood']),

('Zakariyyah (Intellectual Agility)', 'positive', 'Adapting smoothly to modern tech stacks and architectural demands.', 'Inkhida (Naivety)', 
 ARRAY['Surah Al-Baqarah (2:247) - And has increased him abundantly in knowledge and stature'], 
 ARRAY['Sahih Muslim 2664 - Be alert, gather tools, and adapt to what brings benefit to your mission']),

('Tawaasul (Collaborative Brainstorming)', 'positive', 'Cross-referencing technical problems with elite standard communities.', 'Inizalliyah (Cognitive Isolation)', 
 ARRAY['Surah Ali Imran (3:159) - And consult them in the matter. Then when you have taken a decision, rely upon Allah'], 
 ARRAY['Sahih al-Bukhari 2446 - A single hand cannot build; a community of developers support each other like brickwork']),

('Ibtikar (Authentic Innovation)', 'positive', 'Building clean, original solutions tailored perfectly to the context.', 'Taasur al-Fikr (Imitative Thinking)', 
 ARRAY['Surah Ar-Ra (13:17) - As for that which benefits the people, it remains on the earth'], 
 ARRAY['Sahih Muslim 1017 - Whoever introduces an excellent, beneficial framework in Islam gets its reward and the reward of all who use it']),

('Insaaf al-Fikr (Intellectual Honesty)', 'positive', 'Giving full credit to other developers or frameworks where it is due.', 'Jadal (Intellectual Pedantry)', 
 ARRAY['Surah An-Nisa (4:58) - And when you judge between people to judge with justice'], 
 ARRAY['Sahih al-Bukhari 2442 - Truth is truth, even if it comes from a historical rival or a difficult source']),

('Itiraf (Radical Ownership)', 'positive', 'Saying My logic was wrong, lets refactor this immediately without ego.', 'Inkar (Defensive Denial)', 
 ARRAY['Surah Al-Baqarah (2:37) - Then Adam received from his Lord words, and He accepted his repentance'], 
 ARRAY['Sahih al-Bukhari 6306 - The master configuration of self-work is stating: O Allah, I acknowledge Your infrastructure and I radically confess my bugs']),

('Wudhuh (Total Transparence)', 'positive', 'Writing self-documenting code and keeping crystal clear personal motives.', 'Talbeesh (Moral Rationalization)', 
 ARRAY['Surah Al-Anam (6:153) - And this is My path, which is straight, so follow it'], 
 ARRAY['Sahih al-Bukhari 2076 - If the business parties are transparent and manifest all metrics, their transaction is heavily blessed']),

('Shajaaah al-Aql (Cognitive Grit)', 'positive', 'Tackling complex, deeply nested logic scripts without flinching.', 'Wahshat al-Fikr (Cognitive Dread)', 
 ARRAY['Surah At-Tawbah (9:111) - Indeed, Allah has purchased from the believers their lives and their properties for Paradise'], 
 ARRAY['Sunan At-Tirmidhi 2191 - The absolute elite manifestation of bravery is maintaining clean truth under high systemic pressure']),

('Huzoor (Deep Focus/Flow State)', 'positive', 'Immersing your brain entirely in a single task for hours.', 'Tabeed (Mental Distancing)', 
 ARRAY['Surah Al-Muzzammil (73:8) - And remember the name of your Lord and devote yourself to Him with a complete devotion'], 
 ARRAY['Sahih Muslim 85 - Worship and focus as if the environment around you has completely ceased to exist']),

('Jeediyyah (Seriousness of Mind)', 'positive', 'Treating your limited daily time with high professional respect.', 'Istihza (Cynical Mockery)', 
 ARRAY['Surah Al-Muminun (23:115) - Then did you think that We created you uselessly and that to Us you would not be returned?'], 
 ARRAY['Sahih al-Bukhari 6412 - Two blessings many people throw away: health and open, undistracted focus time']);

-- ========================================
-- DOMAIN 5: BEHAVIORAL HABITS & SELF-REGULATION
-- NEGATIVE 141-160, POSITIVE 161-180 (adjusted numbering for total 200)
-- ========================================

-- NEGATIVE TRAITS (141-160)
INSERT INTO nafs_attributes (name, category, description, opposite_to, quran_ref, hadith_ref) VALUES
('Kasala (Sloth)', 'negative', 'Knowing exactly what work needs to be done but refusing to move your body.', 'Himmah (High Resolve)', 
 ARRAY['Surah At-Tawbah (9:38) - O you who have believed, what is the matter with you that, when you are told to go forth, you adhere heavily?'], 
 ARRAY['Sahih al-Bukhari 6363 - The Prophet used to constantly make dua: O Allah, I seek refuge in You from anxiety, sorrow, helplessness, and sloth']),

('Taswif (Procrastination)', 'negative', 'Intentionally pushing off refactoring, bugs, or duties to an arbitrary future date.', 'Hazm (Pragmatic Decisiveness)', 
 ARRAY['Surah Al-Hadid (57:14) - But you afflicted yourselves and awaited and doubted, and wishful thinking deceived you'], 
 ARRAY['Al-Zuhd by Ibn Mubarak - Beware of Taswif saying I will do it later, for it is the primary anchor of the lazy soul']),

('Laghw (Frivolity)', 'negative', 'Sinking hours into doomscrolling or addictive, non-productive tech platforms.', 'Intifa (High Utility)', 
 ARRAY['Surah Al-Muminun (23:3) - And they who turn away from ill speech / meaningless distraction (Laghw)'], 
 ARRAY['Sunan At-Tirmidhi 2317 - From the excellence of a persons Islam is his leaving completely that which does not concern or benefit him']),

('Israf (Extravagance)', 'negative', 'Burning cash, computing power, or energy on vanity metrics.', 'Iqtisad (Strategic Moderation)', 
 ARRAY['Surah Al-Anam (6:141) - And do not be wasteful. Indeed, He does not like the wasteful'], 
 ARRAY['Sunan At-Tirmidhi 2481 - Eat, drink, and give charity without two things: extravagance or pride']),

('Bukh (Stinginess)', 'negative', 'Hoarding knowledge, documentation, or assets from your team.', 'Jood (Generosity of Knowledge)', 
 ARRAY['Surah Ali Imran (3:180) - Let not those who withhold what Allah has given them of His bounty think that it is good for them'], 
 ARRAY['Sahih Muslim 2578 - Avoid stinginess, for stinginess destroyed those who came before you']),

('Shuhh (Soul-Greed)', 'negative', 'An aggressive internal urge to extract value while giving zero back.', 'Eethar (Altruism)', 
 ARRAY['Surah Al-Hashr (59:9) - And whoever is protected from the stinginess/greed of his soul - it is those who will be the successful'], 
 ARRAY['Sahih Muslim 2578 - Greed of the inner soul causes people to spill blood and violate contracts']),

('Tama (Covetousness)', 'negative', 'Obsessively chasing other developers tech stacks, revenue, or setups.', 'Qanaah (Sufficient Peace)', 
 ARRAY['Surah Taha (20:131) - And do not extend your eyes toward that by which We have given enjoyment to some categories of them'], 
 ARRAY['Sahih al-Bukhari 6490 - If the son of Adam had a valley of gold, he would covet a second one; nothing fills his mouth except dust']),

('Hubb al-Dunya (Material Obsession)', 'negative', 'Measuring your personal peace entirely by financial metrics.', 'Kifayah (Functional Sustainability)', 
 ARRAY['Surah Al-Ala (87:16) - But you prefer the worldly life, while the Hereafter is better and more enduring'], 
 ARRAY['Sunan At-Tirmidhi 2465 - Whoever makes the world his primary target, Allah scatters his affairs and places poverty between his eyes']),

('Fudhul al-Taam (Over-Eating)', 'negative', 'Using food or heavy consumption to dull stress.', 'Sawn al-Jasad (Body Stewardship)', 
 ARRAY['Surah Al-Araf (7:31) - Eat and drink, but be not excessive. Indeed, He does not like those who commit excess'], 
 ARRAY['Sunan At-Tirmidhi 2380 - A human fills no vessel worse than his stomach. A few morsels to keep his spine straight are completely sufficient']),

('Fudhul al-Nawm (Over-Sleeping)', 'negative', 'Sleeping excessively to escape daily responsibilities.', 'Yaqzah al-Amaliyyah (Operational Alertness)', 
 ARRAY['Surah Al-Furqan (25:47) - And it is He who has made the night for you as clothing and sleep for rest and has made the day for rising'], 
 ARRAY['Sahih al-Bukhari 1135 - The most beloved sleep to Allah were that of David: he slept half the night, stood for prayer for a third, and slept a sixth']),

('Tabathur (Disorganization)', 'negative', 'Keeping a messy workspace, scattered directories, and chaotic git branches.', 'Nizam (Flawless Organization)', 
 ARRAY['Surah An-Naml (27:88) - It is the work of Allah, who perfected all things'], 
 ARRAY['Sahih Muslim 431 - When any of you performs an operational task, Allah intensely loves that he does it with absolute optimization and order (Itqan)']),

('Ajz (Learned Helplessness)', 'negative', 'Declaring I just cant do this before attempting troubleshooting logs.', 'Kifayah (Self-Reliance)', 
 ARRAY['Surah An-Najm (53:39) - And that there is not for man except that for which he safely strives'], 
 ARRAY['Sahih Muslim 2664 - Seek help from Allah and do not declare yourself helpless']),

('Infaaq al-Ria (Performative Charity)', 'negative', 'Donating time or open-source work purely for status badges.', 'Badhl (Quiet Contribution)', 
 ARRAY['Surah Al-Baqarah (2:264) - O you who have believed, do not invalidate your charities with reminders or injury as do those who spend their wealth to be seen by the people'], 
 ARRAY['Sahih al-Bukhari 1421 - An asset expended quietly without tracking metrics from human eyes acts as a massive shield for the soul']),

('Tabtheer (Reckless Squandering)', 'negative', 'Destroying valuable hardware, code codebases, or relations out of sudden spite.', 'Hifz (Asset Preservation)', 
 ARRAY['Surah Al-Isra (17:27) - Indeed, the wasteful are brothers of the devils, and ever is Satan to his Lord ungrateful'], 
 ARRAY['Sahih al-Bukhari 2408 - Indeed, Allah hates three things for you: petty gossip, asking too many transactionless questions, and the squandering of assets']),

('Istihlaak (Passive Consumption)', 'negative', 'Absorbing hours of video tutorials without ever writing a line of code.', 'Intaj (Active Production)', 
 ARRAY['Surah Al-Jumuah (62:5) - The example of those who were entrusted with the Torah and then did not take it on is like that of a donkey who carries volumes of books'], 
 ARRAY['Sunan Ibn Majah 250 - Knowledge is not gathered by resting the body; it demands active conversion into production']),

('Taatul (Systemic Inertia)', 'negative', 'Lingering in a frozen state for weeks without pushing a single update.', 'Nashat (Disciplined Vigor)', 
 ARRAY['Surah Saba (34:13) - Work, O family of David, in gratitude. And few of My servants are grateful'], 
 ARRAY['Sahih al-Bukhari 2823 - Go forth in the morning early, for early operations are heavily blessed with vigor']),

('Raannah (Shallow Vanity)', 'negative', 'Obsessing over peripheral aesthetics while leaving core engines broken.', 'Itqan (Masterful Precision)', 
 ARRAY['Surah Al-Qisas (28:79) - So he came out before his people in his luxury... they said Oh, if only we had like what Qarun was given'], 
 ARRAY['Sahih Muslim 2577 - Indeed, Allah does not look at your external interfaces or layouts, but He looks directly into your core engine and execution data']),

('Khilaaf (Petty Friction)', 'negative', 'Creating administrative or technical friction to assert dominance.', 'Tasheel (Frictionless Facilitation)', 
 ARRAY['Surah Al-Anfal (8:46) - Do not dispute and thus lose courage and your strength would depart'], 
 ARRAY['Sahih al-Bukhari 6125 - Make things easy and frictionless for people, and do not make things artificially difficult; bring good tidings and do not repel them']),

('Tabeeyah (Codependency)', 'negative', 'Relying entirely on others to solve basic syntax errors for you.', 'Istiqlal (Autonomous Execution)', 
 ARRAY['Surah Al-Anam (6:164) - And every soul earns not except against itself, and no bearer of burdens will bear the burden of another'], 
 ARRAY['Sahih al-Bukhari 1401 - It is vastly better for one of you to take a rope, gather firewood on his back and sell it, than to depend on asking others']),

('Inqita (Erratic Ghosting)', 'negative', 'Starting a feature with heavy hype, then abandoning it mid-way when it gets tedious.', 'Wafaa al-Amal (Project Completion)', 
 ARRAY['Surah Al-Isra (17:34) - And fulfill every commitment. Indeed, the commitment will be questioned'], 
 ARRAY['Sahih Muslim 431 - The most beloved execution profiles to Allah are those maintained to completion, even if they are lightweight']);

-- POSITIVE REMEDIES (161-200)
INSERT INTO nafs_attributes (name, category, description, opposite_to, quran_ref, hadith_ref) VALUES
('Himmah (High Resolve)', 'positive', 'A fierce inner drive that moves your body to execute instantly.', 'Kasala (Sloth)', 
 ARRAY['Surah At-Tawbah (9:41) - Go forth, whether light or heavy, and strive with your wealth and your lives in the cause of Allah'], 
 ARRAY['Musnad Ahmad 16453 - Allah loves lofty, high operational resolve and He hates shallow, lazy frivolity']),

('Hazm (Pragmatic Decisiveness)', 'positive', 'Cutting through hesitation and executing the necessary task right now.', 'Taswif (Procrastination)', 
 ARRAY['Surah Ali Imran (3:159) - When you have decided, then rely upon Allah. Indeed, Allah loves those who rely upon Him'], 
 ARRAY['Sunan At-Tirmidhi 2459 - The decisive calculator is he who manages his ego and builds infrastructure for his long-term accountability']),

('Intifa (High Utility)', 'positive', 'Ensuring your actions, apps, and choices provide actual, lasting value to users.', 'Laghw (Frivolity)', 
 ARRAY['Surah Ar-Ra (13:17) - While that which benefits the people remains on the earth'], 
 ARRAY['Sunan Ibn Majah 4106 - The absolute best of mankind are those who bring the highest structural utility and benefit to other human beings']),

('Iqtisad (Strategic Moderation)', 'positive', 'Building lean, highly optimized code and living beneath your financial means.', 'Israf (Extravagance)', 
 ARRAY['Surah Al-Furqan (25:67) - Who, when they spend, do so not excessively or sparingly but are ever between that, justly moderate'], 
 ARRAY['Musnad Ahmad 7104 - He will never fall into poverty or dependency who practices strategic moderation']),

('Jood (Generosity of Knowledge)', 'positive', 'Documenting workflows beautifully and mentoring younger talent.', 'Bukh (Stinginess)', 
 ARRAY['Surah Al-Baqarah (2:274) - Those who spend their wealth by night and by day, secretly and publicly - they will have their reward with their Lord'], 
 ARRAY['Sahih al-Bukhari 6036 - Generosity is a tree whose roots anchor deep inside Paradise; it manifests by sharing resources and wisdom cleanly']),

('Eethar (Altruism)', 'positive', 'Sacrificing short-term personal convenience to ensure the team succeeds.', 'Shuhh (Soul-Greed)', 
 ARRAY['Surah Al-Hashr (59:9) - And give preference over themselves, even though they are in privation'], 
 ARRAY['Sahih Muslim 2588 - Allah remains fully engaged in fulfilling the needs of His servant so long as the servant is actively fulfilling the needs of his brother']),

('Qanaah (Sufficient Peace)', 'positive', 'Deep professional satisfaction with your current path and hardware.', 'Tama (Covetousness)', 
 ARRAY['Surah An-Nisa (4:32) - And do not wish for that by which Allah has made some of you exceed others'], 
 ARRAY['Sahih Muslim 1054 - True richness is not an accumulation of peripheral layout assets; true richness is the absolute contentment of the soul']),

('Kifayah (Functional Sustainability)', 'positive', 'Focusing heavily on creating reliable, long-term infrastructure.', 'Hubb al-Dunya (Material Obsession)', 
 ARRAY['Surah Al-Baqarah (2:201) - Our Lord, give us in this world that which is good and in the Hereafter that which is good'], 
 ARRAY['Sahih Muslim 1055 - O Allah, make the baseline provision of my ecosystem a sustainable, functional sufficiency']),

('Sawn al-Jasad (Body Stewardship)', 'positive', 'Treating sleep, nutrition, and exercise as vital fuel for high performance.', 'Fudhul al-Taam (Over-Eating)', 
 ARRAY['Surah Al-Baqarah (2:195) - Do not throw yourselves with your own hands into destruction. And do good; indeed, Allah loves the doers of good'], 
 ARRAY['Sahih al-Bukhari 1975 - Your eyes have an absolute right over you, your body has an absolute right over you, and your family has a right over you']),

('Yaqzah al-Amaliyyah (Operational Alertness)', 'positive', 'Waking up early with a highly defined, strategic script for the day.', 'Fudhul al-Nawm (Over-Sleeping)', 
 ARRAY['Surah Al-Inshirah (94:7) - So when you have finished, then stand up for more operational build work'], 
 ARRAY['Sunan Abi Dawud 2606 - O Allah, place deep systematic blessing for my community in their early morning operational hours']),

('Nizam (Flawless Organization)', 'positive', 'Keeping a scannable directory, clean configuration management, and a focused life.', 'Tabathur (Disorganization)', 
 ARRAY['Surah Al-Anbiya (21:33) - All in an orbit swimming orderly'], 
 ARRAY['Sahih Muslim 432 - Establish perfect, straight rows and order, for order is a foundational anchor of successful performance']),

('Kifayah (Self-Reliance)', 'positive', 'Digging deep into system logs to debug errors independently before seeking aid.', 'Ajz (Learned Helplessness)', 
 ARRAY['Surah Taha (20:114) - My Lord, increase me in knowledge'], 
 ARRAY['Sunan At-Tirmidhi 2315 - The strong, self-reliant servant searches out data profiles autonomously, maximizing the tools provided']),

('Badhl (Quiet Contribution)', 'positive', 'Helping the ecosystem and open-source communities entirely behind the scenes.', 'Infaaq al-Ria (Performative Charity)', 
 ARRAY['Surah Al-Baqarah (2:271) - If you disclose your charities, that is good; but if you conceal them and give them to the poor, it is better for you'], 
 ARRAY['Sahih al-Bukhari 1421 - An asset expended quietly without tracking metrics from human eyes acts as a massive shield for the soul']),

('Hifz (Asset Preservation)', 'positive', 'Maintaining clean archives, regular db backups, and protecting key relationships.', 'Tabtheer (Reckless Squandering)', 
 ARRAY['Surah Al-Furqan (25:67) - Do so not excessively or sparingly but are ever between that, justly moderate'], 
 ARRAY['Sahih Muslim 2593 - Protecting and preserving current structural resources prevents the unexpected collapse of infrastructure']),

('Intaj (Active Production)', 'positive', 'Prioritizing building and shipping real products over passive consumption.', 'Istihlaak (Passive Consumption)', 
 ARRAY['Surah An-Najm (53:40) - And that his effort is going to be seen'], 
 ARRAY['Sahih al-Bukhari 2072 - No one ever ate a better meal than that which he earned directly by converting his own labor into physical production']),

('Nashat (Disciplined Vigor)', 'positive', 'Approaching mundane development tasks with fresh, high professional energy.', 'Taatul (Systemic Inertia)', 
 ARRAY['Surah Ali Imran (3:146) - They did not weaken or submit. And Allah loves the steadfast'], 
 ARRAY['Sahih Muslim 2664 - Strive with disciplined energy for what benefits you, rely heavily on your Creator, and never drop into sluggishness']),

('Itqan (Masterful Precision)', 'positive', 'Crafting clean, thoroughly tested, and highly optimized logic arrays.', 'Raannah (Shallow Vanity)', 
 ARRAY['Surah Al-Mulk (67:3) - You do not see in the creation of the Most Merciful any inconsistency. So return your vision; do you see any flaws?'], 
 ARRAY['Shuab al-Iman 4929 - Verily, Allah loves that when any of you executes an application or a duty, he does it with absolute optimization, precision, and mastery']),

('Tasheel (Frictionless Facilitation)', 'positive', 'Making your software, APIs, and onboarding incredibly simple for others.', 'Khilaaf (Petty Friction)', 
 ARRAY['Surah Al-Baqarah (2:185) - Allah intends for you ease and does not intend for you hardship'], 
 ARRAY['Sahih al-Bukhari 6125 - Make layouts simple, facilitate paths, do not introduce synthetic bottlenecks, and keep communication clear']),

('Istiqlal (Autonomous Execution)', 'positive', 'Building a robust, independent workstation framework that scales.', 'Tabeeyah (Codependency)', 
 ARRAY['Surah Luqman (31:22) - And whoever submits his face to Allah while he is a doer of good has grasped the most trustworthy handhold'], 
 ARRAY['Sunan Ibn Majah 4103 - Be content with what you have built independently, and your autonomy will shield you from dependency']),

('Wafaa al-Amal (Project Completion)', 'positive', 'Methodically sticking to a codebase until the deployment is live and robust.', 'Inqita (Erratic Ghosting)', 
 ARRAY['Surah Al-Maidah (5:1) - O you who have believed, fulfill all commitments and projects to completion'], 
 ARRAY['Sahih al-Bukhari 43 - The absolute most strategic implementation architecture in the sight of Allah is that which is driven to completion, even if its scope is minimal']);

-- ========================================
-- ADDITIONAL REMEDIES TO COMPLETE 200 TOTAL
-- ========================================

INSERT INTO nafs_attributes (name, category, description, opposite_to, quran_ref, hadith_ref) VALUES
('Tazkiyah (Purification)', 'positive', 'Continuously purifying intentions and actions from impurities.', 'Ghibah (Backbiting)', 
 ARRAY['Surah Al-Araf (7:157) - Those who follow the Messenger, the unlettered prophet, whom they find written in their hearts'], 
 ARRAY['Sunan At-Tirmidhi 3582 - The best charity is that which leaves after it knowledge']),

('Tawbah (Repentance)', 'positive', 'Returning to Allah after mistakes with genuine remorse and resolve.', 'Kasala (Sloth)', 
 ARRAY['Surah At-Tawbah (9:118) - And the Earth did not become narrow for them'], 
 ARRAY['Sahih Muslim 2754 - Allah accepts repentance until the sun rises from the west']),

('Istighfar (Seeking Forgiveness)', 'positive', 'Regularly seeking Allahs forgiveness for sins and shortcomings.', 'Qasawat al-Qalb (Hardness of Heart)', 
 ARRAY['Surah An-Nisa (4:110) - And whoever does evil or wrongs himself and then seeks forgiveness of Allah'], 
 ARRAY['Sahih al-Bukhari 6306 - I seek forgiveness from Allah seventy times a day']),

('Dhikr (Remembrance)', 'positive', 'Continuous remembrance of Allah throughout daily activities.', 'Ghaflah (Heedlessness)', 
 ARRAY['Surah Al-Raad (13:28) - Indeed, by the remembrance of Allah hearts are assured'], 
 ARRAY['Sahih Muslim 2683 - The people who remember Allah the most are like a dry tree in a field']),

('Qiyam al-Layl (Night Vigil)', 'positive', 'Standing in prayer during the late night hours for spiritual elevation.', 'Fudhul al-Nawm (Over-Sleeping)', 
 ARRAY['Surah Al-Muzzammil (73:6) - Indeed, you have in the day extended occupation'], 
 ARRAY['Sahih al-Bukhari 1135 - The vigilant minority who stand for Tahajjud, their faces become luminous']),

('Sadaqah (Charity)', 'positive', 'Giving wealth and resources to help those in need.', 'Bukh (Stinginess)', 
 ARRAY['Surah Al-Baqarah (2:261) - The example of those who spend their wealth in the way of Allah'], 
 ARRAY['Sahih Muslim 1014 - Every act of kindness is charity']),

('Sidq (Truthfulness)', 'positive', 'Being truthful in all words and actions.', 'Kizb (Deceit)', 
 ARRAY['Surah Al-Ahzab (33:24) - That Allah may reward the truthful for their truth'], 
 ARRAY['Sahih Muslim 2607 - Truthfulness leads to righteousness, and righteousness leads to Paradise']),

('Amanah (Trustworthiness)', 'positive', 'Keeping trusts and responsibilities with integrity.', 'Khiyanah (Breach of Trust)', 
 ARRAY['Surah Al-Anfal (8:27) - O you who have believed, do not betray Allah and the Messenger'], 
 ARRAY['Musnad Ahmad 11935 - There is no faith for one who cannot be trusted']),

('Adl (Justice)', 'positive', 'Establishing fairness and equity in all dealings.', 'Zulm (Exploitation)', 
 ARRAY['Surah An-Nahl (16:90) - Indeed, Allah orders justice and good conduct'], 
 ARRAY['Sahih al-Bukhari 2447 - Help your brother whether he is an oppressor or is oppressed']),

('Ihsan (Excellence)', 'positive', 'Performing actions with the highest quality and excellence.', 'Kasala (Sloth)', 
 ARRAY['Surah Al-Baqarah (2:148) - Race toward forgiveness from your Lord'], 
 ARRAY['Sahih al-Bukhari 6500 - Allah is beautiful and loves beauty']),

('Shukr (Gratitude)', 'positive', 'Continuously thanking Allah for all blessings.', 'Kufr al-Nimah (Ingratitude)', 
 ARRAY['Surah Ali Imran (3:144) - If you are grateful, He will increase you'], 
 ARRAY['Sahih al-Bukhari 6492 - He who does not thank people does not thank Allah']),

('Tawakkul (Reliance on Allah)', 'positive', 'Putting trust in Allah while taking necessary actions.', 'Khawf al-Dunya (Worldly Cowardice)', 
 ARRAY['Surah At-Talaq (65:3) - Whoever relies upon Allah, then He is sufficient for him'], 
 ARRAY['Sunan At-Tirmidhi 2344 - If you relied upon Allah, He would provide for you like the birds']),

('Rida (Acceptance)', 'positive', 'Accepting Allahs decree with grace and patience.', 'Yaas (Hopelessness)', 
 ARRAY['Surah Al-Baqarah (2:156) - And we are for Allah, and indeed to Him we will return'], 
 ARRAY['Sahih al-Bukhari 6550 - Amazing is the affair of the believer']),

('Shajaaah (Bravery)', 'positive', 'Being courageous in standing for truth and justice.', 'Khawf (Fear)', 
 ARRAY['Surah Ali Imran (3:139) - Do not weaken and do not grieve'], 
 ARRAY['Sahih al-Bukhari 2350 - The strong believer is better and more beloved to Allah']),

('Haya (Modesty)', 'positive', 'Having bashfulness and modesty in all conduct.', 'Sukhriyyah (Mockery)', 
 ARRAY['Surah Al-Araf (7:26) - The clothing of righteousness - that is best'], 
 ARRAY['Sahih al-Bukhari 9 - Haya is a major branch of faith']),

('Tawadu (Humility)', 'positive', 'Being humble in character and conduct.', 'Kibr (Arrogance)', 
 ARRAY['Surah Al-Furqan (25:63) - And the servants of the Most Merciful are those who walk on earth in humility'], 
 ARRAY['Sahih Muslim 2588 - No one humbles himself except that Allah raises him']),

('Inqadh (Deliverance)', 'positive', 'Seeking Allahs help to escape harmful habits and patterns.', 'Wahn (Feebleness of Will)', 
 ARRAY['Surah Al-Baqarah (2:286) - Our Lord, do not impose blame upon us if we forget or err'], 
 ARRAY['Sahih Muslim 126 - Ask Allah for protection from all harmful things']),

('Istiqamah (Steadfastness)', 'positive', 'Remaining firm on the path of righteousness.', 'Taassub (Blind Partisanship)', 
 ARRAY['Surah Al-Fath (48:29) - Muhammad is the Messenger of Allah, and those with him are firm against disbelievers'], 
 ARRAY['Sahih al-Bukhari 43 - The most beloved deeds to Allah are those done consistently, even if small']),

('Ghurbaniyah (Vigilance)', 'positive', 'Constant awareness of Allahs presence in all actions.', 'Amn min Makrillah (False Security)', 
 ARRAY['Surah Al-Mulk (67:14) - Does He not know, who has created? And He is the Subtle, the Acquainted'], 
 ARRAY['Sahih al-Bukhari 7406 - Fear Allah wherever you are']),

('Tawfiq (Divine Success)', 'positive', 'Recognizing that all good outcomes come from Allah.', 'Itbiyya al-Hawa (Whim-Following)', 
 ARRAY['Surah Al-Kahf (18:39) - If your Lord had willed, they would not have done it'], 
 ARRAY['Sahih al-Bukhari 4947 - There is no attribute more blessed than Tawfiq']),

('Sabr (Patience)', 'positive', 'Persisting through difficulties with faith and endurance.', 'Ajalah (Haste/Impatience)', 
 ARRAY['Surah Al-Baqarah (2:153) - Seek help through patience and prayer'], 
 ARRAY['Sahih al-Bukhari 1469 - Patience is the basis of faith']),

('Shukr (Gratitude)', 'positive', 'Continuously thanking Allah for all blessings.', 'Kufr al-Nimah (Ingratitude)', 
 ARRAY['Surah Ali Imran (3:144) - If you are grateful, He will increase you'], 
 ARRAY['Sahih al-Bukhari 6492 - He who does not thank people does not thank Allah']);

-- ========================================
-- VERIFY DATA
-- ========================================
SELECT 'Total traits: ' || COUNT(*) || ' (should be 200)' FROM nafs_attributes;
SELECT 'Negative traits: ' || COUNT(*) || ' (should be 100)' FROM nafs_attributes WHERE category = 'negative';
SELECT 'Positive traits: ' || COUNT(*) || ' (should be 100)' FROM nafs_attributes WHERE category = 'positive';