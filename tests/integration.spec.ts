import { test, expect } from '@playwright/test';

/**
 * AI Money Mentor — Phase 2 Agentic Integration Tests
 * 
 * These tests validate the full agentic pipeline:
 * User chat input → /api/chat → Agent Orchestrator → Tool invocation → Rendered UI output
 * 
 * NOTE: Requires a running dev server (`npm run dev`) and valid GOOGLE_GENERATIVE_AI_API_KEY in .env.local
 */

test.describe('AI Money Mentor — Phase 2 Agentic Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the mentor page (root auto-redirects to /mentor)
    await page.goto('http://localhost:3000/');
    await page.waitForURL('**/mentor');
    await expect(page).toHaveTitle(/AI Money Mentor/i);
  });

  // ─────────────────────────────────────────────────────────────────────
  // TEST 1: FIRE Path Planner Tool
  // ─────────────────────────────────────────────────────────────────────
  test('FIRE Planner — should invoke fire_planner tool and render corpus card', async ({ page }) => {
    const input = page.getByPlaceholder('Ask your mentor anything...');
    await input.fill('I am 28 years old. I earn ₹1.5 Lakhs per month and spend ₹60,000. I want to retire at 45. Give me my FIRE plan.');
    await page.keyboard.press('Enter');

    // Wait for agent to invoke tool and stream result (up to 30s for API)
    await expect(page.getByText('Computed FIRE Roadmap')).toBeVisible({ timeout: 30000 });

    // Validate key output fields rendered in the UI
    await expect(page.getByText('Target Corpus')).toBeVisible();
    await expect(page.getByText('Required SIP')).toBeVisible();
    await expect(page.getByText('Complete Financial Roadmap')).toBeVisible();
    await expect(page.getByText('Emergency Fund')).toBeVisible();
    await expect(page.getByText('Asset Allocation')).toBeVisible();
  });

  // ─────────────────────────────────────────────────────────────────────
  // TEST 2: Tax Wizard — Old vs New Regime Edge Case
  // ─────────────────────────────────────────────────────────────────────
  test('Tax Wizard — should invoke tax_wizard tool and determine mathematical winner', async ({ page }) => {
    // Reset to clean state
    const resetBtn = page.getByText('Reset Chat');
    if (await resetBtn.isVisible()) await resetBtn.click();
    await page.waitForTimeout(1000);

    const input = page.getByPlaceholder('Ask your mentor anything...');
    await input.fill('I earn ₹15 Lakhs annually. I invest ₹1.5 Lakhs in ELSS and pay ₹50,000 for health insurance. Should I choose Old or New Tax Regime?');
    await page.keyboard.press('Enter');

    // Wait for Tax Wizard tool output
    await expect(page.getByText('Tax Wizard Analysis')).toBeVisible({ timeout: 30000 });

    // Validate regime comparison grid rendered
    await expect(page.getByText('Old Regime Tax')).toBeVisible();
    await expect(page.getByText('New Regime Tax')).toBeVisible();
    await expect(page.getByText('Mathematical Winner')).toBeVisible();

    // Ensure numeric values are present (not ₹0)
    const oldTaxText = await page.getByText(/Taxable: ₹/).first().textContent();
    expect(oldTaxText).not.toContain('₹0');
  });

  // ─────────────────────────────────────────────────────────────────────
  // TEST 3: Money Health Score — 6-Dimension Evaluator
  // ─────────────────────────────────────────────────────────────────────
  test('Health Score — should invoke health_score_tool and render 6-bar wellness grid', async ({ page }) => {
    // Reset to clean state
    const resetBtn = page.getByText('Reset Chat');
    if (await resetBtn.isVisible()) await resetBtn.click();
    await page.waitForTimeout(1000);

    const input = page.getByPlaceholder('Ask your mentor anything...');
    await input.fill('I earn ₹1,00,000 per month. My expenses are ₹50,000. I have ₹3,00,000 in savings. My EMI is ₹25,000. I invest ₹10,000 per month. I have ₹50 Lakh term insurance. What is my Money Health Score?');
    await page.keyboard.press('Enter');

    // Wait for Health Score tool output
    await expect(page.getByText('Money Health Score')).toBeVisible({ timeout: 30000 });

    // Verify all 6 dimension labels render
    await expect(page.getByText('Emergency Fund')).toBeVisible();
    await expect(page.getByText('Insurance Cover')).toBeVisible();
    await expect(page.getByText('Debt Health')).toBeVisible();
    await expect(page.getByText('Savings Rate')).toBeVisible();
    await expect(page.getByText('Tax Efficiency')).toBeVisible();
    await expect(page.getByText('Retirement Path')).toBeVisible();

    // Validate overall score is not 0
    const scoreText = await page.locator('text=/\\d+\\/100/').first().textContent();
    expect(scoreText).not.toBe('0/100');
  });

  // ─────────────────────────────────────────────────────────────────────
  // TEST 4: SEBI Compliance Disclaimer
  // ─────────────────────────────────────────────────────────────────────
  test('Compliance — SEBI disclaimer must always be visible', async ({ page }) => {
    await expect(page.getByText(/SEBI registered investment advisor/i)).toBeVisible();
    await expect(page.getByText(/not licensed financial advisory/i)).toBeVisible();
  });

  // ─────────────────────────────────────────────────────────────────────
  // TEST 5: Reset Chat Functionality
  // ─────────────────────────────────────────────────────────────────────
  test('UI — Reset Chat button should clear message history', async ({ page }) => {
    const input = page.getByPlaceholder('Ask your mentor anything...');
    await input.fill('Hello');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);

    const resetBtn = page.getByText('Reset Chat');
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();

    // After reload, the "Start Your Journey" empty state should show
    await expect(page.getByText('Start Your Journey')).toBeVisible({ timeout: 5000 });
  });
});
