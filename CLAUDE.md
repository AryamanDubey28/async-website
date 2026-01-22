# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Async Studios marketing website built with Next.js 15 (App Router). It's a React-based website showcasing AI products (Skynet Chat and Skynet Agents) with a blog system powered by Markdown files.

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
- **Blog**: Markdown files with gray-matter frontmatter, remark/rehype for processing

### Directory Structure
- `src/app/` - Next.js App Router pages
  - `page.tsx` - Homepage with Hero, Features, Services, CTA sections
  - `skynet-chat/` - Product page for Skynet Chat
  - `skynet-agents/` - Product page for Skynet Agents
  - `blogs/` - Blog listing and `[slug]/` dynamic routes
  - `about/`, `privacy-policy/`, `terms-of-service/` - Static pages
- `src/components/` - Reusable React components
  - `skynet-chat/` - Skynet Chat specific components (Mockup, Features, CTA)
  - `skynet-agents/` - Skynet Agents specific components (Mockup, ApiIntegrations, CTA)
- `src/lib/posts.ts` - Blog post utilities (getSortedPostsData, getPostData, getAllPostSlugs)
- `content/blogs/` - Markdown blog posts with frontmatter (title, date, summary, author, slug)

### Import Alias
Use `@/*` to import from `src/*` (configured in tsconfig.json):
```typescript
import Navbar from '@/components/Navbar';
import { getPostData } from '@/lib/posts';
```

### Blog System
Blog posts are Markdown files in `content/blogs/`. Required frontmatter:
```yaml
---
title: 'Post Title'
date: '2024-07-30'
summary: 'Description'
author: 'Author Name'
slug: 'url-slug'
---
```

The `slug` in frontmatter takes precedence over filename for URLs.

### Styling Patterns
- Dark theme by default (`bg-gray-900`, `bg-gray-950`)
- Gradient text using `bg-clip-text text-transparent bg-gradient-to-r`
- Canvas-based particle animations on product pages (with device capability detection)
- Framer Motion for scroll animations and transitions

### Key Configuration
- ESLint is disabled during builds (`next.config.ts`)
- Vercel Analytics integration enabled
- Geist font family loaded via `next/font/google`
