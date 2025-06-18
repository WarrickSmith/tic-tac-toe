# 🎮 Tic-Tac-Toe AI

A fully functional, responsive Tic-Tac-Toe web application built with Next.js and TypeScript, featuring an AI opponent powered by Google's Gemini API.

## ✨ Features

- 🤖 **AI Opponent**: Play against an intelligent AI powered by Google Gemini API
- 🎯 **Smart Fallback**: Built-in strategic AI logic when API is unavailable
- 📊 **Score Tracking**: Persistent scoreboard using browser localStorage
- ⚙️ **Game Settings**: Choose your symbol (X/O) and who goes first
- 🎨 **Modern UI**: Dark mode design with smooth animations
- 📱 **Responsive**: Optimized for mobile, tablet, and desktop
- 💡 **AI Explanations**: See the reasoning behind AI moves

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Google Gemini API key (optional but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tic-tac-toe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Edit `.env.local` and add your Gemini API key:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your-actual-api-key-here
   ```
   
   > **Note**: The app works without an API key using fallback AI logic, but the Gemini integration provides more intelligent and varied gameplay.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
tic-tac-toe/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Main game page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles and animations
│   ├── components/            # Reusable UI components
│   │   ├── Board.tsx         # Game board (3x3 grid)
│   │   ├── Cell.tsx          # Individual cell component
│   │   ├── Scoreboard.tsx    # Score display
│   │   ├── PlayerSettings.tsx # Pre-game settings
│   │   ├── GameControls.tsx  # New game/reset buttons
│   │   └── AiExplanation.tsx # AI reasoning display
│   └── lib/                   # Utility libraries
│       ├── gameLogic.ts      # Core game logic and rules
│       ├── localStorage.ts   # Score persistence utilities
│       └── aiService.ts      # Gemini API integration
├── docs/                      # Project documentation
├── .env.local                # Environment variables
└── README.md                 # This file
```

## 🎯 How to Play

1. **Start a New Game**: Choose your symbol (X or O) and decide who goes first
2. **Make Your Move**: Click on any empty cell to place your symbol
3. **AI Response**: Watch the AI think and make its move with explanation
4. **Win Conditions**: Get three symbols in a row (horizontal, vertical, or diagonal)
5. **Track Progress**: View your wins, losses, and draws in the scoreboard

## 🤖 AI Integration

The game uses Google's Gemini API to provide intelligent gameplay:

- **Strategic Analysis**: AI analyzes the board state to make optimal moves
- **Win/Block Logic**: Prioritizes winning moves and blocking opponent wins
- **Explanations**: Provides reasoning for each move to enhance learning
- **Fallback Logic**: Continues working even without internet/API access

### API Request Format

```json
{
  "board": [["X", null, "O"], [null, "O", null], ["X", null, null]],
  "aiSymbol": "O",
  "humanSymbol": "X",
  "currentPlayer": "AI"
}
```

### Expected Response

```json
{
  "move": [1, 2],
  "explanation": "I chose this position to block your winning move."
}
```

## 🎨 Styling and Animations

- **Dark Mode**: Consistent dark theme throughout the application
- **Responsive Design**: Mobile-first approach with breakpoints for larger screens
- **Smooth Animations**: Cell plays, winning states, and UI transitions
- **Custom Animations**: Bounce effects for new moves, pulse for winning lines

## 💾 Data Persistence

Game scores are automatically saved to browser localStorage:
- Human wins
- AI wins  
- Draw games
- Persistent across browser sessions
- Reset functionality available

## 🔧 Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🌟 Future Enhancements

- [ ] Multiple difficulty levels
- [ ] Game history and replay
- [ ] Multiplayer support
- [ ] Tournament mode
- [ ] Custom themes
- [ ] Sound effects
- [ ] Mobile app version

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- Next.js team for the excellent framework
- Tailwind CSS for utility-first styling
- Vercel for deployment platform