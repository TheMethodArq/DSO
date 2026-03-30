import { XMLParser } from 'fast-xml-parser';

const parserOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: '',  // No prefix - attributes become properties directly
  parseAttributeValue: true,
  parseTagValue: true,
  trimValues: true,
  textNodeName: 'value',  // This maps text content to 'value' property
  isArray: (name: string) => {
    return [
      'SubImage',
      'SubAmenity',
      'Service',
      'Schools',
      'Plan',
      'Spec',
      'ElevationImage',
      'LivingArea',
      'SpecElevationImage',
      'Builder',
      'Subdivision',
    ].includes(name);
  },
};

export const xmlParser = new XMLParser(parserOptions);
