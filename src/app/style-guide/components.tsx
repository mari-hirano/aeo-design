import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Radio } from "@/components/ui/radio";
import { Switch } from "@/components/ui/switch";
import { Icon } from "@/components/ui/icon";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { TabBar, TabBarItem } from "@/components/ui/tab-bar";

export function ComponentsSection() {
  // State for segmented controls
  const [viewMode, setViewMode] = useState("grid");
  const [alignment, setAlignment] = useState("left");
  const [timeRange, setTimeRange] = useState("week");
  
  // State for tab bar
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-8 text-text-primary">
      <h2 className="text-xl font-semibold mb-4 text-text-secondary">Components</h2>
      
      {/* Button */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-text-secondary">Button</h2>
        
        {/* Button Size and Style */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-text-secondary">Button Style Matrix</h3>
          <p className="text-sm text-text-secondary mb-4">All buttons: 24px height, 4px rounded corners, Inter 11.5/16 with -1% letter spacing</p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-bg-secondary rounded-lg overflow-hidden">
              <thead>
                <tr className="border-b border-border-default">
                  <th className="p-3 text-left text-text-secondary font-medium">Style \ Color</th>
                  <th className="p-3 text-center text-text-secondary font-medium">Default</th>
                  <th className="p-3 text-center text-text-secondary font-medium">Primary</th>
                  <th className="p-3 text-center text-text-secondary font-medium">Success</th>
                  <th className="p-3 text-center text-text-secondary font-medium">Destructive</th>
                  <th className="p-3 text-center text-text-secondary font-medium">Warning</th>
                </tr>
              </thead>
              <tbody>
                {/* Solid buttons */}
                <tr className="border-b border-border-default">
                  <td className="p-3 text-text-secondary font-medium">Solid</td>
                  <td className="p-2 text-center"><Button variant="default">Button</Button></td>
                  <td className="p-2 text-center"><Button variant="primary">Button</Button></td>
                  <td className="p-2 text-center"><Button variant="success">Button</Button></td>
                  <td className="p-2 text-center"><Button variant="destructive">Button</Button></td>
                  <td className="p-2 text-center"><Button variant="warning">Button</Button></td>
                </tr>
                
                {/* Outline buttons */}
                <tr className="border-b border-border-default">
                  <td className="p-3 text-text-secondary font-medium">Outline</td>
                  <td className="p-2 text-center"><Button variant="outline">Button</Button></td>
                  <td className="p-2 text-center"><Button variant="outline-primary">Button</Button></td>
                  <td className="p-2 text-center"><Button variant="outline-success">Button</Button></td>
                  <td className="p-2 text-center"><Button variant="outline-destructive">Button</Button></td>
                  <td className="p-2 text-center"><Button variant="outline-warning">Button</Button></td>
                </tr>
                
                {/* Subtle buttons */}
                <tr className="border-b border-border-default">
                  <td className="p-3 text-text-secondary font-medium">Subtle</td>
                  <td className="p-2 text-center"><Button variant="subtle">Button</Button></td>
                  <td className="p-2 text-center"><Button variant="subtle-primary">Button</Button></td>
                  <td className="p-2 text-center"><Button variant="subtle-success">Button</Button></td>
                  <td className="p-2 text-center"><Button variant="subtle-destructive">Button</Button></td>
                  <td className="p-2 text-center"><Button variant="subtle-warning">Button</Button></td>
                </tr>
                
                {/* Ghost buttons */}
                <tr>
                  <td className="p-3 text-text-secondary font-medium">Ghost</td>
                  <td className="p-2 text-center"><Button variant="ghost">Button</Button></td>
                  <td className="p-2 text-center"><Button variant="ghost-primary">Button</Button></td>
                  <td className="p-2 text-center"><Button variant="ghost-success">Button</Button></td>
                  <td className="p-2 text-center"><Button variant="ghost-destructive">Button</Button></td>
                  <td className="p-2 text-center"><Button variant="ghost-warning">Button</Button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Buttons with Icons */}
        <div>
          <h3 className="text-lg font-medium mb-3 text-text-secondary">Buttons with Icons</h3>
          <div className="flex flex-wrap gap-4 bg-bg-secondary p-4 rounded-md">
            {/* Prefix Icon */}
            <div>
              <p className="text-sm text-text-secondary mb-2">Prefix Icon</p>
              <Button variant="primary">
                <Icon name="AddIcon" />
                <span>Add Item</span>
              </Button>
            </div>
            
            {/* Suffix Icon */}
            <div>
              <p className="text-sm text-text-secondary mb-2">Suffix Icon</p>
              <Button variant="outline-primary">
                <span>View Details</span>
                <Icon name="ChevronSmallRightIcon" />
              </Button>
            </div>
            
            {/* Both Icons */}
            <div>
              <p className="text-sm text-text-secondary mb-2">Both Icons</p>
              <Button variant="success">
                <Icon name="DownloadIcon" />
                <span>Download</span>
                <Icon name="ChevronSmallDownIcon" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Icon Buttons */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-text-secondary">Icon Buttons</h3>
        <div className="flex flex-col gap-6 bg-bg-secondary p-4 rounded-md">
          {/* Comfortable size (24px) */}
          <div>
            <p className="text-sm text-text-secondary mb-3">Comfortable Size (24px)</p>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex flex-col items-center gap-1">
                <IconButton variant="default" size="comfortable" aria-label="Add">
                  <Icon name="AddIcon" />
                </IconButton>
                <span className="text-xs text-text-secondary">Default</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <IconButton variant="primary" size="comfortable" aria-label="Add">
                  <Icon name="AddIcon" />
                </IconButton>
                <span className="text-xs text-text-secondary">Primary</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <IconButton variant="outline-primary" size="comfortable" aria-label="Search">
                  <Icon name="SearchDefaultIcon" />
                </IconButton>
                <span className="text-xs text-text-secondary">Outline</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <IconButton variant="subtle-success" size="comfortable" aria-label="Check">
                  <Icon name="CheckCircleIcon" />
                </IconButton>
                <span className="text-xs text-text-secondary">Subtle</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <IconButton variant="ghost-destructive" size="comfortable" aria-label="Delete">
                  <Icon name="DeleteIcon" />
                </IconButton>
                <span className="text-xs text-text-secondary">Ghost</span>
              </div>
            </div>
          </div>
          
          {/* Compact size (16px) */}
          <div>
            <p className="text-sm text-text-secondary mb-3">Compact Size (16px)</p>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex flex-col items-center gap-1">
                <IconButton variant="default" size="compact" aria-label="Add">
                  <Icon name="AddIcon" className="!size-3" />
                </IconButton>
                <span className="text-xs text-text-secondary">Default</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <IconButton variant="primary" size="compact" aria-label="Add">
                  <Icon name="AddIcon" className="!size-3" />
                </IconButton>
                <span className="text-xs text-text-secondary">Primary</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <IconButton variant="outline-primary" size="compact" aria-label="Search">
                  <Icon name="SearchDefaultIcon" className="!size-3" />
                </IconButton>
                <span className="text-xs text-text-secondary">Outline</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <IconButton variant="subtle-success" size="compact" aria-label="Check">
                  <Icon name="CheckCircleIcon" className="!size-3" />
                </IconButton>
                <span className="text-xs text-text-secondary">Subtle</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <IconButton variant="ghost-destructive" size="compact" aria-label="Delete">
                  <Icon name="DeleteIcon" className="!size-3" />
                </IconButton>
                <span className="text-xs text-text-secondary">Ghost</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Segmented Control */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-text-secondary">Segmented Control</h2>
        
        <div className="space-y-6 bg-bg-secondary p-4 rounded-md">
          {/* Text Segmented Control */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-text-secondary">Text Labels</h3>
            <div className="space-y-2">
              <p className="text-sm text-text-secondary mb-2">View Mode (2 items)</p>
              <SegmentedControl value={viewMode} onValueChange={setViewMode}>
                <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
                <SegmentedControlItem value="list">List</SegmentedControlItem>
              </SegmentedControl>
            </div>
            
            <div className="space-y-2 mt-4">
              <p className="text-sm text-text-secondary mb-2">Time Range (3 items)</p>
              <SegmentedControl value={timeRange} onValueChange={setTimeRange}>
                <SegmentedControlItem value="day">Day</SegmentedControlItem>
                <SegmentedControlItem value="week">Week</SegmentedControlItem>
                <SegmentedControlItem value="month">Month</SegmentedControlItem>
              </SegmentedControl>
            </div>
            
            <div className="space-y-2 mt-4">
              <p className="text-sm text-text-secondary mb-2">Full Width (4 items)</p>
              <SegmentedControl fullWidth value={alignment} onValueChange={setAlignment}>
                <SegmentedControlItem value="left">Left</SegmentedControlItem>
                <SegmentedControlItem value="center">Center</SegmentedControlItem>
                <SegmentedControlItem value="right">Right</SegmentedControlItem>
                <SegmentedControlItem value="justify">Justify</SegmentedControlItem>
              </SegmentedControl>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Bar */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-text-secondary">Tab Bar</h2>
        
        <div className="space-y-6 bg-bg-secondary p-4 rounded-md">
          {/* Text Tab Bar */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-text-secondary">Text Labels</h3>
            <div className="space-y-2">
              <p className="text-sm text-text-secondary mb-2">Navigation Tabs</p>
              <TabBar value={activeTab} onValueChange={setActiveTab}>
                <TabBarItem value="dashboard">Dashboard</TabBarItem>
                <TabBarItem value="analytics">Analytics</TabBarItem>
                <TabBarItem value="settings">Settings</TabBarItem>
                <TabBarItem value="profile">Profile</TabBarItem>
              </TabBar>
            </div>
            
            <div className="space-y-2 mt-4">
              <p className="text-sm text-text-secondary mb-2">Full Width</p>
              <TabBar fullWidth value={activeTab} onValueChange={setActiveTab}>
                <TabBarItem value="dashboard">Dashboard</TabBarItem>
                <TabBarItem value="analytics">Analytics</TabBarItem>
                <TabBarItem value="settings">Settings</TabBarItem>
                <TabBarItem value="profile">Profile</TabBarItem>
              </TabBar>
            </div>
          </div>
        </div>
      </section>

      {/* Form Controls */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-text-secondary">Form Controls</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input */}
          <div>
            <h3 className="text-lg font-medium mb-2 text-text-secondary">Input</h3>
            <Input placeholder="Input" />
          </div>

          {/* Textarea */}
          <div>
            <h3 className="text-lg font-medium mb-2 text-text-secondary">Textarea</h3>
            <Textarea placeholder="Textarea" />
          </div>

          {/* Select */}
          <div>
            <h3 className="text-lg font-medium mb-2 text-text-secondary">Select</h3>
            <Select>
              <option>Option 1</option>
              <option>Option 2</option>
            </Select>
          </div>

          {/* Checkbox */}
          <div>
            <h3 className="text-lg font-medium mb-2 text-text-secondary">Checkbox</h3>
            <label className="flex items-center space-x-2">
              <Checkbox />
              <span className="text-text-secondary">Checkbox</span>
            </label>
          </div>

          {/* Radio */}
          <div>
            <h3 className="text-lg font-medium mb-2 text-text-secondary">Radio</h3>
            <div className="flex items-center">
              <label className="flex items-center space-x-2">
                <Radio name="radio-group" />
                <span className="text-text-secondary">Radio 1</span>
              </label>
              <label className="flex items-center space-x-2 ml-4">
                <Radio name="radio-group" />
                <span className="text-text-secondary">Radio 2</span>
              </label>
            </div>
          </div>

          {/* Switch */}
          <div>
            <h3 className="text-lg font-medium mb-2 text-text-secondary">Switch</h3>
            <Switch aria-label="Switch" />
          </div>
        </div>
      </section>
    </div>
  );
} 