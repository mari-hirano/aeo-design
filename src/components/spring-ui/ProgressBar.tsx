"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Size variants for bar height
const barHeightVariants = {
  xSmall: "h-[2px]",
  Small: "h-[4px]",
  Med: "h-[8px]",
  Large: "h-[12px]",
};

// Internal ProgressBarBar component
interface ProgressBarBarProps {
  fill: number; // 0-1 range
  size: "xSmall" | "Small" | "Med" | "Large";
  className?: string;
}

function ProgressBarBar({ fill, size, className = "" }: ProgressBarBarProps) {
  const fillPercentage = Math.min(Math.max(fill * 100, 0), 100);
  const rightPercentage = 100 - fillPercentage;
  const heightClass = barHeightVariants[size];

  return (
    <div className={cn("relative w-full grow rounded-full bg-[rgba(0,0,0,0.15)]", heightClass, className)}>
      <div
        className="absolute bottom-0 left-0 top-0 rounded-full"
        style={{
          right: `${rightPercentage}%`,
          backgroundColor: 'var(--blue-chart, #007df0)'
        }}
      />
    </div>
  );
}

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xSmall" | "Small" | "Med" | "Large";
  hasStepCount?: boolean;
  steps?: string;
  stepCount?: number;
  denominator?: number;
  fillPercentage?: number; // 0-1 range (0 = 0%, 1 = 100%)
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({
    className,
    size = "xSmall",
    hasStepCount = false,
    steps,
    stepCount,
    denominator,
    fillPercentage,
    ...props
  }, ref) => {
    // Calculate fill: use fillPercentage if provided, otherwise calculate from stepCount/denominator
    let fill = 0;

    if (fillPercentage !== undefined) {
      fill = Math.min(Math.max(fillPercentage, 0), 1);
    } else if (stepCount !== undefined && denominator !== undefined && denominator > 0) {
      fill = Math.min(Math.max(stepCount / denominator, 0), 1);
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        <ProgressBarBar fill={fill} size={size} />
        {hasStepCount && steps && (
          <div className="flex flex-col justify-center leading-[0] relative shrink-0 body-text text-[11.5px] leading-[16px] tracking-[-0.115px] text-[var(--text-primary)] whitespace-nowrap">
            <p>{steps}</p>
          </div>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
