# Ayush NexaFlow AI Hackathon Project

This is a simplified hackathon-ready Vite React project for the NexaFlow AI landing page.

## What Was Simplified

- Removed export scaffolding.
- Removed unused mockup sandbox, API server, generated API clients, database package, scripts, and workspace files.
- Removed banned/unnecessary UI library files.
- Removed platform-only config and environment requirements.
- Kept only the landing page source, public assets, organizer assets, and minimal Vite config.
- Removed external font loading and used the required font stacks in CSS.

## Run Locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Build

```bash
npm run build
```

## Demo Points

- Premium AI automation SaaS landing page.
- Responsive hero, features, pricing, testimonials, CTA, and footer.
- Desktop bento grid converts to mobile accordion.
- Active feature state transfers on desktop-to-mobile resize.
- Pricing uses a matrix with currency and billing logic.
- Price updates are isolated through refs/direct text-node updates.
- Uses provided SVG and color assets.
- No platform-specific files or banned component libraries remain.
