import React from 'react'
import { cn } from '../../utils/cn'

export const Button = React.forwardRef(
  (
    {
      children,
      className,
      variant = 'default',
      size = 'md',
      isLoading = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center font-medium transition-all duration-200',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'active:scale-[0.98]'
    )

    const variants = {
      default: cn(
        'bg-primary text-primary-foreground',
        'hover:bg-primary/90',
        'shadow-sm shadow-primary/20',
        'hover:shadow-md hover:shadow-primary/25'
      ),
      secondary: cn(
        'bg-secondary text-secondary-foreground',
        'hover:bg-secondary/90',
        'shadow-sm shadow-secondary/20'
      ),
      outline: cn(
        'border border-border bg-transparent',
        'text-foreground',
        'hover:bg-muted hover:border-muted-foreground/20'
      ),
      ghost: cn(
        'bg-transparent',
        'text-foreground',
        'hover:bg-muted'
      ),
      destructive: cn(
        'bg-danger text-white',
        'hover:bg-danger/90',
        'shadow-sm shadow-danger/20'
      ),
      success: cn(
        'bg-success text-white',
        'hover:bg-success/90',
        'shadow-sm shadow-success/20'
      ),
      link: cn(
        'bg-transparent text-primary underline-offset-4',
        'hover:underline'
      ),
    }

    const sizes = {
      xs: 'px-2.5 py-1 text-xs rounded-lg gap-1',
      sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
      md: 'px-4 py-2 text-sm rounded-xl gap-2',
      lg: 'px-5 py-2.5 text-base rounded-xl gap-2',
      xl: 'px-6 py-3 text-base rounded-2xl gap-2.5',
      icon: 'p-2 rounded-xl',
      'icon-sm': 'p-1.5 rounded-lg',
      'icon-lg': 'p-3 rounded-xl',
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg 
              className="animate-spin h-4 w-4" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
