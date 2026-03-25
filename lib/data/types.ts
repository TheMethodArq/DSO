// Data types from Taylor Morrison XML Feed

export interface BuilderData {
  Corporation: {
    CorporateBuilderNumber: string;
    CorporateState: string;
    CorporateName: string;
    Builder: Builder;
  };
}

export interface Builder {
  BuilderNumber: string;
  BrandName: string;
  ReportingName: string;
  DefaultLeadsEmail: string;
  BuilderWebsite: string;
  Subdivision: Subdivision | Subdivision[];
}

export interface Subdivision {
  Status: 'Active' | 'SoldOut' | 'ComingSoon';
  SubdivisionNumber: string;
  SubdivisionName: string;
  MarketingChannel: string;
  CommunityStyle: 'MasterPlanned' | string;
  SalesOffice: SalesOffice;
  DrivingDirections?: string;
  Schools: School[];
  SubAmenity: Amenity[];
  Service: Service[];
  SubDescription: string;
  SubImage: SubImage[];
  SubVideoFile?: VideoFile;
  SubVideoTour?: VideoTour;
  SubInteractiveMedia?: InteractiveMedia;
  SubWebsite: string;
  Taxes: Taxes;
  Promotion?: Promotion;
  ApptScheduler?: ApptScheduler;
  Plan: Plan[];
}

export interface SalesOffice {
  Agent: string;
  Address: {
    OutOfCommunity: '0' | '1';
    Street1: string;
    City: string;
    State: string;
    ZIP: string;
    Geocode: {
      Latitude: string;
      Longitude: string;
    };
  };
  Phone: {
    AreaCode: string;
    Prefix: string;
    Suffix: string;
  };
  Email: string;
  Hours: string;
}

export interface School {
  DistrictName: string;
  Elementary?: string;
  Middle?: string;
  High?: string;
}

export interface Amenity {
  Type: 'Pool' | 'Playground' | 'Park' | 'Trails' | 'Clubhouse' | 'Basketball' | 'Greenbelt' | 'Gym' | 'Tennis' | string;
  value: '1' | '0';
}

export interface Service {
  Type: 'HOA' | string;
  ServiceName: string;
  MonthlyFee?: string;
}

export interface SubImage {
  Type: 'Standard' | 'Thumbnail' | string;
  SequencePosition: string;
  Title: string;
  Caption: string;
  ReferenceType: 'URL';
  value: string;
}

export interface VideoFile {
  SequencePosition: string;
  Title: string;
  ReferenceType: 'URL';
  value: string;
}

export interface VideoTour {
  SequencePosition: string;
  Title: string;
  value: string;
}

export interface InteractiveMedia {
  Type: 'InteractiveSitePlan' | 'InteractiveFloorplan';
  WebsiteURL: string;
}

export interface Taxes {
  TotalTaxRate: string;
}

export interface Promotion {
  PromoType: 'Consumer' | string;
  PromoHeadline: string;
  PromoDescription: string;
  StartDate: string;
  EndDate: string;
  PromoURL: string;
}

export interface ApptScheduler {
  SchedulerURL: string;
}

export interface Plan {
  Type: 'SingleFamily' | 'Townhome' | 'Condo' | string;
  PlanNumber: string;
  PlanName: string;
  PlanNotAvailable: '0' | '1';
  PlanTypeName: string;
  BasePrice: string;
  BaseSqft: string;
  Stories: string;
  Baths: string;
  HalfBaths: string;
  Bedrooms: {
    MasterBedLocation: 'Down' | 'Up';
    value: string;
  };
  Garage: {
    Entry: 'Rear' | 'Front' | 'Side';
    value: string;
  };
  LivingArea?: LivingArea[];
  Description: string;
  PlanImages: PlanImages;
  PlanInteractiveMedia?: InteractiveMedia;
  Spec?: Spec[];
}

export interface LivingArea {
  Type: 'DiningRoom' | 'GameRoom' | 'GuestRoom' | 'Study' | string;
}

export interface PlanImages {
  ElevationImage: Image[];
  FloorPlanImage?: Image;
  VirtualTour?: string;
}

export interface Image {
  SequencePosition: string;
  Title: string;
  Caption?: string;
  ReferenceType: 'URL';
  value: string;
}

export interface Spec {
  Type: 'SingleFamily' | string;
  SpecNumber: string;
  SpecAddress: {
    SpecLot: string;
    SpecStreet1: string;
    SpecCity: string;
    SpecState: string;
    SpecZIP: string;
    SpecGeocode?: {
      SpecLatitude: string;
      SpecLongitude: string;
    };
  };
  SpecMoveInDate: {
    Day: string;
  };
  SpecPrice: string;
  SpecSqft: string;
  SpecStories: string;
  SpecBaths: string;
  SpecHalfBaths: string;
  SpecBedrooms: {
    MasterBedLocation: 'Down' | 'Up';
    value: string;
  };
  SpecGarage: {
    Entry: 'Rear' | 'Front' | 'Side';
    value: string;
  };
  SpecLivingArea?: LivingArea[];
  SpecDescription: string;
  SpecImages: SpecImages;
  SpecWebsite: string;
}

export interface SpecImages {
  SpecElevationImage: Image[];
  SpecFloorPlanImage?: Image;
  SpecInteriorImage?: Image;
  SpecVirtualTour?: string;
}

// Parsed/Simplified types for UI use

export interface CommunityInfo {
  name: string;
  description: string;
  city: string;
  state: string;
  agent: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  amenities: string[];
  schools: School[];
  hoaFee?: string;
  taxRate?: string;
  images: string[];
  sitePlanUrl: string;
  videoTour?: string;
}

export interface FloorPlanInfo {
  id: string;
  name: string;
  price: number;
  sqft: number;
  beds: number;
  baths: number;
  halfBaths: number;
  stories: number;
  garage: number;
  masterBedLocation: 'Down' | 'Up';
  description: string;
  elevationImages: string[];
  floorPlanPdf?: string;
  virtualTour?: string;
  interactiveUrl?: string;
  specCount: number;
}

export interface SpecHomeInfo {
  id: string;
  lot: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  sqft: number;
  beds: number;
  baths: number;
  halfBaths: number;
  stories: number;
  moveInDate: string;
  description: string;
  elevationImage?: string;
  mls?: string;
  planName: string;
  planId: string;
}
