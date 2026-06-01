import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-black dark:to-zinc-900">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center py-20">
          <h1 className="text-4xl md:text-6xl font-bold text-emerald-800 dark:text-emerald-400 mb-4">
            NafsMutmainna
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-8">
            Your companion on the journey of Tazkiyah (purification of the soul)
          </p>

          {/* Nafs States */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-red-100 dark:bg-red-900/30 px-6 py-3 rounded-full">
              <span className="text-red-700 dark:text-red-400 font-medium">Nafs Ammarah</span>
              <span className="text-red-500 dark:text-red-600 text-sm ml-2">(Commanding Evil)</span>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 px-6 py-3 rounded-full">
              <span className="text-yellow-700 dark:text-yellow-400 font-medium">Nafs Lawwamah</span>
              <span className="text-yellow-500 dark:text-yellow-600 text-sm ml-2">(Self-Blaming)</span>
            </div>
            <div className="bg-emerald-100 dark:bg-emerald-900/30 px-6 py-3 rounded-full">
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">Nafs Mutmainna</span>
              <span className="text-emerald-500 dark:text-emerald-600 text-sm ml-2">(At Peace)</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/auth/login"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Start Your Journey
            </Link>
            <Link
              href="/learn"
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 py-12">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2">Daily Assessment</h3>
            <p className="text-zinc-600 dark:text-zinc-400">Track your Nafs state with daily check-ins and personalized insights</p>
          </div>
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">💭</div>
            <h3 className="text-lg font-semibold mb-2">Emotion Logger</h3>
            <p className="text-zinc-600 dark:text-zinc-400">Map your emotions to traits and receive Quranic guidance</p>
          </div>
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">🛠️</div>
            <h3 className="text-lg font-semibold mb-2">Rectification Tools</h3>
            <p className="text-zinc-600 dark:text-zinc-400">Practical steps from Quran and Sunnah to improve your state</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-zinc-500 text-sm">
          Built with Islamic guidance • Authentic sources only
        </footer>
      </main>
    </div>
  );
}
