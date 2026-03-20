"use client";
import React, { useState, useEffect } from 'react';
import { TrendingDown, TrendingUp, RefreshCw, Scissors, Globe } from 'lucide-react';

export default function InvestmentAI() {
  const [analyzing, setAnalyzing] = useState(true);

  useEffect(() => {
    // Simulate NLP fetching and analysis (like FinBERT on news or local mock)
    const timer = setTimeout(() => {
      setAnalyzing(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="glass-panel p-6 animate-fade-in w-full text-left" style={{ animationDelay: '0.25s' }}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Globe className="text-[var(--accent-primary)]" /> Global & Portfolio AI
      </h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Tax-Loss Harvesting */}
        <div className="flex-1 bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)] rounded-xl p-5">
          <h3 className="font-bold flex items-center gap-2 mb-3 text-red-400">
            <Scissors size={18} /> Robo Tax-Loss Harvester
          </h3>
          <p className="text-sm text-gray-300 mb-4">
            AI detected <strong className="text-white">₹45,000</strong> in unrealized short-term losses in your Tech mutual funds. You can sell these to offset your recent ₹50k capital gains.
          </p>
          <div className="flex justify-between items-center bg-gray-900/50 p-3 rounded-lg border border-gray-800">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-200 text-left">HDFC Tech Direct Plan</span>
              <span className="text-xs text-gray-500 text-left">Short Term Cap Loss</span>
            </div>
            <span className="text-sm font-bold text-red-400 flex items-center gap-1">
              <TrendingDown size={14} /> -₹45,000
            </span>
          </div>
          <button className="w-full mt-4 py-2 bg-[rgba(239,68,68,0.15)] hover:bg-[rgba(239,68,68,0.25)] text-red-400 font-semibold rounded-lg transition-colors text-sm">
            Execute Harvesting
          </button>
        </div>

        {/* Market Sentiment */}
        <div className="flex-1 bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.2)] rounded-xl p-5 relative overflow-hidden">
          <h3 className="font-bold flex items-center gap-2 mb-3 text-emerald-400">
            <RefreshCw size={18} className={analyzing ? "animate-spin text-emerald-500/50" : ""} /> AI Market Sentiment
          </h3>
          {analyzing ? (
            <div className="animate-pulse space-y-3 mt-4">
              <div className="h-4 bg-emerald-900/30 rounded w-3/4"></div>
              <div className="h-4 bg-emerald-900/30 rounded w-1/2"></div>
              <p className="text-xs text-emerald-500/50 mt-6 absolute bottom-5">Running FinBERT NLP on latest headlines...</p>
            </div>
          ) : (
            <div className="animate-fade-in text-left">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-3xl font-black text-emerald-400">82%</span>
                <span className="text-sm text-emerald-500 font-bold tracking-wider uppercase mb-1 flex items-center gap-1">
                  <TrendingUp size={14} /> Bullish
                </span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Based on the last 4 hours of financial news, algorithms detect strong positive sentiment for large-cap Indian equities. Your current equity focus requires no immediate rebalancing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
