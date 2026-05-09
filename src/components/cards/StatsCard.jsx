import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/Card'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '../../utils/cn'

export function StatsCard({ 
  title, 
  value = 0, 
  unit = '',
  icon: Icon,
  trend = 0,
  description,
  variant = 'default',
  className 
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let start = 0
    const end = parseInt(value) || 0
    if (start === end) return

    const duration = 800
    const increment = end / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        start = end
        clearInterval(timer)
      }
      setDisplayValue(Math.floor(start))
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  const variants = {
    default: {
      icon: 'bg-primary/10 text-primary',
      trend: trend > 0 ? 'text-success' : 'text-danger'
    },
    success: {
      icon: 'bg-success/10 text-success',
      trend: trend > 0 ? 'text-success' : 'text-danger'
    },
    warning: {
      icon: 'bg-warning/10 text-warning',
      trend: trend > 0 ? 'text-success' : 'text-danger'
    },
    danger: {
      icon: 'bg-danger/10 text-danger',
      trend: trend > 0 ? 'text-success' : 'text-danger'
    },
    info: {
      icon: 'bg-info/10 text-info',
      trend: trend > 0 ? 'text-success' : 'text-danger'
    }
  }

  const currentVariant = variants[variant] || variants.default

  return (
    <Card className={cn('relative overflow-hidden stat-card-gradient', className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <div className="flex items-baseline gap-2 mb-2">
              <h3 className="text-2xl font-bold text-foreground tracking-tight">
                {unit && unit !== 'PKR' ? unit : ''}
                {displayValue.toLocaleString()}
              </h3>
              {unit === 'PKR' && (
                <span className="text-sm font-medium text-muted-foreground">PKR</span>
              )}
            </div>
            
            {description && (
              <p className="text-xs text-muted-foreground mb-2">
                {description}
              </p>
            )}
            
            {trend !== 0 && (
              <div className="flex items-center gap-1.5">
                <div className={cn(
                  'flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-medium',
                  trend > 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                )}>
                  {trend > 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{Math.abs(trend)}%</span>
                </div>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
          
          {Icon && (
            <div className={cn(
              'flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl',
              currentVariant.icon
            )}>
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
