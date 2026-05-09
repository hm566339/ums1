import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/Card'
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react'
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

    const duration = 1000
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
      icon: 'bg-gradient-to-br from-primary to-secondary text-white',
      iconShadow: 'shadow-lg shadow-primary/30',
      accent: 'bg-primary'
    },
    success: {
      icon: 'bg-gradient-to-br from-success to-emerald-400 text-white',
      iconShadow: 'shadow-lg shadow-success/30',
      accent: 'bg-success'
    },
    warning: {
      icon: 'bg-gradient-to-br from-accent to-yellow-300 text-primary',
      iconShadow: 'shadow-lg shadow-accent/40',
      accent: 'bg-accent'
    },
    danger: {
      icon: 'bg-gradient-to-br from-danger to-rose-400 text-white',
      iconShadow: 'shadow-lg shadow-danger/30',
      accent: 'bg-danger'
    },
    info: {
      icon: 'bg-gradient-to-br from-info to-sky-400 text-white',
      iconShadow: 'shadow-lg shadow-info/30',
      accent: 'bg-info'
    }
  }

  const currentVariant = variants[variant] || variants.default

  return (
    <Card className={cn(
      'group relative overflow-hidden hover-lift',
      className
    )}>
      {/* Gold accent top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent to-accent/50" />
      
      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
      
      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {title}
              </p>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
            </div>
            
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-foreground tracking-tight">
                {unit && unit !== 'PKR' ? unit : ''}
                {displayValue.toLocaleString()}
              </h3>
              {unit === 'PKR' && (
                <span className="text-sm font-semibold text-muted-foreground">PKR</span>
              )}
            </div>
            
            {description && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
            
            {trend !== 0 && (
              <div className="flex items-center gap-2 pt-1">
                <div className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold',
                  trend > 0 ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'
                )}>
                  {trend > 0 ? (
                    <TrendingUp className="w-3.5 h-3.5" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5" />
                  )}
                  <span>{Math.abs(trend)}%</span>
                </div>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
          
          {Icon && (
            <div className={cn(
              'flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3',
              currentVariant.icon,
              currentVariant.iconShadow
            )}>
              <Icon className="w-7 h-7" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
