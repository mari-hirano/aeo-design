"use client";

import React, { useState } from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import { InsightsPage } from '@/components/designer/sections/insights/InsightsPagesListPanel';
import PagesTable from '@/components/designer/sections/insights/PagesTable';

// Mock pages data
const mockPages: InsightsPage[] = [
  { id: '1', name: 'Home', path: '/', variant: 'Static', modifiedDate: '2024-01-15' },
  { id: '2', name: 'Contact Us', path: '/contact', variant: 'Static', modifiedDate: '2024-01-10' },
  { id: '3', name: 'About', path: '/about', variant: 'Static', modifiedDate: '2024-01-08' },
  { id: '4', name: 'Blog', path: '/blog', variant: 'CMS', modifiedDate: '2024-01-12' },
  { id: '5', name: 'Services', path: '/services', variant: 'CMS', modifiedDate: '2024-01-14' },
];

interface PagesListPageProps {
  onPageSelect: (page: InsightsPage) => void;
}

export default function PagesListPage({ onPageSelect }: PagesListPageProps) {
  const { version } = useInsightsVersion();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPage, setSelectedPage] = useState<InsightsPage | null>(null);

  const filteredPages = mockPages.filter(page =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageSelect = (page: InsightsPage) => {
    setSelectedPage(page);
    onPageSelect(page);
  };

  return (
    <div className="flex-1 bg-[var(--bg-primary)] flex flex-col">
      <PagesTable
        pages={filteredPages}
        selectedPage={selectedPage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPageSelect={handlePageSelect}
      />
    </div>
  );
}

