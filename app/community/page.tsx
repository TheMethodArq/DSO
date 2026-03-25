import { getCommunityData, parseCommunityInfo } from '@/lib/data/community-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  GraduationCap, 
  Home,
  Waves,
  Trees,
  Building,
  Dumbbell,
  CircleDot,
  DollarSign,
  Percent,
  Calendar,
  Navigation
} from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'About Emory Crossing 40s - Community Information',
  description: 'Learn about Emory Crossing 40s community amenities, schools, HOA information, and more',
};

// Map amenity types to icons
const amenityIcons: Record<string, React.ReactNode> = {
  Pool: <Waves className="w-6 h-6" />,
  Playground: <Trees className="w-6 h-6" />,
  Park: <Trees className="w-6 h-6" />,
  Trails: <Trees className="w-6 h-6" />,
  Clubhouse: <Building className="w-6 h-6" />,
  Basketball: <CircleDot className="w-6 h-6" />,
  Greenbelt: <Trees className="w-6 h-6" />,
  Gym: <Dumbbell className="w-6 h-6" />,
  Tennis: <CircleDot className="w-6 h-6" />,
};

function getAmenityIcon(type: string) {
  return amenityIcons[type] || <Home className="w-6 h-6" />;
}

function formatHoursForDisplay(hoursStr: string): string[] {
  if (!hoursStr) return [];
  return hoursStr.split('\n').filter(Boolean);
}

export default async function CommunityPage() {
  const subdivision = await getCommunityData();

  if (!subdivision) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About Emory Crossing 40s</h1>
        <p className="text-gray-600">Unable to load community information. Please try again later.</p>
      </div>
    );
  }

  const communityInfo = parseCommunityInfo(subdivision);
  const salesOffice = subdivision.SalesOffice;
  
  // Build Google Maps directions URL
  const mapsQuery = encodeURIComponent(communityInfo.address);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  
  // Appointment scheduler URL
  const appointmentUrl = 'https://www.taylormorrison.com/tx/austin/hutto/emory-crossing-40s/contact';

  // Get hero image (first community image)
  const heroImage = communityInfo.images[0];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">About Emory Crossing 40s</h1>
        <p className="text-gray-600">Discover what makes our community special</p>
      </div>

      {/* Hero Section */}
      {heroImage && (
        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
          <Image
            src={heroImage}
            alt={communityInfo.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{communityInfo.name}</h2>
            <p className="text-white/90 max-w-2xl">{communityInfo.city}, {communityInfo.state}</p>
          </div>
        </div>
      )}

      {/* Description */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {communityInfo.description}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Amenities & Schools */}
        <div className="lg:col-span-2 space-y-8">
          {/* Amenities Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Community Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {communityInfo.amenities.map((amenity) => (
                <Card key={amenity} className="text-center">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-3 text-primary">
                      {getAmenityIcon(amenity)}
                    </div>
                    <p className="font-medium text-gray-900">{amenity}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Schools Section */}
          {communityInfo.schools.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Schools</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {communityInfo.schools.map((school, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <GraduationCap className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">{school.DistrictName} School District</p>
                          <div className="mt-2 space-y-1 text-sm text-gray-600">
                            {school.Elementary && (
                              <p>Elementary: {school.Elementary}</p>
                            )}
                            {school.Middle && (
                              <p>Middle School: {school.Middle}</p>
                            )}
                            {school.High && (
                              <p>High School: {school.High}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* HOA & Tax Info */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Financial Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communityInfo.hoaFee && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">HOA Fee</p>
                        <p className="text-lg font-semibold text-gray-900">
                          ${communityInfo.hoaFee}/month
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {communityInfo.taxRate && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Percent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tax Rate</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {communityInfo.taxRate}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        </div>

        {/* Right Column - Sales Office Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Sales Office</CardTitle>
              <CardDescription>Visit us to tour our model homes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Agent */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Home className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sales Agent</p>
                  <p className="font-medium text-gray-900">{communityInfo.agent}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium text-gray-900">
                    {salesOffice.Address.Street1}
                  </p>
                  <p className="text-gray-600">
                    {salesOffice.Address.City}, {salesOffice.Address.State} {salesOffice.Address.ZIP}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <a 
                    href={`tel:${communityInfo.phone.replace(/-/g, '')}`}
                    className="font-medium text-gray-900 hover:text-primary"
                  >
                    {communityInfo.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <a 
                    href={`mailto:${communityInfo.email}`}
                    className="font-medium text-gray-900 hover:text-primary"
                  >
                    {communityInfo.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              {communityInfo.hours && (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hours</p>
                    <div className="space-y-1">
                      {formatHoursForDisplay(communityInfo.hours).map((line, index) => (
                        <p key={index} className="font-medium text-gray-900">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="pt-4 space-y-3">
                <a 
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full"
                >
                  <Button className="w-full">
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </a>
                <a 
                  href={appointmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full"
                >
                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Appointment
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
