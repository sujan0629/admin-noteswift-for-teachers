import * as React from "react"
import { cn } from "@/lib/utils"

export const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0",
      className
    )}
    style={{
      clip: "rect(0, 0, 0, 0)",
    }}
    {...props}
  />
))

VisuallyHidden.displayName = "VisuallyHidden"
