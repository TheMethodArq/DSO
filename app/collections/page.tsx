'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Gem, Crown, Palette, Home } from 'lucide-react';
import useSWR from 'swr';

const fetcher = async () => {
  const res = await fetch('/api/community');
  if (!res.ok) throw new Error('Failed to load community data');
  const data = await res.json();
  return data.community;
};

// Design collection data structure
const designCollections = {
  classic: {
    name: 'Largo Collection',
    level: 'Classic Level',
    description: 'Thoughtfully curated finishes that blend timeless appeal with modern comfort. Perfect for those who appreciate enduring style.',
    icon: Gem,
    features: [
      { category: 'Flooring', description: 'Luxury vinyl plank in warm oak tones' },
      { category: 'Tile', description: 'Ceramic tile in neutral earth tones' },
      { category: 'Backsplash', description: 'Subway tile in soft white' },
      { category: 'Countertops', description: 'Quartz in classic marble-look' },
      { category: 'Cabinets', description: 'Shaker-style in warm white' },
      { category: 'Hardware', description: 'Brushed nickel finishes' },
    ],
    images: [
      'https://www.taylormorrison.com/-/media/images/collections/classic-kitchen-1.jpg',
      'https://www.taylormorrison.com/-/media/images/collections/classic-bath-1.jpg',
      'https://www.taylormorrison.com/-/media/images/collections/classic-flooring-1.jpg',
    ],
  },
  signature: {
    name: 'Concerto Collection',
    level: 'Signature Level',
    description: 'Elevated finishes featuring premium materials and sophisticated design details for the discerning homeowner.',
    icon: Crown,
    features: [
      { category: 'Flooring', description: 'Engineered hardwood in rich walnut' },
      { category: 'Tile', description: 'Porcelain tile in contemporary gray' },
      { category: 'Backsplash', description: 'Glass mosaic in elegant patterns' },
      { category: 'Countertops', description: 'Premium quartz in dramatic veining' },
      { category: 'Cabinets', description: 'Flat-panel in deep espresso' },
      { category: 'Hardware', description: 'Matte black designer fixtures' },
    ],
    images: [
      'https://www.taylormorrison.com/-/media/images/collections/signature-kitchen-1.jpg',
      'https://www.taylormorrison.com/-/media/images/collections/signature-bath-1.jpg',
      'https://www.taylormorrison.com/-/media/images/collections/signature-flooring-1.jpg',
    ],
  },
};

export default function CollectionsPage() {
  const [selectedLevel, setSelectedLevel] = useState<'classic' | 'signature'>('classic');
  
  const { data: community, error, isLoading } = useSWR(
    'community-collections',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const collection = designCollections[selectedLevel];
  const Icon = collection.icon;

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 animate-spin text-gray-600 mb-4" />
          <p className="text-lg text-gray-600">Loading design collections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Palette className="w-8 h-8 text-gray-700" />
            <h1 className="text-4xl font-bold">Design Collections</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">
            Explore our curated design collections at {community?.name || 'Emory Crossing 40s'}. 
            Each collection features carefully selected finishes to suit your personal style.
          </p>
        </div>
      </div>

      {/* Level Selection */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white p-2 rounded-xl shadow-sm border inline-flex">
            <button
              onClick={() => setSelectedLevel('classic')}
              className={`flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold transition-all ${
                selectedLevel === 'classic'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Gem className="w-5 h-5" />
              Classic Level
            </button>
            <button
              onClick={() => setSelectedLevel('signature')}
              className={`flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold transition-all ${
                selectedLevel === 'signature'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Crown className="w-5 h-5" />
              Signature Level
            </button>
          </div>
        </div>

        {/* Collection Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Collection Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl ${selectedLevel === 'classic' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                    <Icon className={`w-8 h-8 ${selectedLevel === 'classic' ? 'text-blue-600' : 'text-purple-600'}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">{collection.level}</p>
                    <h2 className="text-2xl font-bold">{collection.name}</h2>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {collection.description}
                </p>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b pb-2">Collection Features</h3>
                  {collection.features.map((feature, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <span className="font-medium text-gray-700">{feature.category}</span>
                      <span className="text-gray-600 text-sm text-right max-w-[60%]">{feature.description}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-6 touch-button" size="lg">
                  <Home className="w-5 h-5 mr-2" />
                  Schedule Design Appointment
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right - Design Gallery */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Design Gallery</h3>
            
            {/* Main Featured Image */}
            <div className="relative aspect-[16/9] bg-gray-200 rounded-xl overflow-hidden mb-6">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center">
                  <Icon className={`w-20 h-20 mx-auto mb-4 ${selectedLevel === 'classic' ? 'text-blue-300' : 'text-purple-300'}`} />
                  <p className="text-2xl font-bold text-gray-700">{collection.name}</p>
                  <p className="text-gray-500 mt-2">Design Visualization</p>
                </div>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {collection.features.map((feature, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative aspect-square bg-gray-100">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <Palette className="w-10 h-10 text-gray-300 mb-2" />
                      <p className="font-semibold text-gray-700 text-sm">{feature.category}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Compare Notice */}
            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-2">Compare Collections</h4>
              <p className="text-blue-700">
                Toggle between Classic and Signature levels above to compare design options. 
                Our design consultants can help you select the perfect finishes for your new home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
