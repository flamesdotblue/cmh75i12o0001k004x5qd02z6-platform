import Spline from '@splinetool/react-spline';

export default function Hero({ lastSearched, onSearch }) {
  const handleQuickSearch = () => {
    if (lastSearched) onSearch(lastSearched);
  };

  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/40 to-white pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-10">
        <div className="w-full">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-neutral-900">Your Modern Dictionary</h1>
          <p className="mt-3 text-neutral-600 max-w-2xl">Look up definitions, phonetics, examples, and more with a clean, interactive interface.</p>
          {lastSearched ? (
            <button
              onClick={handleQuickSearch}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 backdrop-blur px-4 py-2 text-sm text-neutral-700 hover:bg-white transition"
            >
              Resume: {lastSearched}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
