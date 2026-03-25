import { NextResponse } from 'next/server';
import { getCommunityData, parseFloorPlans, parseSpecHomes, parseCommunityInfo } from '@/lib/data/community-data';

export async function GET() {
  try {
    const data = await getCommunityData();
    
    if (!data) {
      return NextResponse.json(
        { error: 'Community data not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      community: parseCommunityInfo(data),
      floorPlans: parseFloorPlans(data),
      specHomes: parseSpecHomes(data),
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch community data' },
      { status: 500 }
    );
  }
}
