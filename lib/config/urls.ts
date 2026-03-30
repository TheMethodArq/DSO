// URL Configuration for QA and Production environments
// Toggle with USE_QA_URLS env variable

const USE_QA = process.env.USE_QA_URLS === 'true';

// Base configuration
const config = USE_QA
  ? {
      baseUrl: process.env.QA_BASE_URL || 'https://qa.taylormorrison.com',
      state: process.env.QA_STATE || 'tx',
      region: process.env.QA_REGION || 'austin',
      city: process.env.QA_CITY || 'hutto',
      communitySlug: process.env.QA_COMMUNITY_SLUG || 'emory-crossing-40s',
    }
  : {
      baseUrl: process.env.PROD_BASE_URL || 'https://www.taylormorrison.com',
      state: process.env.PROD_STATE || 'tx',
      region: process.env.PROD_REGION || 'austin',
      city: process.env.PROD_CITY || 'hutto',
      communitySlug: process.env.PROD_COMMUNITY_SLUG || 'emory-crossing-40s',
    };

// Build community base path
const communityPath = `/${config.state}/${config.region}/${config.city}/${config.communitySlug}`;

// URL Builders
export const urls = {
  // Environment info
  isQA: USE_QA,
  baseUrl: config.baseUrl,
  
  // Main community page
  community: `${config.baseUrl}${communityPath}`,
  
  // Floor plan pages
  floorPlans: {
    list: `${config.baseUrl}${communityPath}/floor-plans`,
    detail: (planName: string) => {
      const slug = planName.toLowerCase().replace(/\s+/g, '-');
      return `${config.baseUrl}${communityPath}/floor-plans/${slug}`;
    },
  },
  
  // Available homes (spec homes)
  availableHomes: {
    list: `${config.baseUrl}${communityPath}`,
    detail: (planName: string, address: string) => {
      const planSlug = planName.toLowerCase().replace(/\s+/g, '-');
      const addressSlug = address.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      return `${config.baseUrl}${communityPath}/floor-plans/${planSlug}/home-available-now-at-${addressSlug}`;
    },
  },
  
  // Site map / interactive sitemap
  siteMap: `${config.baseUrl}${communityPath}#InteractiveSitemap`,
  
  // To-be-built (new format)
  toBeBuilt: (id?: string) => id 
    ? `${config.baseUrl}${communityPath}/to-be-built/${id}`
    : `${config.baseUrl}${communityPath}`,
  
  // Available now (new format)
  availableNow: (id?: string) => id
    ? `${config.baseUrl}${communityPath}/available-now/${id}`
    : `${config.baseUrl}${communityPath}`,
};

// Legacy Dovella URLs (for reference/migration)
export const legacyUrls = {
  sitePlan: process.env.SITE_PLAN_URL || 'https://tm-vu.com/siteplan/pI8ELRVMx8g8r7XtNtln',
  communityVu: 'https://admin.tm-vu.com/communityvu/bvZY6lDoqqrpupZvhQmx',
};

// Helper to format plan name for URLs
export function formatPlanSlug(planName: string): string {
  return planName.toLowerCase().replace(/\s+/g, '-');
}

// Helper to format address for URLs
export function formatAddressSlug(address: string): string {
  return address.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}
