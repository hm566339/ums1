import React, { useState } from 'react'
import { Calendar, Filter, Download, CheckCircle, XCircle, Clock } from 'lucide-react'
import { DataTable } from '../../components/tables/DataTable'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Modal } from '../../components/ui/Modal'
import { Label } from '../../components/ui/Label'
import { attendanceData as initialAttendanceData, courseData, studentData } from '../../data/dummyData'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

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
    { name: 'Present', value: presentCount, color: '#10b981' },
    { name: 'Absent', value: absentCount, color: '#ef4444' },
    { name: 'Late', value: lateCount, color: '#f59e0b' },
  ]

  const courses = [...new Set(attendance.map(a => a.courseCode))]

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage student attendance records</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="md">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="md" onClick={handleMarkAttendance}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-3xl font-bold text-foreground mt-1">{totalRecords}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="text-3xl font-bold text-green-500 mt-1">{presentCount}</p>
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
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="text-3xl font-bold text-red-500 mt-1">{absentCount}</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Late</p>
                <p className="text-3xl font-bold text-yellow-500 mt-1">{lateCount}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/10">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Distribution of attendance status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {pieData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="filterDate">Date</Label>
                <input
                  id="filterDate"
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full h-10 rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground mt-1"
                />
              </div>
              <div>
                <Label htmlFor="filterCourse">Course</Label>
                <select
                  id="filterCourse"
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="w-full h-10 rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground mt-1"
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
          { key: 'studentName', label: 'Student Name' },
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
        size="xl"
      >
        <form onSubmit={handleSubmitAttendance} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="markCourse">Course</Label>
              <select
                id="markCourse"
                value={markingData.course}
                onChange={(e) => setMarkingData({ ...markingData, course: e.target.value })}
                className="w-full h-10 rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                required
              >
                <option value="">Select Course</option>
                {courseData.map(c => (
                  <option key={c.id} value={c.code}>{c.code} - {c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="markDate">Date</Label>
              <input
                id="markDate"
                type="date"
                value={markingData.date}
                onChange={(e) => setMarkingData({ ...markingData, date: e.target.value })}
                className="w-full h-10 rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                required
              />
            </div>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Student ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {markingData.students.map((student) => (
                  <tr key={student.id} className="border-t border-border">
                    <td className="py-3 px-4 text-sm text-foreground">{student.id}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{student.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {['Present', 'Absent', 'Late'].map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => handleStudentStatusChange(student.id, status)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              student.attendanceStatus === status
                                ? status === 'Present' ? 'bg-green-500 text-white'
                                : status === 'Absent' ? 'bg-red-500 text-white'
                                : 'bg-yellow-500 text-white'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
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

          <div className="flex gap-2 justify-end pt-4">
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
