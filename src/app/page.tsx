import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--accent-secondary)] opacity-10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--accent-primary)] opacity-10 blur-[120px] pointer-events-none" />

      <div className="z-10 text-center max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Master Your Wealth with <br/>
          <span className="gradient-text">AI Money Mentor</span>
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
          Unlock your path to financial freedom. Get a comprehensive Money Health Score and an AI-driven FIRE roadmap in minutes. Designed for India.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/onboarding" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
            Get Your Health Score
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <Link href="/dashboard" className="btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
            View Demo Dashboard
          </Link>
        </div>
      </div>

      {/* Feature Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-6xl z-10 w-full px-4">
        <div className="glass-panel glass-panel-interactive p-8 flex flex-col items-start text-left">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(0, 240, 255, 0.1)', color: 'var(--accent-primary)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Money Health Score</h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">A comprehensive 6-dimension analysis of your financial wellness, from emergency funds to tax efficiency.</p>
        </div>

        <div className="glass-panel glass-panel-interactive p-8 flex flex-col items-start text-left">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(112, 0, 255, 0.1)', color: 'var(--accent-secondary)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">FIRE Path Planner</h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Your hyper-personalized roadmap to Financial Independence and Early Retirement, mapped month-by-month.</p>
        </div>

        <div className="glass-panel glass-panel-interactive p-8 flex flex-col items-start text-left">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Tax Wizard</h3>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Automatically identifies missing deductions and models old vs. new tax regimes with your exact numbers.</p>
        </div>
      </div>
    </main>
  );
}
