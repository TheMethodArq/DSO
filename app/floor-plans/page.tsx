'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FloorPlanInfo } from '@/lib/data/types';
import { formatPrice, formatSqft } from '@/lib/data/community-data';
import { Loader2, Bed, Bath, Square, Car, Info } from 'lucide-react';
import useSWR from 'swr';

type FilterType = 'all' | '1-story' | '2-story';

const fetcher = async () => {
  const res = await fetch('/api/community');
  if (!res.ok) throw new Error('Failed to load community data');
  const data = await res.json();
  return data.floorPlans as FloorPlanInfo[];
};

export default function FloorPlansPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  
  const { data: floorPlans, error, isLoading } = useSWR<FloorPlanInfo[]>(
    'floor-plans',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const filteredPlans = useMemo(() => {
    if (!floorPlans) return [];
    
    switch (activeFilter) {
      case '1-story':
        return floorPlans.filter(plan => plan.stories === 1);
      case '2-story':
        return floorPlans.filter(plan => plan.stories === 2);
      default:
        return floorPlans;
    }
  }, [floorPlans, activeFilter]);

  // Select first plan by default when data loads
  const selectedPlan = useMemo(() => {
    if (!filteredPlans.length) return null;
    if (selectedPlanId) {
      return filteredPlans.find(p => p.id === selectedPlanId) || filteredPlans[0];
    }
    return filteredPlans[0];
  }, [filteredPlans, selectedPlanId]);

  const filterButtons: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: '1-Story', value: '1-story' },
    { label: '2-Story', value: '2-story' },
  ];

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 animate-spin text-gray-600 mb-4" />
          <p className="text-lg text-gray-600">Loading floor plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-2">Failed to load floor plans</p>
          <p className="text-gray-600 mb-4">Please try again later</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-80px)] flex">
      {/* Left Sidebar - Floor Plan List (1/3) */}
      <div className="w-1/3 min-w-[400px] bg-white border-r flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold mb-2">Floor Plans</h1>
          <p className="text-gray-600 text-sm">
            Select a plan to view interactive floor plan
          </p>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 border-b">
          <div className="flex gap-2">
            {filterButtons.map(({ label, value }) => (
              <Button
                key={value}
                onClick={() => setActiveFilter(value)}
                variant={activeFilter === value ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Plan List */}
        <div className="flex-1 overflow-y-auto">
          {filteredPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`w-full p-4 border-b text-left transition-colors hover:bg-gray-50 ${
                selectedPlan?.id === plan.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'
              }`}
            >
              <div className="flex gap-4">
                {/* Thumbnail */}
                <div className="relative w-24 h-20 bg-gray-100 rounded overflow-hidden shrink-0">
                  {plan.elevationImages[0] ? (
                    <Image
                      src={plan.elevationImages[0]}
                      alt={plan.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                      No image
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg truncate">{plan.name}</h3>
                    {plan.specCount > 0 && (
                      <Badge className="bg-green-600 text-white text-xs shrink-0">
                        {plan.specCount} Available
                      </Badge>
                    )}
                  </div>
                  <p className="text-xl font-semibold text-gray-900 mb-2">
                    {formatPrice(plan.price)}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Square className="w-4 h-4" />
                      {plan.sqft.toLocaleString()} sqft
                    </span>
                    <span className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      {plan.beds} Bed
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      {plan.baths} Bath
                    </span>
                    <span className="flex items-center gap-1">
                      <Car className="w-4 h-4" />
                      {plan.garage} Car
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="px-6 py-3 border-t bg-gray-50 text-sm text-gray-600">
          {filteredPlans.length} floor plans
        </div>
      </div>

      {/* Right Side - Interactive Floor Plan (2/3) */}
      <div className="flex-1 bg-gray-100 flex flex-col">
        {selectedPlan ? (
          <>
            {/* Plan Header */}
            <div className="bg-white border-b px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedPlan.name}</h2>
                  <p className="text-gray-600">
                    {selectedPlan.stories}-Story • {selectedPlan.sqft.toLocaleString()} sqft • Starting at {formatPrice(selectedPlan.price)}
                  </p>
                </div>
                {selectedPlan.specCount > 0 && (
                  <Badge className="bg-green-600 text-white px-4 py-2 text-base">
                    {selectedPlan.specCount} Available Now
                  </Badge>
                )}
              </div>
            </div>

            {/* Interactive Floor Plan */}
            <div className="flex-1 p-6">
              {selectedPlan.interactiveUrl ? (
                <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
                  <iframe
                    src={selectedPlan.interactiveUrl}
                    className="w-full h-full border-0"
                    title={`${selectedPlan.name} Interactive Floor Plan`}
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    allow="fullscreen"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center">
                  <div className="text-center">
                    <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-xl text-gray-500 mb-2">Interactive floor plan coming soon</p>
                    <p className="text-gray-400">Please check back later or contact our sales office</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Info Bar */}
            <div className="bg-white border-t px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-8">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-gray-600" />
                    <span className="text-lg font-semibold">{selectedPlan.beds} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-gray-600" />
                    <span className="text-lg font-semibold">
                      {selectedPlan.baths + (selectedPlan.halfBaths > 0 ? '.5' : '')} Bathrooms
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-gray-600" />
                    <span className="text-lg font-semibold">{selectedPlan.garage} Car Garage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="w-5 h-5 text-gray-600" />
                    <span className="text-lg font-semibold">{formatSqft(selectedPlan.sqft)}</span>
                  </div>
                </div>
                <Button size="lg" className="touch-button">
                  Schedule Appointment
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 text-lg">Select a floor plan to view</p>
          </div>
        )}
      </div>
    </div>
  );
}
