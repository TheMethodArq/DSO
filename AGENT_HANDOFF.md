# DSO Replacement - Agent Handoff Document

**Date:** 2026-03-29  
**Project:** Taylor Morrison Digital Sales Office (DSO) Replacement  
**Status:** Core build complete, ready for QA integration  

---

## 1. SITUATION & PROBLEM STATEMENT

### The Crisis
- **Third-party vendor Dovella** (tm-vu.com) is shutting down in days
- Current DSO lives at: `https://admin.tm-vu.com/communityvu/bvZY6lDoqqrpupZvhQmx`
- Sales offices use 46-55" touch screens running this DSO
- **URGENT:** Need replacement before tm-vu.com goes offline

### What We Know
- DSO is a web frontend that pulls data from Taylor Morrison's production XML feed
- XML Feed: `https://cm.taylormorrison.com/DataFeeds/TaylorMorrison.xml`
- Community: **Emory Crossing 40s** (Hutto, TX)
- SubdivisionNumber in XML: `863436`

### Data Sources Verified
| Source | Status | URL |
|--------|--------|-----|
| TM XML Feed | ✅ Working | `https://cm.taylormorrison.com/DataFeeds/TaylorMorrison.xml` |
| TM Production Site | ✅ Working | `https://www.taylormorrison.com/tx/austin/hutto/emory-crossing-40s` |
| QA Site | 🔐 Requires Cloudflare | `https://qa.taylormorrison.com` |
| Dovella Site Plan | ⚠️ Shutting down | `https://tm-vu.com/siteplan/pI8ELRVMx8g8r7XtNtln` |
| Panomaps | ✅ Working | `https://panomaps.us/homes/taylormorrison/tx/austin/hutto/emory-crossing/` |

---

## 2. WHAT WAS BUILT

### Next.js Application Structure
```
my-app/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Home/Landing page
│   ├── floor-plans/page.tsx      # Floor plans with interactive viewer
│   ├── available-homes/page.tsx  # Spec homes list
│   ├── site-map/page.tsx         # Interactive site plan
│   ├── gallery/page.tsx          # Photo gallery
│   ├── community/page.tsx        # Community info
│   ├── area/page.tsx             # Around the area (panomaps)
│   ├── collections/page.tsx      # Design collections (stub)
│   └── api/community/route.ts    # API endpoint for XML data
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── navigation/TouchNav.tsx   # Touch-optimized nav
│   ├── floor-plans/
│   ├── homes/
│   ├── iframes/
│   └── shared/ImageGallery.tsx
├── lib/
│   ├── data/
│   │   ├── community-data.ts     # XML fetching & parsing
│   │   ├── xml-parser.ts         # fast-xml-parser config
│   │   └── types.ts              # TypeScript interfaces
│   └── config/urls.ts            # QA/Prod URL management
└── .env.local                    # Environment configuration
```

### Key Features Implemented
1. **Home Page** - Welcome screen with navigation cards
2. **Floor Plans** - List + interactive viewer iframe
3. **Available Homes** - Spec homes with filtering/sorting
4. **Site Map** - Full-screen interactive site plan iframe
5. **Gallery** - Photo gallery with lightbox
6. **Community Info** - Amenities, schools, sales office details
7. **Around the Area** - Panomaps integration

---

## 3. TECHNICAL DETAILS

### Data Flow
```
Taylor Morrison XML Feed
    ↓
/api/community (Next.js API Route)
    ↓
Parsed JSON (community, floorPlans, specHomes)
    ↓
React Components (SWR for client-side fetching)
```

### URL Configuration System
Created `lib/config/urls.ts` for environment switching:

**Environment Toggle:**
```env
USE_QA_URLS=false  # Set to true for QA
```

**QA Mode URLs:**
- Base: `https://qa.taylormorrison.com`
- Floor Plans: `/tx/austin/hutto/emory-crossing-40s/floor-plans/{plan-name}`
- Site Map: `/tx/austin/hutto/emory-crossing-40s#InteractiveSitemap`

**Production Mode URLs:**
- Base: `https://www.taylormorrison.com`
- Same path structure

### XML Parser Configuration
**Critical Fix Applied:**
- Changed `attributeNamePrefix: '@_'` to `attributeNamePrefix: ''`
- This fixed images, amenities, and other attributes not parsing

---

## 4. CURRENT STATE

### ✅ Working
| Feature | Status | Notes |
|---------|--------|-------|
| Build | ✅ | `npm run build` succeeds |
| XML Data Fetch | ✅ | All community data loading |
| Hero Images | ✅ | 20 images from XML |
| Gallery | ✅ | Working with lightbox |
| Floor Plan List | ✅ | 6 plans with data |
| Available Homes | ✅ | Spec homes loading |
| Panomaps | ✅ | Around the Area working |
| QA/Prod Toggle | ✅ | Config system ready |

### ⚠️ Needs Attention

#### 1. Site Plan URL (HIGH PRIORITY)
**Current:** `https://tm-vu.com/siteplan/pI8ELRVMx8g8r7XtNtln` (Dovella - shutting down)

**Needs:** New site plan URL from Taylor Morrison

**QA URL Pattern Discovered:**
- QA: `https://qa.taylormorrison.com/tx/austin/hutto/emory-crossing-40s#InteractiveSitemap`
- Production equivalent should work when QA goes live

**Action Required:**
- Update `SITE_PLAN_URL` in `.env.local` when new URL provided
- Or verify the `#InteractiveSitemap` anchor works on production

#### 2. Floor Plan Interactive URLs
**Current Implementation:**
- Using: `https://www.taylormorrison.com/tx/austin/hutto/emory-crossing-40s/floor-plans/{plan-name}`
- Plan names slugified: `Capercaillie` → `capercaillie`

**QA Pattern Discovered:**
- QA has: `/floor-plans/{plan-name}` structure
- Verify this works in QA environment

#### 3. Design Collections Page
**Status:** Stub page exists at `/collections`

**Dovella Reference:** `https://admin.tm-vu.com/communityvu/zTSp25L1CqDOp1wC8iWD/site-map`

**Note:** The Dovella IDs are proprietary and don't map to TM URLs. Need to identify equivalent TM content.

#### 4. QA Environment Access
**Current:** QA site requires Cloudflare Access authentication
**Next Agent:** Has direct QA access (per user)

**QA URLs to Test:**
```
https://qa.taylormorrison.com/tx/austin/hutto/emory-crossing-40s
https://qa.taylormorrison.com/tx/austin/hutto/emory-crossing-40s/floor-plans/capercaillie
https://qa.taylormorrison.com/tx/austin/hutto/emory-crossing-40s#InteractiveSitemap
```

---

## 5. WHAT TO DO NEXT

### Immediate (Next Agent)

1. **Switch to QA Mode**
   ```bash
   # Edit .env.local
   USE_QA_URLS=true
   
   # Restart dev server
   npm run dev
   ```

2. **Test All Pages in QA**
   - Verify floor plan pages load
   - Verify site map loads
   - Check image loading
   - Test touch interactions on 46-55" display

3. **Get Remaining URLs**
   - Confirm site plan URL for Emory Crossing 40s
   - Get any additional interactive content URLs
   - Verify spec home detail pages

4. **Update URL Config**
   - Add any missing URL patterns to `lib/config/urls.ts`
   - Update `.env.local` with final URLs

### Before Go-Live

1. **Performance Testing**
   - Test on target touch screen hardware
   - Verify iframe loading performance
   - Check image optimization

2. **Content Verification**
   - Verify all floor plans display correctly
   - Confirm pricing and availability accuracy
   - Check all images load

3. **Deployment**
   ```bash
   npm run build
   # Deploy to production hosting
   # Update DNS from tm-vu.com to new host
   ```

---

## 6. KEY FILES REFERENCE

| File | Purpose |
|------|---------|
| `.env.local` | Environment variables, QA toggle |
| `lib/config/urls.ts` | URL builder functions |
| `lib/data/community-data.ts` | XML parsing logic |
| `lib/data/xml-parser.ts` | Parser configuration |
| `app/site-map/page.tsx` | Site plan iframe |
| `app/floor-plans/page.tsx` | Floor plan viewer |
| `app/collections/page.tsx` | Design collections (stub) |

---

## 7. CONTACTS & RESOURCES

### URLs
- **Dev Server:** `http://localhost:3000`
- **API Health:** `http://localhost:3000/api/health`
- **API Data:** `http://localhost:3000/api/community`
- **QA Site:** `https://qa.taylormorrison.com` (requires auth)
- **Prod Site:** `https://www.taylormorrison.com/tx/austin/hutto/emory-crossing-40s`

### Build Commands
```bash
cd my-app
npm run dev      # Development server
npm run build    # Production build
npm start        # Production server (after build)
```

---

## 8. NOTES

### What We Tried (That Didn't Work)
- ❌ Reverse engineering Dovella IDs to TM URLs - IDs are proprietary, no mapping exists
- ❌ Decoding short IDs from Mason Woods example - custom encoding, not reversible
- ❌ Finding redirect logic in `@qa.js` - it was the app bundle, not redirects

### What We Learned
- ✅ TM XML feed has all necessary data
- ✅ QA uses same URL structure as production
- ✅ Floor plan URLs are slug-based: `/floor-plans/{lowercase-name}`
- ✅ Site map uses anchor: `#InteractiveSitemap`
- ✅ Images work once XML parser was fixed

### Critical Files for Next Agent
1. `lib/config/urls.ts` - Add any new URL patterns here
2. `.env.local` - Toggle QA mode here
3. `app/collections/page.tsx` - Needs content/URLs

---

## 9. QUESTIONS FOR QA/Stakeholders

1. **Site Plan:** What is the final URL for the interactive site map?
2. **Design Collections:** Is there equivalent content on TM site?
3. **Spec Home URLs:** Do individual spec homes have detail pages in new structure?
4. **Touch Testing:** Has the app been tested on the actual 46-55" touch screens?
5. **Go-Live Date:** When does tm-vu.com officially shut down?

---

**End of Handoff Document**

For questions about what was built, refer to:
- `BUILD-SUMMARY.md` (original build notes)
- This document (current state)
- Code comments in key files
