import { getCommunityData } from '@/lib/data/community-data';
import { ImageGallery } from '@/components/shared/ImageGallery';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SubImage } from '@/lib/data/types';

export const metadata = {
  title: 'Photo Gallery - Emory Crossing 40s',
  description: 'View photos of Emory Crossing 40s community, homes, and amenities',
};

export default async function GalleryPage() {
  const subdivision = await getCommunityData();

  if (!subdivision) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Photo Gallery</h1>
        <p className="text-gray-600">Unable to load gallery. Please try again later.</p>
      </div>
    );
  }

  // Get all community images
  const allImages: SubImage[] = subdivision.SubImage || [];

  // Filter images by type if possible
  const interiorImages = allImages.filter(
    img => 
      img['@_Title']?.toLowerCase().includes('interior') ||
      img['@_Title']?.toLowerCase().includes('kitchen') ||
      img['@_Title']?.toLowerCase().includes('bedroom') ||
      img['@_Title']?.toLowerCase().includes('bathroom') ||
      img['@_Title']?.toLowerCase().includes('living') ||
      img['@_Caption']?.toLowerCase().includes('interior') ||
      img['@_Caption']?.toLowerCase().includes('kitchen') ||
      img['@_Caption']?.toLowerCase().includes('room')
  );

  const exteriorImages = allImages.filter(
    img => 
      img['@_Title']?.toLowerCase().includes('elevation') ||
      img['@_Title']?.toLowerCase().includes('front') ||
      img['@_Title']?.toLowerCase().includes('exterior') ||
      img['@_Title']?.toLowerCase().includes('pool') ||
      img['@_Caption']?.toLowerCase().includes('elevation') ||
      img['@_Caption']?.toLowerCase().includes('exterior') ||
      img['@_Caption']?.toLowerCase().includes('pool')
  );

  const hasInteriorImages = interiorImages.length > 0;
  const hasExteriorImages = exteriorImages.length > 0;

  // Extract URLs for each category
  const allUrls = allImages.map(img => img.value);
  const interiorUrls = hasInteriorImages ? interiorImages.map(img => img.value) : [];
  const exteriorUrls = hasExteriorImages ? exteriorImages.map(img => img.value) : [];

  // Extract titles for each category
  const allTitles = allImages.map(img => img['@_Title'] || img['@_Caption']);
  const interiorTitles = hasInteriorImages 
    ? interiorImages.map(img => img['@_Title'] || img['@_Caption']) 
    : [];
  const exteriorTitles = hasExteriorImages 
    ? exteriorImages.map(img => img['@_Title'] || img['@_Caption']) 
    : [];

  // If no categorization possible, just show all images
  const showTabs = hasInteriorImages || hasExteriorImages;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Photo Gallery</h1>
      <p className="text-gray-600 mb-8">
        Explore {subdivision.SubdivisionName} through our photo collection
      </p>

      {showTabs ? (
        <Tabs defaultValue={hasExteriorImages ? 'exteriors' : 'interiors'} className="w-full">
          <TabsList className="mb-6">
            {hasExteriorImages && (
              <TabsTrigger value="exteriors">
                Exteriors ({exteriorUrls.length})
              </TabsTrigger>
            )}
            {hasInteriorImages && (
              <TabsTrigger value="interiors">
                Interiors ({interiorUrls.length})
              </TabsTrigger>
            )}
          </TabsList>

          {hasExteriorImages && (
            <TabsContent value="exteriors">
              <ImageGallery images={exteriorUrls} titles={exteriorTitles} />
            </TabsContent>
          )}

          {hasInteriorImages && (
            <TabsContent value="interiors">
              <ImageGallery images={interiorUrls} titles={interiorTitles} />
            </TabsContent>
          )}
        </Tabs>
      ) : (
        <ImageGallery images={allUrls} titles={allTitles} />
      )}
    </div>
  );
}
