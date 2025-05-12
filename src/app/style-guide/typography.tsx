import React from "react";

export function TypographySection() {
  return (
    <div className="space-y-8">

      <section>
        <div className="space-y-6 bg-[var(--bg-secondary)] p-4 rounded-md">
          <div>
            <p className="title-text">Title</p>
            <p className="text-[var(--text-secondary)] text-sm mt-1">title-text</p>
          </div>
          <div>
            <p className="title-text-bold">Title Bold</p>
            <p className="text-[var(--text-secondary)] text-sm mt-1">title-text-bold</p>
          </div>
          <div>
            <p className="body-text">Body Text (Primary)</p>
            <p className="text-[var(--text-secondary)] text-sm mt-1">body-text</p>
          </div>
          <div>
            <p className="body-text-bold">Body Text Bold</p>
            <p className="text-[var(--text-secondary)] text-sm mt-1">body-text-bold</p>
          </div>
          <div>
            <p className="small-text">Small Text</p>
            <p className="text-[var(--text-secondary)] text-sm mt-1">small-text</p>
          </div>
          <div>
            <p className="code-text">Code Text (Monospace)</p>
            <p className="text-[var(--text-secondary)] text-sm mt-1">code-text</p>
          </div>
        </div>
      </section>
    </div>
  );
} 