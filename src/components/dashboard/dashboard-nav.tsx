"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

export function DashboardNav() {
  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left side - Logo/Brand */}
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold text-gray-900">Dashboard</div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Icon 
            name="search" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
          />
          <Input
            placeholder="Search sites..."
            className="pl-10 w-full"
          />
        </div>
      </div>

      {/* Right side - User menu */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm">
          <Icon name="bell" className="w-4 h-4" />
        </Button>
        <Avatar>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            U
          </div>
        </Avatar>
      </div>
    </nav>
  );
} 