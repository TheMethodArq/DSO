'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, HomeIcon, Map, Images, Info, Palette, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/floor-plans', label: 'Floor Plans', icon: LayoutGrid },
  { href: '/available-homes', label: 'Available', icon: HomeIcon },
  { href: '/site-map', label: 'Site Map', icon: Map },
  { href: '/collections', label: 'Designs', icon: Palette },
  { href: '/area', label: 'Area', icon: MapPin },
  { href: '/gallery', label: 'Gallery', icon: Images },
  { href: '/community', label: 'Info', icon: Info },
];

export function TouchNav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <nav className="flex items-center justify-between h-20 px-6">
        {/* Logo / Community Name */}
        <Link 
          href="/" 
          className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity shrink-0"
        >
          Emory Crossing 40s
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-3 rounded-lg text-base font-medium transition-colors touch-target whitespace-nowrap',
                  isActive 
                    ? 'bg-black text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden xl:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
