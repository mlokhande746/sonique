# PRD: Spotify Personality Profile Web App

## 1) Product Summary
A shareable web app that connects to a user’s Spotify account and transforms listening data into a visually striking “personality profile” card. The output should feel like a premium, viral, self-reflective artifact: part Wrapped recap, part identity quiz, part social share image.

Core output:
- Listening archetype
- Mood spectrum
- Music alter ego
- Genre DNA
- “What your taste says about you” breakdown
- Shareable image/card export

Primary success metric:
- Users complete Spotify auth, receive a profile, and export/share it.

Secondary success metrics:
- High completion rate from landing page to result
- Strong share rate per generated profile
- Repeat visits when listening taste changes

---

## 2) Product Goal
Turn Spotify listening behavior into a personality narrative that feels accurate, surprising, and social-media worthy.

This product must do three things well:
1. Extract meaningful signals from Spotify data.
2. Translate those signals into a compelling identity story.
3. Present the result in a premium visual format built for sharing.

---

## 3) Target User
- Spotify listeners who enjoy identity quizzes, music recaps, and shareable personality cards.
- Social-first users who post results to Instagram Stories, X, WhatsApp, Telegram, and TikTok.
- Users who want a “fun but insightful” reflection of their taste.

---

## 4) Core User Promise
“Connect Spotify once, and get a personality card that tells you who your music says you are.”

---

## 5) Scope

### In Scope
- Spotify OAuth login
- Fetch user listening data
- Classify into listening archetypes
- Compute mood spectrum from audio features
- Build genre DNA visualization
- Generate alter ego persona card
- Generate narrative insights
- Export as shareable image
- Mobile-first responsive UI
- Viral share prompts and deep links

### Out of Scope for MVP
- Audio playback
- Social graph analysis
- Public profile scraping
- Friends leaderboard
- AI model training on Spotify content
- Playlist generation from profile output

---

## 6) Key Feature List

### A. Spotify Authentication
- Spotify login via OAuth
- Consent screen with clear scope explanation
- Session persistence for returning users
- Logout / account disconnect
- Re-authentication flow when token expires

### B. Listening Data Ingestion
- Top artists
- Top tracks
- Recently played tracks
- Optional saved tracks if needed for enrichment
- Audio features for tracks where available
- Artist metadata and genres

### C. Personality Engine
- Listening archetype classification
- Mood spectrum scoring
- Genre DNA weighting
- Tempo / energy / valence pattern analysis
- Mainstream vs niche balance
- Diversity vs repetition score
- Era bias (classic / current / timeless)
- Social intensity score (melancholic, high-energy, reflective, etc.)

### D. Output Modules
- Music alter ego persona card
- “What your taste says about you” commentary
- Key personality traits inferred from listening behavior
- One-line signature statement
- Supporting evidence snippets
- “You might be…” style interpretation

### E. Share Experience
- Auto-generated vertical image for Stories
- Square share card for feeds
- Download as PNG
- Copy caption text
- Native share sheet on mobile
- Short public share link
- Open Graph preview for link sharing

### F. UI/UX Features
- Premium animated landing page
- Progress states during analysis
- Loading skeletons
- Result reveal animation
- Cards with strong visual hierarchy
- Dark-mode-first design
- Accessibility support for contrast and motion reduction

### G. Growth / Viral Features
- “Compare my taste” CTA
- “Generate mine” CTA on share page
- Referral link attribution
- Watermarked but tasteful branding
- Share templates optimized for social platforms

---

## 7) Listening Archetype System
Create at least 8 archetypes. Each archetype should be assigned by weighted scoring across top artists, top tracks, audio features, and listening diversity.

Suggested archetypes:
1. **The Nostalgic Archivist** – leans old-school, sentimental, replay-heavy.
2. **The Main Character** – high-confidence, cinematic, dramatic, emotionally expressive.
3. **The Night Driver** – late-night, moody, low-tempo, atmospheric.
4. **The Sonic Explorer** – high genre diversity, discovery-heavy, eclectic.
5. **The Precision Listener** – structured, genre-consistent, pattern-driven.
6. **The Chaos Curator** – high variance, jumps between extremes.
7. **The Heartbreak Intellectual** – introspective, melancholic, lyric-driven.
8. **The Hype Engine** – high energy, high tempo, workout/party bias.

Optional expansion archetypes:
- The Indie Purist
- The Global Nomad
- The Lo-Fi Monk
- The Pop Strategist
- The Basshead
- The Sentimental Maximalist

Each archetype should include:
- Name
- One-line description
- Scoring criteria
- Confidence score
- “Why this fits” evidence
- Social-friendly tag line

---

## 8) Mood Spectrum Model
Build a multi-axis emotional map derived from audio features.

Recommended axes:
- Energetic ↔ Calm
- Happy ↔ Melancholic
- Ordered ↔ Chaotic
- Warm ↔ Cold
- Intense ↔ Soft
- Mainstream ↔ Niche

Recommended Spotify-derived signals:
- Energy
- Valence
- Tempo
- Acousticness
- Danceability
- Speechiness
- Instrumentalness
- Liveness
- Popularity proxy from track/artist metadata

Output format:
- 2D or 3D mood summary for UI
- Percentile bars for each axis
- Short interpretation copy

Example output:
- “You run 68% melancholic, 22% warm, and 10% chaotic.”

---

## 9) Genre DNA
Show a pie chart or donut chart representing the user’s genre mix.

Logic:
- Aggregate genres from top artists.
- Weight by artist rank and listening frequency.
- Normalize to 100%.
- Collapse tiny categories into “Other.”
- Sort by weight descending.

Output:
- Top 5–8 genres
- “Dominant genre” label
- “Genre contradictions” label when conflicting genres coexist
- Short explanation of what the mix implies

---

## 10) Music Alter Ego Persona Card
Create an identity-aligned persona from listening behavior.

Persona dimensions:
- Archetype name
- Visual theme
- Color mood
- Narrative description
- Strengths implied by taste
- Hidden contradiction
- “In another universe, you are…” statement

Examples:
- “The Velvet Strategist”
- “The Midnight Archivist”
- “The Neon Poet”
- “The Controlled Chaos Type”

The persona card should feel like a collectible profile, not a generic summary.

---

## 11) “What Your Taste Says About You” Breakdown
This section must be sharp, specific, and fun.

Suggested sub-sections:
- How you process emotion
- How social or private your energy is
- Whether you chase novelty or familiarity
- Whether you curate identity or let music happen to you
- Whether your taste is performance-driven or self-soothing
- Whether you are trend-aware, timeless, or underground-leaning

Output style:
- 5–7 short punchy statements
- One deeper insight paragraph
- One playful “truth” line

---

## 12) Sharing and Export
Must be one-tap and mobile-native.

Requirements:
- Export PNG at social-ready resolutions
- Story format 1080x1920
- Square format 1080x1080
- Portrait format 1080x1350
- Copy caption text
- Share-to-native sheet support
- Public shareable URL with embedded preview
- Deep link that opens the exact generated result

Optional:
- Animated MP4/GIF export for premium tier
- Watermarked free export and clean paid export

---

## 13) User Workflow Order

### Flow A: First-time user
1. Landing page
2. Value proposition shown
3. Spotify connect CTA
4. OAuth consent
5. Redirect back to app
6. Data fetch and analysis loading state
7. Profile generated
8. Result card displayed
9. Share/export prompt
10. Optional “regenerate with more depth” or “compare another vibe”

### Flow B: Returning user
1. Landing page or share link
2. Auto-detect session
3. Refresh profile if needed
4. Show latest card
5. Share/export or edit profile visuals

### Flow C: Shared-link visitor
1. Open public share page
2. View profile preview
3. CTA to generate own profile
4. Spotify connect flow

---

## 14) Functional Requirements

### Authentication
- Use Spotify OAuth with PKCE for web app safety.
- Support token refresh or re-authentication.
- Store only necessary session data.

### Data Retrieval
- Fetch top artists and top tracks.
- Fetch recently played tracks where permitted.
- Request track audio features in batches.
- Read artist genres for genre DNA aggregation.

### Analysis Engine
- Convert raw listening data into weighted scores.
- Produce deterministic outputs from the same dataset.
- Keep explanations transparent enough to feel believable.
- Show confidence when data is sparse.

### Rendering
- Generate a polished result UI.
- Ensure export layout matches the in-app design.
- Use responsive components for mobile and desktop.

### Sharing
- Native share API where supported.
- Download fallback.
- Public URL preview.

---

## 15) Non-Functional Requirements
- Fast initial load
- Analysis time ideally under a few seconds after OAuth
- Mobile-first responsiveness
- High visual polish
- Accessible text contrast
- Smooth animations with reduced-motion support
- Secure token handling
- Reliable export generation
- Privacy-safe analytics

---

## 16) Technical Specifications

### Frontend
Recommended stack:
- Next.js or React
- TypeScript
- Tailwind CSS or equivalent utility CSS
- Framer Motion for reveal animations
- Chart library for genre pie/donut and mood visualization
- Canvas or SVG-based export renderer

### Backend
Recommended stack:
- Node.js / Next.js API routes / serverless functions
- Optional Python service if advanced scoring or image rendering is needed
- Redis or in-memory cache for temporary analysis jobs

### Data Store
- PostgreSQL or equivalent for user sessions, analysis snapshots, and public share links
- Object storage for exported PNGs or MP4s

### Spotify API Usage
Use Spotify Web API endpoints for:
- User profile and top items
- Recently played tracks
- Track audio features
- Artist metadata and genres

### Core Computation Pipeline
1. Normalize raw Spotify data.
2. Calculate listener distribution by artist, genre, era, tempo, and audio features.
3. Score archetype candidates.
4. Choose highest-confidence archetype.
5. Generate mood spectrum.
6. Generate genre DNA.
7. Create narrative copy.
8. Render result card.
9. Export image and share payload.

### Suggested Data Structures
**UserAnalysis**
- userId
- createdAt
- topArtists
- topTracks
- recentlyPlayed
- audioFeatureSummary
- genreWeights
- moodScores
- archetype
- alterEgo
- insights
- exportUrls

**ArchetypeDefinition**
- id
- name
- description
- scoringRules
- badgeColor
- sampleCopy

### Share Asset Generation
- Use server-side rendering or headless canvas rendering to generate static assets.
- Maintain exact dimensions for Story and feed outputs.
- Ensure Spotify album art is displayed without distortion or overlays.

---

## 17) Algorithm Design
Keep the first version rule-based and explainable.

### Recommended scoring signals
- Artist repetition
- Genre concentration
- Temporal recency
- Audio energy
- Valence average
- Acousticness
- Tempo band
- Diversity index
- Popularity skew
- Mood variance

### Archetype scoring example
- Calculate a score per archetype based on weighted signal ranges.
- Winner is the highest score above threshold.
- If no archetype clears threshold, return a blended archetype.

### Narrative generation
- Use templated copy with variable slots.
- Mix deterministic copy blocks with dynamic values.
- Keep claims framed as interpretation, not fact.

### Confidence system
- High: strong, repeated behavioral signals
- Medium: enough data but mixed patterns
- Low: sparse recent usage or limited listening history

---

## 18) UX Principles
- Reveal the result slowly; do not dump everything at once.
- Make the card feel collectible.
- Make the output easy to screenshot.
- Keep the first screen after analysis focused on one dominant identity.
- Put the share CTA next to emotional payoff.

---

## 19) Content / Copy Requirements
Tone should be:
- bold
- witty
- personal
- slightly provocative
- not insulting
- not overly generic

The copy must avoid:
- vague horoscope language
- fake psychological certainty
- repetitive adjectives
- cringe motivational language

Preferred style:
- “Your taste is not random. It is controlled emotional architecture.”
- “You do not just listen to music; you use it to regulate identity.”

---

## 20) Privacy and Compliance
- Show explicit consent before connecting Spotify.
- Explain what data is read and why.
- Do not expose raw tokens in client-side logs.
- Allow data deletion or account disconnect.
- Do not use Spotify content to train or ingest into ML models.
- Preserve Spotify visual content in original form and attribution.
- Use secure redirect URIs.

---

## 21) Analytics Events
Track:
- Landing page view
- Connect Spotify click
- OAuth success/failure
- Data fetch success/failure
- Profile generated
- Share clicked
- Export downloaded
- Public link opened
- CTA conversion to new user

---

## 22) MVP Build Order
1. Landing page + CTA
2. Spotify OAuth
3. Fetch top artists/tracks + audio features
4. Build data normalization layer
5. Implement archetype scoring
6. Implement genre DNA
7. Implement mood spectrum
8. Create result page
9. Build share card export
10. Add public share links and OG metadata
11. Add analytics
12. Polish animations and responsiveness

---

## 23) Acceptance Criteria
The product is ready for MVP launch when:
- A user can connect Spotify successfully.
- The app can generate a profile from real listening data.
- The profile includes archetype, mood spectrum, genre DNA, and alter ego.
- The result can be exported as a shareable image.
- The public share link renders correctly.
- The app works on mobile.
- Token handling is secure.
- Spotify visual and policy constraints are respected.

---

## 24) Risks and Mitigations

### Risk: Weak personality accuracy
Mitigation: Use multiple signals, confidence labels, and blend archetypes when necessary.

### Risk: Sparse listening data
Mitigation: Provide low-confidence mode and gracefully degrade outputs.

### Risk: Export looks generic
Mitigation: Design the export first, then build the in-app UI to match it.

### Risk: Policy violation
Mitigation: Follow Spotify OAuth, content attribution, visual asset rules, and no-ML-ingestion restrictions.

### Risk: Share conversion is low
Mitigation: Put the share moment immediately after emotional payoff and provide one-tap export.

---

## 25) Suggested MVP Positioning
**Tagline:**
Turn your Spotify listening into a personality profile people actually want to share.

**One-line pitch:**
A viral Spotify-connected web app that converts listening habits into a beautiful identity card: archetype, mood spectrum, genre DNA, and music alter ego.
