"use client";

import React from "react";

const mockCitedPages = [
  { page: "Home", citationShare: 32, isLink: false },
  { page: "Pricing", citationShare: 18, isLink: false },
  { page: "Introduction to website design", citationShare: 14, isLink: true },
  { page: "Website design in the age of AI", citationShare: 12, isLink: true },
  { page: "Enterprise solution", citationShare: 10, isLink: false },
  { page: "Other pages", citationShare: 5, isLink: false },
];

const maxShare = Math.max(...mockCitedPages.map((r) => r.citationShare));

export function TopCitedPagesWidget({ className }: { className?: string }) {
  return (
    <div
      className={`bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg p-4 flex flex-col gap-4 ${className ?? ""}`}
    >
      <p className="body-text-bold text-[var(--text-primary)] shrink-0">
        Top cited pages
      </p>
      <div className="flex flex-col gap-2 flex-1 min-h-0">
        <div className="flex items-center gap-2">
          <span className="body-text-bold text-[var(--text-secondary)] flex-1 min-w-0">
            Pages
          </span>
          <div className="flex items-center gap-1.5 w-[90px] shrink-0">
            <div className="flex-1 min-w-0" />
            <span className="body-text-bold text-[var(--text-secondary)] shrink-0">
              Citation share
            </span>
          </div>
        </div>
        <div className="h-px bg-[var(--border-default)] shrink-0" />
        <div className="flex flex-col gap-4 flex-1 min-h-0">
          {mockCitedPages.map((row) => (
            <div
              key={row.page}
              className="flex items-center justify-between gap-2 shrink-0"
            >
              <p
                className={`body-text truncate flex-1 min-w-0 ${
                  row.isLink ? "text-[var(--text-purple)]" : "text-[var(--text-primary)]"
                }`}
              >
                {row.page}
              </p>
              <div className="flex items-center gap-1.5 w-[90px] shrink-0">
                <div className="h-2.5 rounded-[2px] bg-[var(--border-default)] flex-1 min-w-0 overflow-hidden">
                  <div
                    className="h-full rounded-[2px] bg-[var(--blue-chart)]"
                    style={{
                      width: `${(row.citationShare / maxShare) * 100}%`,
                    }}
                  />
                </div>
                <span className="body-text text-[var(--text-primary)] w-8 shrink-0">
                  {row.citationShare}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
