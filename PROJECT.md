# PROJECT SPECIFICATION - 3D CHESS NOTION (Vibe Jam 2026)

## Game Concept
Epic 3D cinematic chess battle where chess meets Hollywood war spectacle. 
Players choose scene, faction, and time control on a dramatic main menu, then enter a living battlefield. 
Every capture is a cinematic slow-mo event with blood, physics, and COD-style war sounds.

## Main Menu (First Screen - MUST load instantly)
- Full-screen beautiful background (dark cinematic style)
- Big title: "COLOSSEUM CLASH"
- Section 1: Choose Scene
  - Colosseum Arena (kings + roaring crowd in stands)
  - Nature Battlefield (waterfall, birds flying, mist)
- Section 2: Choose Faction (with animated preview)
  - COD / Military (tactical soldiers with guns)
  - Kingdom / Royal (armored knights)
  - Tribe / Savage (warriors with axes & warpaint)
  - "Random" button
- Animated showcase: All 32 pieces of the chosen faction "rolling" / marching / posing with weapons in a line (smooth Three.js animation loop)
- Section 3: Time Control
  - Classic options: 3+0, 5+0, 10+5, 15+10, 30+0, Unlimited
- Big "START GAME" button (white or black side + "Random" option)
- Below everything: Clean "How to Play Chess" instructions (short, illustrated with icons)
- Small "Multiplayer" toggle (2-player real-time via PartyKit)

## In-Game Features
- 3D chessboard centered in chosen environment
- When player clicks/drags a piece:
  - Valid move squares light up with glowing signals (semi-transparent highlight rings or pulsing planes)
  - Illegal moves show subtle red flash
- Captures: Cinematic camera zoom + slow-motion + physics tumble + blood particles + war/COD impact sound
- Promotion: Pawn glows → dramatic transformation animation → 3D preview popup to choose new piece
- Captured pieces become stone statues displayed neatly around the board
- Vs Stockfish (Lichess average level, adjustable) + real-time 2-player multiplayer

## Non-Negotiables (Jam Rules)
- 90%+ code written by AI
- New game started after April 1, 2026
- Loads instantly (<2 seconds total — menu + game)
- No login, free-to-play, web-only
- Add entrant widget script in index.html

## Tech Stack
- Three.js (r168+)
- chess.js + stockfish.wasm (Lichess engine)
- PartyKit (real-time multiplayer)
- Cannon-es or minimal Three.js physics for captures
- Howler.js or Web Audio for war sounds
- Tailwind CSS for clean menu UI

## Folder Structure
/
├── index.html          ← Main menu + canvas
├── PROJECT.md
├── README.md
├── src/
│   ├── main.js
│   ├── menu.js         ← Menu logic & faction animations
│   ├── scene.js        ← Environment loader (Colosseum / Nature)
│   ├── board.js
│   ├── pieces.js       ← 3 factions + rolling animation
│   ├── engine.js       ← chess.js + Stockfish
│   ├── captures.js     ← cinematic system
│   ├── multiplayer.js
│   ├── ui.js           ← move highlights + promotion
│   └── sounds.js
└── assets/             ← tiny sounds only (or base64)