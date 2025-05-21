import * as React from "react"
import { cn } from "@/lib/utils"

type RadioProps = React.InputHTMLAttributes<HTMLInputElement>

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({ className, ...props }, ref) => {
  return (
    <input
      type="radio"
      className={cn(
        "appearance-none h-[12px] w-[12px] rounded-full border border-[rgba(255,255,255,0.19)] bg-[rgba(0,0,0,0.1)]",
        "[box-shadow:0px_16px_16px_-16px_rgba(0,0,0,0.13)_inset,0px_12px_12px_-12px_rgba(0,0,0,0.13)_inset,0px_8px_8px_-8px_rgba(0,0,0,0.17)_inset,0px_4px_4px_-4px_rgba(0,0,0,0.17)_inset,0px_3px_3px_-3px_rgba(0,0,0,0.17)_inset,0px_1px_1px_-1px_rgba(0,0,0,0.13)_inset]",
        "focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-blue-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "checked:bg-blue-500 checked:border-transparent checked:shadow-none",
        "checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:w-[4px] checked:after:h-[4px] checked:after:rounded-full checked:after:bg-white",
        "relative",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Radio.displayName = "Radio"

export { Radio } 