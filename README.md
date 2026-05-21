# Sonique - Spotify Personality DNA 🧬🎧

Sonique is a viral, highly-visual web application that connects to your Spotify account, deeply analyzes your top tracks, artists, and audio features, and generates a personalized "DNA Profile" card that you can download and share on social media.

## ✨ Features

- **Spotify OAuth Integration:** Secure, seamless login using NextAuth.
- **Deep Audio Analysis:** Analyzes your top tracks' danceability, energy, acousticness, and valence to calculate your "Mood Spectrum".
- **Dynamic Archetypes:** Assigns you a unique music personality archetype (e.g., *The Alchemist*, *The Nightrider*, *The Neon Dreamer*) based on your listening habits.
- **Beautiful UI/UX:** A stunning, glassmorphism-inspired dark mode interface with buttery smooth micro-animations powered by Framer Motion.
- **Fully Responsive:** Looks incredible whether you're viewing it on a massive desktop monitor or your phone.
- **Sharable Exports:** Generates a high-quality, pixel-perfect image of your DNA card ready to be shared on Instagram Stories, Twitter, or with friends.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + Vanilla CSS (for complex animations)
- **Animations:** Framer Motion
- **Authentication:** NextAuth.js
- **Validation & Security:** Zod (Runtime type-checking)
- **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites
You will need a Spotify Developer Account to generate API keys. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and create a new application.

### Environment Variables
Create a `.env.local` file in the root directory and add the following keys:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
NEXTAUTH_URL=http://localhost:3000 # Use your actual domain in production
NEXTAUTH_SECRET=a_random_secure_string_for_encryption
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Security Notes
This application implements strict server-side validation using **Zod** to prevent injection attacks and ensures that Spotify Access Tokens never leak to the client-side browser, mitigating XSS risks.

---
*Designed to be shared. Built to be viral.*
