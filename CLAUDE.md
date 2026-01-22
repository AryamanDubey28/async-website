# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Async Studios marketing website built with Next.js 15 (App Router). It's a React-based website for an AI consultancy.

## Commands

```bash
npm run dev      # Start dev server with Turbopack (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **UI**: React 19, Tailwind CSS 3, NextUI components
- **Animations**: Framer Motion, custom canvas particle effects

### Directory Structure
- `src/app/` - Next.js App Router pages
  - `page.tsx` - Homepage with Hero, Services, CTA sections
  - `about/`, `privacy-policy/`, `terms-of-service/` - Static pages
- `src/components/` - Reusable React components

### Import Alias
Use `@/*` to import from `src/*` (configured in tsconfig.json):
```typescript
import Navbar from '@/components/Navbar';
```

### Styling Patterns
- Dark theme by default (`bg-gray-900`, `bg-gray-950`)
- Gradient text using `bg-clip-text text-transparent bg-gradient-to-r`
- Framer Motion for scroll animations and transitions

### Key Configuration
- ESLint is disabled during builds (`next.config.ts`)
- Vercel Analytics integration enabled
- Geist font family loaded via `next/font/google`
