export type InsightsFeatureState = 'analyze-only' | 'optimize-only' | 'analyze-and-optimize';

export type InsightsVersionState = 'current' | 'updated';

export type InsightsComponentVariant = string;

export interface InsightsComponentSchema {
  name: string;
  variants?: InsightsComponentVariant[];
  versionAvailability: 'current' | 'updated' | 'both';
  sectionGroup?: string;
}
