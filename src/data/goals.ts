import { GoalsIcon, ElementButtonIcon, PageDefaultIcon, AddPanelForm64Icon } from '@/icons';
import { InsightsGoal } from '@/components/designer/sections/insights/InsightsGoalsListPanel';
import { IconComponent } from '@/icons/types';

export type GoalType = 'button' | 'form' | 'page' | 'link' | 'default';

export interface GoalWithIcon extends InsightsGoal {
  type: GoalType;
  icon: IconComponent;
}

// Map goal types to their icons
const goalTypeIcons: Record<GoalType, IconComponent> = {
  button: ElementButtonIcon,
  form: AddPanelForm64Icon,
  page: PageDefaultIcon,
  link: ElementButtonIcon, // Using button icon for links as fallback
  default: GoalsIcon,
};

// Shared goals list - this should match the Figma design
export const GOALS_LIST: GoalWithIcon[] = [
  {
    id: 'homepage-hero-ctas',
    name: 'Homepage Hero CTAs',
    type: 'button',
    icon: ElementButtonIcon,
    modifiedDate: '2024-01-15',
  },
  {
    id: 'contact-clicks',
    name: 'Contact clicks (non-navigation)',
    type: 'button',
    icon: ElementButtonIcon,
    modifiedDate: '2024-01-15',
  },
  {
    id: 'form-submissions',
    name: 'Form submissions',
    type: 'form',
    icon: AddPanelForm64Icon,
    modifiedDate: '2024-01-10',
  },
  {
    id: 'page-views',
    name: 'Page views',
    type: 'page',
    icon: PageDefaultIcon,
    modifiedDate: '2024-01-12',
  },
];

// Helper function to get icon for a goal
export function getGoalIcon(goal: GoalWithIcon | InsightsGoal): IconComponent {
  if ('type' in goal && goal.type) {
    return goalTypeIcons[goal.type] || goalTypeIcons.default;
  }
  return goalTypeIcons.default;
}

// Helper function to get goal by id
export function getGoalById(id: string): GoalWithIcon | undefined {
  return GOALS_LIST.find(goal => goal.id === id);
}

