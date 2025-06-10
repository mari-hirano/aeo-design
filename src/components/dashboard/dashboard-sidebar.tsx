"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";

const navigationItems = [
  { name: "Overview", icon: "home", active: true },
  { name: "Sites", icon: "globe", active: false },
  { name: "Templates", icon: "layout", active: false },
  { name: "Team", icon: "users", active: false },
];

const quickActions = [
  { name: "New Site", icon: "plus" },
  { name: "Import", icon: "upload" },
  { name: "Settings", icon: "settings" },
];

export function DashboardSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="p-4">
        {/* Navigation */}
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <Button
              key={item.name}
              variant={item.active ? "default" : "ghost"}
              className="w-full justify-start"
              size="sm"
            >
              <Icon name={item.icon} className="w-4 h-4 mr-3" />
              {item.name}
            </Button>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Quick Actions */}
        <div className="space-y-1">
          <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Quick Actions
          </div>
          {quickActions.map((action) => (
            <Button
              key={action.name}
              variant="ghost"
              className="w-full justify-start"
              size="sm"
            >
              <Icon name={action.icon} className="w-4 h-4 mr-3" />
              {action.name}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
} 