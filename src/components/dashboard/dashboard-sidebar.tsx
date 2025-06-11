"use client";

import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { 
  SettingsAltIcon, 
  UsersIcon, 
  UpgradeIcon, 
  PaymentIcon, 
  AppsIcon, 
  TemplatesIcon,
  ChevronSmallDownIcon,
  WebflowIcon,
  SitesStackIcon,
  VideoTutorialsIcon
} from "@/icons";
import { useState } from "react";

const mainNavItems = [
  { name: "All sites", active: true, icon: SitesStackIcon },
  { name: "Tutorials", active: false, icon: VideoTutorialsIcon },
];

const settingsItems = [
  { name: "General", icon: SettingsAltIcon },
  { name: "Team", icon: UsersIcon },
  { name: "Plans", icon: UpgradeIcon },
  { name: "Billing", icon: PaymentIcon },
  { name: "Apps & integrations", icon: AppsIcon },
  { name: "Libraries & templates", icon: TemplatesIcon },
];

const workspaces = [
  { name: "My Workspace", current: true },
  { name: "Team Alpha", current: false },
  { name: "Client Project", current: false },
  { name: "Personal", current: false },
];

export function DashboardSidebar() {
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const currentWorkspace = workspaces.find(w => w.current) || workspaces[0];

  return (
    <aside 
      className="overflow-y-auto border-none"
      style={{ width: '240px' }}
    >
      <div className="p-4 space-y-4">
        {/* Workspace Selector */}
        <div className="relative">
          <Button
            variant="ghost"
            className="w-full justify-between p-3 h-auto"
            onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
          >
            <div className="flex items-center space-x-3">
              <Avatar size="sm">
                <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {currentWorkspace.name.charAt(0)}
                </div>
              </Avatar>
              <span className="text-sm font-medium text-[var(--text-primary)]">
                {currentWorkspace.name}
              </span>
            </div>
            <ChevronSmallDownIcon size={12} />
          </Button>
          
          {/* Workspace Dropdown Menu */}
          {showWorkspaceMenu && (
            <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-md shadow-lg">
              <div className="py-1">
                {workspaces.map((workspace) => (
                  <button
                    key={workspace.name}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-[var(--bg-accent)] text-left"
                  >
                    <Avatar size="sm">
                      <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {workspace.name.charAt(0)}
                      </div>
                    </Avatar>
                    <span className="text-[var(--text-primary)]">
                      {workspace.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <Button
              key={item.name}
              variant={item.active ? "subtle" : "ghost"}
              className="w-full justify-start body-text"
              size="sm"
            >
              <item.icon size={16} />
              {item.name}
            </Button>
          ))}
        </div>

        {/* Settings Section */}
        <div className="pt-4 space-y-1">
          <div className="mb-3">
            <h3 className="px-3 body-text-bold text-[var(--text-secondary)]">
              Settings
            </h3>
          </div>
          <div>
            {settingsItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start body-text"
                size="sm"
              >
                <item.icon size={16} />
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
} 