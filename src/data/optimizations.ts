import { InsightsOptimization } from '@/components/designer/sections/insights/InsightsOptimizationsListPanel';

export const OPTIMIZATIONS_LIST: InsightsOptimization[] = [
  {
    id: '1',
    name: 'Enterprise Messaging Test',
    type: 'test',
    primaryGoal: 'Autogoal: click engagement',
    changes: 'No changes',
    status: 'live',
    lastUpdated: '2024-02-05T19:34:00'
  },
  {
    id: '2',
    name: 'Reengagement Banner',
    type: 'personalization',
    primaryGoal: 'Autogoal: click engagement',
    changes: 'Homepage',
    status: 'live',
    lastUpdated: '2024-02-05T19:34:00'
  },
  {
    id: '3',
    name: 'Homepage Headline Value Prop',
    type: 'ai-optimize',
    primaryGoal: 'Autogoal: click engagement',
    changes: 'Homepage, About Us, Product Pag...',
    status: 'live',
    lastUpdated: '2024-02-05T19:34:00'
  },
  {
    id: '4',
    name: 'CTA Change Features',
    type: 'personalization',
    primaryGoal: 'Autogoal: click engagement',
    changes: 'hero-section on Homepage',
    status: 'ready',
    lastUpdated: '2024-02-05T19:34:00'
  },
  {
    id: '5',
    name: 'CTA Change Contact',
    type: 'test',
    primaryGoal: 'Autogoal: click engagement',
    changes: 'hero-section on 3 pages',
    status: 'ready',
    lastUpdated: '2024-02-05T19:34:00'
  },
  {
    id: '6',
    name: 'Enterprise Target',
    type: 'personalization',
    primaryGoal: 'Autogoal: click engagement',
    changes: 'hero headline, subheadline, nav-bar...',
    status: 'paused',
    lastUpdated: '2023-12-12T19:34:00'
  },
  {
    id: '7',
    name: 'Home Page Messaging',
    type: 'test',
    primaryGoal: 'Autogoal: click engagement',
    changes: 'Button on nav-bar, Homepage',
    status: 'draft',
    lastUpdated: '2023-12-12T19:34:00'
  },
  {
    id: '8',
    name: 'Product Page 2',
    type: 'ai-optimize',
    primaryGoal: 'Autogoal: click engagement',
    changes: 'Button on nav-bar, 8 pages',
    status: 'archived',
    lastUpdated: '2023-12-12T19:34:00'
  },
];

