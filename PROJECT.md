# PROJECT SPECIFICATION - 3D CHESS NOTION (Vibe Jam 2026)

## Game Concept
Epic 3D chess battle arena where classical chess meets cinematic war spectacle. 
Players battle against Stockfish (average Lichess level) or real opponents in a dramatic colosseum or nature battlefield. 
Captures are violent and cinematic with blood, physics, and camera zooms. Captured pieces become statues around the board.

## Core Features
- 8x8 3D chessboard in center of scene
- Two selectable environments: Colosseum (spectators + kings) and Nature (waterfall + birds)
- Three piece factions: COD/Military, Kingdom/Royal, Tribe/Savage (selectable or random)
- Vs AI (Stockfish WASM at adjustable skill level) + 2-player real-time multiplayer
- Dramatic capture system: cinematic zoom, physics tumble, blood particles, war/COD sound
- Promotion with animated pawn transformation + 3D preview choice
- Captured pieces displayed as statues around the board
- Instant load (<2s), no login, mobile-friendly camera controls

## Non-Negotiables (Jam Rules)
- 90%+ code written by AI
- New game started after April 1, 2026
- Web-only, free-to-play, no login/signup
- Loads instantly — no heavy assets or loading screens
- Add entrant widget script in index.html

## Tech Stack
- Three.js (r168+)
- chess.js for move validation
- stockfish.wasm (Lichess official) for AI opponent
- PartyKit for real-time multiplayer
- Cannon-es (or minimal physics) for capture animations
- Howler.js or Web Audio API for sounds
- Tailwind or plain CSS for UI overlays

## Folder Structure (create these now)
/
├── index.html
├── PROJECT.md
├── README.md
├── src/
│   ├── main.js
│   ├── scene.js          # Three.js setup + environment switch
│   ├── board.js          # Chessboard + pieces
│   ├── pieces.js         # Piece models + 3 factions
│   ├── engine.js         # chess.js + Stockfish integration
│   ├── captures.js       # Cinematic zoom + blood + physics
│   ├── multiplayer.js    # PartyKit connection
│   ├── ui.js             # Promotion menu + side selection
│   └── sounds.js
├── assets/               # (keep tiny or empty — use procedural)
└── public/               # built version if needed

## Vibe & Polish Goals
- Cinematic camera work on every capture
- Juicy feedback (particles, screen shake, sound)
- Humorous / epic announcer voice lines (optional)
- Make it feel like a blockbuster trailer every game

## Current Phase
Phase 1: Basic 3D board + piece movement + chess.js validation
Phase 2: Stockfish AI integration
Phase 3: Capture cinematics + blood + physics
Phase 4: Environments + piece factions
Phase 5: Multiplayer + sounds + polish