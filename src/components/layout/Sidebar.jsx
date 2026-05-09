import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ClipboardList, 
  BarChart3,
  FileText,
  DollarSign,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ScrollText
} from 'lucide-react'
import { cn } from '../../utils/cn'

const navigation = [
  { 
    label: 'Main', 
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ] 
  },
  { 
    label: 'Management', 
    items: [
      { name: 'Students', path: '/students', icon: Users },
      { name: 'Faculty', path: '/faculty', icon: Users },
      { name: 'Courses', path: '/courses', icon: BookOpen },
    ] 
  },
  { 
    label: 'Operations', 
    items: [
      { name: 'Attendance', path: '/attendance', icon: ClipboardList },
      { name: 'Exams', path: '/exams', icon: BarChart3 },
      { name: 'Fees', path: '/fees', icon: DollarSign },
    ] 
  },
  { 
    label: 'Communication', 
    items: [
      { name: 'Notifications', path: '/notifications', icon: Bell },
    ] 
  },
  { 
    label: 'Resources', 
    items: [
      { name: 'Policies', path: '/policies', icon: ScrollText },
    ] 
  },
  { 
    label: 'User', 
    items: [
      { name: 'Settings', path: '/settings', icon: Settings },
    ] 
  },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 rounded-lg bg-primary text-primary-foreground"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 bottom-0 z-40 bg-background border-r border-border transition-all duration-300 md:relative md:translate-x-0',
          isOpen ? 'w-64' : 'w-20',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          {isOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">UMS</span>
              </div>
              <span className="font-bold text-foreground">UMS</span>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-muted rounded-lg transition-colors hidden md:block"
          >
            <ChevronRight className={cn('w-4 h-4 transition-transform', !isOpen && 'rotate-180')} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {navigation.map((group) => (
            <div key={group.label}>
              {isOpen && (
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                  {group.label}
                </p>
              )}
              <ul className="space-y-2">
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200',
                          isActive(item.path)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-muted'
                        )}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {isOpen && (
                          <span className="text-sm font-medium">{item.name}</span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4 space-y-2">
          <button className={cn(
            'flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-muted transition-colors text-foreground',
          )}>
            <Settings className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Settings</span>}
          </button>
          <button className={cn(
            'flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors',
          )}>
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
