# Zodiac App

React and three.js web app for playing Dungeons and Dragons, based upon the lore of the popular book series, Zodiac Academy. Features a 3D carousel interface for browsing character setup options, detailed lore for each character class, and AI-powered image generation for each character creation.

## Demo

<div>
    <a href="https://www.loom.com/share/cac3fe42f6ee4992ab525b2f2b15ee3e">
    </a>
    <a href="https://www.loom.com/share/cac3fe42f6ee4992ab525b2f2b15ee3e">
      <img style="max-width:800px;" src="https://cdn.loom.com/sessions/thumbnails/cac3fe42f6ee4992ab525b2f2b15ee3e-209220fa067e6f5f-full-play.gif#t=0.1">
    </a>
  </div>

## Architecture Overview

### Frontend Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router DOM v7
- **3D Graphics**: Three.js with React Three Fiber and Drei
- **UI Components**: Radix UI (Colors, Icons, Select)
- **Content Rendering**: React Markdown
- **Styling**: CSS

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Environment Variables

- `VITE_WORKER_URL`: URL endpoint for Cloudflare Worker (image generation)

### Browser Compatibility

Requires WebGL support for 3D rendering via Three.js.
