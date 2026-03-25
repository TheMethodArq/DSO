import { xmlParser } from './xml-parser';
import { Subdivision, Plan, Spec, CommunityInfo, FloorPlanInfo, SpecHomeInfo, Image } from './types';
import { format, parseISO } from 'date-fns';

const XML_URL = process.env.XML_FEED_URL || 'https://cm.taylormorrison.com/DataFeeds/TaylorMorrison.xml';
const COMMUNITY_NAME = process.env.COMMUNITY_NAME || 'Emory Crossing 40s';
const SITE_PLAN_URL = process.env.SITE_PLAN_URL || 'https://tm-vu.com/siteplan/pI8ELRVMx8g8r7XtNtln';
const REVALIDATE_SECONDS = parseInt(process.env.REVALIDATE_SECONDS || '3600');

export async function getCommunityData(): Promise<Subdivision | null> {
  try {
    const response = await fetch(XML_URL, {
      next: {
        revalidate: REVALIDATE_SECONDS,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    const xmlText = await response.text();
    const parsed = xmlParser.parse(xmlText);
    
    // Navigate to corporation/builder structure
    const corporation = parsed.Builders?.Corporation;
    if (!corporation) {
      console.error('No Corporation found in XML');
      return null;
    }
    
    const builders = corporation.Builder;
    if (!builders) {
      console.error('No Builder found in XML');
      return null;
    }
    
    // Find subdivision matching community name
    for (const builder of Array.isArray(builders) ? builders : [builders]) {
      const subdivisions = builder.Subdivision;
      if (!subdivisions) continue;
      
      for (const sub of Array.isArray(subdivisions) ? subdivisions : [subdivisions]) {
        if (sub.SubdivisionName === COMMUNITY_NAME) {
          // Add site plan URL if not present
          if (!sub.SubInteractiveMedia && SITE_PLAN_URL) {
            sub.SubInteractiveMedia = {
              Type: 'InteractiveSitePlan',
              WebsiteURL: SITE_PLAN_URL,
            };
          }
          return sub as Subdivision;
        }
      }
    }
    
    console.error(`Community "${COMMUNITY_NAME}" not found in XML`);
    return null;
  } catch (error) {
    console.error('Error fetching community data:', error);
    return null;
  }
}

export function parseCommunityInfo(subdivision: Subdivision): CommunityInfo {
  const office = subdivision.SalesOffice;
  const address = office.Address;
  
  return {
    name: subdivision.SubdivisionName,
    description: subdivision.SubDescription,
    city: address.City,
    state: address.State,
    agent: office.Agent,
    phone: `${office.Phone.AreaCode}-${office.Phone.Prefix}-${office.Phone.Suffix}`,
    email: office.Email,
    address: `${address.Street1}, ${address.City}, ${address.State} ${address.ZIP}`,
    hours: formatHours(office.Hours),
    amenities: (subdivision.SubAmenity || [])
      .filter(a => String(a.value) === '1')
      .map(a => a['@_Type']),
    schools: subdivision.Schools || [],
    hoaFee: subdivision.Service?.find(s => s.Type === 'HOA')?.MonthlyFee,
    taxRate: subdivision.Taxes?.TotalTaxRate,
    images: (subdivision.SubImage || [])
      .filter(img => img['@_Type'] === 'Standard')
      .map(img => img.value),
    sitePlanUrl: subdivision.SubInteractiveMedia?.WebsiteURL || SITE_PLAN_URL,
    videoTour: subdivision.SubVideoTour?.value,
  };
}

export function parseFloorPlans(subdivision: Subdivision): FloorPlanInfo[] {
  const plans = subdivision.Plan || [];
  
  return plans
    .filter(plan => plan.PlanNotAvailable !== '1')
    .map(plan => {
      const elevationImages = (plan.PlanImages?.ElevationImage || [])
        .map((img: Image) => img.value);
      
      const specs = plan.Spec || [];
      
      return {
        id: plan.PlanNumber,
        name: plan.PlanName,
        price: parseInt(plan.BasePrice, 10),
        sqft: parseInt(plan.BaseSqft, 10),
        beds: parseInt(plan.Bedrooms.value, 10),
        baths: parseInt(plan.Baths, 10),
        halfBaths: parseInt(plan.HalfBaths || '0', 10),
        stories: parseInt(plan.Stories, 10),
        garage: parseInt(plan.Garage.value, 10),
        masterBedLocation: plan.Bedrooms.MasterBedLocation,
        description: plan.Description,
        elevationImages,
        floorPlanPdf: plan.PlanImages?.FloorPlanImage?.value,
        virtualTour: plan.PlanImages?.VirtualTour,
        interactiveUrl: plan.PlanInteractiveMedia?.WebsiteURL,
        specCount: Array.isArray(specs) ? specs.length : specs ? 1 : 0,
      };
    });
}

export function parseSpecHomes(subdivision: Subdivision): SpecHomeInfo[] {
  const plans = subdivision.Plan || [];
  const specs: SpecHomeInfo[] = [];
  
  for (const plan of plans) {
    const planSpecs = plan.Spec || [];
    for (const spec of Array.isArray(planSpecs) ? planSpecs : planSpecs ? [planSpecs] : []) {
      const addr = spec.SpecAddress;
      const images = spec.SpecImages;
      
      specs.push({
        id: spec.SpecNumber,
        lot: addr.SpecLot,
        address: addr.SpecStreet1,
        city: addr.SpecCity,
        state: addr.SpecState,
        zip: addr.SpecZIP,
        price: parseInt(spec.SpecPrice, 10),
        sqft: parseInt(spec.SpecSqft, 10),
        beds: parseInt(spec.SpecBedrooms.value, 10),
        baths: parseInt(spec.SpecBaths, 10),
        halfBaths: parseInt(spec.SpecHalfBaths || '0', 10),
        stories: parseInt(spec.SpecStories, 10),
        moveInDate: spec.SpecMoveInDate.Day,
        description: spec.SpecDescription,
        elevationImage: images?.SpecElevationImage?.[0]?.value,
        mls: extractMLS(spec.SpecDescription),
        planName: plan.PlanName,
        planId: plan.PlanNumber,
      });
    }
  }
  
  // Sort by move-in date
  return specs.sort((a, b) => 
    new Date(a.moveInDate).getTime() - new Date(b.moveInDate).getTime()
  );
}

export function getSpecsByPlan(subdivision: Subdivision, planId: string): SpecHomeInfo[] {
  const allSpecs = parseSpecHomes(subdivision);
  return allSpecs.filter(spec => spec.planId === planId);
}

export function getPlanById(subdivision: Subdivision, planId: string): FloorPlanInfo | null {
  const plans = parseFloorPlans(subdivision);
  return plans.find(plan => plan.id === planId) || null;
}

// Helper functions

function formatHours(hoursStr: string): string {
  if (!hoursStr) return '';
  
  const days: Record<string, string> = {
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
    Sun: 'Sunday',
  };
  
  return hoursStr
    .split(';')
    .filter(Boolean)
    .map(part => {
      const [day, hours] = part.split(':');
      if (!day || !hours) return '';
      return `${days[day] || day}: ${hours}`;
    })
    .join('\n');
}

function extractMLS(description: string): string | undefined {
  const match = description.match(/MLS#?\s*(\d+)/i);
  return match ? match[1] : undefined;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), 'MMMM yyyy');
  } catch {
    return dateStr;
  }
}

export function formatSqft(sqft: number): string {
  return `${sqft.toLocaleString()} sqft`;
}
