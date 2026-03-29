import { tool } from 'ai';
import { z } from 'zod';

export const taxWizardTool = tool({
  description: 'Calculates income tax under India\'s Old and New Regimes to determine the most beneficial option. Use this when a user asks about tax planning, Form 16, salary structure, or tax saving investments.',
  parameters: z.object({
    income: z.string().describe("Total annual gross income in INR. ALWAYS return as a string (e.g. '1500000')"),
    investments80C: z.string().describe("Total 80C investments (ELSS, PPF, EPF) in INR. ALWAYS return as a string. Default to '0'"),
    healthInsurance80D: z.string().describe("Total 80D health insurance premiums paid in INR. ALWAYS return as a string. Default to '0'"),
    homeLoanInterest24B: z.string().describe("Total Home Loan interest paid under Section 24(B) in INR. ALWAYS return as a string. Default to '0'"),
    hraExemption: z.string().describe("Calculated HRA exemption amount in INR. ALWAYS return as a string. Default to '0'"),
  }),
  execute: async (rawArgs: any) => {
    // Robust mathematical parsers
    const parseNum = (val: any, def: number) => {
      if (val === undefined || val === null) return def;
      const parsed = parseInt(String(val).replace(/\D/g, ''), 10);
      return isNaN(parsed) ? def : parsed;
    };

    const grossIncome = parseNum(rawArgs.income || rawArgs.annual_income, 0);
    const standardDeduction = 50000;
    
    // Deductions (Old Regime)
    const sec80C = Math.min(150000, parseNum(rawArgs.investments80C || rawArgs.deduction_80c, 0));
    const sec80D = Math.min(75000, parseNum(rawArgs.healthInsurance80D || rawArgs.deduction_80d, 0));
    const sec24B = Math.min(200000, parseNum(rawArgs.homeLoanInterest24B || rawArgs.other_deductions, 0));
    const hra = parseNum(rawArgs.hraExemption || rawArgs.hra_exemption, 0);
    
    const totalDeductionsOld = standardDeduction + sec80C + sec80D + sec24B + hra;
    const taxableOld = Math.max(0, grossIncome - totalDeductionsOld);
    
    // Deductions (New Regime) - Only Standard Deduction allowed (as of recent budgets)
    const totalDeductionsNew = standardDeduction;
    const taxableNew = Math.max(0, grossIncome - totalDeductionsNew);

    // Old Regime Tax Slabs
    const calculateOldTax = (income: number) => {
      if (income <= 250000) return 0;
      if (income <= 500000) return (income - 250000) * 0.05; 
      
      let tax = 12500; 
      if (income <= 1000000) return tax + (income - 500000) * 0.2;
      
      tax += 100000; 
      return tax + (income - 1000000) * 0.3;
    };

    // New Regime Tax Slabs (FY 24-25 Rules roughly)
    const calculateNewTax = (income: number) => {
      if (income <= 300000) return 0;
      if (income <= 600000) return (income - 300000) * 0.05; 
      
      let tax = 15000;
      if (income <= 900000) return tax + (income - 600000) * 0.1;
      
      tax += 30000;
      if (income <= 1200000) return tax + (income - 900000) * 0.15;
      
      tax += 45000;
      if (income <= 1500000) return tax + (income - 1200000) * 0.2;
      
      tax += 60000;
      return tax + (income - 1500000) * 0.3;
    };

    let oldTax = calculateOldTax(taxableOld);
    if (taxableOld <= 500000) oldTax = 0; // 87A rebate
    oldTax = oldTax * 1.04; // 4% Cess
    
    let newTax = calculateNewTax(taxableNew);
    if (taxableNew <= 700000) newTax = 0; // 87A rebate
    newTax = newTax * 1.04; // 4% Cess
    
    const bestRegime = oldTax < newTax ? 'OLD REGIME' : 'NEW REGIME';
    const savings = Math.abs(oldTax - newTax);

    return {
      grossIncome: Math.round(grossIncome),
      taxableOld: Math.round(taxableOld),
      taxableNew: Math.round(taxableNew),
      totalTaxOld: Math.round(oldTax),
      totalTaxNew: Math.round(newTax),
      recommendation: {
        bestRegime,
        taxSaved: Math.round(savings),
        actionableAdvice: oldTax < newTax 
          ? "You have significant deductions. Stick to the Old Tax Regime and continue maximizing 80C and 80D." 
          : "Your deductions are not enough to beat the massive lower slab rates of the New Regime. Switch to the New Regime instantly and enjoy a higher in-hand salary."
      }
    };
  },
} as any);
