import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxExample() {
  return (
    <section id="checkbox" className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Checkbox</h2>
      <div className="bg-[var(--bg-secondary)] p-4 rounded-md">
        <div className="space-y-2 max-w-md">
          <label className="flex items-center space-x-2">
            <Checkbox />
            <span className="text-[var(--text-secondary)]">Unchecked</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox defaultChecked />
            <span className="text-[var(--text-secondary)]">Checked</span>
          </label>
        </div>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Binary selection control for multiple choice options</p>
      </div>
    </section>
  );
} 