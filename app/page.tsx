import Image from "next/image";
import Link from "next/link";
import { getCommunityData, parseCommunityInfo } from "@/lib/data/community-data";
import { Card, CardContent } from "@/components/ui/card";
import { 
  LayoutGrid, 
  Home, 
  Map, 
  Images, 
  Info,
  Palette,
  MapPin,
  ArrowRight
} from "lucide-react";

// Navigation cards configuration
const navCards = [
  {
    href: "/floor-plans",
    title: "Floor Plans",
    description: "Explore our home designs",
    icon: LayoutGrid,
    color: "bg-[#d31345]",
  },
  {
    href: "/available-homes",
    title: "Available Homes",
    description: "Move-in ready homes",
    icon: Home,
    color: "bg-[#d31345]",
  },
  {
    href: "/site-map",
    title: "Site Map",
    description: "View community layout",
    icon: Map,
    color: "bg-[#d31345]",
  },
  {
    href: "/collections",
    title: "Design Collections",
    description: "Classic & Signature finishes",
    icon: Palette,
    color: "bg-[#d31345]",
  },
  {
    href: "/area",
    title: "Around the Area",
    description: "Explore the neighborhood",
    icon: MapPin,
    color: "bg-[#d31345]",
  },
  {
    href: "/gallery",
    title: "Gallery",
    description: "See the community",
    icon: Images,
    color: "bg-[#d31345]",
  },
  {
    href: "/community",
    title: "Community Info",
    description: "Learn more about us",
    icon: Info,
    color: "bg-[#d31345]",
  },
];

// Sample data for development/fallback
const sampleCommunity = {
  name: "Emory Crossing 40s",
  city: "Hutto",
  state: "TX",
  description: "Welcome to Emory Crossing 40s, a stunning new home community in Hutto, Texas. Our thoughtfully designed homes offer modern living with exceptional amenities in a prime location.",
  images: [
    "https://www.taylormorrison.com/-/media/images/logos/tm-red-logo-2023.ashx",
  ],
};

export default async function HomePage() {
  // Fetch community data
  const subdivision = await getCommunityData();
  
  // Parse community info or use sample data as fallback
  let community;
  try {
    community = subdivision ? parseCommunityInfo(subdivision) : sampleCommunity;
  } catch {
    community = sampleCommunity;
  }

  // Use the first image from the community or a placeholder
  const heroImage = community.images?.[0] || "/images/community-hero.jpg";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={`${community.name} community`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-12 md:px-12 md:pb-16 max-w-7xl mx-auto">
          <div className="space-y-3">
            <p className="text-white/80 text-lg font-medium tracking-wide uppercase">
              Taylor Morrison
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              {community.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              {community.city}, {community.state}
            </p>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="px-6 py-10 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Welcome Home
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {community.description || sampleCommunity.description}
          </p>
        </div>
      </section>

      {/* Navigation Cards Grid */}
      <section className="px-6 pb-16 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {navCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link 
                key={card.href} 
                href={card.href}
                className="group block"
              >
                <Card className="h-full min-h-[250px] transition-all duration-200 hover:shadow-xl hover:scale-[1.02] cursor-pointer border-2 border-transparent hover:border-gray-200">
                  <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                    {/* Icon Container */}
                    <div className={`${card.color} p-5 rounded-2xl mb-5 transition-transform group-hover:scale-110`}>
                      <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {card.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-base text-gray-500 mb-4">
                      {card.description}
                    </p>
                    
                    {/* Arrow indicator */}
                    <div className="flex items-center text-sm font-medium text-gray-400 group-hover:text-gray-900 transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="px-6 py-12 md:px-12 bg-white border-t">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Ready to find your dream home?
          </h3>
          <p className="text-gray-600 mb-6">
            Visit our Digital Sales Office to explore floor plans, available homes, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/floor-plans"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-black rounded-xl hover:bg-gray-800 transition-colors min-h-[56px]"
            >
              View Floor Plans
            </Link>
            <Link 
              href="/available-homes"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors min-h-[56px]"
            >
              See Available Homes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
