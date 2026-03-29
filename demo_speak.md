# 🎥 AI Money Mentor: Demo Script (Phase 2 — Agentic Architecture)

**Duration:** 2–3 minutes  
**Tools suggested:** Loom, OBS, or screen recording  
**URL:** `localhost:3000` (auto-redirects to `/mentor`)

---

## ⏱ 0:00 – 0:20 | Hook & Problem Statement
*Screen: Show the AI Money Mentor chat interface loading.*

> "Hi judges! 95% of Indians have no formal financial plan. Elite advisors cost lakhs per year. We built **AI Money Mentor** — a fully agentic AI system that replaces your financial advisor. No forms. No dashboards. Just talk to it."

---

## ⏱ 0:20 – 1:00 | Demo 1: FIRE Path Planner

*Type into the chat:*
> `"I am 28 years old. I earn ₹1.5 Lakhs per month and spend ₹60,000. I want to retire at 45. Give me my FIRE plan."`

**What to say while it loads:**
> "Watch the agent autonomously extract my age, income, and retirement target — then invoke its internal FIRE Calculator. It runs real compound interest math, not hallucinated text."

**When the output renders:**
> "The agent returned: my target FIRE corpus, required monthly SIP, emergency fund target, asset allocation, insurance gap, and tax-saving moves — all computed mathematically. This is an agentic tool call, not a chatbot making things up."

---

## ⏱ 1:00 – 1:40 | Demo 2: Tax Wizard (Edge Case Scenario)

*Click Reset Chat, then type:*
> `"I earn ₹15 Lakhs annually. I invest ₹1.5 Lakhs in ELSS and pay ₹50,000 for health insurance. Should I choose Old or New Tax Regime?"`

**What to say:**
> "This is the edge case the judges asked for — a user who has deductions in the Old Regime but might still benefit from the simplified New Regime. The agent autonomously routes to the Tax Wizard tool."

**When the 2-column grid renders:**
> "The Wizard computed both regime tax liabilities mathematically using the correct 2024–25 Indian slabs, modelled 80C, 80D, standard deduction, and declared a mathematical winner — the New Regime saves ₹1.11 Lakhs here. This is real math, not AI guesswork."

---

## ⏱ 1:40 – 2:20 | Demo 3: Money Health Score

*Click Reset Chat, then type:*
> `"I earn ₹1 Lakh/month. Expenses ₹50K. Savings ₹3 Lakhs. EMI ₹25K. I invest ₹10K/month. Term insurance ₹50 Lakhs. What's my Money Health Score?"`

**What to say:**
> "Now the agent evaluates the user's full financial wellness across 6 dimensions in a single pass. It identifies that the emergency fund is strong, but insurance coverage is dangerously low at only 42/100."

**When the 6-bar grid renders:**
> "Every bar represents a specific financial pillar — scored against verified Indian benchmarks. The overall score of 74 tells the user they're stable, but underinsured. The agent has effectively done what a CFP would charge ₹10,000 to produce."

---

## ⏱ 2:20 – 2:50 | Architecture & Compliance

*Briefly show the architecture diagram.*

> "The system runs on a Supervisor-Agent pattern. Gemini Flash acts as the orchestration brain. It routes each user intent to a specialized mathematical tool — the FIRE Planner, Tax Wizard, or Health Score Engine — that runs deterministic algorithms. The output flows back as a structured JSON that renders beautifully in the React UI via the Vercel AI SDK."

> "Critically, all responses carry a hardcoded **SEBI disclaimer** in the footer — clearly marking this as AI guidance, not licensed financial advice. That's our regulatory compliance guardrail."

---

## ⏱ 2:50 – 3:00 | Close

> "AI Money Mentor: an agentic, multi-tool financial advisor for every Indian. Built on Next.js 16, Vercel AI SDK 6, and Gemini Flash. Thank you."

---

### 💡 Pre-Recording Checklist
- [ ] Server running: `npm run dev` at `localhost:3000`
- [ ] API key in `.env.local` is valid and has quota  
- [ ] Close all browser tabs except `localhost:3000`
- [ ] Hide bookmarks bar (press `Ctrl+Shift+B`)
- [ ] Pre-type prompts in Notepad to paste quickly
- [ ] Reset Chat before each new demo scenario
