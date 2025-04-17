"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { ResizeHandle } from "./ResizeHandle";

interface ResizablePanelGroupProps {
  children: React.ReactNode;
  direction?: "horizontal" | "vertical";
  className?: string;
}

export function ResizablePanelGroup({
  children,
  direction = "horizontal",
  className = "",
}: ResizablePanelGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<number | null>(null);

  const startDragging = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setDragPosition(direction === "horizontal" ? e.clientX : e.clientY);
      e.preventDefault();
    },
    [direction]
  );

  const stopDragging = useCallback(() => {
    setIsDragging(false);
    setDragPosition(null);
  }, []);

  const onDrag = useCallback(
    (e: MouseEvent) => {
      if (isDragging && containerRef.current && dragPosition !== null) {
        // const containerRect = containerRef.current.getBoundingClientRect();
        // const containerSize = direction === "horizontal" ? containerRect.width : containerRect.height;
        const currentPosition =
          direction === "horizontal" ? e.clientX : e.clientY;
        // const delta = currentPosition - dragPosition;

        // Update panel sizes here if needed
        setDragPosition(currentPosition);
      }
    },
    [isDragging, dragPosition, direction]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onDrag);
      window.addEventListener("mouseup", stopDragging);
      document.body.style.userSelect = "none";
      document.body.style.cursor =
        direction === "horizontal" ? "ew-resize" : "ns-resize";
    } else {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }

    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDragging);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isDragging, onDrag, stopDragging, direction]);

  return (
    <div
      ref={containerRef}
      className={`flex ${
        direction === "horizontal" ? "flex-row" : "flex-col"
      } ${className}`}
    >
      {React.Children.map(children, (child, index) => {
        if (index === React.Children.count(children) - 1) {
          return child;
        }
        return (
          <>
            {child}
            <ResizeHandle
              orientation={
                direction === "horizontal" ? "vertical" : "horizontal"
              }
              onMouseDown={startDragging}
            />
          </>
        );
      })}
    </div>
  );
}
