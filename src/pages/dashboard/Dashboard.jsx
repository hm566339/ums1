import React from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Users, BookOpen, DollarSign, GraduationCap, TrendingUp, Calendar, ArrowUpRight, ArrowRight } from 'lucide-react'
import { StatsCard } from '../../components/cards/StatsCard'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { dashboardStats, recentActivities, chartData, departmentDistribution } from '../../data/dummyData'
import { cn } from '../../utils/cn'

const COLORS = ['#4F46E5', '#7C3AED', '#06B6D4', '#F59E0B', '#10B981', '#EF4444']

const iconMap = {
  'Users': Users,
  'GraduationCap': GraduationCap,
  'BookOpen': BookOpen,
  'DollarSign': DollarSign,
}

const variantMap = {
  'Users': 'default',
  'GraduationCap': 'info',
  'BookOpen': 'success',
  'DollarSign': 'warning',
}

// Quick actions data
const quickActions = [
  { label: 'Add Student', icon: Users, path: '/students' },
  { label: 'New Course', icon: BookOpen, path: '/courses' },
  { label: 'Record Fee', icon: DollarSign, path: '/fees' },
  { label: 'View Reports', icon: TrendingUp, path: '/exams' },
]

export function Dashboard() {
  const statsWithIcons = dashboardStats.map(stat => ({
    ...stat,
    icon: iconMap[stat.icon] || Users,
    variant: variantMap[stat.icon] || 'default'
  }))

  // Format currency for charts
  const formatCurrency = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
    return value
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-xl p-3 shadow-floating">
          <p className="text-sm font-medium text-foreground mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs text-muted-foreground">
              <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
              {entry.name}: {entry.name === 'revenue' ? `PKR ${entry.value.toLocaleString()}` : entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Admin</h1>
          <p className="text-muted-foreground mt-1">Here&apos;s what&apos;s happening at your university today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <Button>
            <span>View Reports</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsWithIcons.map((stat, idx) => (
          <StatsCard
            key={idx}
            {...stat}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Quick Actions:</span>
              <div className="flex items-center gap-2">
                {quickActions.map((action, idx) => (
                  <Button key={idx} variant="outline" size="sm">
                    <action.icon className="w-4 h-4" />
                    <span>{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart - Growth Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  Growth Trends
                </CardTitle>
                <CardDescription className="mt-1">Student enrollment and faculty growth over 6 months</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <span>Details</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFaculty" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="students" 
                  stroke="#4F46E5" 
                  fill="url(#colorStudents)" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: '#4F46E5', stroke: '#fff', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="faculty" 
                  stroke="#7C3AED" 
                  fill="url(#colorFaculty)" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: '#7C3AED', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Students</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <span className="text-sm text-muted-foreground">Faculty</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart - Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/10">
                <GraduationCap className="w-4 h-4 text-secondary" />
              </div>
              Departments
            </CardTitle>
            <CardDescription>Students by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {departmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
                          <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
                          <p className="text-xs text-muted-foreground">{payload[0].value} students</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {departmentDistribution.slice(0, 6).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-warning/10">
                  <DollarSign className="w-4 h-4 text-warning" />
                </div>
                Revenue Overview
              </CardTitle>
              <CardDescription className="mt-1">Monthly fee collection in PKR</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">Monthly</Button>
              <Button variant="outline" size="sm">Quarterly</Button>
              <Button variant="outline" size="sm">Yearly</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)" 
                fontSize={12}
                tickFormatter={formatCurrency}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card border border-border rounded-xl p-3 shadow-floating">
                        <p className="text-sm font-medium text-foreground mb-1">{label}</p>
                        <p className="text-xs text-muted-foreground">
                          Revenue: <span className="font-medium text-foreground">PKR {payload[0].value.toLocaleString()}</span>
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar 
                dataKey="revenue" 
                fill="#4F46E5" 
                radius={[6, 6, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest actions and updates across the system</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.slice(0, 8).map((activity, idx) => {
              const typeStyles = {
                enrollment: 'bg-info/10 text-info',
                submission: 'bg-success/10 text-success',
                payment: 'bg-warning/10 text-warning',
                grade: 'bg-secondary/10 text-secondary',
                upload: 'bg-primary/10 text-primary',
                exam: 'bg-danger/10 text-danger',
                attendance: 'bg-accent/10 text-accent',
                library: 'bg-muted text-muted-foreground',
              }
              
              return (
                <div 
                  key={activity.id}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-xl transition-colors hover:bg-muted/50',
                    idx !== recentActivities.slice(0, 8).length - 1 && 'border-b border-border pb-4'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-xl text-sm font-medium',
                      typeStyles[activity.type] || 'bg-muted text-muted-foreground'
                    )}>
                      {activity.action.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'inline-flex px-2.5 py-1 rounded-lg text-xs font-medium capitalize',
                      typeStyles[activity.type] || 'bg-muted text-muted-foreground'
                    )}>
                      {activity.type}
                    </span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
