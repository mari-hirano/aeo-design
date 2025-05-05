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
          <div className="absolute inset-y-0 left-1 flex items-center pointer-events-none">
            {icon || (showSearchIcon && <SearchDefaultIcon size={16} style={{ color: 'var(--text-dimmed)' }} />)}
          </div>
        )}
        <input
          className={cn(
            "flex h-6 w-full rounded-[4px] border border-solid px-1 py-0",
            "text-body",
            "color-input-bg border-[var(--input-border)]",
            "focus:outline-none focus-visible:border-[var(--input-border-focus)]",
            "hover:border-input-border-hover",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-input-disabled-bg",
            "placeholder:text-input-placeholder",
            "text-text-primary",
            (icon || showSearchIcon) && "pl-6",
            error && "border-red-border",
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