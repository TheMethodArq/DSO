'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, School, ShoppingBag, TreePine, Car, Train, Plane, Utensils, Stethoscope } from 'lucide-react';
import useSWR from 'swr';

const fetcher = async () => {
  const res = await fetch('/api/community');
  if (!res.ok) throw new Error('Failed to load community data');
  const data = await res.json();
  return data.community;
};

// Nearby amenities data
const nearbyAmenities = {
  schools: [
    { name: 'Hutto Middle School', type: 'Public', distance: '2.3 miles', rating: 'A-' },
    { name: 'Hutto High School', type: 'Public', distance: '3.1 miles', rating: 'A' },
    { name: 'Nadine Johnson Elementary', type: 'Public', distance: '1.8 miles', rating: 'A' },
  ],
  shopping: [
    { name: 'Hutto H-E-B Plus!', type: 'Grocery', distance: '2.5 miles' },
    { name: 'Stone Hill Town Center', type: 'Shopping Center', distance: '4.2 miles' },
    { name: 'Round Rock Premium Outlets', type: 'Outlet Mall', distance: '8.7 miles' },
    { name: 'IKEA Round Rock', type: 'Furniture', distance: '9.1 miles' },
  ],
  dining: [
    { name: 'Downtown Hutto', type: 'Local Dining', distance: '3.2 miles' },
    { name: 'The Salt Lick BBQ', type: 'Barbecue', distance: '12 miles' },
    { name: 'Pflugerville Restaurant Row', type: 'Various', distance: '7.5 miles' },
  ],
  healthcare: [
    { name: 'Ascension Seton Williamson', type: 'Hospital', distance: '6.8 miles' },
    { name: 'Hutto Family Health Center', type: 'Urgent Care', distance: '3.1 miles' },
    { name: 'Baylor Scott & White', type: 'Medical Center', distance: '9.4 miles' },
  ],
  recreation: [
    { name: 'Fritz Park', type: 'Park', distance: '2.8 miles' },
    { name: 'Hutto Lake Park', type: 'Lake & Trails', distance: '3.5 miles' },
    { name: 'Star Ranch Golf Club', type: 'Golf', distance: '5.2 miles' },
    { name: 'Rock�n River Water Park', type: 'Water Park', distance: '4.1 miles' },
  ],
};

const commuteInfo = [
  { icon: Car, label: 'Downtown Austin', time: '35 min', distance: '28 miles' },
  { icon: Plane, label: 'Austin Airport (AUS)', time: '32 min', distance: '26 miles' },
  { icon: Train, label: 'MetroRail Downtown', time: '45 min', note: 'via Howard Station' },
  { icon: Car, label: 'Tesla Gigafactory', time: '18 min', distance: '12 miles' },
  { icon: Car, label: 'Dell Technologies', time: '25 min', distance: '18 miles' },
  { icon: Car, label: 'Samsung Austin', time: '28 min', distance: '22 miles' },
];

export default function AreaPage() {
  const [activeTab, setActiveTab] = useState<'map' | 'amenities'>('map');
  
  const { data: community, error, isLoading } = useSWR(
    'community-area',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 animate-spin text-gray-600 mb-4" />
          <p className="text-lg text-gray-600">Loading area information...</p>
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
            <MapPin className="w-8 h-8 text-gray-700" />
            <h1 className="text-4xl font-bold">Around the Area</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover what makes {community?.name || 'Emory Crossing 40s'} the perfect place to call home. 
            Explore nearby schools, shopping, dining, and recreation.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-20 z-10">
        <div className="container mx-auto px-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-6 py-4 font-semibold text-lg border-b-2 transition-colors ${
                activeTab === 'map'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Interactive Map
            </button>
            <button
              onClick={() => setActiveTab('amenities')}
              className={`px-6 py-4 font-semibold text-lg border-b-2 transition-colors ${
                activeTab === 'amenities'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Nearby Amenities
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {activeTab === 'map' ? (
          <div className="space-y-8">
            {/* Interactive Map Embed */}
            <Card className="overflow-hidden">
              <div className="relative aspect-[16/9] bg-gray-100">
                <iframe
                  src="https://panomaps.us/homes/taylormorrison/tx/austin/hutto/emory-crossing/"
                  className="w-full h-full border-0"
                  title="Around the Area - Interactive Map"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  allow="fullscreen"
                />
              </div>
              <div className="p-4 bg-gray-50 border-t flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Explore the neighborhood with our interactive map. Pan and zoom to discover nearby amenities.
                </p>
                <Button variant="outline" size="sm" onClick={() => window.open('https://panomaps.us/homes/taylormorrison/tx/austin/hutto/emory-crossing/', '_blank')}>
                  Open Full Map
                </Button>
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-gray-900">A</p>
                  <p className="text-sm text-gray-600 mt-1">School Rating</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-gray-900">28</p>
                  <p className="text-sm text-gray-600 mt-1">Miles to Austin</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-gray-900">2.5</p>
                  <p className="text-sm text-gray-600 mt-1">Miles to H-E-B</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-gray-900">32</p>
                  <p className="text-sm text-gray-600 mt-1">Min to Airport</p>
                </CardContent>
              </Card>
            </div>

            {/* Commute Times */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Commute Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {commuteInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="p-3 bg-white rounded-lg">
                          <Icon className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                          <p className="font-semibold">{item.label}</p>
                          <p className="text-sm text-gray-600">
                            {item.time} {item.distance && `• ${item.distance}`}
                            {item.note && `• ${item.note}`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Schools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="w-5 h-5" />
                  Schools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nearbyAmenities.schools.map((school, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold">{school.name}</p>
                        <p className="text-sm text-gray-600">{school.type} School</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-1">Rating: {school.rating}</Badge>
                        <p className="text-sm text-gray-600">{school.distance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shopping */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Shopping
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nearbyAmenities.shopping.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <ShoppingBag className="w-8 h-8 text-gray-400" />
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.type}</p>
                      </div>
                      <span className="text-sm text-gray-500">{item.distance}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dining & Healthcare */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="w-5 h-5" />
                    Dining
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {nearbyAmenities.dining.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.type}</p>
                        </div>
                        <span className="text-sm text-gray-500">{item.distance}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5" />
                    Healthcare
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {nearbyAmenities.healthcare.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.type}</p>
                        </div>
                        <span className="text-sm text-gray-500">{item.distance}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recreation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreePine className="w-5 h-5" />
                  Recreation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nearbyAmenities.recreation.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <TreePine className="w-8 h-8 text-green-500" />
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.type}</p>
                      </div>
                      <span className="text-sm text-gray-500">{item.distance}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
