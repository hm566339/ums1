import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/Card'
import { TrendingUp, TrendingDown } from 'lucide-react'

export function StatsCard({ 
  title, 
  value = 0, 
  unit = '',
  icon: Icon,
  trend = 0,
  description,
  className 
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let start = 0
    const end = parseInt(value) || 0
    if (start === end) return

    const timer = setInterval(() => {
      start += Math.ceil((end - start) / 10)
      if (start >= end) start = end
      setDisplayValue(start)
    }, 50)

    return () => clearInterval(timer)
  }, [value])

  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-foreground">
                {displayValue.toLocaleString()}
              </h3>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-2">
                {description}
              </p>
            )}
            {trend !== 0 && (
              <div className="flex items-center gap-1 mt-2">
                {trend > 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={trend > 0 ? 'text-green-500' : 'text-red-500'} style={{fontSize: '12px'}}>
                  {Math.abs(trend)}% from last month
                </span>
              </div>
            )}
          </div>
          {Icon && (
            <div className="ml-4 p-3 rounded-lg bg-primary/10">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
