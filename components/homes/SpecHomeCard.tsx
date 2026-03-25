'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Square, Calendar } from 'lucide-react';
import { SpecHomeInfo } from '@/lib/data/types';
import { formatPrice, formatDate, formatSqft } from '@/lib/data/community-data';

interface SpecHomeCardProps {
  spec: SpecHomeInfo;
}

export function SpecHomeCard({ spec }: SpecHomeCardProps) {
  const imageUrl = spec.elevationImage || '/placeholder-home.jpg';

  return (
    <Card className="overflow-hidden">
      <div className="flex">
        {/* Image */}
        <div className="relative w-64 h-48 shrink-0">
          <Image
            src={imageUrl}
            alt={`${spec.planName} at ${spec.address}`}
            fill
            className="object-cover"
            sizes="256px"
          />
        </div>

        {/* Content */}
        <CardContent className="flex-1 p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <Badge variant="secondary" className="mb-2 text-base">
                Lot {spec.lot}
              </Badge>
              <h3 className="text-xl font-bold">{spec.planName}</h3>
              <p className="text-gray-600">{spec.address}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{formatPrice(spec.price)}</p>
              {spec.mls && (
                <p className="text-sm text-gray-500">MLS #{spec.mls}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6 text-gray-600 mb-3">
            <div className="flex items-center gap-2">
              <Square className="w-5 h-5" />
              <span>{formatSqft(spec.sqft)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5" />
              <span>{spec.beds} Bed</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5" />
              <span>
                {spec.baths + (spec.halfBaths > 0 ? `.5` : '')} Bath
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Move-in: {formatDate(spec.moveInDate)}</span>
            </div>
          </div>

          <p className="text-gray-600 line-clamp-2 text-base">
            {spec.description}
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
