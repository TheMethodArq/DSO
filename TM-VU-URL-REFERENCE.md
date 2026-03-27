# TM-VU.com URL Reference - Emory Crossing 40s

**Purpose**: Document all tm-vu.com URLs used in the DSO application for migration planning.

---

## Summary of TM-VU Dependencies

| Component | URL Pattern | Current URL (Emory Crossing 40s) | Purpose |
|-----------|-------------|----------------------------------|---------|
| **Site Plan** | `https://tm-vu.com/siteplan/{id}` | `https://tm-vu.com/siteplan/pI8ELRVMx8g8r7XtNtln` | Interactive community site map showing lot locations, availability status |
| **Floor Plans** | `https://tm-vu.com/plan/{id}` | 5 unique URLs (see below) | Interactive floor plan viewers with room details |

---

## Detailed URL Breakdown

### 1. Interactive Site Plan

**URL**: `https://tm-vu.com/siteplan/pI8ELRVMx8g8r7XtNtln`

**Used In**:
- `app/site-map/page.tsx` (full-screen embed)
- Data source: XML feed `SubInteractiveMedia.WebsiteURL`
- Fallback: Environment variable `SITE_PLAN_URL`

**Functionality**:
- Displays interactive SVG site map
- Shows lot boundaries and numbers
- Color-coded lot status (Available/Sold/Coming Soon)
- Touch-enabled pan/zoom
- Click lots for details

**Iframe Embed**:
```tsx
<iframe
  src="https://tm-vu.com/siteplan/pI8ELRVMx8g8r7XtNtln"
  sandbox="allow-scripts allow-same-origin allow-popups"
  allow="fullscreen"
/>
```

---

### 2. Interactive Floor Plans

**URL Pattern**: `https://tm-vu.com/plan/{unique-plan-id}`

**Emory Crossing 40s Floor Plans**:

| Plan Name | Plan Number | TM-VU URL |
|-----------|-------------|-----------|
| **Capercaillie** | 12386489 | `https://tm-vu.com/plan/Q3LN3a9vtUEvRqSATJIn.n4avvwrzph5Zclv3U6cp` |
| **Grouse** | 12386494 | `https://tm-vu.com/plan/ibgCHFyN3vSgIhTrEtv2.hgkE99STQKqcVy8BQOck` |
| **Partridge** | 12386495 | `https://tm-vu.com/plan/NC8c2Fm2hEcL4r6V2WJY.fts2aJcaztGRrA9LCd6n` |
| **Pheasant** | 12386496 | `https://tm-vu.com/plan/sfvW5i4LOEgoPjk6v4Kk.14oUYkRLAxwrHWHM6H3Y` |
| **Sandgrouse** | 12386497 | `https://tm-vu.com/plan/a8VToxLnk6QyN4NO3g5s.9d5Yu7Tj5abWbUQr6X7F` |

**Data Source**:
```xml
<PlanInteractiveMedia Type="InteractiveFloorplan">
  <WebsiteURL>https://tm-vu.com/plan/{id}</WebsiteURL>
</PlanInteractiveMedia>
```

**Used In**:
- `app/floor-plans/page.tsx` (main interactive viewer)
- Displayed when user selects a floor plan from the sidebar

**Functionality**:
- Interactive room-by-room floor plan
- Room dimensions and labels
- Touch navigation
- Fullscreen capable

---

## Code Implementation

### Data Types (lib/data/types.ts)

```typescript
interface InteractiveMedia {
  Type: 'InteractiveSitePlan' | 'InteractiveFloorplan';
  WebsiteURL: string; // tm-vu.com URL
}

interface FloorPlanInfo {
  id: string;
  name: string;
  interactiveUrl?: string; // from PlanInteractiveMedia.WebsiteURL
  // ... other fields
}

interface CommunityInfo {
  sitePlanUrl: string; // from SubInteractiveMedia.WebsiteURL
  // ... other fields
}
```

### Data Parsing (lib/data/community-data.ts)

```typescript
// Site Plan URL extraction
sitePlanUrl: subdivision.SubInteractiveMedia?.WebsiteURL || SITE_PLAN_URL

// Floor Plan URL extraction
interactiveUrl: plan.PlanInteractiveMedia?.WebsiteURL
```

### Component Usage

**Site Map Page** (`app/site-map/page.tsx`):
```tsx
const sitePlanUrl = 'https://tm-vu.com/siteplan/pI8ELRVMx8g8r7XtNtln';
<SitePlanEmbed url={sitePlanUrl} />
```

**Floor Plans Page** (`app/floor-plans/page.tsx`):
```tsx
// Selected plan's interactive URL
selectedPlan.interactiveUrl 
// e.g., "https://tm-vu.com/plan/Q3LN3a9vtUEvRqSATJIn.n4avvwrzph5Zclv3U6cp"

<iframe src={selectedPlan.interactiveUrl} ... />
```

---

## Environment Configuration

```env
# .env.local
SITE_PLAN_URL="https://tm-vu.com/siteplan/pI8ELRVMx8g8r7XtNtln"
```

---

## Migration Considerations

### What We Need From New System

1. **Site Plan**
   - Same unique ID or mapping from `pI8ELRVMx8g8r7XtNtln` to new ID
   - URL structure (path format, domain)
   - Embedding permissions (iframe sandbox requirements)

2. **Floor Plans (5 URLs)**
   - Mapping from TM PlanNumber to new system ID:
     - 12386489 (Capercaillie) → ?
     - 12386494 (Grouse) → ?
     - 12386495 (Partridge) → ?
     - 12386496 (Pheasant) → ?
     - 12386497 (Sandgrouse) → ?
   - URL structure for interactive viewers

3. **URL Mapping Strategy**
   - Option A: Direct URL replacement (same ID mapping)
   - Option B: New ID system with lookup table
   - Option C: API endpoint that returns new URLs

### Questions for Meeting

1. Will the new URLs follow the same pattern (`/siteplan/{id}`, `/plan/{id}`)?
2. Can we use the existing unique IDs or do we need a mapping layer?
3. Are there any changes to iframe embedding requirements?
4. Will the XML feed be updated with new URLs or do we need to transform them?
5. Timeline for URL cutover - will old URLs redirect?

---

## Files Affected by URL Change

| File | Line(s) | Purpose |
|------|---------|---------|
| `app/site-map/page.tsx` | 8 | Hardcoded site plan URL |
| `app/floor-plans/page.tsx` | 213 | Dynamic floor plan iframe src |
| `lib/data/community-data.ts` | 7, 49, 88, 119 | URL extraction logic |
| `.env.local` | 3 | Environment variable |
| `docker-compose.yml` | 12 | Docker environment |

---

## Sample XML Data Structure

**Site Plan** (from XML feed):
```xml
<SubInteractiveMedia Type="InteractiveSitePlan">
  <WebsiteURL>https://tm-vu.com/siteplan/pI8ELRVMx8g8r7XtNtln</WebsiteURL>
</SubInteractiveMedia>
```

**Floor Plan** (from XML feed):
```xml
<PlanInteractiveMedia Type="InteractiveFloorplan">
  <WebsiteURL>https://tm-vu.com/plan/Q3LN3a9vtUEvRqSATJIn.n4avvwrzph5Zclv3U6cp</WebsiteURL>
</PlanInteractiveMedia>
```

---

*Document Version: 1.0*
*Community: Emory Crossing 40s (Hutto, TX)*
*Date: March 25, 2026*
