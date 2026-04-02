# AI Vibe Journal

An AI-powered journaling app that responds to your entries based on your current vibe.

## Setup

```bash
cp .env.example .env
# Add your OpenAI API key to .env
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Usage

1. Type your journal entry in the text area
2. Select a vibe (Therapist, Coach, or Brutally Honest Friend)
3. Click **Send** — the AI responds in the style you chose

## Release Notes

### v1.0.0 — April 1, 2026

**Initial release**

- Express backend with OpenAI GPT-4o integration
- API key kept server-side for security (never exposed to the browser)
- Three vibe modes: Therapist, Coach, Brutally Honest Friend
- Pure JavaScript frontend — no frameworks
- Dark-themed UI with responsive layout
- `.env` excluded from version control via `.gitignore`
