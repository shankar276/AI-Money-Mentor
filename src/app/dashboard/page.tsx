"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ShieldCheck, TrendingUp, PiggyBank, HeartPulse, FileText, Target } from 'lucide-react';
import CashFlowForecaster from '../../components/CashFlowForecaster';
import InvestmentAI from '../../components/InvestmentAI';
import VoiceAssistant from '../../components/VoiceAssistant';
import ContractSummarizer from '../../components/ContractSummarizer';

const fireData = [
  { year: 2024, netWorth: 5 },
  { year: 2026, netWorth: 18 },
  { year: 2028, netWorth: 35 },
  { year: 2030, netWorth: 60 },
  { year: 2033, netWorth: 110 },
  { year: 2036, netWorth: 185 }, // FIRE Independence
  { year: 2040, netWorth: 280 }
];

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col md:flex-row gap-6 relative max-w-7xl mx-auto">
      
      {/* Sidebar / Profile Summary */}
      <aside className="w-full md:w-1/3 flex flex-col gap-6">
        <div className="glass-panel p-6 animate-fade-in flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-primary)] opacity-10 rounded-full blur-3xl pointer-events-none"></div>
          
          <h2 className="text-xl font-bold mb-6 text-gray-300">Money Health Score</h2>
          <div className="relative w-40 h-40 flex items-center justify-center mb-6">
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
              <circle cx="80" cy="80" r="70" fill="none" stroke="var(--accent-primary)" strokeWidth="12" strokeDasharray="440" strokeDashoffset="66" className="transition-all duration-1000 ease-out" />
            </svg>
            <div className="flex flex-col items-center justify-center">
              <span className="text-5xl font-extrabold gradient-text">85</span>
              <span className="text-sm text-[var(--text-secondary)] mt-1">Excellent</span>
            </div>
          </div>

          <div className="w-full text-left space-y-4">
            <div className="bg-[rgba(255,255,255,0.05)] p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
              <span className="flex items-center gap-2 text-sm font-semibold mb-1 text-[var(--accent-secondary)]">
                <Target size={16} /> AI Insight
              </span>
              <p className="text-sm text-gray-300 leading-relaxed">
                Your savings rate is 35%, putting you in the top 10% of your peer group. To reach FIRE by 2036, maintain a 12% equity return and step up your SIP by 10% annually.
              </p>
            </div>
          </div>
        </div>

        {/* 6 Dimensions of Health */}
        <div className="glass-panel p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h3 className="font-bold mb-4 text-gray-300">Wellness Dimensions</h3>
          <div className="space-y-4">
            {[
              { name: 'Emergency Fund', score: 90, color: '#10b981', icon: PiggyBank },
              { name: 'Insurance Coverage', score: 65, color: '#f59e0b', icon: ShieldCheck },
              { name: 'Debt Health', score: 95, color: '#10b981', icon: HeartPulse },
              { name: 'Investments', score: 80, color: '#00add8', icon: TrendingUp },
              { name: 'Tax Efficiency', score: 40, color: '#ef4444', icon: FileText },
            ].map((dim, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-300">
                    <dim.icon size={14} color={dim.color} /> {dim.name}
                  </span>
                  <span className="font-medium" style={{ color: dim.color }}>{dim.score}/100</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full" style={{ width: `${dim.score}%`, backgroundColor: dim.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Dashboard Area */}
      <section className="w-full md:w-2/3 flex flex-col gap-6">
        
        {/* Predictive Cash Flow */}
        <div className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <CashFlowForecaster />
        </div>
        
        {/* FIRE Planner */}
        <div className="glass-panel p-6 md:p-8 animate-fade-in flex-1" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-2">FIRE Roadmap</h2>
          <p className="text-[var(--text-secondary)] mb-8">Projected Net Worth (₹ Lakhs). You are on track to achieve Financial Independence by age 38.</p>
          
          <div className="w-full h-[300px]">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={fireData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}L`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-glass)', borderRadius: '12px' }}
                    itemStyle={{ color: 'var(--accent-primary)' }}
                  />
                  <Area type="monotone" dataKey="netWorth" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorNetWorth)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Investment AI */}
        <div className="w-full">
          <InvestmentAI />
        </div>

        {/* Actionable Tasks */}
        <div className="glass-panel p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-xl font-bold mb-4">AI Action Plan</h3>
          <div className="space-y-3">
            <div className="bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)] rounded-xl p-4 flex justify-between items-center transition-all hover:bg-[rgba(239,68,68,0.1)] cursor-pointer">
              <div>
                <h4 className="font-semibold text-[#ef4444] mb-1">Optimize Tax (High Impact)</h4>
                <p className="text-sm text-gray-400">You are missing ₹30,000 in NPS 80CCD(1B) deduction.</p>
              </div>
              <button className="px-4 py-2 bg-[rgba(239,68,68,0.1)] text-[#ef4444] rounded-lg text-sm font-semibold">Review</button>
            </div>
            
            <div className="bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.2)] rounded-xl p-4 flex justify-between items-center transition-all hover:bg-[rgba(245,158,11,0.1)] cursor-pointer">
              <div>
                <h4 className="font-semibold text-[#f59e0b] mb-1">Boost Life Insurance</h4>
                <p className="text-sm text-gray-400">Your term cover is 5x your income. AI suggests minimum 10x cover.</p>
              </div>
              <button className="px-4 py-2 bg-[rgba(245,158,11,0.1)] text-[#f59e0b] rounded-lg text-sm font-semibold">Explore</button>
            </div>
          </div>
        </div>
        {/* Contract & Document Summarizer */}
        <ContractSummarizer />

      </section>

      {/* Global Floating AI Voice Assistant */}
      <VoiceAssistant />
    </main>
  );
}
