import React from 'react';

export function PopoverExample() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-medium mb-2">Popover</h2>
      <p className="mb-4 text-sm text-[var(--text-secondary)]">Floating content that appears relative to a trigger element</p>
      
      <div className="p-8 bg-[var(--bg-secondary)] rounded-lg flex items-center justify-center py-16">
        <p className="text-[var(--text-secondary)] font-medium">Coming soon</p>
      </div>
    </section>
  );
} 