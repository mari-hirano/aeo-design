import * as React from "react"
import { cn } from "@/lib/utils"

type SwitchProps = React.InputHTMLAttributes<HTMLInputElement>

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(({ className, ...props }, ref) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className={cn(
          "sr-only peer",
          className
        )}
        ref={ref}
        {...props}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
      <span className="ml-3 text-gray-900">{props['aria-label'] || 'Switch'}</span>
    </label>
  )
})
Switch.displayName = "Switch"

export { Switch } 