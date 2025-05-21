import * as React from "react"
import { cn } from "@/lib/utils"

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  sizeVariant?: "compact" | "comfort";
  hideLabel?: boolean;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, sizeVariant = "compact", hideLabel = false, ...props }, ref) => {
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
        <div 
          className={cn(
            "relative bg-[rgba(255,255,255,0.13)] border border-[rgba(255,255,255,0.19)] rounded-full peer",
            "peer-checked:bg-blue-500 peer-checked:border-transparent transition-all duration-200",
            "peer-focus:outline-none peer-focus:ring-0",
            {
              "w-[24px] h-[16px]": sizeVariant === "compact",
              "w-[32px] h-[20px]": sizeVariant === "comfort"
            },
            "after:content-[''] after:absolute after:bg-white after:rounded-full after:transition-all",
            "after:h-[12px] after:w-[12px]",
            {
              "after:left-[1px] after:top-[1px] peer-checked:after:translate-x-[8px]": sizeVariant === "compact",
              "after:left-[3px] after:top-[3px] peer-checked:after:translate-x-[14px]": sizeVariant === "comfort"
            }
          )}
        ></div>
        {!hideLabel && <span className={cn("ml-2 body-text text-[var(--text-secondary)]")}>{props['aria-label'] || 'Switch'}</span>}
      </label>
    )
  }
)
Switch.displayName = "Switch"

export { Switch } 