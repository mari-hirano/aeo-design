"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  showValue?: boolean
  onValueChange?: (value: number[]) => void
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, showValue = false, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className="relative h-1 w-full grow overflow-hidden rounded-full bg-[#343434]"
    >
      <SliderPrimitive.Range className="absolute h-full color-bg-tertiary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="block h-[12px] w-[4px] bg-white rounded-[1px] shadow-[0px_0.5px_1px_0px_rgba(0,0,0,0.8)] hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider } 