import { tool } from 'ai';
import { z } from 'zod';

export const firePlannerTool = tool({
  description: 'Calculates a Financial Independence, Retire Early (FIRE) roadmap. Call this when a user asks for retirement planning, SIP targets, or FIRE logic. Ask the user for missing parameters if they are not provided in the chat.',
  parameters: z.object({
    currentAge: z.string().describe("User's current age. ALWAYS return as a string (e.g. '30')"),
    targetRetirementAge: z.string().describe("Intended retirement age. ALWAYS return as a string (e.g. '55')"),
    currentSavings: z.string().describe("Total existing investments in INR. ALWAYS return as a string. Default to '0'"),
    monthlyExpenses: z.string().describe("Current monthly living expenses in INR. ALWAYS return as a string."),
  }),
  execute: async (rawArgs: any) => {
    // Robust mathematical parsers guaranteeing numbers even if AI sends strings like "55 years"
    const parseNum = (val: any, def: number) => {
      if (val === undefined || val === null) return def;
      const parsed = parseInt(String(val).replace(/\D/g, ''), 10);
      return isNaN(parsed) ? def : parsed;
    };

    const age = parseNum(rawArgs.currentAge, 30);
    let targetAge = parseNum(rawArgs.targetRetirementAge, 0);
    if (!targetAge || targetAge <= age) targetAge = age + 15; // Default to +15 years
    
    const savings = parseNum(rawArgs.currentSavings, 0);
    const expenses = parseNum(rawArgs.monthlyExpenses, 50000);
    
    console.log("🔥 FIRE PLANNER EXECUTED WITH ARGS:", { rawArgs, parsed: { age, targetAge, savings, expenses } });

    const yearsToRetire = targetAge - age;

    // 1. Calculate future expenses adjusting for 6% inflation
    const annualExpenses = expenses * 12;
    const futureAnnualExpenses = annualExpenses * Math.pow(1.06, yearsToRetire);
    
    // 2. Calculate target corpus using a 35x conservative multiple (approx 2.85% safe withdrawal rate)
    const targetCorpus = futureAnnualExpenses * 35;
    
    // 3. Calculate future value of existing savings assuming 12% returns
    const fvSavings = savings * Math.pow(1.12, yearsToRetire);
    
    // 4. Calculate shortfall
    const shortfall = Math.max(0, targetCorpus - fvSavings);
    
    // 5. Calculate required monthly SIP (assuming 12% annual return -> 1% monthly)
    const rate = 0.12 / 12; 
    const months = yearsToRetire * 12;
    
    let requiredSIP = 0;
    if (shortfall > 0) {
      requiredSIP = (shortfall * rate) / (Math.pow(1 + rate, months) - 1);
    }
    
    // Feature Expansion: Comprehensive Roadmap
    // 1. Emergency Fund (6 months of monthly expenses)
    const emergencyFund = expenses * 6;
    
    // 2. Asset Allocation Shift (100 - age rule for Equity, adjusted for retirement horizon)
    const equityWeight = Math.min(80, Math.max(40, 100 - age));
    const debtWeight = 100 - equityWeight;
    
    // 3. Insurance Gap (Term life cover rule of thumb: 15x Annual Income)
    // We can estimate income natively from expenses and SIP capacity, but if we assume 30% savings rate:
    const estimatedAnnualIncome = (expenses * 12) * 1.5; 
    const recommendedLifeCover = Math.round(estimatedAnnualIncome * 15);
    const recommendedHealthCover = 1000000; // 10L baseline family cover
    
    // 4. Tax Saving Moves (Indian Context)
    const taxMoves = [
      "Max out ₹1.5L in ELSS/PPF under Section 80C for equity growth.",
      "Invest ₹50,000 in NPS under Section 80CCD(1B) for extra deduction.",
      "Secure Health Insurance for self and parents under Section 80D (₹25k-₹75k limit)."
    ];

    return {
      targetCorpus: Math.round(targetCorpus),
      futureAnnualExpenses: Math.round(futureAnnualExpenses),
      fvOfCurrentSavings: Math.round(fvSavings),
      shortfall: Math.round(shortfall),
      requiredMonthlySIP: Math.round(requiredSIP),
      roadmap: {
        emergencyFundTarget: emergencyFund,
        assetAllocation: { equity: `${equityWeight}%`, debt: `${debtWeight}%` },
        insuranceGap: { lifeCover: recommendedLifeCover, healthCover: recommendedHealthCover },
        taxSavingMoves: taxMoves
      },
      assumptions: {
        inflationRate: '6%',
        expectedMarketReturn: '12%',
        safeWithdrawalRateMultiple: '35x'
      }
    };
  },
} as any);
