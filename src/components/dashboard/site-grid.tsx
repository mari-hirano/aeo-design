"use client";

import { SiteCard } from "./site-card";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AddIcon,
  UsersIcon,
  FolderAddIcon,
  GridIcon,
  ListIcon,
  DateIcon,
  ChevronSmallDownIcon,
  SearchDefaultIcon,
} from "@/icons";
import { useState } from "react";

// Mock data for demonstration
const mockSites = [
  {
    id: "1",
    name: "E-commerce Store",
    description: "Modern online store with payment integration",
    thumbnail: "/api/placeholder/300/200",
    status: "live" as const,
    lastModified: "2 hours ago",
    domain: "store.example.com",
    plan: "E-commerce Site",
    isPublished: true,
  },
  {
    id: "2",
    name: "Portfolio Website",
    description: "Creative portfolio for design showcase",
    thumbnail: "/api/placeholder/300/200",
    status: "draft" as const,
    lastModified: "1 day ago",
    domain: "portfolio.example.com",
    plan: "Basic Site",
    isPublished: false,
  },
  {
    id: "3",
    name: "Corporate Landing",
    description: "Professional landing page for business",
    thumbnail: "/api/placeholder/300/200",
    status: "live" as const,
    lastModified: "3 days ago",
    domain: "business.example.com",
    plan: "Business Site",
    isPublished: true,
  },
  {
    id: "4",
    name: "Blog Platform",
    description: "Content-rich blog with CMS integration",
    thumbnail: "/api/placeholder/300/200",
    status: "live" as const,
    lastModified: "1 week ago",
    domain: "blog.example.com",
    plan: "CMS Site",
    isPublished: true,
  },
  {
    id: "5",
    name: "Restaurant Menu",
    description: "Interactive menu with online ordering",
    thumbnail: "/api/placeholder/300/200",
    status: "draft" as const,
    lastModified: "2 weeks ago",
    domain: "restaurant.example.com",
    plan: "Starter Site",
    isPublished: false,
  },
  {
    id: "6",
    name: "Event Website",
    description: "Event management and ticketing platform",
    thumbnail: "/api/placeholder/300/200",
    status: "live" as const,
    lastModified: "1 month ago",
    domain: "events.example.com",
    plan: "Business Site",
    isPublished: true,
  },
];

export function SiteGrid() {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("date-created");

  return (
    <div 
      className="w-full mx-auto"
      style={{ 
        maxWidth: '1040px',
        minWidth: '280px',
        padding: '16px'
      }}
    >
      <div className="space-y-6">
        {/* Header */}
        <div 
          className="flex items-center justify-between h-10 pb-3 border-b border-[var(--border-default)]">
          {/* Left side - Workspace name and badge */}
          <div className="flex items-center space-x-3">
            <h1 className="title-text-bold text-[var(--text-primary)] truncate">My Workspace</h1>
            <Badge 
              variant="blue" 
              styleType="tinted" 
              shape="square" 
              size="compact"
              className="truncate"
            >
              Growth Workspace
            </Badge>
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center space-x-3">
            {/* Search Input */}
            <div className="relative">
              <Input
                placeholder="Search sites..."
                showSearchIcon={true}
                className="max-w-64"
              />
            </div>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <DateIcon size={16} />
                  <span>Date created</span>
                  <ChevronSmallDownIcon size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy('date-created')}>
                  Date created
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('name')}>
                  Name
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('last-modified')}>
                  Last modified
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Mode Segmented Control */}
            <SegmentedControl
              value={viewMode}
              onValueChange={setViewMode}
            >
              <SegmentedControlItem value="grid" isIcon>
                <GridIcon size={16} />
              </SegmentedControlItem>
              <SegmentedControlItem value="list" isIcon>
                <ListIcon size={16} />
              </SegmentedControlItem>
            </SegmentedControl>

            {/* Add Folder Icon Button */}
            <IconButton variant="outline" size="comfortable">
              <FolderAddIcon size={16} />
            </IconButton>

            {/* Invite Button */}
            <Button variant="default" size="default" className="flex items-center">
              <UsersIcon size={16} />
              <span>Invite</span>
            </Button>

            {/* New Site Button */}
            <Button variant="primary" size="default" className="flex items-center">
              <AddIcon size={16} />
              <span>New site</span>
            </Button>
          </div>
        </div>

        {/* Responsive Grid */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{ gap: '16px' }}
        >
          {mockSites.map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      </div>
    </div>
  );
} 