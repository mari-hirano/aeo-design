import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - App Template",
  description: "Dashboard for managing your sites",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
} 