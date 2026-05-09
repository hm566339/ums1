import React from 'react'
import { cn } from '../../utils/cn'

export const Input = React.forwardRef(
  ({ className, type = 'text', error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-xl border bg-input px-3.5 py-2',
          'text-sm text-foreground placeholder:text-muted-foreground',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
          error 
            ? 'border-danger focus:ring-danger/20 focus:border-danger' 
            : 'border-border',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

// Textarea variant
export const Textarea = React.forwardRef(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-[100px] w-full rounded-xl border bg-input px-3.5 py-3',
          'text-sm text-foreground placeholder:text-muted-foreground',
          'transition-all duration-200 resize-none',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
          error 
            ? 'border-danger focus:ring-danger/20 focus:border-danger' 
            : 'border-border',
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

// Select component
export const Select = React.forwardRef(
  ({ className, children, error, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-xl border bg-input px-3.5 py-2',
          'text-sm text-foreground',
          'transition-all duration-200 cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
          error 
            ? 'border-danger focus:ring-danger/20 focus:border-danger' 
            : 'border-border',
          className
        )}
        {...props}
      >
        {children}
      </select>
    )
  }
)

Select.displayName = 'Select'
