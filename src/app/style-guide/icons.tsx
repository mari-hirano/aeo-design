import React from "react";
import { Icon } from "@/components/ui/icon";

export function IconsSection() {
  return (
    <div className="space-y-8 text-text-primary">
      <h2 className="text-xl font-semibold mb-4 text-text-secondary">Icons</h2>
      
      {/* Common icons */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-text-secondary">Common Icons (16px, white @ 67% opacity)</h3>
        <div className="flex flex-wrap items-center gap-6 bg-bg-secondary p-4 rounded-md">
          <div className="flex flex-col items-center">
            <Icon name="AddIcon" className="text-text-secondary" />
            <span className="text-xs mt-1 text-text-secondary">AddIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" className="text-text-secondary" />
            <span className="text-xs mt-1 text-text-secondary">AccountIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="HomeIcon" className="text-text-secondary" />
            <span className="text-xs mt-1 text-text-secondary">HomeIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="SearchDefaultIcon" className="text-text-secondary" />
            <span className="text-xs mt-1 text-text-secondary">SearchDefaultIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="UserIcon" className="text-text-secondary" />
            <span className="text-xs mt-1 text-text-secondary">UserIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="SettingsAltIcon" className="text-text-secondary" />
            <span className="text-xs mt-1 text-text-secondary">SettingsAltIcon</span>
          </div>
        </div>
      </section>

      {/* Icon colors */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-text-secondary">Icon Colors</h3>
        <div className="flex flex-wrap items-center gap-6 bg-bg-secondary p-4 rounded-md">
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" className="text-text-secondary" />
            <span className="text-xs mt-1 text-text-secondary">Default (white @ 67%)</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" className="text-blue-text" />
            <span className="text-xs mt-1 text-text-secondary">Blue (blue-text)</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" className="text-green-text" />
            <span className="text-xs mt-1 text-text-secondary">Green (green-text)</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" className="text-purple-text" />
            <span className="text-xs mt-1 text-text-secondary">Purple (purple-text)</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" className="text-pink-text" />
            <span className="text-xs mt-1 text-text-secondary">Pink (pink-text)</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" className="text-orange-text" />
            <span className="text-xs mt-1 text-text-secondary">Orange (orange-text)</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" className="text-red-text" />
            <span className="text-xs mt-1 text-text-secondary">Red (red-text)</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" className="text-yellow-text" />
            <span className="text-xs mt-1 text-text-secondary">Yellow (yellow-text)</span>
          </div>
        </div>
      </section>

      {/* Icon categories */}
      <section>
        <h3 className="text-lg font-medium mb-3 text-text-secondary">Icon Categories</h3>
        
        {/* Navigation */}
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2 text-text-secondary">Navigation</h4>
          <div className="flex flex-wrap items-center gap-6 bg-bg-secondary p-4 rounded-md">
            <div className="flex flex-col items-center">
              <Icon name="ArrowLeftIcon" className="text-text-secondary" />
              <span className="text-xs mt-1 text-text-secondary">ArrowLeftIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="ChevronSmallRightIcon" className="text-text-secondary" />
              <span className="text-xs mt-1 text-text-secondary">ChevronSmallRightIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="ChevronSmallDownIcon" className="text-text-secondary" />
              <span className="text-xs mt-1 text-text-secondary">ChevronSmallDownIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="MenuIcon" className="text-text-secondary" />
              <span className="text-xs mt-1 text-text-secondary">MenuIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="HomeIcon" className="text-text-secondary" />
              <span className="text-xs mt-1 text-text-secondary">HomeIcon</span>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2 text-text-secondary">Actions</h4>
          <div className="flex flex-wrap items-center gap-6 bg-bg-secondary p-4 rounded-md">
            <div className="flex flex-col items-center">
              <Icon name="AddIcon" className="text-text-secondary" />
              <span className="text-xs mt-1 text-text-secondary">AddIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="DeleteIcon" className="text-text-secondary" />
              <span className="text-xs mt-1 text-text-secondary">DeleteIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="EditIcon" className="text-text-secondary" />
              <span className="text-xs mt-1 text-text-secondary">EditIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="RefreshIcon" className="text-text-secondary" />
              <span className="text-xs mt-1 text-text-secondary">RefreshIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="DownloadIcon" className="text-text-secondary" />
              <span className="text-xs mt-1 text-text-secondary">DownloadIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="UploadIcon" className="text-text-secondary" />
              <span className="text-xs mt-1 text-text-secondary">UploadIcon</span>
            </div>
          </div>
        </div>
        
        {/* Status */}
        <div>
          <h4 className="text-md font-medium mb-2 text-text-secondary">Status</h4>
          <div className="flex flex-wrap items-center gap-6 bg-bg-secondary p-4 rounded-md">
            <div className="flex flex-col items-center">
              <Icon name="InfoIcon" className="text-blue-text" />
              <span className="text-xs mt-1 text-text-secondary">InfoIcon (Blue)</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="CheckCircleIcon" className="text-green-text" />
              <span className="text-xs mt-1 text-text-secondary">CheckCircleIcon (Green)</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="WarningTriangleIcon" className="text-yellow-text" />
              <span className="text-xs mt-1 text-text-secondary">WarningTriangleIcon (Yellow)</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="CloseCircleIcon" className="text-red-text" />
              <span className="text-xs mt-1 text-text-secondary">CloseCircleIcon (Red)</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="LockIcon" className="text-text-secondary" />
              <span className="text-xs mt-1 text-text-secondary">LockIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="UnlockIcon" className="text-text-secondary" />
              <span className="text-xs mt-1 text-text-secondary">UnlockIcon</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 