import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Bell, Sun, Moon, Search, ChevronDown, Command, Settings, LogOut, User } from 'lucide-react'
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
  const location = useLocation()
  const notifRef = useRef(null)
  const userRef = useRef(null)

  const notifications = [
    { id: 1, message: 'New student enrollment request', time: '5 min ago', unread: true },
    { id: 2, message: 'Assignment submission deadline today', time: '1 hour ago', unread: true },
    { id: 3, message: 'Fee payment received - STU045', time: '2 hours ago', unread: false },
    { id: 4, message: 'Faculty meeting scheduled', time: '3 hours ago', unread: false },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

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
    <nav className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left side - Page title and breadcrumb */}
        <div className="flex items-center gap-4 ml-12 md:ml-0">
          <div>
            <h1 className="text-lg font-semibold text-foreground">{currentPageTitle}</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Center - Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className={cn(
            'relative w-full transition-all duration-200',
            searchFocused && 'scale-[1.02]'
          )}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search anything..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={cn(
                'w-full pl-10 pr-12 py-2.5 rounded-xl bg-muted border border-transparent text-foreground text-sm placeholder:text-muted-foreground transition-all duration-200',
                'focus:outline-none focus:border-primary/30 focus:bg-background focus:shadow-lg focus:shadow-primary/5'
              )}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-background border border-border text-[10px] text-muted-foreground">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Button */}
          <button className="md:hidden p-2.5 rounded-xl hover:bg-muted transition-colors text-muted-foreground">
            <Search className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl hover:bg-muted transition-all duration-200 text-muted-foreground hover:text-foreground"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl hover:bg-muted transition-all duration-200 text-muted-foreground hover:text-foreground"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex items-center justify-center w-4 h-4 text-[10px] font-medium bg-danger text-white rounded-full animate-pulse-glow">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-2xl shadow-floating overflow-hidden animate-scale-in">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={cn(
                        'flex items-start gap-3 p-4 hover:bg-muted transition-colors cursor-pointer border-b border-border last:border-0',
                        notif.unread && 'bg-primary/5'
                      )}
                    >
                      <div className={cn(
                        'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                        notif.unread ? 'bg-primary' : 'bg-transparent'
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          'text-sm',
                          notif.unread ? 'font-medium text-foreground' : 'text-muted-foreground'
                        )}>{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <button className="w-full py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-border mx-1" />

          {/* User Menu */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-muted transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-primary/20">
                A
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-foreground">Admin</p>
                <p className="text-[10px] text-muted-foreground">Administrator</p>
              </div>
              <ChevronDown className={cn(
                'w-4 h-4 text-muted-foreground transition-transform duration-200 hidden sm:block',
                showUserMenu && 'rotate-180'
              )} />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-2xl shadow-floating overflow-hidden animate-scale-in">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold shadow-lg shadow-primary/20">
                      A
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Admin User</p>
                      <p className="text-xs text-muted-foreground">admin@university.edu</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-foreground hover:bg-muted rounded-xl transition-colors">
                    <User className="w-4 h-4 text-muted-foreground" />
                    Profile
                  </button>
                  <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-foreground hover:bg-muted rounded-xl transition-colors">
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    Settings
                  </button>
                  <div className="my-1 border-t border-border" />
                  <button 
                    onClick={() => {
                      localStorage.removeItem('isAuthenticated')
                      localStorage.removeItem('currentUser')
                      window.location.href = '/login'
                    }}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-danger hover:bg-danger/10 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
