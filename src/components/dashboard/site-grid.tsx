"use client";

import { SiteCard } from "./site-card";

// Mock data for demonstration
const mockSites = [
  {
    id: "1",
    name: "E-commerce Store",
    description: "Modern online store with payment integration",
    thumbnail: "/api/placeholder/300/200",
    status: "live",
    lastModified: "2 hours ago",
    domain: "store.example.com",
  },
  {
    id: "2",
    name: "Portfolio Website",
    description: "Creative portfolio for design showcase",
    thumbnail: "/api/placeholder/300/200",
    status: "draft",
    lastModified: "1 day ago",
    domain: "portfolio.example.com",
  },
  {
    id: "3",
    name: "Corporate Landing",
    description: "Professional landing page for business",
    thumbnail: "/api/placeholder/300/200",
    status: "live",
    lastModified: "3 days ago",
    domain: "business.example.com",
  },
  {
    id: "4",
    name: "Blog Platform",
    description: "Content-rich blog with CMS integration",
    thumbnail: "/api/placeholder/300/200",
    status: "live",
    lastModified: "1 week ago",
    domain: "blog.example.com",
  },
  {
    id: "5",
    name: "Restaurant Menu",
    description: "Interactive menu with online ordering",
    thumbnail: "/api/placeholder/300/200",
    status: "draft",
    lastModified: "2 weeks ago",
    domain: "restaurant.example.com",
  },
  {
    id: "6",
    name: "Event Website",
    description: "Event management and ticketing platform",
    thumbnail: "/api/placeholder/300/200",
    status: "live",
    lastModified: "1 month ago",
    domain: "events.example.com",
  },
];

export function SiteGrid() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Sites</h1>
          <p className="text-gray-600 mt-1">
            Manage and navigate to your websites
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
            Filter
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
            Sort
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSites.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>
    </div>
  );
} 