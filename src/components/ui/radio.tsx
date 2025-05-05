import * as React from "react"
import { cn } from "@/lib/utils"

type RadioProps = React.InputHTMLAttributes<HTMLInputElement>

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({ className, ...props }, ref) => {
  return (
    <input
      type="radio"
      className={cn(
        "h-4 w-4 rounded-full border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Radio.displayName = "Radio"

export { Radio } 