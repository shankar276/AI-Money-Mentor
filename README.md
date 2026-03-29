# AI Money Mentor 🇮🇳💡

> **95% of Indians don't have a financial plan. AI Money Mentor gives every Indian access to elite-level financial intelligence — through a conversational AI agent.**

**Live Project URL:** [https://ai-money-mentor-275674809491.asia-south1.run.app](https://ai-money-mentor-275674809491.asia-south1.run.app)

**AI Money Mentor** is a fully agentic AI financial advisor built on a Supervisor-Worker architecture. Users simply talk to the agent in plain language — the system autonomously routes, calculates, and returns structured, actionable financial plans. No forms. No dashboards. Just intelligence.

---

## 🎯 The Problem

In India, elite financial advisory is restricted to the top 1%. The average earner faces:
- Confusion between Old vs New tax regimes (leaving lakhs of savings on the table)
- No emergency fund benchmarking or insurance gap awareness
- Zero visibility into when they can achieve Financial Independence (FIRE)

## 💡 Our Solution: An Agentic Financial Mentor

The AI Money Mentor uses a **Supervisor-Agent pattern** powered by Google Gemini. It:
1. Interprets natural language financial queries
2. Autonomously routes to the right mathematical tool
3. Returns structured, personalized, regulation-aware advice in seconds

---

## 🚀 Key Features (Phase 2 — Fully Agentic)

### 1. 🔥 FIRE Path Planner
Tell the agent your age, income, expenses, and retirement goal. It autonomously calculates:
- Target FIRE corpus using compound interest math
- Required monthly SIP
- Emergency fund target (6× expenses)
- Asset allocation (Rule of 100 − Age)
- Insurance gap (term life + health)
- Top 3 tax-saving moves

### 2. 🧾 Tax Wizard (Old vs New Regime)
Tell the agent your salary, 80C investments, and insurance premiums. It:
- Models both regimes mathematically using 2024–25 Indian tax slabs
- Applies standard deduction, 80C, 80D, 24B, and 87A rebate
- Declares a **Mathematical Winner** with exact rupee savings
- Handles the edge case: users with high deductions who still benefit from the New Regime

### 3. 💯 Money Health Score
Tell the agent your income, savings, EMI, and insurance. It evaluates your financial wellness across **6 dimensions**:
| Dimension | Target Benchmark |
|---|---|
| Emergency Fund | 6× Monthly Expenses |
| Insurance Cover | 10× Annual Income |
| Debt Health | EMI < 30% of Income |
| Savings Rate | > 20% of Income |
| Tax Efficiency | Max 80C Deductions (₹1.5L/yr) |
| Retirement Path | Derived from Savings + Debt Score |

Returns a 0–100 overall score with a 6-bar progress grid.

---

## ⚖️ Regulatory Compliance

All responses carry a **hardcoded SEBI disclaimer** distinguishing AI-generated mathematical guidance from licensed financial advisory — satisfying the hackathon's regulatory compliance requirement.

---

## 🏗 System Architecture

- **[System Architecture Diagram (PDF)](./system_architecture.pdf)**
- **[System Architecture Diagram (PNG)](./system_architecture.png)**
- **[Mermaid Source](./architecture.mmd)**

```
User → ChatInterface (useChat) → /api/chat (Next.js)
  → agent.ts (Supervisor, Gemini Flash)
    → fire_planner.ts | tax_wizard.ts | health_score.ts
  → Structured JSON → Rendered UI Cards
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| AI SDK | Vercel AI SDK v6 (`ai`, `@ai-sdk/react`) |
| LLM | Google Gemini Flash (`@ai-sdk/google`) |
| Schema | Zod |
| Styling | Vanilla CSS (Glassmorphism dark mode) |
| Tests | Playwright |

---

## 🏃 Running Locally

See **[deployment_steps.md](./deployment_steps.md)** for full setup instructions.

**Quick start:**
```bash
npm install
# Create .env.local with: GOOGLE_GENERATIVE_AI_API_KEY=your_key
npm run dev
# Open http://localhost:3000
```

---

## 📁 Hackathon Submission Checklist

- [x] **System Architecture Diagram** — `system_architecture.pdf` & `.png`
- [x] **Functional Prototype** — 3 working agentic tools (FIRE, Tax, Health Score)
- [x] **SEBI Compliance Guardrail** — Hardcoded disclaimer in UI
- [x] **Edge Case Handled** — Old vs New regime with deduction-heavy user profile
- [x] **README/Documentation** — This file
- [x] **Integration Tests** — Playwright tests in `tests/integration.spec.ts`
- [ ] **Demo Video** — *[Add your Loom/YouTube link here]*

---

*Built with ❤️ for the AI Money Mentor Hackathon — Track 9*
