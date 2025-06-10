"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { SiteGrid } from "@/components/dashboard/site-grid";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <SiteGrid />
    </DashboardLayout>
  );
} 