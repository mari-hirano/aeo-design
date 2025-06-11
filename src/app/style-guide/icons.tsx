import React from "react";
import { Icon } from "@/components/ui/icon";

export function IconsSection() {
  return (
    <div className="space-y-8 text-[var(--text-primary)]">
      
      {/* Common icons */}
      <section>
        <h3 className="text-lg font-medium mb-3">Common Icons (16px, white @ 67% opacity)</h3>
        <div className="flex flex-wrap items-center gap-6 p-4">
          <div className="flex flex-col items-center">
            <Icon name="AddIcon" />
            <span className="body-text mt-1">AddIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" />
            <span className="body-text mt-1">AccountIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="HomeIcon" />
            <span className="body-text mt-1">HomeIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="SearchDefaultIcon" />
            <span className="body-text mt-1">SearchDefaultIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="UserIcon" />
            <span className="body-text mt-1">UserIcon</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="SettingsAltIcon" />
            <span className="body-text mt-1">SettingsAltIcon</span>
          </div>
        </div>
      </section>

      {/* Icon colors */}
      <section>
        <h3 className="text-lg font-medium mb-3">Icon Colors</h3>
        <div className="flex flex-wrap items-center gap-6 p-4">
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" />
            <span className="body-text mt-1">Default (white @ 67%)</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" className="text-[var(--blue-text)]" />
            <span className="body-text text-[var(--blue-text)] mt-1">Blue (blue-text)</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" className="text-[var(--green-text)]" />
            <span className="body-text text-[var(--green-text)] mt-1">Green (green-text)</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" className="text-[var(--purple-text)]" />
            <span className="body-text text-[var(--purple-text)] mt-1">Purple (purple-text)</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" className="text-[var(--pink-text)]" />
            <span className="body-text text-[var(--pink-text)] mt-1">Pink (pink-text)</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" className="text-[var(--orange-text)]" />
            <span className="body-text text-[var(--orange-text)] mt-1">Orange (orange-text)</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" className="text-[var(--red-text)]" />
            <span className="body-text text-[var(--red-text)] mt-1">Red (red-text)</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon name="AccountIcon" className="text-[var(--yellow-text)]" />
            <span className="body-text text-[var(--yellow-text)] mt-1">Yellow (yellow-text)</span>
          </div>
        </div>
      </section>

    </div>
  );
} 