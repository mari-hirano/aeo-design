"use client";

import React, { useState } from 'react';
import { 
  AddIcon, 
  HomeIcon, 
  PageDraftIcon, 
  EmailIcon, 
  Copilot404Icon, 
  LockIcon,
  MenuIcon,
  PageDefaultIcon
} from '@/icons';
import Accordion from '@/components/ui/accordion';
import { Input } from "@/components/ui/input";

// Page item interface
interface PageItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
  children?: PageItem[];
  draft?: boolean;
}

// Section interface
interface PageSection {
  title: string;
  items: PageItem[];
  expanded: boolean;
}

const PagesPanel = () => {
  // Initialize sections with the ones visible in the image
  const [sections] = useState<PageSection[]>([
    {
      title: 'Static pages',
      expanded: true,
      items: [
        { name: 'Home', path: '/' },
        { name: 'Contact Us', path: '/contact' },
        { name: '[Draft] Styles', path: '/styles', draft: true }
      ]
    },
    {
      title: 'CMS Collection pages',
      expanded: true,
      items: [
        { name: 'Testimonials Template', path: '/testimonials' }
      ]
    },
    {
      title: 'Utility pages',
      expanded: true,
      items: [
        { name: 'Password', path: '/password' },
        { name: '404', path: '/404' }
      ]
    },
    {
      title: 'Static page templates',
      expanded: false,
      items: []
    },
    {
      title: 'Ecommerce pages',
      expanded: false,
      items: []
    },
    {
      title: 'User pages',
      expanded: false,
      items: []
    }
  ]);

  // Get icon based on page name
  const getPageIcon = (item: PageItem) => {
    const iconProps = { 
      size: 16, 
      style: { color: item.draft ? 'var(--orange-text)' : 'var(--text-secondary)' } 
    };
    
    // Always use the default page icon
    return <PageDefaultIcon {...iconProps} />;
  };

  // Render a page item
  const renderPageItem = (item: PageItem) => {
    return (
      <div className="flex items-center h-6 px-2 hover:bg-bg-tertiary cursor-pointer">
        <div className="flex items-center gap-2 w-full overflow-hidden">
          {getPageIcon(item)}
          <span className={`body-text truncate ${item.draft ? 'color-orange-text' : 'color-text-primary'}`}>
            {item.name}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="px-2 pb-2 border-b border-border" >
        <Input
          showSearchIcon
          placeholder="Search pages"
        />
      </div>
      
      {/* Sections with Accordion */}
      <div className="flex-1 overflow-y-auto">
        {sections.map((section, index) => (
          <Accordion 
            key={index} 
            title={section.title} 
            defaultOpen={section.expanded}
            titleClassName="title-semibold"
          >
            <div className="pb-2">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  {renderPageItem(item)}
                </div>
              ))}
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default PagesPanel; 