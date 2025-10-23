import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        default: 'dark:bg-input/30 border-input bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        corporate: 'bg-[var(--corp-bg-deepest)] border-[var(--corp-border-subtle)] text-[var(--corp-text-primary)] placeholder-[var(--corp-text-tertiary)] focus:border-[var(--corp-primary-base)] focus:ring-[3px] focus:ring-[var(--corp-primary-subtle)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Input({ 
  className, 
  type,
  variant,
  ...props 
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Input }
