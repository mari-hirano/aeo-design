import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "@/components/LayoutContent";
import { ModeProvider } from "@/context/ModeContext";
import { NavigatorProvider } from "@/context/NavigatorContext";
import { PagesProvider } from "@/context/PagesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App Template",
  description: "A clean template for building web applications",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1E1E1E]`}>
        <ModeProvider>
          <NavigatorProvider>
            <PagesProvider>
              <LayoutContent>{children}</LayoutContent>
            </PagesProvider>
          </NavigatorProvider>
        </ModeProvider>
      </body>
    </html>
  );
}
