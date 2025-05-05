import React from "react";

export function TypographySection() {
  return (
    <div className="space-y-8 text-text-primary">
      <h2 className="text-xl font-semibold mb-4 text-text-secondary">Typography</h2>
      
      <section>
        <h3 className="text-lg font-medium mb-3 text-text-secondary">Font Family</h3>
        <div className="bg-bg-secondary p-4 rounded-md">
          <p className="text-text-primary mb-2">Inter</p>
          <p className="text-text-secondary text-sm">All UI components use Inter font</p>
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-medium mb-3 text-text-secondary">Text Styles</h3>
        <div className="space-y-6 bg-bg-secondary p-4 rounded-md">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Heading 1</h1>
            <p className="text-text-secondary text-sm mt-1">text-3xl font-bold</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-text-secondary">Heading 2</h2>
            <p className="text-text-secondary text-sm mt-1">text-xl font-semibold text-text-secondary</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-text-secondary">Heading 3</h3>
            <p className="text-text-secondary text-sm mt-1">text-lg font-medium text-text-secondary</p>
          </div>
          <div>
            <p className="text-[13px] leading-[18px] tracking-[0px] text-text-primary">Title</p>
            <p className="text-text-secondary text-sm mt-1">Inter 13/18px, 0 letter spacing, font-weight: 400 (normal)</p>
          </div>
          <div>
            <p className="text-[13px] leading-[18px] tracking-[0px] font-semibold text-text-primary">Title Bold</p>
            <p className="text-text-secondary text-sm mt-1">Inter 13/18px, 0 letter spacing, font-weight: 600 (semibold)</p>
          </div>
          <div>
            <p className="text-text-primary">Body Text (Primary)</p>
            <p className="text-text-secondary text-sm mt-1">Regular text with text-text-primary</p>
          </div>
          <div>
            <p className="text-text-primary font-semibold tracking-[0px]">Body Text Bold</p>
            <p className="text-text-secondary text-sm mt-1">Semibold (600) text with 0 letter spacing</p>
          </div>
          <div>
            <p className="text-text-secondary">Secondary Text</p>
            <p className="text-text-secondary text-sm mt-1">Regular text with text-text-secondary</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Small Text</p>
            <p className="text-text-secondary text-sm mt-1">text-sm text-text-secondary</p>
          </div>
        </div>
      </section>
    </div>
  );
} 