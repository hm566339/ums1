import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Bell, X, Check, CheckCheck, Info, AlertTriangle, Settings, Megaphone, Filter } from 'lucide-react'
import { notificationData as initialNotificationData } from '../../data/dummyData'
import { cn } from '../../utils/cn'

export function Notifications() {
  const [notifications, setNotifications] = useState(initialNotificationData)
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const filteredNotifications = notifications.filter(n => {
    const matchesType = !filterType || n.type === filterType
    const matchesStatus = !filterStatus || n.status === filterStatus
    return matchesType && matchesStatus
  })

  const handleDismiss = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, status: 'read' } : n
    ))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, status: 'read' })))
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([])
    }
  }

  const unreadCount = notifications.filter(n => n.status === 'unread').length
  const types = [...new Set(notifications.map(n => n.type))]

  const getTypeIcon = (type) => {
    switch (type) {
      case 'info': return <Info className="w-5 h-5" />
      case 'warning': return <AlertTriangle className="w-5 h-5" />
      case 'announcement': return <Megaphone className="w-5 h-5" />
      case 'system': return <Settings className="w-5 h-5" />
      default: return <Bell className="w-5 h-5" />
    }
  }

  const getTypeStyles = (type) => {
    switch (type) {
      case 'info': return 'bg-info/10 text-info'
      case 'warning': return 'bg-warning/10 text-warning'
      case 'announcement': return 'bg-secondary/10 text-secondary'
      case 'system': return 'bg-muted text-muted-foreground'
      default: return 'bg-primary/10 text-primary'
    }
  }

  const stats = [
    { label: 'Total', value: notifications.length, icon: Bell, color: 'primary' },
    { label: 'Unread', value: unreadCount, icon: Bell, color: 'info', pulse: unreadCount > 0 },
    { label: 'Announcements', value: notifications.filter(n => n.type === 'announcement').length, icon: Megaphone, color: 'secondary' },
    { label: 'Warnings', value: notifications.filter(n => n.type === 'warning').length, icon: AlertTriangle, color: 'warning' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
            <CheckCheck className="w-4 h-4" />
            <span>Mark All Read</span>
          </Button>
          <Button variant="outline" onClick={handleClearAll} disabled={notifications.length === 0}>
            <X className="w-4 h-4" />
            <span>Clear All</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={cn(
                  'flex items-center justify-center w-11 h-11 rounded-xl relative',
                  stat.color === 'primary' && 'bg-primary/10 text-primary',
                  stat.color === 'info' && 'bg-info/10 text-info',
                  stat.color === 'secondary' && 'bg-secondary/10 text-secondary',
                  stat.color === 'warning' && 'bg-warning/10 text-warning'
                )}>
                  <stat.icon className="w-5 h-5" />
                  {stat.pulse && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-info rounded-full animate-pulse-glow" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <Filter className="w-4 h-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium">Type</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterType('')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                    !filterType ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  )}
                >
                  All
                </button>
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize',
                      filterType === type ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium">Status</p>
              <div className="flex gap-2">
                {['', 'unread', 'read'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize',
                      filterStatus === status ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    )}
                  >
                    {status || 'All'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notif) => (
          <Card 
            key={notif.id} 
            className={cn(
              'transition-all',
              notif.status === 'unread' && 'border-primary/30 bg-primary/[0.02]'
            )}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className={cn(
                  'flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl',
                  getTypeStyles(notif.type)
                )}>
                  {getTypeIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={cn(
                          'font-medium',
                          notif.status === 'unread' ? 'text-foreground' : 'text-muted-foreground'
                        )}>{notif.title}</h3>
                        <span className={cn(
                          'inline-flex px-2 py-0.5 rounded-lg text-[10px] font-medium capitalize',
                          getTypeStyles(notif.type)
                        )}>
                          {notif.type}
                        </span>
                        {notif.status === 'unread' && (
                          <span className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notif.timestamp}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {notif.status === 'unread' && (
                        <button
                          onClick={() => handleMarkAsRead(notif.id)}
                          className="p-2 rounded-lg text-muted-foreground hover:text-success hover:bg-success/10 transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDismiss(notif.id)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        title="Dismiss"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">No notifications</h3>
            <p className="text-muted-foreground">
              {notifications.length === 0 
                ? "You're all caught up! No notifications at the moment."
                : "No notifications match your current filters."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
