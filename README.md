# Zodiac App

A React web app for exploring zodiac signs reimagined as fantasy character classes. Features a 3D carousel interface for browsing signs, detailed lore for each character class, and AI-powered image generation for creating character artwork.

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
