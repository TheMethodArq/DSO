'use client';

import { useState, useMemo } from 'react';
import { SpecHomeCard } from '@/components/homes/SpecHomeCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Filter, ArrowUpDown } from 'lucide-react';
import { SpecHomeInfo } from '@/lib/data/types';
import useSWR from 'swr';

type SortOption = 'price-asc' | 'price-desc' | 'date-asc' | 'date-desc';

const fetcher = async () => {
  const res = await fetch('/api/community');
  if (!res.ok) throw new Error('Failed to load community data');
  const data = await res.json();
  return data.specHomes as SpecHomeInfo[];
};

export default function AvailableHomesPage() {
  const { data: specs, error, isLoading } = useSWR<SpecHomeInfo[]>(
    'available-homes',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  
  const [selectedPlan, setSelectedPlan] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-asc');

  const filteredAndSortedSpecs = useMemo(() => {
    if (!specs) return [];

    let result = [...specs];

    // Filter by plan
    if (selectedPlan !== 'all') {
      result = result.filter((spec) => spec.planId === selectedPlan);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'date-asc':
          return new Date(a.moveInDate).getTime() - new Date(b.moveInDate).getTime();
        case 'date-desc':
          return new Date(b.moveInDate).getTime() - new Date(a.moveInDate).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [specs, selectedPlan, sortBy]);

  const availablePlans = useMemo(() => {
    if (!specs) return [];
    const planMap = new Map<string, string>();
    specs.forEach((spec) => {
      if (!planMap.has(spec.planId)) {
        planMap.set(spec.planId, spec.planName);
      }
    });
    return Array.from(planMap.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [specs]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Loader2 className="w-12 h-12 animate-spin text-gray-600 mb-4" />
          <p className="text-lg text-gray-600">Loading available homes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <p className="text-lg text-red-600 mb-2">Failed to load available homes</p>
          <p className="text-gray-600 mb-4">Please try again later</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Available Homes Now</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Move-in ready homes at Emory Crossing 40s. These spec homes are 
          under construction or completed and ready for quick move-in.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-white rounded-lg border">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-700">Filter by Plan:</span>
        </div>
        
        <select
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent min-w-[180px]"
        >
          <option value="all">All Plans</option>
          {availablePlans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 ml-auto">
          <ArrowUpDown className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-700">Sort by:</span>
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent min-w-[200px]"
        >
          <option value="date-asc">Move-in Date (Earliest)</option>
          <option value="date-desc">Move-in Date (Latest)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <Badge variant="secondary" className="text-base px-4 py-2">
          {filteredAndSortedSpecs.length} Home{filteredAndSortedSpecs.length !== 1 ? 's' : ''} Available
        </Badge>
      </div>

      {/* Homes List */}
      {filteredAndSortedSpecs.length > 0 ? (
        <div className="space-y-6">
          {filteredAndSortedSpecs.map((spec) => (
            <SpecHomeCard key={spec.id} spec={spec} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg border">
          <p className="text-xl text-gray-600 mb-2">No homes match your filters</p>
          <p className="text-gray-500">Try adjusting your filter criteria</p>
        </div>
      )}
    </div>
  );
}
