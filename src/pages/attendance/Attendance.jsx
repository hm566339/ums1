import React, { useState } from 'react'
import { Calendar, Download, CheckCircle, XCircle, Clock, Filter } from 'lucide-react'
import { DataTable } from '../../components/tables/DataTable'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Modal } from '../../components/ui/Modal'
import { Label } from '../../components/ui/Label'
import { attendanceData as initialAttendanceData, courseData, studentData } from '../../data/dummyData'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { cn } from '../../utils/cn'

export function Attendance() {
  const [attendance, setAttendance] = useState(initialAttendanceData)
  const [isMarkModalOpen, setIsMarkModalOpen] = useState(false)
  const [filterDate, setFilterDate] = useState('')
  const [filterCourse, setFilterCourse] = useState('')
  const [markingData, setMarkingData] = useState({
    course: '',
    date: new Date().toISOString().split('T')[0],
    students: []
  })

  // Filter attendance
  const filteredAttendance = attendance.filter(a => {
    const matchesDate = !filterDate || a.date === filterDate
    const matchesCourse = !filterCourse || a.courseCode === filterCourse
    return matchesDate && matchesCourse
  })

  // Stats
  const presentCount = attendance.filter(a => a.status === 'Present').length
  const absentCount = attendance.filter(a => a.status === 'Absent').length
  const lateCount = attendance.filter(a => a.status === 'Late').length
  const totalRecords = attendance.length

  const pieData = [
    { name: 'Present', value: presentCount, color: '#22C55E' },
    { name: 'Absent', value: absentCount, color: '#EF4444' },
    { name: 'Late', value: lateCount, color: '#F59E0B' },
  ]

  const courses = [...new Set(attendance.map(a => a.courseCode))]

  const stats = [
    { label: 'Total Records', value: totalRecords, icon: Calendar, color: 'primary' },
    { label: 'Present', value: presentCount, icon: CheckCircle, color: 'success' },
    { label: 'Absent', value: absentCount, icon: XCircle, color: 'danger' },
    { label: 'Late', value: lateCount, icon: Clock, color: 'warning' },
  ]

  const handleMarkAttendance = () => {
    const courseStudents = studentData.slice(0, 10).map(s => ({
      ...s,
      attendanceStatus: 'Present'
    }))
    setMarkingData({
      course: '',
      date: new Date().toISOString().split('T')[0],
      students: courseStudents
    })
    setIsMarkModalOpen(true)
  }

  const handleStudentStatusChange = (studentId, status) => {
    setMarkingData(prev => ({
      ...prev,
      students: prev.students.map(s => 
        s.id === studentId ? { ...s, attendanceStatus: status } : s
      )
    }))
  }

  const handleSubmitAttendance = (e) => {
    e.preventDefault()
    const newRecords = markingData.students.map((s, idx) => ({
      id: attendance.length + idx + 1,
      studentName: s.name,
      studentId: s.id,
      courseCode: markingData.course,
      date: markingData.date,
      status: s.attendanceStatus
    }))
    setAttendance([...newRecords, ...attendance])
    setIsMarkModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage student attendance records</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
          <Button onClick={handleMarkAttendance}>
            <CheckCircle className="w-4 h-4" />
            <span>Mark Attendance</span>
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
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={cn(
                  'flex items-center justify-center w-11 h-11 rounded-xl',
                  stat.color === 'primary' && 'bg-primary/10 text-primary',
                  stat.color === 'success' && 'bg-success/10 text-success',
                  stat.color === 'danger' && 'bg-danger/10 text-danger',
                  stat.color === 'warning' && 'bg-warning/10 text-warning'
                )}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Attendance Overview</CardTitle>
            <CardDescription>Distribution of attendance status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
                          <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
                          <p className="text-xs text-muted-foreground">{payload[0].value} records</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {pieData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Filter className="w-4 h-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="filterDate">Date</Label>
                <input
                  id="filterDate"
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="flex h-10 w-full rounded-xl border border-border bg-input px-3.5 py-2 text-sm text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filterCourse">Course</Label>
                <select
                  id="filterCourse"
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="flex h-10 w-full rounded-xl border border-border bg-input px-3.5 py-2 text-sm text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">All Courses</option>
                  {courses.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            {(filterDate || filterCourse) && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-4"
                onClick={() => { setFilterDate(''); setFilterCourse(''); }}
              >
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <DataTable
        title={`Attendance Records (${filteredAttendance.length})`}
        data={filteredAttendance}
        searchableColumns={['studentName', 'courseCode', 'studentId']}
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
          { key: 'courseCode', label: 'Course' },
          { key: 'date', label: 'Date' },
          { key: 'status', label: 'Status' },
        ]}
      />

      {/* Mark Attendance Modal */}
      <Modal
        isOpen={isMarkModalOpen}
        onClose={() => setIsMarkModalOpen(false)}
        title="Mark Attendance"
        size="2xl"
      >
        <form onSubmit={handleSubmitAttendance} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="markCourse">Course</Label>
              <select
                id="markCourse"
                value={markingData.course}
                onChange={(e) => setMarkingData({ ...markingData, course: e.target.value })}
                className="flex h-10 w-full rounded-xl border border-border bg-input px-3.5 py-2 text-sm text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              >
                <option value="">Select Course</option>
                {courseData.map(c => (
                  <option key={c.id} value={c.code}>{c.code} - {c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="markDate">Date</Label>
              <input
                id="markDate"
                type="date"
                value={markingData.date}
                onChange={(e) => setMarkingData({ ...markingData, date: e.target.value })}
                className="flex h-10 w-full rounded-xl border border-border bg-input px-3.5 py-2 text-sm text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Student ID</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {markingData.students.map((student) => (
                  <tr key={student.id} className="border-t border-border">
                    <td className="py-3 px-4 text-sm text-foreground">{student.id}</td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{student.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {['Present', 'Absent', 'Late'].map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => handleStudentStatusChange(student.id, status)}
                            className={cn(
                              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                              student.attendanceStatus === status
                                ? status === 'Present' ? 'bg-success text-white shadow-sm'
                                : status === 'Absent' ? 'bg-danger text-white shadow-sm'
                                : 'bg-warning text-white shadow-sm'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            )}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={() => setIsMarkModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Submit Attendance
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
