import React from 'react'
import { cn } from '../../utils/cn'
import { FileX, Search, Users, BookOpen, Calendar, Bell } from 'lucide-react'
import { Button } from './Button'

const iconMap = {
  default: FileX,
  search: Search,
  users: Users,
  courses: BookOpen,
  calendar: Calendar,
  notifications: Bell,
}

export function EmptyState({
  icon = 'default',
  title = 'No data found',
  description = 'There are no items to display at this time.',
  action,
  actionLabel = 'Add New',
  onAction,
  className,
}) {
  const Icon = iconMap[icon] || FileX

  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-16 px-4 text-center',
      className
    )}>
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      {action || (onAction && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      ))}
    </div>
  )
}
