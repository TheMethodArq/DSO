'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface SitePlanEmbedProps {
  url: string;
}

export function SitePlanEmbed({ url }: SitePlanEmbedProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-[calc(100vh-80px)] bg-gray-100">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-10">
          <Loader2 className="w-12 h-12 animate-spin text-gray-600 mb-4" />
          <p className="text-xl text-gray-600">Loading interactive site plan...</p>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-10">
          <p className="text-xl text-gray-600 mb-2">Unable to load site plan</p>
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
        title="Interactive Site Plan"
        allow="fullscreen"
      />
    </div>
  );
}
