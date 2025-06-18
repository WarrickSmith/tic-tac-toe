# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Tic-Tac-Toe web application project where a human plays against an AI opponent powered by the Google Gemini API. The project is currently in the planning phase with a comprehensive PRD (`tic-tac-toe-prd.md`) defining the requirements.

## Technology Stack (Planned)

- **Frontend Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Backend**: Google Gemini API (Gemini 1.5 Pro/Flash)
- **Storage**: Browser Local Storage
- **Package Manager**: npm

## Project Structure (Planned)

The PRD outlines the following intended structure:
- `/app/` - Next.js App Router pages
- `/components/` - Reusable UI components (Board, Cell, Scoreboard, etc.)
- `/lib/` - Utilities (gameLogic.ts, localStorage.ts, aiService.ts)
- `/docs/` - Implementation documentation
- `/public/` - Static assets

## Development Commands

- `npm install` - Install dependencies
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm start` - Start production server

## Key Requirements

- AI integration requires Gemini API key in `.env.local`
- Dark mode only design
- Responsive mobile-first approach
- Local storage for score persistence
- Error handling for API failures
- Animations for game interactions

## Implementation Status

✅ **COMPLETED** - All phases of the PRD have been successfully implemented:

- **Phase 0**: Next.js project initialized with TypeScript and Tailwind CSS
- **Phase 1**: Core game logic and board UI components implemented
- **Phase 2**: Scoreboard and local storage functionality added
- **Phase 3**: Google Gemini API integration with fallback AI logic
- **Phase 4**: Player settings and complete game flow UX
- **Phase 5**: Final polish, animations, and comprehensive documentation

The application is fully functional and ready for development or deployment.