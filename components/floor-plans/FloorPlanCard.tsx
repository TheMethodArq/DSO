'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bed, Bath, Square, Car } from 'lucide-react';
import { FloorPlanInfo } from '@/lib/data/types';
import { formatPrice, formatSqft } from '@/lib/data/community-data';

interface FloorPlanCardProps {
  plan: FloorPlanInfo;
}

export function FloorPlanCard({ plan }: FloorPlanCardProps) {
  const elevationImage = plan.elevationImages[0];

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-56 bg-gray-100">
        {elevationImage ? (
          <Image
            src={elevationImage}
            alt={`${plan.name} exterior`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        
        {plan.specCount > 0 && (
          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {plan.specCount} Available
          </div>
        )}
      </div>
      
      <CardContent className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        
        <div className="grid grid-cols-2 gap-3 mb-4 text-gray-600">
          <div className="flex items-center gap-2">
            <Square className="w-5 h-5" />
            <span className="text-base">{formatSqft(plan.sqft)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5" />
            <span className="text-base">{plan.beds} Bed</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5" />
            <span className="text-base">
              {plan.baths + (plan.halfBaths > 0 ? `.5` : '')} Bath
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            <span className="text-base">{plan.garage} Car</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t">
          <div>
            <p className="text-sm text-gray-500">Starting at</p>
            <p className="text-2xl font-bold">{formatPrice(plan.price)}</p>
          </div>
          <Link href={`/floor-plans/${plan.id}`}>
            <Button size="lg" className="touch-button">
              View Plan
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
