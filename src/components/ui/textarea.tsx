import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const textareaVariants = cva(
  'flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        default: 'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 bg-transparent focus-visible:ring-[3px]',
        corporate: 'bg-[var(--corp-bg-deepest)] border-[var(--corp-border-subtle)] text-[var(--corp-text-primary)] placeholder-[var(--corp-text-tertiary)] focus:border-[var(--corp-primary-base)] focus:ring-[3px] focus:ring-[var(--corp-primary-subtle)] resize-vertical',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Textarea({ 
  className, 
  variant,
  ...props 
}: React.ComponentProps<'textarea'> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Textarea }
