import Link from "next/link";

export default function LearnPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-black dark:to-zinc-900">
            <header className="bg-white dark:bg-zinc-800 shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center justify-between">
                        <Link href="/" className="text-xl font-bold text-emerald-800 dark:text-emerald-400">
                            NafsMutmainna
                        </Link>
                        <div className="flex gap-6">
                            <Link href="/auth/login" className="text-zinc-600 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400">
                                Sign In
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-emerald-800 dark:text-emerald-400 mb-4">
                        Understanding the Nafs
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Learn about the journey of soul purification from Islamic perspective
                    </p>
                </div>

                {/* Three States */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {/* Ammarah */}
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                        <div className="text-4xl mb-4">🔥</div>
                        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-3">Nafs Al-Ammarah</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            &quot;The Commandment Soul&quot; - The lowest state that constantly pushes toward evil and disobedience.
                        </p>
                        <div className="space-y-2 text-sm">
                            <p className="font-medium text-red-600 dark:text-red-300">Characteristics:</p>
                            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-1">
                                <li>Prone to arrogance and ego</li>
                                <li>Follows desires blindly</li>
                                <li>Blames others for mistakes</li>
                                <li>Resistant to change</li>
                            </ul>
                        </div>
                    </div>

                    {/* Lawwamah */}
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                        <div className="text-4xl mb-4">⚖️</div>
                        <h2 className="text-2xl font-bold text-yellow-700 dark:text-yellow-400 mb-3">Nafs Al-Lawwamah</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            &quot;The Self-Blaming Soul&quot; - A middle state that feels regret and seeks improvement.
                        </p>
                        <div className="space-y-2 text-sm">
                            <p className="font-medium text-yellow-600 dark:text-yellow-300">Characteristics:</p>
                            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-1">
                                <li>Feels guilt after sinning</li>
                                <li>Desires to improve</li>
                                <li>Occasionally does good deeds</li>
                                <li>Struggles with consistency</li>
                            </ul>
                        </div>
                    </div>

                    {/* Mutmainna */}
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                        <div className="text-4xl mb-4">🕊️</div>
                        <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-3">Nafs Al-Mutmainna</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            &quot;The Peaceful Soul&quot; - The highest state of contentment and serenity in Allah&apos;s will.
                        </p>
                        <div className="space-y-2 text-sm">
                            <p className="font-medium text-emerald-600 dark:text-emerald-300">Characteristics:</p>
                            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-1">
                                <li>Content with divine decree</li>
                                <li>Grateful in blessings</li>
                                <li>Patient in trials</li>
                                <li>Consistently does good</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Quranic Basis */}
                <div className="bg-white dark:bg-zinc-800 rounded-xl p-8 mb-16">
                    <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-6">Quranic Foundation</h2>
                    <div className="space-y-6">
                        <blockquote className="border-l-4 border-emerald-500 pl-6 py-2">
                            <p className="text-lg italic text-zinc-700 dark:text-zinc-300 mb-2">
                                &quot;O soul at peace, return to your Lord well-pleased and well-pleasing. Enter among My servants. Enter My Paradise.&quot;
                            </p>
                            <cite className="text-sm text-zinc-500">— Surah Al-Fajr 89:27-30</cite>
                        </blockquote>
                        <blockquote className="border-l-4 border-emerald-500 pl-6 py-2">
                            <p className="text-lg italic text-zinc-700 dark:text-zinc-300 mb-2">
                                &quot;And the actions of those who trust their Lord are [fulfilled] rightly, while the actions of those who disbelieve are like a mirage.&quot;
                            </p>
                            <cite className="text-sm text-zinc-500">— Surah Al-Baqarah 2:264</cite>
                        </blockquote>
                    </div>
                </div>

                {/* Practical Steps */}
                <div className="bg-white dark:bg-zinc-800 rounded-xl p-8 mb-16">
                    <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-6">Rectification Path</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex gap-4">
                            <div className="text-2xl">🧘</div>
                            <div>
                                <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Self-Awareness (Muraqabah)</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm">Monitor your thoughts and actions. Recognize when nafs is guiding you toward evil.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-2xl">📿</div>
                            <div>
                                <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Remembrance (Dhikr)</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm">Continuous remembrance of Allah purifies the heart and weakens nafs influences.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-2xl">💫</div>
                            <div>
                                <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Repentance (Tawbah)</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm">Sincerly turn to Allah for forgiveness. Consistent repentance weakens the ammara.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-2xl">📖</div>
                            <div>
                                <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Islamic Knowledge</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm">Learn authentic Islamic teachings to properly navigate the spiritual journey.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-4">
                        Begin Your Journey Today
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                        Track your Nafs state and work towards spiritual growth with our guided tools.
                    </p>
                    <Link
                        href="/auth/register"
                        className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                        Get Started Free
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center py-8 text-zinc-500 text-sm">
                Built with Islamic guidance • Authentic sources only
            </footer>
        </div>
    );
}