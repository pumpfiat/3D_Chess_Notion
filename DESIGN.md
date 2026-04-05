# Colosseum Clash — Phase 0 Design System (Adapted Figma Style)

This document is the source of truth for the menu look and feel.

## Creative Direction

- Theme: **dark cinematic war fantasy** (medieval + futuristic).
- Emotional tone: **epic, heavy, premium**, like a blockbuster game trailer.
- UI purpose: present controls clearly while keeping the 3D battlefield visible behind the menu.

## Color Tokens

Use these exact tones across menu UI:

- `--cc-bg-900`: `#050507`
- `--cc-bg-800`: `#111216`
- `--cc-surface`: `rgba(10, 10, 12, 0.68)`
- `--cc-surface-strong`: `rgba(15, 15, 18, 0.82)`
- `--cc-primary`: `#9F1239`
- `--cc-primary-strong`: `#B91C1C`
- `--cc-accent-gold`: `#EAB308`
- `--cc-text-main`: `#F5F5F5`
- `--cc-text-muted`: `#B8BCC8`
- `--cc-border`: `rgba(255, 255, 255, 0.14)`

## Typography

- Titles: bold/condensed, uppercase, wide tracking.
- Section headings: small uppercase labels with muted gold.
- Body text: readable sans, high contrast on dark surfaces.

## Surface + Layout

- Keep menu as a centered panel over a semi-transparent overlay.
- Preserve scene visibility: overlay must never fully hide 3D canvas.
- Use glass + steel feel:
  - translucent dark cards
  - subtle bright borders
  - deep soft shadows

## Buttons and Interactions

- Primary CTA uses blood-red metallic gradient with gold rim.
- Hover/focus state adds warm glow and slight lift.
- Option cards use clear selected state:
  - border shifts to gold
  - red tinted background
  - stronger shadow

## Motion

- Menu fades in quickly after first render.
- Hover transitions should be smooth and confident (200-300ms).
- Avoid excessive motion while still feeling alive.

## Accessibility

- Maintain keyboard focus visibility.
- Keep selected states explicit with `aria-pressed`.
- Preserve contrast for all core actions.

## Implementation Scope

Phase 0 menu includes:
- Title + subtitle
- Scene selection
- Faction selection with preview text
- Time control
- Side selection
- Main CTA
- “How to Play Chess” trigger

This style system should be reused in Phase 1 and beyond.
