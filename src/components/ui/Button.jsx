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
      'inline-flex items-center justify-center font-semibold transition-all duration-300',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'active:scale-[0.97]'
    )

    const variants = {
      default: cn(
        'bg-gradient-to-r from-primary to-secondary text-white',
        'hover:from-primary/90 hover:to-secondary/90',
        'shadow-md shadow-primary/25',
        'hover:shadow-lg hover:shadow-primary/30',
        'hover:-translate-y-0.5'
      ),
      accent: cn(
        'bg-gradient-to-r from-accent to-yellow-400 text-primary font-bold',
        'hover:from-accent/90 hover:to-yellow-400/90',
        'shadow-md shadow-accent/30',
        'hover:shadow-lg hover:shadow-accent/40',
        'hover:-translate-y-0.5'
      ),
      secondary: cn(
        'bg-secondary text-white',
        'hover:bg-secondary/90',
        'shadow-sm shadow-secondary/20'
      ),
      outline: cn(
        'border-2 border-primary bg-transparent',
        'text-primary font-semibold',
        'hover:bg-primary hover:text-white',
        'hover:-translate-y-0.5'
      ),
      'outline-accent': cn(
        'border-2 border-accent bg-transparent',
        'text-accent font-semibold',
        'hover:bg-accent hover:text-primary'
      ),
      ghost: cn(
        'bg-transparent',
        'text-foreground',
        'hover:bg-muted'
      ),
      destructive: cn(
        'bg-gradient-to-r from-danger to-rose-500 text-white',
        'hover:from-danger/90 hover:to-rose-500/90',
        'shadow-md shadow-danger/25',
        'hover:shadow-lg hover:shadow-danger/30'
      ),
      success: cn(
        'bg-gradient-to-r from-success to-emerald-400 text-white',
        'hover:from-success/90 hover:to-emerald-400/90',
        'shadow-md shadow-success/25'
      ),
      link: cn(
        'bg-transparent text-primary underline-offset-4',
        'hover:underline'
      ),
    }

    const sizes = {
      xs: 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
      sm: 'px-4 py-2 text-sm rounded-xl gap-2',
      md: 'px-5 py-2.5 text-sm rounded-2xl gap-2',
      lg: 'px-6 py-3 text-base rounded-2xl gap-2.5',
      xl: 'px-8 py-4 text-base rounded-full gap-3',
      icon: 'p-2.5 rounded-xl',
      'icon-sm': 'p-2 rounded-xl',
      'icon-lg': 'p-3.5 rounded-2xl',
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
