import { tool } from 'ai';
import { z } from 'zod';

export const healthScoreTool = tool({
  description: 'Calculates a 6-dimensional Money Health Score (0-100) based on Indian financial wellness metrics. Use this when a user asks for a health check, wellness score, or onboarding assessment.',
  parameters: z.object({
    monthlyIncome: z.string().describe("Total monthly income. E.g. '100000'"),
    monthlyExpenses: z.string().describe("Total monthly living expenses. E.g. '50000'"),
    currentSavings: z.string().describe("Total liquid cash/savings for emergencies. E.g. '200000'"),
    totalEMI: z.string().describe("Total monthly EMI paid towards debt. Default to '0'"),
    insuranceCover: z.string().describe("Total Life + Health insurance cover amount. Default to '0'"),
    monthlyInvestments: z.string().describe("Total amount invested every month. Default to '0'"),
  }),
  execute: async (rawArgs: any) => {
    // Robust parsing for unpredictable LLM structures
    const parseNum = (val: any, def: number) => {
      if (val === undefined || val === null) return def;
      const parsed = parseInt(String(val).replace(/\D/g, ''), 10);
      return isNaN(parsed) ? def : parsed;
    };

    // Deep scanning extractor to intercept completely hallucinated LLM dictionary keys
    const extract = (keywords: string[], def: number) => {
      if (!rawArgs || typeof rawArgs !== 'object') return def;
      for (const [key, value] of Object.entries(rawArgs)) {
        if (keywords.some(k => key.toLowerCase().includes(k))) {
          return parseNum(value, def);
        }
      }
      return def;
    };

    const income = extract(['income', 'salary', 'earn'], 100000);
    const expenses = extract(['expense', 'spend', 'cost'], income * 0.5);
    const savings = extract(['saving', 'cash', 'bank'], 0);
    const emi = extract(['emi', 'debt', 'loan', 'liability'], 0);
    const insurance = extract(['insurance', 'cover', 'term'], 0);
    const investments = extract(['invest', 'sip', 'mutual'], 0);

    // 1. Emergency Preparedness (Target: 6 months of expenses)
    const emergencyRatio = expenses > 0 ? savings / expenses : 0;
    const emergencyScore = Math.min(100, Math.max(0, (emergencyRatio / 6) * 100));

    // 2. Insurance Coverage (Target: 120x monthly income = 10 years income)
    const insuranceRatio = income > 0 ? insurance / (income * 120) : 0;
    const insuranceScore = Math.min(100, Math.max(0, insuranceRatio * 100));

    // 3. Debt Health (Target: EMI < 30% of income is optimal)
    const emiRatio = income > 0 ? emi / income : 0;
    const debtScore = emiRatio <= 0.3 ? 100 : Math.max(0, 100 - ((emiRatio - 0.3) * 250)); // drops to 0 if EMI is 70%

    // 4. Investment/Savings Rate (Target: Investing > 20% of income)
    const investmentRatio = income > 0 ? investments / income : 0;
    const investmentScore = Math.min(100, Math.max(0, (investmentRatio / 0.2) * 100));

    // 5. Tax Efficiency Proxy (Are you investing enough to max 80C?)
    // Based on ₹1.5L annual = ₹12500/mo. If monthlyInvestments > 12500, tax score is 100.
    const taxScore = Math.min(100, Math.max(0, (investments / 12500) * 100));

    // 6. Retirement Readiness (Proxy derived from Savings Rate + Debt control)
    const retirementScore = Math.round((investmentScore * 0.6) + (debtScore * 0.4));

    const overallScore = Math.round((emergencyScore + insuranceScore + debtScore + investmentScore + taxScore + retirementScore) / 6);

    return {
      overallScore,
      summary: overallScore >= 80 ? "Excellent Financial Health" : overallScore >= 50 ? "Stable, but needs optimization" : "High Financial Risk. Urgent action required.",
      metrics: [
        { label: "Emergency Fund", score: Math.round(emergencyScore), target: "6 Months Expenses" },
        { label: "Insurance Cover", score: Math.round(insuranceScore), target: "10x Annual Income" },
        { label: "Debt Health", score: Math.round(debtScore), target: "EMI < 30% Income" },
        { label: "Savings Rate", score: Math.round(investmentScore), target: "> 20% Income" },
        { label: "Tax Efficiency", score: Math.round(taxScore), target: "Max 80C Deductions" },
        { label: "Retirement Path", score: Math.round(retirementScore), target: "Strong Compounding" }
      ]
    };
  },
} as any);
