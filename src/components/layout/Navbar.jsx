import React, { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Bell, Sun, Moon, Search, ChevronDown, Command, Settings, LogOut, User, X, Clock, Sparkles } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../utils/cn'

const pageTitles = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/students': 'Students',
  '/faculty': 'Faculty',
  '/courses': 'Courses',
  '/attendance': 'Attendance',
  '/exams': 'Examinations',
  '/fees': 'Fee Management',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
  '/policies': 'Policies',
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const notifRef = useRef(null)
  const userRef = useRef(null)

  const notifications = [
    { id: 1, message: 'New student enrollment request', time: '5 min ago', unread: true, type: 'enrollment' },
    { id: 2, message: 'Assignment submission deadline today', time: '1 hour ago', unread: true, type: 'exam' },
    { id: 3, message: 'Fee payment received - STU045', time: '2 hours ago', unread: false, type: 'payment' },
    { id: 4, message: 'Faculty meeting scheduled', time: '3 hours ago', unread: false, type: 'faculty' },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  const getNotificationIcon = (type) => {
    const icons = {
      enrollment: '🎓',
      payment: '💰',
      exam: '📝',
      faculty: '👨‍🏫',
    }
    return icons[type] || '📢'
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentPageTitle = pageTitles[location.pathname] || 'Dashboard'

  return (
    <nav className="sticky top-0 z-30">
      {/* Glass morphism navbar */}
      <div className="glass border-b border-border/50 shadow-subtle">
        <div className="flex items-center justify-between h-20 px-4 md:px-6">
          {/* Left side - Page title and breadcrumb */}
          <div className="flex items-center gap-4 ml-12 md:ml-0">
            <div>
              <h1 className="text-xl font-bold text-foreground">{currentPageTitle}</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className={cn(
              'relative w-full transition-all duration-300',
              searchFocused && 'scale-[1.02]'
            )}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search students, courses, faculty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={cn(
                  'w-full pl-12 pr-20 py-3.5 rounded-2xl bg-card border-2 border-border text-foreground text-sm placeholder:text-muted-foreground transition-all duration-300',
                  'focus:outline-none focus:border-accent focus:shadow-lg focus:shadow-accent/10'
                )}
              />
              {searchQuery ? (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-muted hover:bg-border flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              ) : (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-muted border border-border text-xs text-muted-foreground font-medium">
                  <Command className="w-3 h-3" />
                  <span>K</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Button */}
            <button className="md:hidden flex items-center justify-center w-11 h-11 rounded-2xl bg-muted hover:bg-border transition-colors text-muted-foreground">
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-muted hover:bg-border transition-all duration-300 text-muted-foreground hover:text-foreground group"
            >
              <Sun className={cn(
                'w-5 h-5 absolute transition-all duration-300',
                theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100 text-accent'
              )} />
              <Moon className={cn(
                'w-5 h-5 absolute transition-all duration-300',
                theme === 'dark' ? 'opacity-100 rotate-0 scale-100 text-accent' : 'opacity-0 -rotate-90 scale-0'
              )} />
            </button>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={cn(
                  'relative flex items-center justify-center w-11 h-11 rounded-2xl transition-all duration-300',
                  'bg-muted hover:bg-border',
                  showNotifications && 'bg-primary/10 text-primary'
                )}
              >
                <Bell className={cn('w-5 h-5', showNotifications ? 'text-primary' : 'text-muted-foreground')} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[22px] h-[22px] px-1 text-xs font-bold text-primary bg-accent rounded-full shadow-lg shadow-accent/40 animate-pulse-glow">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute top-full right-0 mt-3 w-[380px] bg-card border border-border rounded-2xl shadow-floating overflow-hidden animate-scaleIn origin-top-right">
                  <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Bell className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-bold text-foreground">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 text-xs font-bold text-primary bg-accent rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-primary font-semibold cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={cn(
                          'flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border last:border-0',
                          notif.unread && 'bg-primary/5'
                        )}
                      >
                        <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-accent/20 flex items-center justify-center text-xl">
                          {getNotificationIcon(notif.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={cn(
                              'text-sm',
                              notif.unread ? 'font-semibold text-foreground' : 'text-muted-foreground'
                            )}>{notif.message}</p>
                            {notif.unread && (
                              <div className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0 mt-1" />
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {notif.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border bg-muted/50">
                    <Link
                      to="/notifications"
                      onClick={() => setShowNotifications(false)}
                      className="flex items-center justify-center w-full py-2.5 text-sm font-semibold text-primary hover:bg-primary/10 rounded-xl transition-colors"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-10 bg-border mx-2" />

            {/* User Menu */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={cn(
                  'flex items-center gap-3 p-2 pr-4 rounded-2xl transition-all duration-300',
                  'hover:bg-muted',
                  showUserMenu && 'bg-muted'
                )}
              >
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/25">
                    AD
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-success border-2 border-card" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-foreground">Admin User</p>
                  <p className="text-xs text-muted-foreground">Super Admin</p>
                </div>
                <ChevronDown className={cn(
                  'w-4 h-4 text-muted-foreground transition-transform duration-300 hidden sm:block',
                  showUserMenu && 'rotate-180'
                )} />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-3 w-72 bg-card border border-border rounded-2xl shadow-floating overflow-hidden animate-scaleIn origin-top-right">
                  <div className="p-5 border-b border-border bg-gradient-to-br from-primary/5 to-secondary/5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/25">
                        AD
                      </div>
                      <div>
                        <p className="font-bold text-foreground">Admin User</p>
                        <p className="text-sm text-muted-foreground">admin@university.edu</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Sparkles className="w-3 h-3 text-accent" />
                          <span className="text-xs font-semibold text-accent">Super Admin</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Link
                      to="/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                      My Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                        <Settings className="w-4 h-4 text-muted-foreground" />
                      </div>
                      Settings
                    </Link>
                  </div>
                  <div className="p-2 border-t border-border">
                    <button 
                      onClick={() => {
                        localStorage.removeItem('isAuthenticated')
                        localStorage.removeItem('currentUser')
                        window.location.href = '/login'
                      }}
                      className="flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium text-danger hover:bg-danger/10 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-danger/10 flex items-center justify-center">
                        <LogOut className="w-4 h-4 text-danger" />
                      </div>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
