import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
  {
    variants: {
      status: {
        applied: "bg-primary/10 text-primary ring-primary/20",
        interviewing: "bg-orange-100 text-orange-800 ring-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:ring-orange-800/30",
        offer: "bg-green-100 text-green-800 ring-green-200 dark:bg-green-900/20 dark:text-green-300 dark:ring-green-800/30",
        rejected: "bg-red-100 text-red-800 ring-red-200 dark:bg-red-900/20 dark:text-red-300 dark:ring-red-800/30",
      }
    },
    defaultVariants: {
      status: "applied",
    },
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {}

function StatusBadge({ className, status, ...props }: StatusBadgeProps) {
  return (
    <div
      className={cn(statusBadgeVariants({ status }), className)}
      {...props}
    />
  )
}

export { StatusBadge, statusBadgeVariants }