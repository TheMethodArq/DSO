'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface FloorPlanEmbedProps {
  url: string;
  title?: string;
}

export function FloorPlanEmbed({ url, title }: FloorPlanEmbedProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-10">
          <Loader2 className="w-10 h-10 animate-spin text-gray-600 mb-3" />
          <p className="text-lg text-gray-600">Loading interactive floor plan...</p>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-10">
          <p className="text-lg text-gray-600 mb-2">Unable to load floor plan</p>
          <p className="text-gray-500">Please try again later</p>
        </div>
      )}

      <iframe
        src={url}
        className="w-full h-full border-0"
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        sandbox="allow-scripts allow-same-origin allow-popups"
        title={title || 'Interactive Floor Plan'}
        allow="fullscreen"
      />
    </div>
  );
}
