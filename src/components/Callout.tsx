import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '#/lib/utils'

const calloutVariants = cva(
  'rounded-2xl border font-medium',
  {
    variants: {
      intent: {
        info: 'border-sky-200 bg-sky-50 text-sky-950',
        success: 'border-emerald-200 bg-emerald-50 text-emerald-950',
        warning: 'border-amber-200 bg-amber-50 text-amber-950',
        danger: 'border-red-200 bg-red-50 text-red-950',
      },
      size: {
        sm: 'px-3 py-2 text-xs',
        md: 'px-4 py-3 text-sm',
        lg: 'px-5 py-4 text-base',
      },
    },
    defaultVariants: {
      intent: 'info',
      size: 'md',
    },
  },
)

export function Callout({
  className,
  intent,
  size,
  ...props
}: ComponentProps<'div'> & VariantProps<typeof calloutVariants>) {
  return (
    <div
      data-slot="callout"
      className={cn(calloutVariants({ intent, size }), className)}
      {...props}
    />
  )
}

export { calloutVariants }
