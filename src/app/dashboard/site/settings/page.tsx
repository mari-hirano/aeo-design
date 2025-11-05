"use client";

import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { SiteSettingsSidebar } from "@/components/dashboard/site-settings-sidebar";
import { SiteSettingsHeader } from "@/components/dashboard/site-settings-header";
import { useState } from "react";
import { Table, TableHeader, TableRow, ColumnDef } from "@/components/spring-ui/table";
import { Avatar } from "@/components/spring-ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel, SelectGroup } from "@/components/spring-ui/select";
import { Tag } from "@/components/spring-ui/tag";
import { IconButton } from "@/components/spring-ui/iconButton";
import { Button } from "@/components/spring-ui/button";
import { TabBar, TabBarItem } from "@/components/spring-ui/tab-bar";
import { Switch } from "@/components/spring-ui/switch";
import { Badge } from "@/components/spring-ui/badge";
import { MoreIcon } from "@/icons/MoreIcon";
import { InfoIcon } from "@/icons/InfoIcon";
import { CMSDefaultIcon } from "@/icons/CMSDefaultIcon";
import { CheckDefaultIcon } from "@/icons/CheckDefaultIcon";
import { LockIcon } from "@/icons/LockIcon";
import { UsersIcon } from "@/icons/UsersIcon";
import { AddIcon } from "@/icons/AddIcon";
import { BoxAddIcon } from "@/icons/BoxAddIcon";
import { ChevronSmallDownIcon } from "@/icons/ChevronSmallDownIcon";

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

// Plan feature type
interface PlanFeature {
  label: string;
  hasInfoIcon?: boolean;
  hasPlusIcon?: boolean;
}

// Plan data type
interface PlanData {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  isCurrentPlan: boolean;
  badge?: string;
  features: PlanFeature[];
}

export default function SiteSettingsPage() {
  const [selectedSection, setSelectedSection] = useState("general");
  const [siteAccessLevel, setSiteAccessLevel] = useState("admins-only");
  const [plansTab, setPlansTab] = useState("website");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");

  // Plan data
  const plans: PlanData[] = [
    {
      id: "starter",
      name: "Starter",
      priceMonthly: 0,
      priceYearly: 0,
      description: "Best for learning how to use Webflow",
      isCurrentPlan: true,
      features: [
        { label: "Webflow.io domain", hasInfoIcon: true },
        { label: "An entry-level site" },
        { label: "2 pages", hasInfoIcon: true },
        { label: "20 CMS collections", hasInfoIcon: true },
        { label: "50 CMS items", hasInfoIcon: true },
        { label: "50 form submissions (lifetime)", hasInfoIcon: true },
        { label: "Localization free preview", hasInfoIcon: true },
        { label: "Usage" },
        { label: "1 GB bandwidth", hasInfoIcon: true },
        { label: "Web app hosting", hasInfoIcon: true },
      ]
    },
    {
      id: "basic",
      name: "Basic",
      priceMonthly: 18,
      priceYearly: 14,
      description: "Best for launching a simple site",
      isCurrentPlan: false,
      features: [
        { label: "Custom domain", hasInfoIcon: true },
        { label: "A basic site" },
        { label: "150 pages", hasInfoIcon: true },
        { label: "0 CMS collections", hasInfoIcon: true },
        { label: "0 CMS items", hasInfoIcon: true },
        { label: "Unlimited form submissions", hasInfoIcon: true },
        { label: "Localization free preview", hasInfoIcon: true },
        { label: "Usage" },
        { label: "10 GB bandwidth", hasInfoIcon: true },
        { label: "Surge protection", hasInfoIcon: true },
        { label: "Web app hosting", hasInfoIcon: true },
      ]
    },
    {
      id: "cms",
      name: "CMS",
      priceMonthly: 29,
      priceYearly: 23,
      description: "Best for launching a simple site",
      isCurrentPlan: false,
      badge: "Most popular",
      features: [
        { label: "Custom domain", hasInfoIcon: true },
        { label: "A content-rich site" },
        { label: "150 pages", hasInfoIcon: true },
        { label: "20 CMS collections", hasInfoIcon: true },
        { label: "2k CMS items", hasInfoIcon: true },
        { label: "Unlimited form submissions", hasInfoIcon: true },
        { label: "3 legacy Editor users", hasInfoIcon: true },
        { label: "Site search", hasInfoIcon: true },
        { label: "Localization free preview", hasInfoIcon: true },
        { label: "Usage" },
        { label: "50 GB bandwidth", hasInfoIcon: true },
        { label: "Surge protection", hasInfoIcon: true },
        { label: "Web app hosting", hasInfoIcon: true },
      ]
    },
    {
      id: "business",
      name: "Business",
      priceMonthly: 49,
      priceYearly: 39,
      description: "Best for a high-traffic marketing site",
      isCurrentPlan: false,
      features: [
        { label: "Custom domain", hasInfoIcon: true },
        { label: "A basic site" },
        { label: "300 pages", hasInfoIcon: true },
        { label: "40 CMS collections", hasInfoIcon: true },
        { label: "10k CMS items", hasInfoIcon: true, hasPlusIcon: true },
        { label: "Unlimited form submissions", hasInfoIcon: true },
        { label: "10 legacy Editor users", hasInfoIcon: true },
        { label: "Site search", hasInfoIcon: true },
        { label: "Form file upload", hasInfoIcon: true },
        { label: "Localization free preview", hasInfoIcon: true },
        { label: "Usage" },
        { label: "100 GB bandwidth", hasInfoIcon: true, hasPlusIcon: true },
        { label: "Surge protection", hasInfoIcon: true },
        { label: "Web app hosting", hasInfoIcon: true },
      ]
    }
  ];

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
      role: "marketer",
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

  // Role display names and descriptions
  const getRoleDisplayName = (role: string) => {
    const roleMap: Record<string, string> = {
      "site-manager": "Site manager",
      "designer": "Designer",
      "marketer": "Marketer",
      "content-editor": "Content editor",
      "reviewer": "Reviewer"
    };
    return roleMap[role] || role;
  };

  const getRoleDescription = (role: string) => {
    const descriptionMap: Record<string, string> = {
      "site-manager": "Can manage site settings and billing",
      "designer": "Design using all features",
      "marketer": "Build pages with components",
      "content-editor": "Only edit content",
      "reviewer": "View and comment on sites"
    };
    return descriptionMap[role] || "";
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
            <SelectGroup>
              <SelectLabel>Default</SelectLabel>
              <SelectItem value="site-manager" description="Can manage site settings and billing">
                Site manager
              </SelectItem>
              <SelectItem value="designer" description="Design using all features">
                Designer
              </SelectItem>
              <SelectItem value="marketer" description="Build pages with components">
                Marketer
              </SelectItem>
              <SelectItem value="content-editor" description="Only edit content">
                Content editor
              </SelectItem>
              <SelectItem value="reviewer" description="View and comment on sites">
                Reviewer
              </SelectItem>
            </SelectGroup>
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
          <div className="text-[var(--text-secondary)]">
            <InfoIcon size={16} />
          </div>
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
              <div className="text-[var(--text-secondary)]">
                <CMSDefaultIcon size={16} />
              </div>
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
        <div className="flex justify-end items-center h-full">
          <IconButton variant="ghost" size="comfortable" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <MoreIcon size={16} />
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
          
          {selectedSection === "site-access" ? (
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="body-text text-[var(--text-secondary)]">{getSectionDescription(selectedSection)}</p>
              <div className="flex items-center gap-2 shrink-0">
                <Select value={siteAccessLevel} onValueChange={setSiteAccessLevel}>
                  <SelectTrigger className="w-[389px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admins-only">
                      <div className="flex items-center gap-2">
                        <div className="text-[var(--text-secondary)]">
                          <LockIcon size={16} />
                        </div>
                        <span>Only admins and added users can view</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="everyone">
                      <div className="flex items-center gap-2">
                        <div className="text-[var(--text-secondary)]">
                          <UsersIcon size={16} />
                        </div>
                        <span>Everyone in the workspace can view</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="primary">Add users</Button>
              </div>
            </div>
          ) : (
            <p className="body-text text-[var(--text-secondary)] mb-6">{getSectionDescription(selectedSection)}</p>
          )}
          
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

          {selectedSection === "plans" && (
            <div className="flex flex-col gap-10">
              {/* Tab Navigation and Billing Toggle */}
              <div className="flex items-center justify-between border-b border-[var(--border-default)]">
                <TabBar value={plansTab} onValueChange={setPlansTab} fullWidth={false} className="border-b-0">
                  <TabBarItem value="website">Website</TabBarItem>
                  <TabBarItem value="ecommerce">Ecommerce site</TabBarItem>
                  <TabBarItem value="addons">Add ons</TabBarItem>
                </TabBar>
                
                <div className="flex flex-col items-end gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="body-text text-[var(--text-secondary)]">Billed monthly</span>
                    <Switch
                      checked={billingPeriod === "yearly"}
                      onChange={(e) => setBillingPeriod(e.target.checked ? "yearly" : "monthly")}
                      hideLabel
                      aria-label="Billing period"
                      sizeVariant="compact"
                    />
                    <span className="body-text text-[var(--text-secondary)]">Billed yearly</span>
                  </div>
                  <p className="body-text text-[11.5px] text-[var(--text-blue)] tracking-[-0.115px]">
                    Save up to 22% with yearly billing
                  </p>
                </div>
              </div>

              {/* Plan Cards Grid */}
              <div className="grid grid-cols-4 gap-6">
                {plans.map((plan) => {
                  const price = billingPeriod === "yearly" ? plan.priceYearly : plan.priceMonthly;
                  const currentPrice = price === 0 ? "$0" : `$${price}`;
                  
                  return (
                    <div
                      key={plan.id}
                      className={`relative flex flex-col gap-6 p-4 rounded-lg border ${
                        plan.isCurrentPlan
                          ? "border-[var(--action-primary-bg)]"
                          : "border-[var(--border-default)]"
                      } ${
                        plan.id === "cms"
                          ? "bg-[var(--blue-bg-transparent)]"
                          : ""
                      }`}
                    >
                      {/* Badge positioned at top border */}
                      {plan.badge && (
                        <Badge 
                          variant="blue" 
                          styleType="solid"
                          size="comfort" 
                          className="absolute -top-[14px] left-1/2 -translate-x-1/2 py-0.5"
                        >
                          {plan.badge}
                        </Badge>
                      )}
                      
                      {/* Plan Header */}
                      <div className="flex flex-col gap-1 items-center text-center h-[72px]">
                        <h3 className="body-text-bold text-[11.5px] text-[var(--text-primary)]">
                          {plan.name}
                        </h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-semibold leading-normal text-[var(--text-primary)]">
                            {currentPrice}
                          </span>
                          <span className="body-text-bold text-[13px] leading-[18px] text-[var(--text-primary)]">
                            /mo
                          </span>
                        </div>
                        {price > 0 && (
                          <p className="body-text text-[11.5px] text-[var(--text-primary)] tracking-[-0.115px]">
                            billed {billingPeriod === "yearly" ? "yearly" : "monthly"}
                          </p>
                        )}
                      </div>

                      {/* Description */}
                      <p className="body-text text-[11.5px] text-center text-[var(--text-primary)] tracking-[-0.115px] h-8">
                        {plan.description}
                      </p>

                      {/* Action Button */}
                      {plan.isCurrentPlan ? (
                        <Button variant="default" size="compact" className="w-full" disabled>
                          <CheckDefaultIcon size={16} />
                          You're on {plan.name}
                        </Button>
                      ) : (
                        <Button variant="primary" size="compact" className="w-full">
                          Upgrade to {plan.name}
                          <ChevronSmallDownIcon size={16} />
                        </Button>
                      )}

                      {/* Features List */}
                      <div className="flex flex-col gap-2">
                        {plan.features.map((feature, index) => {
                          // Check if this is a section header (no icon, just text)
                          const isSectionHeader = !feature.hasInfoIcon && 
                            (feature.label === "Usage" || 
                             feature.label === "An entry-level site" || 
                             feature.label === "A basic site" || 
                             feature.label === "A content-rich site");
                          
                          if (isSectionHeader) {
                            return (
                              <div key={index} className="flex items-center gap-2 mt-2">
                                <p className="body-text text-[11.5px] text-[var(--text-primary)] tracking-[-0.115px]">
                                  {feature.label}
                                </p>
                              </div>
                            );
                          }

                          return (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-2 flex-1">
                                <p className="body-text text-[11.5px] text-[var(--text-primary)] tracking-[-0.115px]">
                                  {feature.label}
                                </p>
                                {feature.hasPlusIcon && (
                                  <BoxAddIcon size={16} className="text-[var(--text-secondary)]" />
                                )}
                              </div>
                              {feature.hasInfoIcon && (
                                <div className="text-[var(--text-secondary)]">
                                  <InfoIcon size={16} />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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