"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

interface Site {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  status: "live" | "draft";
  lastModified: string;
  domain: string;
}

interface SiteCardProps {
  site: Site;
}

export function SiteCard({ site }: SiteCardProps) {
  const handleNavigateToSite = () => {
    // This would navigate to the actual site editing interface
    console.log(`Navigating to site: ${site.id}`);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
          <Icon name="globe" className="w-12 h-12 text-gray-400" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header with title and status */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 truncate flex-1 mr-2">
            {site.name}
          </h3>
          <Badge 
            variant={site.status === "live" ? "green" : "default"}
            className="flex-shrink-0"
          >
            {site.status}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {site.description}
        </p>

        {/* Domain and last modified */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span className="truncate">{site.domain}</span>
          <span className="flex-shrink-0 ml-2">{site.lastModified}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button 
            onClick={handleNavigateToSite}
            size="sm" 
            className="flex-1"
          >
            <Icon name="edit" className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="px-2"
          >
            <Icon name="more-horizontal" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
} 