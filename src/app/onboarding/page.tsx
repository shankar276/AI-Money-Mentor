"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    expenses: '',
    savings: '',
    debt: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        // Mock generation complete, push to dashboard
        router.push('/dashboard');
      }, 2500);
    }
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-3xl font-bold mb-2">Let's start with the basics</h2>
            <p className="text-[var(--text-secondary)] mb-8">This helps our AI map your current financial lifecycle.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Your Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} 
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all" 
                  placeholder="e.g. 28" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Monthly Post-Tax Income (₹)</label>
                <input type="number" name="income" value={formData.income} onChange={handleChange} 
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--accent-primary)] transition-all" 
                  placeholder="e.g. 100000" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-3xl font-bold mb-2">Checking your cashflow</h2>
            <p className="text-[var(--text-secondary)] mb-8">We use this to analyze your savings rate and emergency readiness.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Average Monthly Expenses (₹)</label>
                <input type="number" name="expenses" value={formData.expenses} onChange={handleChange} 
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--accent-primary)] transition-all" 
                  placeholder="e.g. 60000" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Total Liquid Savings/Investments (₹)</label>
                <input type="number" name="savings" value={formData.savings} onChange={handleChange} 
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--accent-primary)] transition-all" 
                  placeholder="e.g. 500000" />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-3xl font-bold mb-2">Liabilities</h2>
            <p className="text-[var(--text-secondary)] mb-8">Almost there! Understanding your debt helps optimize your FIRE roadmap.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Total Outstanding Debt (₹)</label>
                <input type="number" name="debt" value={formData.debt} onChange={handleChange} 
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--accent-primary)] transition-all" 
                  placeholder="Includes credit cards, personal loans, etc." />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute top-0 left-0 w-full p-6">
        <Link href="/" className="text-[var(--accent-primary)] font-bold tracking-wider hover:opacity-80 transition-opacity">
          &larr; AI MONEY MENTOR
        </Link>
      </div>

      <div className="glass-panel max-w-lg w-full p-8 md:p-10 relative overflow-hidden">
        
        {isAnalyzing ? (
          <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-16 h-16 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mb-6"></div>
            <h2 className="text-2xl font-bold mb-4 gradient-text">AI is computing your Health Score...</h2>
            <p className="text-[var(--text-secondary)]">Analyzing asset allocation, optimizing tax structures, and projecting FIRE timeline.</p>
          </div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="flex gap-2 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= i ? 'bg-[var(--accent-primary)] box-shadow-[0_0_10px_var(--accent-glow)]' : 'bg-gray-700'}`} />
              ))}
            </div>

            {renderStepContent()}

            <div className="mt-10 flex justify-between items-center">
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} className="text-gray-400 hover:text-white transition-colors">
                  Back
                </button>
              ) : <div></div>}
              
              <button onClick={handleNext} className="btn-primary py-2 px-6">
                {step === 3 ? 'Generate AI Roadmap' : 'Continue'}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
