import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "@/components/LayoutContent";
import { ModeProvider } from "@/context/ModeContext";
import { AssistantProvider } from "@/context/AssistantContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orion Prototype",
  description: "AI-powered coding environment prototype",
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1E1E1E]`}>
        <ModeProvider>
          <AssistantProvider>
            <LayoutContent />
          </AssistantProvider>
        </ModeProvider>
      </body>
    </html>
  );
}
