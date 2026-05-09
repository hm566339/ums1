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
  GraduationCap,
  Sparkles
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
        className="fixed top-4 left-4 z-50 md:hidden flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 bottom-0 z-40 flex flex-col transition-all duration-300 ease-in-out md:relative',
          'bg-gradient-to-b from-primary via-primary to-secondary',
          isCollapsed ? 'w-[80px]' : 'w-[280px]',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />
        
        {/* Header / Logo */}
        <div className={cn(
          'relative flex items-center h-20 border-b border-white/10 px-5',
          isCollapsed ? 'justify-center' : 'justify-between'
        )}>
          <div className={cn(
            'flex items-center gap-4 transition-all duration-300',
            isCollapsed && 'justify-center'
          )}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accent/80 shadow-lg shadow-accent/30">
              <GraduationCap className="w-6 h-6 text-primary" />
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-accent" />
              </div>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg tracking-tight">UniManage</span>
                <span className="text-[11px] text-white/60 font-medium">University Portal</span>
              </div>
            )}
          </div>
          
          {/* Collapse button - desktop only */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              'hidden md:flex items-center justify-center w-8 h-8 rounded-xl hover:bg-white/10 transition-all duration-200',
              isCollapsed && 'absolute -right-4 top-7 bg-primary border-2 border-accent shadow-lg'
            )}
          >
            <ChevronLeft className={cn(
              'w-4 h-4 text-white transition-transform duration-300',
              isCollapsed && 'rotate-180'
            )} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="relative flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-8">
            {navigation.map((group) => (
              <div key={group.label}>
                {!isCollapsed && (
                  <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-3 px-4">
                    {group.label}
                  </p>
                )}
                <ul className="space-y-1.5">
                  {group.items.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.path)
                    return (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          onClick={() => setIsMobileOpen(false)}
                          className={cn(
                            'group relative flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300',
                            active
                              ? 'bg-white text-primary shadow-lg shadow-black/10'
                              : 'text-white/80 hover:bg-white/10 hover:text-white',
                            isCollapsed && 'justify-center px-3'
                          )}
                        >
                          {/* Active gold indicator */}
                          {active && !isCollapsed && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-gradient-to-b from-accent via-accent to-accent/70 rounded-r-full shadow-lg shadow-accent/50" />
                          )}
                          
                          <div className={cn(
                            'flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300',
                            active 
                              ? 'bg-gradient-to-br from-accent to-accent/80 text-primary shadow-md shadow-accent/30' 
                              : 'bg-white/10 group-hover:bg-white/20'
                          )}>
                            <Icon className="w-5 h-5" />
                          </div>
                          
                          {!isCollapsed && (
                            <span className="text-sm font-semibold">{item.name}</span>
                          )}
                          
                          {/* Tooltip for collapsed state */}
                          {isCollapsed && (
                            <div className="absolute left-full ml-3 px-3 py-2 bg-primary text-white text-sm font-medium rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl">
                              {item.name}
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-primary rotate-45" />
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
          'relative border-t border-white/10 p-4 space-y-2',
          isCollapsed && 'p-3'
        )}>
          <Link
            to="/settings"
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              'group relative flex items-center gap-4 w-full px-4 py-3 rounded-2xl transition-all duration-300',
              isActive('/settings')
                ? 'bg-white text-primary shadow-lg'
                : 'text-white/80 hover:bg-white/10 hover:text-white',
              isCollapsed && 'justify-center px-3'
            )}
          >
            <div className={cn(
              'flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300',
              isActive('/settings')
                ? 'bg-gradient-to-br from-accent to-accent/80 text-primary'
                : 'bg-white/10 group-hover:bg-white/20'
            )}>
              <Settings className="w-5 h-5" />
            </div>
            {!isCollapsed && <span className="text-sm font-semibold">Settings</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-3 py-2 bg-primary text-white text-sm font-medium rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl">
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
              'group relative flex items-center gap-4 w-full px-4 py-3 rounded-2xl transition-all duration-300 text-white/80 hover:bg-red-500/20 hover:text-red-300',
              isCollapsed && 'justify-center px-3'
            )}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 group-hover:bg-red-500/30 transition-all duration-300">
              <LogOut className="w-5 h-5" />
            </div>
            {!isCollapsed && <span className="text-sm font-semibold">Logout</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-3 py-2 bg-primary text-white text-sm font-medium rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
