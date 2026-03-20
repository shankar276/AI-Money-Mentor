"use client";
import React, { useState } from 'react';
import { FileText, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ContractSummarizer() {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [summary, setSummary] = useState<{ gotchas: string[], keyPoints: string[] } | null>(null);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setSummary(null);
    
    // Simulate LLM Processing Delay (like Gemini API or Groq API)
    setTimeout(() => {
      setSummary({
        gotchas: [
          "Introductory 0% APR expires in 6 months, jumping to 24.99%.",
          "There is a hidden ₹500 annual maintenance charge if minimum balance is not met.",
          "Late payments immediately forfeit your accumulated reward points."
        ],
        keyPoints: [
          "You get 5% cashback on groceries, utilities, and fuel.",
          "Limit successfully approved for ₹1,50,000.",
          "Zero foreign transaction markups for the first 12 months."
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="glass-panel p-6 animate-fade-in w-full text-left" style={{ animationDelay: '0.35s' }}>
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        <FileText className="text-[var(--accent-primary)]" /> Document & Contract Summarizer
      </h2>
      <p className="text-sm text-gray-400 mb-4">Paste your credit card terms, loan agreements, or fine print. Our AI (Google Gemini simulation) will find the hidden &quot;Gotchas&quot; instantly.</p>
      
      <div className="flex flex-col gap-4">
        <textarea
          className="w-full bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-sm text-gray-200 outline-none focus:border-[var(--accent-primary)] transition-colors resize-none"
          rows={4}
          placeholder="Paste legally dense text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button 
          onClick={handleAnalyze}
          disabled={isAnalyzing || !text.trim()}
          className="self-end px-6 py-2 bg-[var(--accent-primary)] hover:bg-[#0092b7] text-white rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[var(--accent-primary)]/20"
        >
          {isAnalyzing ? <><Sparkles size={16} className="animate-spin-slow" /> Analyzing...</> : "Scan Document"}
        </button>
      </div>

      {summary && (
        <div className="mt-6 pt-6 border-t border-gray-800 animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 bg-[rgba(239,68,68,0.05)] p-4 rounded-xl border border-[rgba(239,68,68,0.1)]">
            <h4 className="font-bold text-red-500 flex items-center gap-2"><AlertCircle size={16} /> Red Flags / Gotchas</h4>
            <ul className="space-y-2">
              {summary.gotchas.map((g, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-red-500 mt-1 flex-shrink-0">•</span> <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3 bg-[rgba(16,185,129,0.05)] p-4 rounded-xl border border-[rgba(16,185,129,0.1)]">
            <h4 className="font-bold text-emerald-500 flex items-center gap-2"><CheckCircle2 size={16} /> Key Benefits</h4>
            <ul className="space-y-2">
              {summary.keyPoints.map((k, i) => (
                <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-emerald-500 mt-1 flex-shrink-0">•</span> <span>{k}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
