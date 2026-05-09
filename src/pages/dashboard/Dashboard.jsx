import React from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Users, BookOpen, DollarSign, GraduationCap, TrendingUp, Calendar, ArrowUpRight, ArrowRight, Sparkles, Award } from 'lucide-react'
import { StatsCard } from '../../components/cards/StatsCard'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { dashboardStats, recentActivities, chartData, departmentDistribution } from '../../data/dummyData'
import { cn } from '../../utils/cn'

const COLORS = ['#112D5C', '#19376D', '#FFC107', '#22C55E', '#3B82F6', '#EF4444']

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
  { label: 'Add Student', icon: GraduationCap, path: '/students' },
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
        <div className="bg-card border border-border rounded-2xl p-4 shadow-floating">
          <p className="text-sm font-bold text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="font-medium">{entry.name}:</span> 
              <span className="font-bold text-foreground">{entry.name === 'revenue' ? `PKR ${entry.value.toLocaleString()}` : entry.value}</span>
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8 animate-page-in">
      {/* Welcome Hero Section */}
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-primary via-secondary to-primary p-8 text-white">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-4 right-4 w-32 h-32 pattern-dots opacity-20" />
        
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-accent shadow-lg shadow-accent/30">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-sm">
                University Admin Portal
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold">Welcome back, Admin</h1>
            <p className="text-white/70 max-w-md text-lg">
              Here&apos;s what&apos;s happening at your university today. Manage students, faculty, and more.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <Button variant="accent" size="lg">
              <Award className="w-5 h-5" />
              <span>View Reports</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsWithIcons.map((stat, idx) => (
          <div key={idx} className={cn('animate-slideUp', `stagger-${idx + 1}`)}>
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="text-sm font-bold text-foreground">Quick Actions</span>
                <p className="text-xs text-muted-foreground">Frequently used operations</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {quickActions.map((action, idx) => (
                <Button key={idx} variant="outline" size="sm">
                  <action.icon className="w-4 h-4" />
                  <span>{action.label}</span>
                </Button>
              ))}
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
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle>Growth Trends</CardTitle>
                  <CardDescription className="mt-1">Student enrollment and faculty growth</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <span>Details</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#112D5C" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#112D5C" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFaculty" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFC107" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FFC107" stopOpacity={0}/>
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
                  stroke="#112D5C" 
                  fill="url(#colorStudents)" 
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 8, fill: '#112D5C', stroke: '#fff', strokeWidth: 3 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="faculty" 
                  stroke="#FFC107" 
                  fill="url(#colorFaculty)" 
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 8, fill: '#FFC107', stroke: '#fff', strokeWidth: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="flex items-center justify-center gap-8 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-primary shadow-md shadow-primary/30" />
                <span className="text-sm font-medium text-muted-foreground">Students</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-accent shadow-md shadow-accent/30" />
                <span className="text-sm font-medium text-muted-foreground">Faculty</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart - Department Distribution */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-yellow-300 shadow-lg shadow-accent/30">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>Departments</CardTitle>
                <CardDescription>Students by department</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
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
                        <div className="bg-card border border-border rounded-2xl p-3 shadow-floating">
                          <p className="text-sm font-bold text-foreground">{payload[0].name}</p>
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
            <div className="grid grid-cols-2 gap-3 mt-4">
              {departmentDistribution.slice(0, 6).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-medium text-muted-foreground truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-success to-emerald-400 shadow-lg shadow-success/20">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription className="mt-1">Monthly fee collection in PKR</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">Monthly</Button>
              <Button variant="outline" size="sm">Quarterly</Button>
              <Button variant="outline" size="sm">Yearly</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} barSize={48}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#112D5C" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#19376D" stopOpacity={0.8}/>
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
                tickFormatter={formatCurrency}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card border border-border rounded-2xl p-4 shadow-floating">
                        <p className="text-sm font-bold text-foreground mb-2">{label}</p>
                        <p className="text-xs text-muted-foreground">
                          Revenue: <span className="font-bold text-foreground">PKR {payload[0].value.toLocaleString()}</span>
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar 
                dataKey="revenue" 
                fill="url(#barGradient)" 
                radius={[8, 8, 0, 0]}
                className="hover:opacity-90 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-info to-sky-400 shadow-lg shadow-info/20">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest actions and updates across the system</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.slice(0, 8).map((activity, idx) => {
              const typeStyles = {
                enrollment: 'bg-info/10 text-info border-info/20',
                submission: 'bg-success/10 text-success border-success/20',
                payment: 'bg-accent/10 text-accent border-accent/20',
                grade: 'bg-secondary/10 text-secondary border-secondary/20',
                upload: 'bg-primary/10 text-primary border-primary/20',
                exam: 'bg-danger/10 text-danger border-danger/20',
                attendance: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
                library: 'bg-muted text-muted-foreground border-border',
              }
              
              return (
                <div 
                  key={activity.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 hover:bg-muted/60 transition-colors border border-transparent hover:border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'flex items-center justify-center w-12 h-12 rounded-2xl text-lg font-bold border',
                      typeStyles[activity.type] || 'bg-muted text-muted-foreground border-border'
                    )}>
                      {activity.action.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      'inline-flex px-3 py-1.5 rounded-full text-xs font-bold capitalize border',
                      typeStyles[activity.type] || 'bg-muted text-muted-foreground border-border'
                    )}>
                      {activity.type}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{activity.time}</span>
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
