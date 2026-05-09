import React from 'react'
import { cn } from '../../utils/cn'

const variants = {
  default: 'bg-primary/10 text-primary border-primary/20',
  success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  error: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
  info: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  secondary: 'bg-muted text-muted-foreground border-border',
}

const sizes = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm',
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  dot = false,
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span className={cn(
          'w-1.5 h-1.5 rounded-full',
          variant === 'success' && 'bg-emerald-500',
          variant === 'warning' && 'bg-amber-500',
          variant === 'error' && 'bg-red-500',
          variant === 'info' && 'bg-blue-500',
          variant === 'default' && 'bg-primary',
          variant === 'secondary' && 'bg-muted-foreground',
        )} />
      )}
      {children}
    </span>
  )
}

// Quick status badge helper
export function StatusBadge({ status }) {
  const statusConfig = {
    Active: { variant: 'success', label: 'Active' },
    Inactive: { variant: 'secondary', label: 'Inactive' },
    Pending: { variant: 'warning', label: 'Pending' },
    Overdue: { variant: 'error', label: 'Overdue' },
    Paid: { variant: 'success', label: 'Paid' },
    Present: { variant: 'success', label: 'Present' },
    Absent: { variant: 'error', label: 'Absent' },
    Late: { variant: 'warning', label: 'Late' },
    'On Leave': { variant: 'info', label: 'On Leave' },
    Scheduled: { variant: 'info', label: 'Scheduled' },
    Completed: { variant: 'success', label: 'Completed' },
    Cancelled: { variant: 'error', label: 'Cancelled' },
  }

  const config = statusConfig[status] || { variant: 'secondary', label: status }

  return (
    <Badge variant={config.variant} dot>
      {config.label}
    </Badge>
  )
}
