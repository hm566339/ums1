import React, { useState } from 'react'
import { DollarSign, CreditCard, AlertCircle, CheckCircle, Download, Eye, Filter } from 'lucide-react'
import { DataTable } from '../../components/tables/DataTable'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Modal } from '../../components/ui/Modal'
import { feeData as initialFeeData } from '../../data/dummyData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

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
    { name: 'Paid', value: paidCount, color: '#10b981' },
    { name: 'Pending', value: pendingCount, color: '#f59e0b' },
    { name: 'Overdue', value: overdueCount, color: '#ef4444' },
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
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`
    }
    return value
  }

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fee Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage student fee payments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="md">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button size="md">
            <CreditCard className="w-4 h-4 mr-2" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Fees</p>
                <p className="text-2xl font-bold text-foreground mt-1">PKR {formatCurrency(totalFees)}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Collected</p>
                <p className="text-2xl font-bold text-green-500 mt-1">PKR {formatCurrency(totalPaid)}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <p className="text-2xl font-bold text-red-500 mt-1">PKR {formatCurrency(totalBalance)}</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Collection Rate</p>
                <p className="text-2xl font-bold text-primary mt-1">{((totalPaid / totalFees) * 100).toFixed(1)}%</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Collection Trends</CardTitle>
            <CardDescription>Monthly fee collection overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={collectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickFormatter={formatCurrency} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`PKR ${value.toLocaleString()}`, '']}
                />
                <Bar dataKey="collected" name="Collected" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
            <CardDescription>Distribution by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {statusData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
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
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
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
          { key: 'studentName', label: 'Student Name' },
          { key: 'semester', label: 'Semester' },
          { 
            key: 'totalFee', 
            label: 'Total Fee',
            render: (row) => <span>PKR {row.totalFee.toLocaleString()}</span>
          },
          { 
            key: 'paid', 
            label: 'Paid',
            render: (row) => <span className="text-green-600">PKR {row.paid.toLocaleString()}</span>
          },
          { 
            key: 'balance', 
            label: 'Balance',
            render: (row) => (
              <span className={row.balance > 0 ? 'text-red-500' : 'text-green-500'}>
                PKR {row.balance.toLocaleString()}
              </span>
            )
          },
          { key: 'status', label: 'Status' },
        ]}
        actions={(fee) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleViewFee(fee)}
              className="p-1 rounded-lg text-primary hover:bg-primary/10 transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            {fee.status !== 'Paid' && (
              <button
                onClick={() => handleMarkAsPaid(fee.id)}
                className="p-1 rounded-lg text-green-500 hover:bg-green-500/10 transition-colors"
                title="Mark as Paid"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            )}
          </div>
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
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
              <div>
                <h3 className="text-lg font-bold text-foreground">{selectedFee.studentName}</h3>
                <p className="text-sm text-muted-foreground">{selectedFee.studentId} - Semester {selectedFee.semester}</p>
              </div>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                selectedFee.status === 'Paid' ? 'bg-green-500/10 text-green-700 dark:text-green-400' :
                selectedFee.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400' :
                'bg-red-500/10 text-red-700 dark:text-red-400'
              }`}>
                {selectedFee.status}
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Fee Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Tuition Fee</span>
                  <span className="font-medium text-foreground">PKR {selectedFee.tuitionFee?.toLocaleString() || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Lab Fee</span>
                  <span className="font-medium text-foreground">PKR {selectedFee.labFee?.toLocaleString() || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Library Fee</span>
                  <span className="font-medium text-foreground">PKR {selectedFee.libraryFee?.toLocaleString() || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Exam Fee</span>
                  <span className="font-medium text-foreground">PKR {selectedFee.examFee?.toLocaleString() || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border font-semibold">
                  <span className="text-foreground">Total Fee</span>
                  <span className="text-foreground">PKR {selectedFee.totalFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-green-600">Amount Paid</span>
                  <span className="text-green-600 font-medium">PKR {selectedFee.paid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 font-semibold">
                  <span className={selectedFee.balance > 0 ? 'text-red-500' : 'text-green-500'}>Balance Due</span>
                  <span className={selectedFee.balance > 0 ? 'text-red-500' : 'text-green-500'}>
                    PKR {selectedFee.balance.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Due Date</p>
                <p className="text-sm font-medium text-foreground">{selectedFee.dueDate}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Payment Date</p>
                <p className="text-sm font-medium text-foreground">{selectedFee.paidDate || 'Not Paid'}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted col-span-2">
                <p className="text-xs text-muted-foreground">Payment Method</p>
                <p className="text-sm font-medium text-foreground">{selectedFee.paymentMethod || 'N/A'}</p>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
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
