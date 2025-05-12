import { Radio } from "@/components/ui/radio";

export function RadioExample() {
  return (
    <section id="radio" className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Radio</h2>
      <div className="bg-[var(--bg-secondary)] p-4 rounded-md">
        <div className="flex flex-col space-y-2 max-w-md">
          <label className="flex items-center space-x-2">
            <Radio name="radio-group" defaultChecked />
            <span className="text-[var(--text-secondary)]">Radio 1</span>
          </label>
          <label className="flex items-center space-x-2">
            <Radio name="radio-group" />
            <span className="text-[var(--text-secondary)]">Radio 2</span>
          </label>
          <label className="flex items-center space-x-2">
            <Radio name="radio-group" />
            <span className="text-[var(--text-secondary)]">Radio 3</span>
          </label>
        </div>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Single selection control for mutually exclusive options</p>
      </div>
    </section>
  );
} 