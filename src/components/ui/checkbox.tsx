import * as React from "react"
import { cn } from "@/lib/utils"

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={cn(
        "appearance-none h-[12px] w-[12px] rounded-[2px] border border-[rgba(255,255,255,0.19)] bg-[rgba(0,0,0,0.1)]",
        "[box-shadow:0px_16px_16px_-16px_rgba(0,0,0,0.13)_inset,0px_12px_12px_-12px_rgba(0,0,0,0.13)_inset,0px_8px_8px_-8px_rgba(0,0,0,0.17)_inset,0px_4px_4px_-4px_rgba(0,0,0,0.17)_inset,0px_3px_3px_-3px_rgba(0,0,0,0.17)_inset,0px_1px_1px_-1px_rgba(0,0,0,0.13)_inset]",
        "focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-blue-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "checked:bg-blue-500 checked:border-transparent checked:shadow-none",
        "checked:after:content-[''] checked:after:absolute checked:after:top-[2px] checked:after:left-[1px] checked:after:w-[9px] checked:after:h-[5px] checked:after:border-r-0 checked:after:border-t-0 checked:after:border-l-[2px] checked:after:border-b-[2px] checked:after:border-white checked:after:rotate-[-45deg]",
        "relative",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox } 