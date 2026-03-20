"use client";
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Activity, AlertCircle } from 'lucide-react';

const generateMockData = () => {
  const data = [];
  let balance = 45000;
  
  // Past 15 days
  for (let i = -15; i <= 0; i++) {
    const day = new Date();
    day.setDate(day.getDate() + i);
    
    // Add some noise
    balance += (Math.random() * 2000) - 1500;
    
    // Salary day mockup
    if (day.getDate() === 1 || day.getDate() === 31) balance += 80000;
    
    data.push({
      date: day.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      balance: Math.round(balance),
      isForecast: false
    });
  }
  
  // Forecast 15 days
  let forecastBalance = balance;
  for (let i = 1; i <= 15; i++) {
    const day = new Date();
    day.setDate(day.getDate() + i);
    
    // Gradual decline with basic moving average simulation
    forecastBalance -= 1200; 
    
    // Upcoming fixed bill
    if (day.getDate() === 5) forecastBalance -= 15000; // Rent
    if (day.getDate() === 10) forecastBalance -= 3000; // Utilities
    
    data.push({
      date: day.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      balance: Math.round(forecastBalance),
      isForecast: true
    });
  }
  
  return data;
};

export default function CashFlowForecaster() {
  const [data, setData] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [safeToSpend, setSafeToSpend] = useState(0);
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const mockData = generateMockData();
    setData(mockData);
    
    setTodayDate(mockData[15]?.date || "");
    
    // Simple math: Current Balance - (Upcoming Fixed Expenses) / Days remaining
    // Mocked for hackathon demonstration
    const currentBalance = mockData[15].balance;
    
    // Safe to spend daily
    const dailySafe = Math.floor((currentBalance - 25000) / 15); // keeping 25k buffer
    setSafeToSpend(Math.max(0, dailySafe));
    
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-64 animate-pulse bg-gray-800 rounded-xl" />;

  return (
    <div className="glass-panel p-6 animate-fade-in flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Activity className="text-[var(--accent-primary)]" /> Predictive Cash Flow
          </h2>
          <p className="text-sm text-gray-400 mt-1">AI 30-day forecast based on your spending patterns</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400 mb-1">Safe to Spend (Daily)</p>
          <p className="text-2xl font-bold text-emerald-400">₹{safeToSpend.toLocaleString('en-IN')}</p>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="date" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
              labelStyle={{ color: '#9ca3af' }}
            />
            
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="#8b5cf6" 
              strokeWidth={3} 
              fill="url(#colorBalance)" 
              name="Account Balance"
            />
            
            {/* Mark today splitting actual vs forecast */}
            {todayDate && <ReferenceLine x={todayDate} stroke="rgba(255,255,255,0.3)" strokeDasharray="3 3" label={{ position: 'top', value: 'Today', fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />}
          </AreaChart>
        </ResponsiveContainer>
        
        {/* Helper Badge */}
        <div className="absolute top-2 right-4 bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)] text-[#8b5cf6] text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <AlertCircle size={12} /> Includes upcoming ₹15k Rent deduction
        </div>
      </div>
    </div>
  );
}
