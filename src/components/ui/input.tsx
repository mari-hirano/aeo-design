import * as React from "react"
import { cn } from "@/lib/utils"
import { SearchDefaultIcon } from "@/icons/SearchDefaultIcon"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
  showSearchIcon?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon, showSearchIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {(icon || showSearchIcon) && (
          <div className="absolute inset-y-0 flex items-center pointer-events-none [.theme-designer_&]:left-1 [.theme-dashboard_&]:left-2">
            {icon || (showSearchIcon && <SearchDefaultIcon size={16} style={{ color: 'var(--text-dimmed)' }} />)}
          </div>
        )}
        <input
          className={cn(
            "flex w-full rounded-[4px] border border-solid py-0",
            "body-text",
            "bg-[var(--input-bg)] border-[var(--input-border)]",
            "focus:outline-none focus-visible:border-[var(--input-border-focus)]",
            "hover:border-[var(--input-border-hover)]",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-[var(--input-disabled-bg)]",
            "placeholder:text-[var(--input-placeholder)]",
            "text-[var(--text-primary)]",
            "[.theme-designer_&]:h-6 [.theme-dashboard_&]:h-8",
            "[.theme-designer_&]:px-1 [.theme-dashboard_&]:px-2",
            (icon || showSearchIcon) && "[.theme-designer_&]:pl-6 [.theme-dashboard_&]:pl-8",
            error && "border-[var(--input-border-error)]",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input } 