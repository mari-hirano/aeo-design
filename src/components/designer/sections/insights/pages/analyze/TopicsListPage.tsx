"use client";

import React, { useState } from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import { Input } from '@/components/spring-ui/input';
import { Button } from '@/components/spring-ui/button';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/spring-ui/dropdown-menu';
import { Modal, ModalContent } from '@/components/spring-ui/modal';
import { ChevronSmallDownIcon, ChevronSmallRightIcon, ArrowUpIcon, ArrowDownIcon } from '@/icons';
import { Table, TableHeader, TableRow, TableCell, type ColumnDef } from '@/components/spring-ui/table';

// Helper to generate prompts list with data
interface PromptData {
  text: string;
  visibilityRanking: number;
  visibilityScore: number;
  visibilityScoreDelta: number;
  citationRate: number;
  citationRateDelta: number;
}

// Specific prompts for each topic (matches TopicsDetailPage)
const PROMPT_TEXTS: Record<string, string[]> = {
  'Custom CSS': [
    'How do I add custom CSS to my Webflow site?',
    'Can I use external stylesheets in Webflow?',
    'Where do I put custom CSS code in Webflow?',
    'How to override Webflow styles with CSS?',
    'Best practices for custom CSS in Webflow',
    'How to add CSS animations in Webflow?',
    'Can I import Google Fonts with custom CSS?',
    'How to target specific elements with CSS in Webflow?',
    'Custom CSS not working in Webflow - how to fix?',
    'How to add hover effects with custom CSS?',
  ],
  'Responsive design': [
    'What are the default breakpoints in Webflow?',
    'How to create custom breakpoints in Webflow?',
    'Responsive design best practices for Webflow',
    'How to make images responsive in Webflow?',
    'Mobile-first design approach in Webflow',
    'How to hide elements on mobile in Webflow?',
  ],
  'E-commerce checkout': [
    'How to optimize Webflow e-commerce checkout?',
    'Best practices for checkout page design',
    'How to reduce cart abandonment in Webflow?',
    'Adding custom fields to checkout in Webflow',
    'How to set up discount codes in Webflow?',
  ],
  'SEO meta tags': [
    'How to add meta tags in Webflow?',
    'Best practices for SEO in Webflow',
    'How to customize Open Graph tags?',
    'Setting up canonical URLs in Webflow',
    'How to add structured data in Webflow?',
  ],
  'Form validation': [
    'How to add form validation in Webflow?',
    'Custom error messages for Webflow forms',
    'Required field validation in Webflow',
    'Email format validation in Webflow',
    'How to validate phone numbers in Webflow?',
  ],
  'Image optimization': [
    'How to optimize images in Webflow?',
    'Best image formats for Webflow',
    'Lazy loading images in Webflow',
    'Responsive images in Webflow',
    'WebP support in Webflow',
  ],
  'Navigation menu': [
    'How to create a dropdown menu in Webflow?',
    'Sticky navigation in Webflow',
    'Mobile hamburger menu in Webflow',
    'Multi-level navigation in Webflow',
  ],
  'Footer design': [
    'Best practices for footer design in Webflow',
    'How to create a sticky footer in Webflow?',
    'Adding social links to footer in Webflow',
  ],
  'Blog templates': [
    'How to create blog templates in Webflow?',
    'CMS blog setup in Webflow',
    'Blog post pagination in Webflow',
    'Adding author info to blog posts',
  ],
  'Contact page': [
    'How to create a contact form in Webflow?',
    'Form submissions in Webflow',
    'Connecting forms to Zapier',
  ],
  'Social media': [
    'How to add social media icons in Webflow?',
    'Social sharing buttons in Webflow',
    'Embedding social feeds in Webflow',
  ],
  'Video embedding': [
    'How to embed YouTube videos in Webflow?',
    'Background video in Webflow',
    'Vimeo integration in Webflow',
  ],
  'Password protection': [
    'How to password protect pages in Webflow?',
    'Member-only content in Webflow',
  ],
  '404 pages': [
    'How to customize 404 page in Webflow?',
    'Best practices for error pages',
  ],
  'Favicon setup': [
    'How to add a favicon in Webflow?',
    'Apple touch icons in Webflow',
  ],
  'Google Analytics': [
    'How to add Google Analytics to Webflow?',
    'Setting up conversion tracking',
    'GA4 integration with Webflow',
  ],
  'Membership pages': [
    'How to set up memberships in Webflow?',
    'Member login page design',
    'Gated content in Webflow',
  ],
  'Slider carousel': [
    'How to create a slider in Webflow?',
    'Carousel autoplay settings',
    'Custom slider navigation',
  ],
  'Lightbox gallery': [
    'How to add lightbox in Webflow?',
    'Image gallery options in Webflow',
  ],
  'Accordion tabs': [
    'How to create accordions in Webflow?',
    'Tab component in Webflow',
    'FAQ accordion setup',
  ],
  'Map embedding': [
    'How to embed Google Maps in Webflow?',
    'Custom map styling in Webflow',
  ],
  'Newsletter forms': [
    'How to add newsletter signup in Webflow?',
    'Mailchimp integration with Webflow',
    'Email list building in Webflow',
  ],
  'Popup modals': [
    'How to create popups in Webflow?',
    'Exit intent popups in Webflow',
    'Modal window triggers',
  ],
  'Domain connection': [
    'How to connect custom domain in Webflow?',
    'DNS settings for Webflow',
    'Domain transfer to Webflow',
  ],
  'SSL certificate': [
    'SSL setup in Webflow',
    'HTTPS redirect in Webflow',
  ],
};

const generatePrompts = (topic: string, count: number): PromptData[] => {
  const texts = PROMPT_TEXTS[topic] || [];
  const prompts: PromptData[] = [];
  
  for (let i = 0; i < count; i++) {
    prompts.push({
      text: texts[i] || `${topic} - Question ${i + 1}`,
      visibilityRanking: Math.floor(Math.random() * 5) + 1,
      visibilityScore: Math.floor(Math.random() * 40) + 60,
      visibilityScoreDelta: Math.floor(Math.random() * 21) - 10,
      citationRate: Math.floor(Math.random() * 50) + 30,
      citationRateDelta: Math.floor(Math.random() * 21) - 10,
    });
  }
  return prompts;
};

// Delta indicator component
const DeltaIndicator = ({ value }: { value: number }) => {
  if (value === 0) return null;
  const isPositive = value > 0;
  return (
    <span className={`text-[11px] ${isPositive ? 'text-[var(--text-green)]' : 'text-[var(--text-red)]'}`}>
      {isPositive ? '+' : ''}{value}%
    </span>
  );
};

// All topics data (combined)
const ALL_TOPICS = [
  { 
    id: '1', 
    topic: 'How to add custom CSS to my website', 
    prompts: 10, 
    visibilityRanking: 1, 
    visibilityScore: 94, 
    visibilityScoreDelta: 8,
    citationRate: 78,
    citationRateDelta: 5,
    promptsList: generatePrompts('Custom CSS', 10)
  },
  { 
    id: '2', 
    topic: 'Responsive design breakpoints setup', 
    prompts: 6, 
    visibilityRanking: 3, 
    visibilityScore: 87, 
    visibilityScoreDelta: -3,
    citationRate: 72,
    citationRateDelta: 2,
    promptsList: generatePrompts('Responsive design', 6)
  },
  { 
    id: '3', 
    topic: 'E-commerce checkout optimization', 
    prompts: 5, 
    visibilityRanking: 2, 
    visibilityScore: 91, 
    visibilityScoreDelta: 12,
    citationRate: 68,
    citationRateDelta: -4,
    promptsList: generatePrompts('E-commerce checkout', 5)
  },
  { 
    id: '4', 
    topic: 'SEO meta tags configuration', 
    prompts: 5, 
    visibilityRanking: 5, 
    visibilityScore: 72, 
    visibilityScoreDelta: -7,
    citationRate: 65,
    citationRateDelta: 3,
    promptsList: generatePrompts('SEO meta tags', 5)
  },
  { 
    id: '5', 
    topic: 'Form submission and validation', 
    prompts: 5, 
    visibilityRanking: 4, 
    visibilityScore: 79, 
    visibilityScoreDelta: 4,
    citationRate: 61,
    citationRateDelta: -2,
    promptsList: generatePrompts('Form validation', 5)
  },
  { id: '6', topic: 'Image optimization and compression', prompts: 5, visibilityRanking: 6, visibilityScore: 68, visibilityScoreDelta: 5, citationRate: 54, citationRateDelta: 3, promptsList: generatePrompts('Image optimization', 5) },
  { id: '7', topic: 'Navigation menu customization', prompts: 4, visibilityRanking: 8, visibilityScore: 62, visibilityScoreDelta: -2, citationRate: 48, citationRateDelta: 1, promptsList: generatePrompts('Navigation menu', 4) },
  { id: '8', topic: 'Footer design and links', prompts: 3, visibilityRanking: 12, visibilityScore: 55, visibilityScoreDelta: -4, citationRate: 42, citationRateDelta: -3, promptsList: generatePrompts('Footer design', 3) },
  { id: '9', topic: 'Blog post templates', prompts: 4, visibilityRanking: 7, visibilityScore: 64, visibilityScoreDelta: 7, citationRate: 51, citationRateDelta: 4, promptsList: generatePrompts('Blog templates', 4) },
  { id: '10', topic: 'Contact page setup', prompts: 3, visibilityRanking: 9, visibilityScore: 59, visibilityScoreDelta: 2, citationRate: 45, citationRateDelta: -1, promptsList: generatePrompts('Contact page', 3) },
  { id: '11', topic: 'Social media integration', prompts: 3, visibilityRanking: 10, visibilityScore: 57, visibilityScoreDelta: -5, citationRate: 44, citationRateDelta: 2, promptsList: generatePrompts('Social media', 3) },
  { id: '12', topic: 'Video embedding options', prompts: 3, visibilityRanking: 14, visibilityScore: 52, visibilityScoreDelta: 3, citationRate: 39, citationRateDelta: -2, promptsList: generatePrompts('Video embedding', 3) },
  { id: '13', topic: 'Password protection for pages', prompts: 2, visibilityRanking: 16, visibilityScore: 48, visibilityScoreDelta: -6, citationRate: 35, citationRateDelta: 1, promptsList: generatePrompts('Password protection', 2) },
  { id: '14', topic: 'Custom 404 error pages', prompts: 2, visibilityRanking: 18, visibilityScore: 44, visibilityScoreDelta: 1, citationRate: 32, citationRateDelta: -4, promptsList: generatePrompts('404 pages', 2) },
  { id: '15', topic: 'Favicon and site icons', prompts: 2, visibilityRanking: 15, visibilityScore: 50, visibilityScoreDelta: -3, citationRate: 37, citationRateDelta: 2, promptsList: generatePrompts('Favicon setup', 2) },
  { id: '16', topic: 'Google Analytics integration', prompts: 3, visibilityRanking: 11, visibilityScore: 56, visibilityScoreDelta: 6, citationRate: 43, citationRateDelta: 5, promptsList: generatePrompts('Google Analytics', 3) },
  { id: '17', topic: 'Membership and login pages', prompts: 3, visibilityRanking: 6, visibilityScore: 67, visibilityScoreDelta: 9, citationRate: 52, citationRateDelta: -2, promptsList: generatePrompts('Membership pages', 3) },
  { id: '18', topic: 'Slider and carousel setup', prompts: 3, visibilityRanking: 13, visibilityScore: 53, visibilityScoreDelta: -1, citationRate: 40, citationRateDelta: 3, promptsList: generatePrompts('Slider carousel', 3) },
  { id: '19', topic: 'Lightbox and gallery features', prompts: 2, visibilityRanking: 17, visibilityScore: 46, visibilityScoreDelta: -7, citationRate: 34, citationRateDelta: -5, promptsList: generatePrompts('Lightbox gallery', 2) },
  { id: '20', topic: 'Accordion and tabs components', prompts: 3, visibilityRanking: 12, visibilityScore: 54, visibilityScoreDelta: 4, citationRate: 41, citationRateDelta: 1, promptsList: generatePrompts('Accordion tabs', 3) },
  { id: '21', topic: 'Map embedding and location', prompts: 2, visibilityRanking: 19, visibilityScore: 42, visibilityScoreDelta: -8, citationRate: 30, citationRateDelta: -3, promptsList: generatePrompts('Map embedding', 2) },
  { id: '22', topic: 'Newsletter signup forms', prompts: 3, visibilityRanking: 8, visibilityScore: 61, visibilityScoreDelta: 5, citationRate: 47, citationRateDelta: 4, promptsList: generatePrompts('Newsletter forms', 3) },
  { id: '23', topic: 'Popup and modal windows', prompts: 3, visibilityRanking: 10, visibilityScore: 58, visibilityScoreDelta: -2, citationRate: 46, citationRateDelta: 2, promptsList: generatePrompts('Popup modals', 3) },
  { id: '24', topic: 'Domain connection issues', prompts: 3, visibilityRanking: 7, visibilityScore: 63, visibilityScoreDelta: 8, citationRate: 49, citationRateDelta: -1, promptsList: generatePrompts('Domain connection', 3) },
  { id: '25', topic: 'SSL certificate setup', prompts: 2, visibilityRanking: 14, visibilityScore: 51, visibilityScoreDelta: -4, citationRate: 38, citationRateDelta: 3, promptsList: generatePrompts('SSL certificate', 2) },
];

// Reusable column definitions for header
const TABLE_COLUMNS: ColumnDef[] = [
  { id: 'topic', header: 'Names', width: '55%' },
  { id: 'visibilityScore', header: 'Visibility score', width: '22.5%' },
  { id: 'citationRate', header: 'Citation rate', width: '22.5%' }
];

// Column definitions for expanded prompt rows
const PROMPT_COLUMNS: ColumnDef[] = [
  { id: 'text', header: 'Prompt', width: '55%' },
  { id: 'visibilityScore', header: 'Visibility score', width: '22.5%' },
  { id: 'citationRate', header: 'Citation rate', width: '22.5%' }
];

interface TopicsListPageProps {
  onPromptSelect?: (promptId: string) => void;
}

type TopicFilter = 'all' | 'top-performing' | 'bottom-performing';
type CreateModalType = 'topic-manual' | 'topic-ai' | 'prompts-ai' | 'prompts-import' | null;

export default function TopicsListPage({ onPromptSelect }: TopicsListPageProps) {
  const { version } = useInsightsVersion();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState<TopicFilter>('all');
  const [createModalType, setCreateModalType] = useState<CreateModalType>(null);

  const toggleTopicExpanded = (topicId: string) => {
    setExpandedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  // Filter topics based on active filter
  const filteredTopics = (() => {
    const sorted = [...ALL_TOPICS].sort((a, b) => b.visibilityScore - a.visibilityScore);
    switch (activeFilter) {
      case 'top-performing':
        return sorted.slice(0, 5); // Top 5 by visibility score
      case 'bottom-performing':
        return sorted.slice(-5).reverse(); // Bottom 5 by visibility score
      default:
        return ALL_TOPICS;
    }
  })();

  // Create row columns with expand state
  const getTopicColumns = (isExpanded: boolean): ColumnDef[] => [
    { 
      id: 'topic', 
      header: 'Names', 
      width: '55%',
      renderCell: (value, rowData) => (
        <div className="flex items-center gap-2">
          <span className={`text-[var(--text-secondary)] transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
            <ChevronSmallRightIcon size={16} />
          </span>
          <div className="flex flex-col">
            <TableCell>{rowData.topic}</TableCell>
            <TableCell color="secondary" className="text-[11px]">{rowData.prompts} prompts</TableCell>
          </div>
        </div>
      )
    },
    { 
      id: 'visibilityScore', 
      header: 'Visibility score', 
      width: '22.5%',
      renderCell: (value, rowData) => (
        <div className="flex items-center gap-1">
          <TableCell color="secondary">{value}%</TableCell>
          <DeltaIndicator value={rowData.visibilityScoreDelta} />
        </div>
      )
    },
    { 
      id: 'citationRate', 
      header: 'Citation rate', 
      width: '22.5%',
      renderCell: (value, rowData) => (
        <div className="flex items-center gap-1">
          <TableCell color="secondary">{value}%</TableCell>
          <DeltaIndicator value={rowData.citationRateDelta} />
        </div>
      )
    }
  ];

  // Prompt row columns
  const promptColumns: ColumnDef[] = [
    { 
      id: 'text', 
      header: 'Prompt', 
      width: '55%',
      renderCell: (value) => (
        <div className="pl-6">
          <TableCell color="secondary">{value}</TableCell>
        </div>
      )
    },
    { 
      id: 'visibilityScore', 
      header: 'Visibility score', 
      width: '22.5%',
      renderCell: (value, rowData) => (
        <div className="flex items-center gap-1">
          <TableCell color="secondary">{value}%</TableCell>
          <DeltaIndicator value={rowData.visibilityScoreDelta} />
        </div>
      )
    },
    { 
      id: 'citationRate', 
      header: 'Citation rate', 
      width: '22.5%',
      renderCell: (value, rowData) => (
        <div className="flex items-center gap-1">
          <TableCell color="secondary">{value}%</TableCell>
          <DeltaIndicator value={rowData.citationRateDelta} />
        </div>
      )
    }
  ];

  return (
    <div className="flex-1 bg-[var(--bg-primary)] flex flex-col h-full w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-2 h-10 border-b border-[var(--border-default)]">
        <div className="flex flex-col min-w-0 flex-1">
          <h2 className="title-text-bold text-[var(--text-primary)] truncate">
            Topics
          </h2>
        </div>
        
        <div className="flex items-center gap-1 flex-shrink-0">
          <Input
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="comfortable" variant="default" className="h-6">
                Last 7 days
                <ChevronSmallDownIcon size={16} className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 14 days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 days</DropdownMenuItem>
              <DropdownMenuItem>Last 90 days</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="compact" variant="primary">
                Create new...
                <ChevronSmallDownIcon size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setCreateModalType('topic-manual')}>Topic manually</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setCreateModalType('topic-ai')}>Topic with AI</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setCreateModalType('prompts-ai')}>Prompts with AI</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setCreateModalType('prompts-import')}>Prompts by importing</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto w-full p-4 flex flex-col gap-6">
        {/* Topics Section */}
        <section className="flex flex-col gap-3">
          {/* Topics Section Title */}
          <h3 className="body-text-bold text-[var(--text-primary)]">Topics</h3>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <Button 
              size="compact" 
              variant="outline"
              className={`!h-auto !px-3 !py-2 ${activeFilter === 'all' ? 'bg-[var(--bg-raised)] !border-transparent' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All topics
            </Button>
            <Button 
              size="compact" 
              variant="outline"
              className={`!h-auto !px-3 !py-2 !gap-1 ${activeFilter === 'top-performing' ? 'bg-[var(--bg-raised)] !border-transparent' : ''}`}
              onClick={() => setActiveFilter('top-performing')}
            >
              <ArrowUpIcon size={16} className="text-[var(--text-green)]" />
              Top performing
            </Button>
            <Button 
              size="compact" 
              variant="outline"
              className={`!h-auto !px-3 !py-2 !gap-1 ${activeFilter === 'bottom-performing' ? 'bg-[var(--bg-raised)] !border-transparent' : ''}`}
              onClick={() => setActiveFilter('bottom-performing')}
            >
              <ArrowDownIcon size={16} className="text-[var(--text-red)]" />
              Bottom performing
            </Button>
          </div>

          {/* Topics Table */}
          <Table noBorder>
            <TableHeader columns={TABLE_COLUMNS} className="[&>div]:bg-transparent text-[var(--text-secondary)]" />
            {filteredTopics.map((topic) => {
              const isExpanded = expandedTopics.has(topic.id);
              return (
                <React.Fragment key={topic.id}>
                  <TableRow
                    data={topic}
                    columns={getTopicColumns(isExpanded)}
                    className="hover:bg-[var(--bg-raised)] cursor-pointer"
                    onClick={() => toggleTopicExpanded(topic.id)}
                  />
                  {isExpanded && topic.promptsList.map((prompt, index) => (
                    <TableRow
                      key={`${topic.id}-prompt-${index}`}
                      data={prompt}
                      columns={promptColumns}
                      className="hover:bg-[var(--bg-raised)] cursor-pointer"
                      onClick={() => onPromptSelect?.(`${topic.id}-${index}`)}
                    />
                  ))}
                </React.Fragment>
              );
            })}
          </Table>
        </section>
      </div>

      {/* Create Modal */}
      <Modal open={createModalType !== null} onOpenChange={(open) => !open && setCreateModalType(null)}>
        <ModalContent 
          title={
            createModalType === 'topic-manual' ? 'Create topic' :
            createModalType === 'topic-ai' ? 'Create topic with AI' :
            createModalType === 'prompts-ai' ? 'Create prompts with AI' :
            createModalType === 'prompts-import' ? 'Import prompts' : ''
          }
          secondaryAction={{
            label: 'Cancel',
            onClick: () => setCreateModalType(null)
          }}
          primaryAction={{
            label: 'Create',
            onClick: () => setCreateModalType(null)
          }}
        >
          {/* Modal content will be added here */}
        </ModalContent>
      </Modal>
    </div>
  );
}
