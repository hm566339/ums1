import React from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { Users, BookOpen, DollarSign, GraduationCap, TrendingUp, Calendar, Clock, Award } from 'lucide-react'
import { StatsCard } from '../../components/cards/StatsCard'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { DataTable } from '../../components/tables/DataTable'
import { dashboardStats, recentActivities, chartData, departmentDistribution } from '../../data/dummyData'

const COLORS = ['#4f46e5', '#06b6d4', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6']

const iconMap = {
  'Users': Users,
  'GraduationCap': GraduationCap,
  'BookOpen': BookOpen,
  'DollarSign': DollarSign,
}

export function Dashboard() {
  const statsWithIcons = dashboardStats.map(stat => ({
    ...stat,
    icon: iconMap[stat.icon] || Users
  }))

  // Format currency
  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`
    }
    return value
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s what&apos;s happening at your university.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart - Student & Faculty Growth */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Growth Trends
            </CardTitle>
            <CardDescription>Student enrollment and revenue over 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="students" stroke="#4f46e5" fill="url(#colorStudents)" strokeWidth={2} />
                <Area type="monotone" dataKey="faculty" stroke="#06b6d4" fill="url(#colorRevenue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart - Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Department Distribution
            </CardTitle>
            <CardDescription>Students by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {departmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {departmentDistribution.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
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
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Revenue Overview
          </CardTitle>
          <CardDescription>Monthly fee collection in PKR</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis 
                stroke="var(--color-muted-foreground)" 
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`PKR ${value.toLocaleString()}`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <DataTable
        title="Recent Activities"
        data={recentActivities}
        columns={[
          { key: 'action', label: 'Action' },
          { key: 'user', label: 'User' },
          { key: 'time', label: 'Time' },
          {
            key: 'type',
            label: 'Type',
            render: (row) => {
              const typeColors = {
                enrollment: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
                submission: 'bg-green-500/10 text-green-700 dark:text-green-400',
                payment: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
                grade: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
                upload: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
                exam: 'bg-red-500/10 text-red-700 dark:text-red-400',
                attendance: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400',
                library: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
              }
              return (
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${typeColors[row.type] || 'bg-primary/10 text-primary'}`}>
                  {row.type.charAt(0).toUpperCase() + row.type.slice(1)}
                </span>
              )
            }
          }
        ]}
      />
    </div>
  )
}
