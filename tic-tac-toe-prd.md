# 📄 Project Requirements Document (PRD)

## 🧠 Project Summary

Build a fully functional, responsive, and polished **Tic-Tac-Toe web application** using **Next.js** and **TypeScript**, where a **human** plays against an **AI opponent powered by the Google Gemini API**. The app must include modern UX/UI, persistent score tracking, AI reasoning display, and robust error handling.

---

## 🧱 Technology Stack

| Layer              | Technology         |
|-------------------|--------------------|
| Frontend Framework| Next.js (App Router) |
| Language          | TypeScript         |
| Styling           | Tailwind CSS       |
| AI Backend        | Google Gemini API (e.g., Gemini 1.5 Pro/Flash) |
| Storage           | Browser Local Storage |
| Package Manager   | npm or yarn        |

---

## 🗂️ File/Directory Structure

/tic-tac-toe-ai/
├── /app/                      # App Router Pages
│   ├── page.tsx              # Home page with game
│   └── layout.tsx            # Root layout
├── /components/              # Reusable UI Components
│   ├── Board.tsx
│   ├── Cell.tsx
│   ├── Scoreboard.tsx
│   ├── PlayerSettings.tsx
│   ├── GameControls.tsx
│   └── AiExplanation.tsx
├── /lib/                     # Utilities
│   ├── gameLogic.ts          # Win detection, draw logic
│   ├── localStorage.ts       # Score persistence
│   └── aiService.ts          # Gemini API interactions
├── /docs/
│   ├── implementation-plan.md
│   └── phase-completion-log.md
├── /public/                  # Static assets
├── /styles/
│   └── globals.css
├── .env.local                # Gemini API Key placeholder
├── tailwind.config.ts
├── next.config.js
├── README.md
└── ttt-brief.md

---

## ✅ Functional Requirements

### 🎮 Core Game Features

- Render a **3x3 game board**.
- Players alternate turns.
- **Win detection** (rows, cols, diagonals).
- **Draw detection** when board is full.
- Display winner message or “Draw!”.
- **Play Again** button.

### 👤 Player Settings (Before each game)

- Choose symbol: X or O.
- Choose who starts: Human or AI.

### 🤖 AI Integration

- Integrate Google Gemini API using `.env.local` variable:
  NEXT_PUBLIC_GEMINI_API_KEY=your-key-here

- **Send current board state** as JSON to Gemini on AI’s turn:
  {
    "board": [["X", null, "O"], [null, "O", null], ["X", null, null]],
    "aiSymbol": "O",
    "humanSymbol": "X",
    "currentPlayer": "AI"
  }

- **Expected response:**
  {
    "move": [1, 2],
    "explanation": "I chose this to block your win."
  }

- Display **“AI is thinking…”** animation while awaiting.
- Show **AI explanation** after move.

### 📊 Scoreboard

- Track: Human Wins, AI Wins, Draws.
- Save using Local Storage.
- Button: “Reset Scores”.

---

## 🎨 UI/UX Requirements

- **Dark Mode** only.
- **Accent colors** for X, O, buttons, winning line.
- **Animations**:
  - Cell plays
  - Turn highlighting
  - Score updates
  - Win/loss messages
- **Responsive Design**:
  - Mobile first
  - Tablet/Desktop support

---

## ⚙️ State Management

Use built-in React tools:
- `useState`, `useReducer` for board and settings.
- `useContext` for global game state (if needed).

---

## ⚠️ Error Handling

- Gemini API error:
  - Show: “AI encountered an issue. Please try again.”
  - Include: **Retry AI Turn** button.
- General UI errors:
  - Add basic error boundary and fallback UI.

---

## 📋 Documentation Tasks

### `/docs/implementation-plan.md`

- Phase 0: Setup (✅)
- Phase 1: Game Logic + Board UI
- Phase 2: Scoreboard + Local Storage
- Phase 3: Gemini API Integration
- Phase 4: Player Settings + Game Flow UX
- Phase 5: Final Polish + Documentation

### `/docs/phase-completion-log.md`

Track phase completions with:
## Phase 0 - Setup
✅ Completed on 2025-05-13
Moved brief, initialized Next.js with Tailwind, created docs folder.

---

## 📦 Package Installation Plan

Ensure latest installation commands are used (via lookup):

npx create-next-app@latest tic-tac-toe-ai --typescript --app
cd tic-tac-toe-ai
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Then configure `tailwind.config.ts` and `globals.css`.

---

## 📄 README.md Must Include

- 🔑 `.env.local` setup instructions.
- 📥 Install: `npm install`
- ▶️ Run: `npm run dev`
- 📂 Folder structure description.
- 🧠 Brief: Summary of game, Gemini interaction.

---

## ✅ Deliverables

- [ ] Full app source code in `/tic-tac-toe-ai/`
- [ ] `/docs` directory with plan and log files
- [ ] `.env.local` template
- [ ] Fully responsive UI with animation
- [ ] Gemini API AI logic and display
- [ ] README with setup & usage
