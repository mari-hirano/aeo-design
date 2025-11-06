"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { SiteGrid } from "@/components/dashboard/site-grid";
import { TeamPage } from "@/components/dashboard/team-page";
import { useState } from "react";

export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState("all-sites");

  const renderContent = () => {
    switch (selectedSection) {
      case "all-sites":
        return <SiteGrid />;
      case "tutorials":
        return (
          <div className="p-6">
            <h1 className="title-text-bold mb-4 text-[var(--text-primary)]">Tutorials</h1>
            <p className="body-text text-[var(--text-secondary)]">Learn how to build amazing websites with our comprehensive tutorials and guides.</p>
          </div>
        );
      case "general":
        return (
          <div className="p-6">
            <h1 className="title-text-bold mb-4 text-[var(--text-primary)]">General Settings</h1>
            <p className="body-text text-[var(--text-secondary)]">Manage your account settings, preferences, and general configuration options.</p>
          </div>
        );
      case "team":
        return <TeamPage />;
      case "plans":
        return (
          <div className="p-6">
            <h1 className="title-text-bold mb-4 text-[var(--text-primary)]">Plans & Billing</h1>
            <p className="body-text text-[var(--text-secondary)]">View your current plan, upgrade options, and manage billing information.</p>
          </div>
        );
      case "billing":
        return (
          <div className="p-6">
            <h1 className="title-text-bold mb-4 text-[var(--text-primary)]">Billing</h1>
            <p className="body-text text-[var(--text-secondary)]">Manage your payment methods, view invoices, and update billing details.</p>
          </div>
        );
      case "apps-integrations":
        return (
          <div className="p-6">
            <h1 className="title-text-bold mb-4 text-[var(--text-primary)]">Apps & Integrations</h1>
            <p className="body-text text-[var(--text-secondary)]">Connect third-party services and manage your app integrations.</p>
          </div>
        );
      case "libraries-templates":
        return (
          <div className="p-6">
            <h1 className="title-text-bold mb-4 text-[var(--text-primary)]">Libraries & Templates</h1>
            <p className="body-text text-[var(--text-secondary)]">Browse and manage your component libraries and website templates.</p>
          </div>
        );
      default:
        return <SiteGrid />;
    }
  };

  return (
    <DashboardLayout selectedSection={selectedSection} onSectionChange={setSelectedSection}>
      {renderContent()}
    </DashboardLayout>
  );
} 