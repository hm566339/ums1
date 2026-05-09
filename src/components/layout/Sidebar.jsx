import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ClipboardList, 
  BarChart3,
  DollarSign,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  X,
  ScrollText,
  GraduationCap
} from 'lucide-react'
import { cn } from '../../utils/cn'

const navigation = [
  { 
    label: 'Overview', 
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ] 
  },
  { 
    label: 'Management', 
    items: [
      { name: 'Students', path: '/students', icon: GraduationCap },
      { name: 'Faculty', path: '/faculty', icon: Users },
      { name: 'Courses', path: '/courses', icon: BookOpen },
    ] 
  },
  { 
    label: 'Operations', 
    items: [
      { name: 'Attendance', path: '/attendance', icon: ClipboardList },
      { name: 'Examinations', path: '/exams', icon: BarChart3 },
      { name: 'Fee Management', path: '/fees', icon: DollarSign },
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
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white shadow-lg shadow-primary/20"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out md:relative',
          isCollapsed ? 'w-[72px]' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Header / Logo */}
        <div className={cn(
          'flex items-center h-16 border-b border-sidebar-border px-4',
          isCollapsed ? 'justify-center' : 'justify-between'
        )}>
          <div className={cn(
            'flex items-center gap-3 transition-all duration-200',
            isCollapsed && 'justify-center'
          )}>
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-semibold text-sidebar-foreground text-sm">UniManage</span>
                <span className="text-[10px] text-muted-foreground">Admin Portal</span>
              </div>
            )}
          </div>
          
          {/* Collapse button - desktop only */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              'hidden md:flex items-center justify-center w-7 h-7 rounded-lg hover:bg-sidebar-accent transition-colors',
              isCollapsed && 'absolute -right-3 top-6 bg-sidebar border border-sidebar-border shadow-sm'
            )}
          >
            <ChevronLeft className={cn(
              'w-4 h-4 text-muted-foreground transition-transform duration-200',
              isCollapsed && 'rotate-180'
            )} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-6">
            {navigation.map((group) => (
              <div key={group.label}>
                {!isCollapsed && (
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                    {group.label}
                  </p>
                )}
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.path)
                    return (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          onClick={() => setIsMobileOpen(false)}
                          className={cn(
                            'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                            active
                              ? 'bg-primary text-white shadow-md shadow-primary/20'
                              : 'text-sidebar-foreground hover:bg-sidebar-accent',
                            isCollapsed && 'justify-center px-2'
                          )}
                        >
                          {/* Active indicator */}
                          {active && !isCollapsed && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full" />
                          )}
                          
                          <Icon className={cn(
                            'w-5 h-5 flex-shrink-0 transition-transform duration-200',
                            !active && 'group-hover:scale-110'
                          )} />
                          
                          {!isCollapsed && (
                            <span className="text-sm font-medium">{item.name}</span>
                          )}
                          
                          {/* Tooltip for collapsed state */}
                          {isCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                              {item.name}
                            </div>
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className={cn(
          'border-t border-sidebar-border p-3 space-y-1',
          isCollapsed && 'p-2'
        )}>
          <Link
            to="/settings"
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              'group relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-200',
              isActive('/settings')
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'text-sidebar-foreground hover:bg-sidebar-accent',
              isCollapsed && 'justify-center px-2'
            )}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                Settings
              </div>
            )}
          </Link>
          
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('isAuthenticated')
                localStorage.removeItem('currentUser')
                window.location.href = '/login'
              }
            }}
            className={cn(
              'group relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-200 text-danger hover:bg-danger/10',
              isCollapsed && 'justify-center px-2'
            )}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
