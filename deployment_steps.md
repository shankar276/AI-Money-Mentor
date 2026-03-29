# 🚀 AI Money Mentor — Deployment Steps

## Prerequisites

| Requirement | Minimum Version | Download |
|---|---|---|
| Node.js | 18+ | https://nodejs.org |
| npm | 9+ | Included with Node.js |
| Google Gemini API Key | — | https://aistudio.google.com |

---

## Files to Transfer

Copy the entire `AI Money Mentor` folder to the new machine.  
You can **skip** these directories (they are auto-generated):

```
node_modules/    ← skip, recreated by npm install
.next/           ← skip, recreated by npm run dev
```

---

## Setup Steps

### Step 1: Install Dependencies
```bash
cd "AI Money Mentor"
npm install
```

### Step 2: Create Environment File
Create a file named `.env.local` in the project root:
```
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```
> ⚠️ Replace `your_api_key_here` with your actual Gemini API key from https://aistudio.google.com

### Step 3: Start the Server
```bash
npm run dev
```

### Step 4: Open in Browser
```
http://localhost:3000
```
> The app auto-redirects to `/mentor` — the agentic chat interface.

---

## Verification Checklist

After opening the browser, confirm each feature works:

| # | Test Prompt | Expected Output |
|---|---|---|
| 1 | `"I am 30 years old. I earn ₹1 Lakh/month, spend ₹50K. Give me my FIRE plan."` | FIRE Roadmap card with Target Corpus, SIP, Asset Allocation |
| 2 | `"I earn ₹15L. I invest ₹1.5L in ELSS and pay ₹50K for health insurance. Old or New regime?"` | Tax Wizard grid with Old vs New comparison and Mathematical Winner |
| 3 | `"I earn ₹1L/month, expenses ₹50K, savings ₹3L, EMI ₹25K, invest ₹10K, term insurance ₹50L. Health Score?"` | 6-bar Money Health Score grid with overall score |
| 4 | Check footer | SEBI disclaimer visible at all times |

> 💡 Click **Reset Chat** between each test to clear previous session state.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `GOOGLE_GENERATIVE_AI_API_KEY` error | Verify `.env.local` exists in the project root and key is valid |
| Port 3000 already in use | Run `npm run dev -- -p 3001` and open `http://localhost:3001` |
| Blank output / all zeros in Health Score | Click **Reset Chat** and resend the prompt |
| `Module not found` errors | Run `npm install` again |
| API quota exceeded | Wait 1 minute (free tier limit) or use a different API key |
| Turbopack cache issues | Delete `.next/` folder and restart with `npm run dev` |

---

## Project Structure (Phase 2)

```
AI Money Mentor/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts       ← Next.js API endpoint
│   │   ├── mentor/page.tsx         ← Chat UI page
│   │   └── page.tsx                ← Redirects to /mentor
│   └── components/
│       └── ChatInterface.tsx       ← Main chat component
├── Track9_AI_Money_Mentor/
│   ├── agent.ts                    ← AI Supervisor Orchestrator
│   └── tools/
│       ├── fire_planner.ts         ← FIRE Calculator
│       ├── tax_wizard.ts           ← Tax Regime Comparator
│       └── health_score.ts         ← 6-Dimension Health Scorer
├── tests/
│   └── integration.spec.ts         ← Playwright E2E Tests
├── .env.local                      ← API Keys (DO NOT COMMIT)
└── deployment_steps.md             ← This file
```

---

## Running Tests (Optional)

```bash
npx playwright test
```
> Requires the dev server to be running (`npm run dev`) and a valid API key.
