import * as React from "react"
import { cn } from "@/lib/utils"

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-6 w-full rounded-[4px] border border-solid px-2 py-0",
        "font-sans text-body leading-body tracking-body",
        "bg-[rgba(0,0,0,0.22)] border-[rgba(255,255,255,0.16)]",
        "focus:outline-none focus:border-[#0073E6]",
        "hover:border-[rgba(255,255,255,0.19)]",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-[#1e1e1e]",
        "text-white appearance-none",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Select.displayName = "Select"

export { Select } 