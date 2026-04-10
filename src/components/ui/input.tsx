import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-md border-none bg-surface-container-low px-4 py-2 text-on-surface transition-all duration-200 placeholder:text-on-surface-variant/60 focus:bg-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-sans",
        className
      )}
      {...props}
    />
  )
}

export { Input }
