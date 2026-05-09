import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Bell, X, Check, CheckCheck, Info, AlertTriangle, Settings, Megaphone, Filter } from 'lucide-react'
import { notificationData as initialNotificationData } from '../../data/dummyData'

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
      case 'info': return <Info className="w-5 h-5 text-blue-500" />
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'announcement': return <Megaphone className="w-5 h-5 text-purple-500" />
      case 'system': return <Settings className="w-5 h-5 text-gray-500" />
      default: return <Bell className="w-5 h-5 text-primary" />
    }
  }

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'info': return 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
      case 'warning': return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
      case 'announcement': return 'bg-purple-500/10 text-purple-700 dark:text-purple-400'
      case 'system': return 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
      default: return 'bg-primary/10 text-primary'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline" onClick={handleClearAll} disabled={notifications.length === 0}>
            <X className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-3xl font-bold text-foreground mt-1">{notifications.length}</p>
              </div>
              <Bell className="w-8 h-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unread</p>
                <p className="text-3xl font-bold text-blue-500 mt-1">{unreadCount}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Announcements</p>
                <p className="text-3xl font-bold text-purple-500 mt-1">
                  {notifications.filter(n => n.type === 'announcement').length}
                </p>
              </div>
              <Megaphone className="w-8 h-8 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-3xl font-bold text-yellow-500 mt-1">
                  {notifications.filter(n => n.type === 'warning').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Filter className="w-4 h-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Type</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterType('')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    !filterType ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  All
                </button>
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors capitalize ${
                      filterType === type ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Status</p>
              <div className="flex gap-2">
                {['', 'unread', 'read'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors capitalize ${
                      filterStatus === status ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
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
            className={`transition-all ${notif.status === 'unread' ? 'border-primary/50 bg-primary/5' : ''}`}
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getTypeIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{notif.title}</h3>
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getTypeBadgeClass(notif.type)}`}>
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
                          className="p-1.5 rounded-lg text-green-500 hover:bg-green-500/10 transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDismiss(notif.id)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
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
          <CardContent className="pt-12 pb-12 text-center">
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
