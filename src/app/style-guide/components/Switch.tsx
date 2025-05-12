import { Switch } from "@/components/ui/switch";

export function SwitchExample() {
  return (
    <section id="switch" className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Switch</h2>
      <div className="bg-[var(--bg-secondary)] p-4 rounded-md">
        <div className="space-y-4 max-w-md">
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-secondary)]">Disabled</span>
            <Switch aria-label="Disabled" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-secondary)]">Enabled</span>
            <Switch aria-label="Enabled" defaultChecked />
          </div>
        </div>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">Toggle control for binary settings with on/off states</p>
      </div>
    </section>
  );
} 