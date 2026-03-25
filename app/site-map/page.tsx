'use client';

import { SitePlanEmbed } from '@/components/iframes/SitePlanEmbed';
import { Badge } from '@/components/ui/badge';
import { MapPin, Info } from 'lucide-react';

export default function SiteMapPage() {
  const sitePlanUrl = 'https://tm-vu.com/siteplan/pI8ELRVMx8g8r7XtNtln';

  return (
    <div className="relative w-full h-[calc(100vh-80px)]">
      {/* Site Plan Embed - Full Screen */}
      <SitePlanEmbed url={sitePlanUrl} />

      {/* Legend Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Lot Status
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-600" />
            <span className="text-gray-700">Available</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-red-600" />
            <span className="text-gray-700">Sold</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gray-400 border-2 border-gray-500" />
            <span className="text-gray-700">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Info Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border max-w-2xl mx-auto">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Interactive Site Plan:</span> Touch any lot on the 
                map to view details, availability, and pricing. Use pinch gestures to zoom in and 
                out, or drag to pan around the community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Name Badge */}
      <div className="absolute top-4 right-4 z-10">
        <Badge className="bg-black text-white text-base px-4 py-2 shadow-lg">
          Emory Crossing 40s
        </Badge>
      </div>
    </div>
  );
}
