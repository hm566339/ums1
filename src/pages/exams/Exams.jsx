import React, { useState } from 'react'
import { Plus, Edit, Trash2, Calendar, Clock, MapPin, Users, FileText, Grid3X3, List } from 'lucide-react'
import { DataTable } from '../../components/tables/DataTable'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Label } from '../../components/ui/Label'
import { examData as initialExamData, courseData } from '../../data/dummyData'
import { cn } from '../../utils/cn'

export function Exams() {
  const [exams, setExams] = useState(initialExamData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedExam, setSelectedExam] = useState(null)
  const [filterStatus, setFilterStatus] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    date: '',
    time: '',
    duration: '',
    room: '',
    totalMarks: 100,
    passingMarks: 50,
  })

  const filteredExams = filterStatus 
    ? exams.filter(e => e.status === filterStatus)
    : exams

  // Stats
  const scheduledExams = exams.filter(e => e.status === 'Scheduled').length
  const completedExams = exams.filter(e => e.status === 'Completed').length
  const upcomingExams = exams.filter(e => e.status === 'Upcoming').length

  const stats = [
    { label: 'Total Exams', value: exams.length, icon: FileText, color: 'primary' },
    { label: 'Scheduled', value: scheduledExams, icon: Calendar, color: 'info' },
    { label: 'Upcoming', value: upcomingExams, icon: Clock, color: 'warning' },
    { label: 'Completed', value: completedExams, icon: FileText, color: 'success' },
  ]

  const handleAddExam = () => {
    setSelectedExam(null)
    setFormData({
      title: '',
      course: '',
      date: '',
      time: '',
      duration: '',
      room: '',
      totalMarks: 100,
      passingMarks: 50,
    })
    setIsModalOpen(true)
  }

  const handleEditExam = (exam) => {
    setSelectedExam(exam)
    setFormData({
      title: exam.title,
      course: exam.course,
      date: exam.date,
      time: exam.time,
      duration: exam.duration,
      room: exam.room,
      totalMarks: exam.totalMarks,
      passingMarks: exam.passingMarks,
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const courseInfo = courseData.find(c => c.code === formData.course)
    
    if (selectedExam) {
      setExams(exams.map(ex =>
        ex.id === selectedExam.id ? { 
          ...ex, 
          ...formData,
          courseName: courseInfo?.name || formData.course,
          totalStudents: courseInfo?.students || 0,
        } : ex
      ))
    } else {
      const newExam = {
        id: `EX${String(exams.length + 1).padStart(3, '0')}`,
        ...formData,
        courseName: courseInfo?.name || formData.course,
        totalStudents: courseInfo?.students || 0,
        status: 'Scheduled'
      }
      setExams([...exams, newExam])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter(e => e.id !== id))
    }
  }

  const getStatusStyles = (status) => {
    switch(status) {
      case 'Scheduled': return 'bg-info/10 text-info'
      case 'Upcoming': return 'bg-warning/10 text-warning'
      case 'Completed': return 'bg-success/10 text-success'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Examination Management</h1>
          <p className="text-muted-foreground mt-1">Schedule and manage exams across all departments</p>
        </div>
        <Button onClick={handleAddExam}>
          <Plus className="w-4 h-4" />
          <span>Schedule Exam</span>
        </Button>
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
                  stat.color === 'info' && 'bg-info/10 text-info',
                  stat.color === 'warning' && 'bg-warning/10 text-warning',
                  stat.color === 'success' && 'bg-success/10 text-success'
                )}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {['', 'Scheduled', 'Upcoming', 'Completed'].map((status) => (
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
        <div className="flex items-center gap-1 p-1 bg-muted rounded-xl">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'p-2 rounded-lg transition-colors',
              viewMode === 'grid' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'p-2 rounded-lg transition-colors',
              viewMode === 'list' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Exam Cards Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExams.map((exam) => (
            <Card key={exam.id} hover>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className={cn(
                      'inline-flex px-2.5 py-1 rounded-lg text-xs font-medium mb-2',
                      getStatusStyles(exam.status)
                    )}>
                      {exam.status}
                    </span>
                    <CardTitle className="text-base">{exam.title}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEditExam(exam)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-info hover:bg-info/10 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(exam.id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    <span className="truncate">{exam.course} - {exam.courseName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{exam.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{exam.time} ({exam.duration})</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{exam.room}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{exam.totalStudents} students</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Total: {exam.totalMarks} marks</span>
                    <span>Passing: {exam.passingMarks} marks</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <DataTable
          title={`Exam Schedule (${filteredExams.length})`}
          data={filteredExams}
          searchableColumns={['title', 'course', 'courseName']}
          columns={[
            { key: 'title', label: 'Exam Title' },
            { 
              key: 'course', 
              label: 'Course',
              render: (row) => (
                <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary">
                  {row.course}
                </span>
              )
            },
            { key: 'date', label: 'Date' },
            { key: 'time', label: 'Time' },
            { key: 'room', label: 'Room' },
            { key: 'totalStudents', label: 'Students' },
            { key: 'status', label: 'Status' },
          ]}
          actions={(exam) => (
            <>
              <button
                onClick={() => handleEditExam(exam)}
                className="p-2 rounded-lg text-muted-foreground hover:text-info hover:bg-info/10 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(exam.id)}
                className="p-2 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        />
      )}

      {filteredExams.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No exams found</p>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedExam ? 'Edit Exam' : 'Schedule Exam'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="title">Exam Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., CS101 - Midterm Exam"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <select
                id="course"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
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
              <Label htmlFor="date">Date</Label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="flex h-10 w-full rounded-xl border border-border bg-input px-3.5 py-2 text-sm text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="e.g., 10:00 AM"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 2 hours"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="room">Room/Venue</Label>
              <Input
                id="room"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                placeholder="e.g., Exam Hall A"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalMarks">Total Marks</Label>
              <Input
                id="totalMarks"
                type="number"
                value={formData.totalMarks}
                onChange={(e) => setFormData({ ...formData, totalMarks: Number(e.target.value) })}
                min="1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passingMarks">Passing Marks</Label>
              <Input
                id="passingMarks"
                type="number"
                value={formData.passingMarks}
                onChange={(e) => setFormData({ ...formData, passingMarks: Number(e.target.value) })}
                min="1"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {selectedExam ? 'Update Exam' : 'Schedule Exam'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
