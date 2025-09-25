"use client";

import { SiteCard } from "./site-card";
import { Button } from "@/components/spring-ui/button";
import { IconButton } from "@/components/spring-ui/iconButton";
import { Badge } from "@/components/spring-ui/badge";
import { Input } from "@/components/spring-ui/input";
import { SegmentedControl, SegmentedControlItem } from "@/components/spring-ui/segmented-control";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/spring-ui/dropdown-menu";
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
import { getImagePath } from "@/lib/utils";

// Mock data for demonstration
const mockSites = [
  {
    id: "1",
    name: "Design Resources Hub",
    description: "A curated resource list to kickstart your design education",
    thumbnail: getImagePath("/images/site1.png"),
    status: "live" as const,
    lastModified: "2 hours ago",
    domain: "resources.example.com",
    plan: "E-commerce Site",
    isPublished: true,
  },
  {
    id: "2",
    name: "PlayReplay Tennis",
    description: "No more doubts - Professional tennis coaching platform",
    thumbnail: getImagePath("/images/site2.png"),
    status: "draft" as const,
    lastModified: "1 day ago",
    domain: "tennis.example.com",
    plan: "Basic Site",
    isPublished: false,
  },
  {
    id: "3",
    name: "Blackbird Agency",
    description: "Enter the world of Blackbird - Creative digital agency",
    thumbnail: getImagePath("/images/site3.png"),
    status: "live" as const,
    lastModified: "3 days ago",
    domain: "blackbird.example.com",
    plan: "Business Site",
    isPublished: true,
  },
  {
    id: "4",
    name: "Egglife Wraps",
    description: "The Perfect Wrap for eating better - Healthy food products",
    thumbnail: getImagePath("/images/site4.png"),
    status: "live" as const,
    lastModified: "1 week ago",
    domain: "egglife.example.com",
    plan: "CMS Site",
    isPublished: true,
  },
  {
    id: "5",
    name: "Radiant Search",
    description: "We are Radiant, the leading search to search firm globally",
    thumbnail: getImagePath("/images/site5.png"),
    status: "draft" as const,
    lastModified: "2 weeks ago",
    domain: "radiant.example.com",
    plan: "Starter Site",
    isPublished: false,
  },
  {
    id: "6",
    name: "Pepperclip Studio",
    description: "Creative studio & digital agency based in Paris",
    thumbnail: getImagePath("/images/site6.png"),
    status: "live" as const,
    lastModified: "1 month ago",
    domain: "pepperclip.example.com",
    plan: "Business Site",
    isPublished: true,
  },
  {
    id: "7",
    name: "OpenPhone Teams",
    description: "The all-in-one phone system for teams",
    thumbnail: getImagePath("/images/site7.png"),
    status: "live" as const,
    lastModified: "2 days ago",
    domain: "openphone.example.com",
    plan: "Business Site",
    isPublished: true,
  },
  {
    id: "8",
    name: "Atomus Focus",
    description: "Get your focus back on the experience - Design tool platform",
    thumbnail: getImagePath("/images/site8.png"),
    status: "draft" as const,
    lastModified: "5 days ago",
    domain: "atomus.example.com",
    plan: "Pro Site",
    isPublished: false,
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
                <Button variant="outline" size="comfortable" className="flex items-center">
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
            <Button variant="default" size="comfortable" className="flex items-center">
              <UsersIcon size={16} />
              <span>Invite</span>
            </Button>

            {/* New Site Button */}
            <Button variant="primary" size="comfortable" className="flex items-center">
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