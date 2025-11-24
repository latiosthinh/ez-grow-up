✅ Core Features

Letter Learning (Ages 2–3)
Letters and numbers divided into groups (7–8 groups).
Wooden toy-like letters on the right side.
Placeholders on the left for correct positions.
Drag-and-drop interaction:
Click/touch a letter → repeat pronunciation.
Drag to placeholder → sound repeats faster + blinking border.
Correct placement → sound stops + border stops blinking.

Word Learning (Ages 3–4)
Simple words grouped by topics (animals, colors, family, etc.).
Similar drag-and-drop mechanic for matching words to pictures or placeholders.

Sentence Building (Ages 5–6)
Drag words to form simple sentences.
Topics like “My family,” “At the park,” etc.
Visual feedback for correct sentence structure.

✅ Game Flow

1. **Splash Screen**:
   - Loading assets (images, audio).
   - App introduction/branding.

2. **Onboarding (Guidance)**:
   - Series of slides explaining how to play.
   - "Next" and "Done" navigation.
   - **Logic**: Shows only once (persisted via LocalStorage).

3. **Language Selection**:
   - Choose English or Vietnamese.

4. **Age Selection**:
   - Choose target age group (2, 3, 4, 5, 6).
   - Determines content complexity (e.g., 2yo = letters/numbers, 5yo = sentences).

5. **Difficulty Selection**:
   - Choose number of items (1, 2, 3, 4 letters/numbers).

6. **Category Selection**:
   - Choose specific groups (e.g., A-B-C, 1-2-3) or Random.

7. **Gameplay**:
   - The core drag-and-drop experience based on selections.

✅ Rewards

Stars, badges, animations for motivation.

✅ Tech Stack Suggestions

Frontend:
Phaser 3 (TypeScript) for a code-first, editor-free game development experience.
Targeting HTML5/Web export via Vite.

Backend:
Node.js or Firebase for real-time progress tracking.

Audio:
Pre-recorded pronunciation for English & Vietnamese.
Use Web Audio API for looping and speed control.

✅ Gamification & UX

Bright colors, playful animations.
Large touch-friendly elements for kids.
Minimal text, more visuals.
Parental dashboard for progress tracking.

✅ Next Steps
I can help you with:

Wireframe design for the app layout.
Feature roadmap for development.
Sample code snippet for drag-and-drop with sound.
Database schema for storing levels and progress.