"use client";

import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { SiteSettingsSidebar } from "@/components/dashboard/site-settings-sidebar";
import { SiteSettingsHeader } from "@/components/dashboard/site-settings-header";
import { useState } from "react";

export default function SiteSettingsPage() {
  const [selectedSection, setSelectedSection] = useState("general");

  const getSectionTitle = (section: string) => {
    switch (section) {
      case "general": return "General Settings";
      case "site-access": return "Site Access";
      case "publishing": return "Publishing";
      case "plans": return "Plans";
      case "site-usage": return "Site Usage";
      case "seo": return "SEO";
      case "forms": return "Forms";
      case "libraries": return "Libraries";
      case "fonts": return "Fonts";
      case "backups": return "Backups";
      case "apps-integrations": return "Apps & Integrations";
      case "custom-code": return "Custom Code";
      case "webflow-cloud": return "Webflow Cloud";
      default: return "General Settings";
    }
  };

  const getSectionDescription = (section: string) => {
    switch (section) {
      case "general": return "Configure your site's basic settings and information.";
      case "site-access": return "Manage who can access and edit your site.";
      case "publishing": return "Configure publishing settings and domain connections.";
      case "plans": return "Manage your site plan and billing settings.";
      case "site-usage": return "View analytics and usage statistics for your site.";
      case "seo": return "Optimize your site for search engines.";
      case "forms": return "Manage form submissions and settings.";
      case "libraries": return "Manage external libraries and dependencies.";
      case "fonts": return "Configure and manage custom fonts for your site.";
      case "backups": return "Create and manage site backups.";
      case "apps-integrations": return "Connect third-party apps and services to your site.";
      case "custom-code": return "Add custom HTML, CSS, and JavaScript to your site.";
      case "webflow-cloud": return "Access cloud features and beta functionality.";
      default: return "Configure your site's basic settings and information.";
    }
  };

  const renderContent = () => {
    return (
      <div className="p-4">
        <SiteSettingsHeader 
          siteName="My Site"
        />
        <div className="mt-6">
          <h1 className="title-text-bold mb-4 text-[var(--text-primary)]">{getSectionTitle(selectedSection)}</h1>
          <p className="text-[var(--text-secondary)]">{getSectionDescription(selectedSection)}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] theme-dashboard">
      {/* Top Navigation */}
      <DashboardNav />
      
      {/* Main Content Area */}
      <div className="flex flex-1 justify-center">
        {/* Custom Site Settings Sidebar */}
        <SiteSettingsSidebar 
          selectedSection={selectedSection}
          onSectionChange={setSelectedSection}
        />
        
        {/* Main Content with max-width constraint */}
        <div 
          className="bg-[var(--bg-primary)] overflow-auto"
          style={{ 
            maxWidth: '1040px',
            width: '100%'
          }}
        >
          <main>
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
} 