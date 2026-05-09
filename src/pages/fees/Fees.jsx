import React, { useState } from 'react'
import { DollarSign, CreditCard, AlertCircle, CheckCircle, Download, Eye, Filter } from 'lucide-react'
import { DataTable } from '../../components/tables/DataTable'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Modal } from '../../components/ui/Modal'
import { feeData as initialFeeData } from '../../data/dummyData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { cn } from '../../utils/cn'

export function Fees() {
  const [fees, setFees] = useState(initialFeeData)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedFee, setSelectedFee] = useState(null)
  const [filterStatus, setFilterStatus] = useState('')

  const filteredFees = filterStatus 
    ? fees.filter(f => f.status === filterStatus)
    : fees

  // Calculate stats
  const totalFees = fees.reduce((sum, f) => sum + f.totalFee, 0)
  const totalPaid = fees.reduce((sum, f) => sum + f.paid, 0)
  const totalBalance = fees.reduce((sum, f) => sum + f.balance, 0)
  const paidCount = fees.filter(f => f.status === 'Paid').length
  const pendingCount = fees.filter(f => f.status === 'Pending').length
  const overdueCount = fees.filter(f => f.status === 'Overdue').length

  // Chart data
  const statusData = [
    { name: 'Paid', value: paidCount, color: '#22C55E' },
    { name: 'Pending', value: pendingCount, color: '#F59E0B' },
    { name: 'Overdue', value: overdueCount, color: '#EF4444' },
  ]

  const collectionData = [
    { month: 'Jan', collected: 1850000, pending: 450000 },
    { month: 'Feb', collected: 2100000, pending: 380000 },
    { month: 'Mar', collected: 1950000, pending: 520000 },
    { month: 'Apr', collected: 2250000, pending: 290000 },
    { month: 'May', collected: 2400000, pending: 350000 },
    { month: 'Jun', collected: totalPaid, pending: totalBalance },
  ]

  const formatCurrency = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
    return value
  }

  const stats = [
    { label: 'Total Fees', value: `PKR ${formatCurrency(totalFees)}`, icon: DollarSign, color: 'primary' },
    { label: 'Collected', value: `PKR ${formatCurrency(totalPaid)}`, icon: CheckCircle, color: 'success' },
    { label: 'Outstanding', value: `PKR ${formatCurrency(totalBalance)}`, icon: AlertCircle, color: 'danger' },
    { label: 'Collection Rate', value: `${((totalPaid / totalFees) * 100).toFixed(1)}%`, icon: CreditCard, color: 'info' },
  ]

  const handleViewFee = (fee) => {
    setSelectedFee(fee)
    setIsViewModalOpen(true)
  }

  const handleMarkAsPaid = (feeId) => {
    if (window.confirm('Mark this fee as fully paid?')) {
      setFees(fees.map(f => 
        f.id === feeId 
          ? { ...f, paid: f.totalFee, balance: 0, status: 'Paid', paidDate: new Date().toISOString().split('T')[0] }
          : f
      ))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fee Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage student fee payments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </Button>
          <Button>
            <CreditCard className="w-4 h-4" />
            <span>Record Payment</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={cn(
                  'flex items-center justify-center w-11 h-11 rounded-xl',
                  stat.color === 'primary' && 'bg-primary/10 text-primary',
                  stat.color === 'success' && 'bg-success/10 text-success',
                  stat.color === 'danger' && 'bg-danger/10 text-danger',
                  stat.color === 'info' && 'bg-info/10 text-info'
                )}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Collection Trends</CardTitle>
            <CardDescription>Monthly fee collection overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={collectionData} barSize={20}>
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
                          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
                          {payload.map((entry, index) => (
                            <p key={index} className="text-xs text-muted-foreground">
                              <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                              {entry.name}: PKR {entry.value.toLocaleString()}
                            </p>
                          ))}
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="collected" name="Collected" fill="#22C55E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm text-muted-foreground">Collected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-sm text-muted-foreground">Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment Status</CardTitle>
            <CardDescription>Distribution by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
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
            <div className="flex justify-center gap-4 mt-4">
              {statusData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter:</span>
        </div>
        <div className="flex gap-2">
          {['', 'Paid', 'Pending', 'Overdue'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                filterStatus === status
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {status || 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <DataTable
        title={`Fee Records (${filteredFees.length})`}
        data={filteredFees}
        searchableColumns={['studentName', 'studentId']}
        columns={[
          { key: 'studentId', label: 'Student ID' },
          { 
            key: 'studentName', 
            label: 'Student Name',
            render: (row) => (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-medium">
                  {row.studentName.charAt(0)}
                </div>
                <span className="font-medium">{row.studentName}</span>
              </div>
            )
          },
          { key: 'semester', label: 'Semester' },
          { 
            key: 'totalFee', 
            label: 'Total Fee',
            render: (row) => <span className="font-medium">PKR {row.totalFee.toLocaleString()}</span>
          },
          { 
            key: 'paid', 
            label: 'Paid',
            render: (row) => <span className="text-success font-medium">PKR {row.paid.toLocaleString()}</span>
          },
          { 
            key: 'balance', 
            label: 'Balance',
            render: (row) => (
              <span className={cn('font-medium', row.balance > 0 ? 'text-danger' : 'text-success')}>
                PKR {row.balance.toLocaleString()}
              </span>
            )
          },
          { key: 'status', label: 'Status' },
        ]}
        actions={(fee) => (
          <>
            <button
              onClick={() => handleViewFee(fee)}
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            {fee.status !== 'Paid' && (
              <button
                onClick={() => handleMarkAsPaid(fee.id)}
                className="p-2 rounded-lg text-muted-foreground hover:text-success hover:bg-success/10 transition-colors"
                title="Mark as Paid"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            )}
          </>
        )}
      />

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Fee Details"
        size="lg"
      >
        {selectedFee && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-primary/20">
                  {selectedFee.studentName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{selectedFee.studentName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedFee.studentId} - Semester {selectedFee.semester}</p>
                </div>
              </div>
              <span className={cn(
                'inline-flex px-3 py-1.5 rounded-xl text-sm font-medium',
                selectedFee.status === 'Paid' ? 'bg-success/10 text-success' :
                selectedFee.status === 'Pending' ? 'bg-warning/10 text-warning' :
                'bg-danger/10 text-danger'
              )}>
                {selectedFee.status}
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Fee Breakdown</h4>
              <div className="space-y-2">
                {[
                  { label: 'Tuition Fee', value: selectedFee.tuitionFee },
                  { label: 'Lab Fee', value: selectedFee.labFee },
                  { label: 'Library Fee', value: selectedFee.libraryFee },
                  { label: 'Exam Fee', value: selectedFee.examFee },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-foreground">PKR {item.value?.toLocaleString() || 'N/A'}</span>
                  </div>
                ))}
                <div className="flex justify-between py-2 border-b border-border font-semibold">
                  <span className="text-foreground">Total Fee</span>
                  <span className="text-foreground">PKR {selectedFee.totalFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-success">Amount Paid</span>
                  <span className="text-success font-medium">PKR {selectedFee.paid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 font-semibold">
                  <span className={selectedFee.balance > 0 ? 'text-danger' : 'text-success'}>Balance Due</span>
                  <span className={selectedFee.balance > 0 ? 'text-danger' : 'text-success'}>
                    PKR {selectedFee.balance.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground">Due Date</p>
                <p className="text-sm font-medium text-foreground mt-0.5">{selectedFee.dueDate}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground">Payment Date</p>
                <p className="text-sm font-medium text-foreground mt-0.5">{selectedFee.paidDate || 'Not Paid'}</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50 col-span-2">
                <p className="text-xs text-muted-foreground">Payment Method</p>
                <p className="text-sm font-medium text-foreground mt-0.5">{selectedFee.paymentMethod || 'N/A'}</p>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
              {selectedFee.status !== 'Paid' && (
                <Button onClick={() => {
                  handleMarkAsPaid(selectedFee.id)
                  setIsViewModalOpen(false)
                }}>
                  Mark as Paid
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
