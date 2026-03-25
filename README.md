# DSO (Digital Sales Office) - Taylor Morrison

Digital Sales Office touch screen application for Taylor Morrison sales centers.

## Overview

This Next.js application replaces the legacy Dovela/centravu® DSO system with a modern, maintainable solution that pulls data directly from the Taylor Morrison XML feed.

## Features

- **Welcome Page**: Community overview with quick navigation
- **Floor Plans**: Browse all available floor plans with interactive viewers
- **Available Homes**: List of move-in ready spec homes
- **Interactive Site Map**: Embedded site plan with lot availability
- **Photo Gallery**: Community and model home photos
- **Community Info**: Amenities, schools, HOA, and sales office details

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Data**: Taylor Morrison XML Feed
- **Interactive Media**: Embedded tm-vu.com iframes

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t dso-app .
docker run -p 3000:3000 dso-app
```

## Environment Variables

Create `.env.local`:

```env
COMMUNITY_NAME="Emory Crossing 40s"
COMMUNITY_SUBDIVISION_NUMBER="12357690"
SITE_PLAN_URL="https://tm-vu.com/siteplan/pI8ELRVMx8g8r7XtNtln"
XML_FEED_URL="https://cm.taylormorrison.com/DataFeeds/TaylorMorrison.xml"
REVALIDATE_SECONDS="3600"
```

## Data Sources

- **XML Feed**: `https://cm.taylormorrison.com/DataFeeds/TaylorMorrison.xml`
- **Interactive Site Plan**: `https://tm-vu.com/siteplan/{id}`
- **Interactive Floor Plans**: `https://tm-vu.com/plan/{id}`
- **Images**: `tmi-p-001.sitecorecontenthub.cloud`

## Touch Screen Optimization

- Minimum touch target: 60x60px
- Large typography (18px+ base)
- No hover-dependent interactions
- Full 1920x1080 support

## Project Structure

```
my-app/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Welcome/Landing
│   ├── floor-plans/       # Floor plans pages
│   ├── available-homes/   # Spec homes list
│   ├── site-map/          # Interactive site plan
│   ├── gallery/           # Photo gallery
│   ├── community/         # Community info
│   └── api/health/        # Health check
├── components/            # React components
│   ├── ui/               # shadcn components
│   ├── navigation/       # TouchNav
│   ├── floor-plans/      # FloorPlanCard
│   ├── homes/            # SpecHomeCard
│   ├── iframes/          # Embed components
│   └── shared/           # ImageGallery
├── lib/                  # Utilities
│   └── data/            # Types, parser, data fetcher
└── public/              # Static assets
```

## Available Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm start` - Production server
- `npm run lint` - ESLint

## Health Check

Endpoint: `/api/health`

Returns:
```json
{
  "status": "ok",
  "timestamp": "2026-03-24T12:00:00.000Z",
  "service": "DSO App",
  "version": "1.0.0"
}
```

## License

Private - Taylor Morrison
