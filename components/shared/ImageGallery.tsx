'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface ImageGalleryProps {
  images: string[];
  titles?: string[];
}

export function ImageGallery({ images, titles }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No images available
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 hover:opacity-90 transition-opacity"
          >
            <Image
              src={src}
              alt={titles?.[index] || `Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black/95 border-none">
          <VisuallyHidden>
            <DialogTitle>Image Viewer</DialogTitle>
          </VisuallyHidden>
          
          {selectedIndex !== null && (
            <div className="relative flex items-center justify-center w-full h-full min-h-[60vh]">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
                onClick={closeLightbox}
              >
                <X className="w-8 h-8" />
              </Button>

              {/* Previous button */}
              {images.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 z-50 text-white hover:bg-white/20"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="w-10 h-10" />
                </Button>
              )}

              {/* Image */}
              <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
                <Image
                  src={images[selectedIndex]}
                  alt={titles?.[selectedIndex] || `Image ${selectedIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>

              {/* Next button */}
              {images.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 z-50 text-white hover:bg-white/20"
                  onClick={goToNext}
                >
                  <ChevronRight className="w-10 h-10" />
                </Button>
              )}

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg">
                {selectedIndex + 1} / {images.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
