"use client";

import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { SiteSettingsSidebar } from "@/components/dashboard/site-settings-sidebar";
import { SiteSettingsHeader } from "@/components/dashboard/site-settings-header";
import { useState } from "react";
import { Table, TableHeader, TableRow, ColumnDef } from "@/components/spring-ui/table";
import { Avatar } from "@/components/spring-ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/spring-ui/select";
import { Tag } from "@/components/spring-ui/tag";
import { IconButton } from "@/components/spring-ui/iconButton";
import { MoreIcon } from "@/icons/MoreIcon";
import { InfoIcon } from "@/icons/InfoIcon";
import { CMSDefaultIcon } from "@/icons/CMSDefaultIcon";

// User data type
interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  fallback: string;
  role: string;
  cmsAccess: string;
}

export default function SiteSettingsPage() {
  const [selectedSection, setSelectedSection] = useState("general");

  // Sample user data
  const users: UserData[] = [
    {
      id: "1",
      name: "Marlene Foote",
      email: "marlene.foote@gymflow.com",
      fallback: "MF",
      role: "site-manager",
      cmsAccess: "all"
    },
    {
      id: "2",
      name: "Laurie Briggs",
      email: "laurie.briggs@gymflow.com",
      fallback: "LB",
      role: "designer",
      cmsAccess: "all"
    },
    {
      id: "3",
      name: "Ruben Herwitz",
      email: "ruben.herwitz@gymflow.com",
      fallback: "RH",
      role: "designer",
      cmsAccess: "all"
    },
    {
      id: "4",
      name: "Marley Dias",
      email: "marley.dias@gymflow.com",
      fallback: "MD",
      role: "content-editor",
      cmsAccess: "4"
    },
    {
      id: "5",
      name: "Maren Dokidis",
      email: "maren.dokidis@gymflow.com",
      fallback: "M",
      role: "reviewer",
      cmsAccess: "none"
    },
    {
      id: "6",
      name: "Mackenzie Childs",
      email: "mackenzi.childs@gymflow.com",
      fallback: "MC",
      role: "content-editor",
      cmsAccess: "all"
    },
    {
      id: "7",
      name: "Mattie Rogers",
      email: "mattie.rogers@gymflow.com",
      fallback: "MR",
      role: "content-editor",
      cmsAccess: "2"
    }
  ];

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

  // Role display names
  const getRoleDisplayName = (role: string) => {
    const roleMap: Record<string, string> = {
      "site-manager": "Site manager",
      "designer": "Designer",
      "content-editor": "Content editor",
      "reviewer": "Reviewer"
    };
    return roleMap[role] || role;
  };

  // Table column definitions
  const columns: ColumnDef[] = [
    {
      id: "name",
      header: "Name",
      renderCell: (value: any, rowData: UserData) => (
        <div className="flex items-center gap-2">
          <Avatar 
            fallback={rowData.fallback}
            size="md"
          />
          <div className="flex flex-col">
            <span className="body-text-bold text-[var(--text-primary)]">{rowData.name}</span>
            <span className="body-text text-[var(--text-secondary)]">{rowData.email}</span>
          </div>
        </div>
      )
    },
    {
      id: "role",
      header: "Role",
      width: "300px",
      renderCell: (value: any, rowData: UserData) => (
        <Select defaultValue={rowData.role}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="site-manager">Site manager</SelectItem>
            <SelectItem value="designer">Designer</SelectItem>
            <SelectItem value="content-editor">Content editor</SelectItem>
            <SelectItem value="reviewer">Reviewer</SelectItem>
          </SelectContent>
        </Select>
      )
    },
    {
      id: "cmsAccess",
      header: "CMS edit access",
      width: "240px",
      renderHeader: () => (
        <div className="flex items-center gap-1">
          <span>CMS edit access</span>
          <InfoIcon className="text-[var(--text-secondary)]" size={16} />
        </div>
      ),
      renderCell: (value: any, rowData: UserData) => {
        const isDisabled = rowData.role === "reviewer";
        return (
          <Tag 
            size="compact" 
            shape="rounded"
            variant="default"
            className={isDisabled ? "opacity-50" : ""}
            prefixIcon={
              <CMSDefaultIcon 
                className="text-[var(--text-secondary)]" 
                size={16} 
              />
            }
          >
            {rowData.cmsAccess === "all" ? "All" : 
             rowData.cmsAccess === "none" ? "None" : 
             rowData.cmsAccess}
          </Tag>
        );
      }
    },
    {
      id: "actions",
      header: "",
      width: "64px",
      renderCell: (value: any, rowData: UserData) => (
        <div className="flex justify-end">
          <IconButton variant="ghost" size="comfortable">
            <MoreIcon className="text-[var(--text-secondary)]" size={16} />
          </IconButton>
        </div>
      )
    }
  ];

  const renderContent = () => {
    return (
      <div className="p-4">
        <SiteSettingsHeader 
          siteName="My Site"
        />
        <div className="mt-6">
          <h1 className="title-text-bold mb-4 text-[var(--text-primary)]">{getSectionTitle(selectedSection)}</h1>
          <p className="body-text text-[var(--text-secondary)] mb-6">{getSectionDescription(selectedSection)}</p>
          
          {selectedSection === "site-access" && (
            <Table>
              <TableHeader columns={columns} />
              {users.map((user, index) => (
                <TableRow 
                  key={user.id}
                  data={user}
                  columns={columns}
                />
              ))}
            </Table>
          )}
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