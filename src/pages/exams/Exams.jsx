import React, { useState } from 'react'
import { Plus, Edit, Trash2, Calendar, Clock, MapPin, Users, FileText } from 'lucide-react'
import { DataTable } from '../../components/tables/DataTable'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Label } from '../../components/ui/Label'
import { examData as initialExamData, courseData } from '../../data/dummyData'

export function Exams() {
  const [exams, setExams] = useState(initialExamData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedExam, setSelectedExam] = useState(null)
  const [filterStatus, setFilterStatus] = useState('')
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Examination Management</h1>
          <p className="text-muted-foreground mt-1">Schedule and manage exams across all departments</p>
        </div>
        <Button size="md" onClick={handleAddExam}>
          <Plus className="w-4 h-4 mr-2" />
          Schedule Exam
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Exams</p>
                <p className="text-3xl font-bold text-foreground mt-1">{exams.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-3xl font-bold text-blue-500 mt-1">{scheduledExams}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-3xl font-bold text-orange-500 mt-1">{upcomingExams}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-500/10">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-green-500 mt-1">{completedExams}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <FileText className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['', 'Scheduled', 'Upcoming', 'Completed'].map((status) => (
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

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExams.map((exam) => (
          <Card key={exam.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mb-2 ${
                    exam.status === 'Scheduled' ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400' :
                    exam.status === 'Upcoming' ? 'bg-orange-500/10 text-orange-700 dark:text-orange-400' :
                    'bg-green-500/10 text-green-700 dark:text-green-400'
                  }`}>
                    {exam.status}
                  </span>
                  <CardTitle className="text-lg">{exam.title}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEditExam(exam)}
                    className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-500/10 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(exam.id)}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span>{exam.course} - {exam.courseName}</span>
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
              <div className="pt-2 border-t border-border">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Total Marks: {exam.totalMarks}</span>
                  <span>Passing: {exam.passingMarks}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExams.length === 0 && (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No exams found</p>
          </CardContent>
        </Card>
      )}

      {/* Table View */}
      <DataTable
        title={`Exam Schedule (${filteredExams.length})`}
        data={filteredExams}
        searchableColumns={['title', 'course', 'courseName']}
        columns={[
          { key: 'title', label: 'Exam Title' },
          { key: 'course', label: 'Course' },
          { key: 'date', label: 'Date' },
          { key: 'time', label: 'Time' },
          { key: 'room', label: 'Room' },
          { key: 'totalStudents', label: 'Students' },
          { key: 'status', label: 'Status' },
        ]}
        actions={(exam) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleEditExam(exam)}
              className="p-1 rounded-lg text-blue-500 hover:bg-blue-500/10 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(exam.id)}
              className="p-1 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedExam ? 'Edit Exam' : 'Schedule Exam'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title">Exam Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., CS101 - Midterm Exam"
                required
              />
            </div>

            <div>
              <Label htmlFor="course">Course</Label>
              <select
                id="course"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
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
              <Label htmlFor="date">Date</Label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full h-10 rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                required
              />
            </div>

            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="e.g., 10:00 AM"
                required
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 2 hours"
                required
              />
            </div>

            <div>
              <Label htmlFor="room">Room/Venue</Label>
              <Input
                id="room"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                placeholder="e.g., Exam Hall A"
                required
              />
            </div>

            <div>
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

            <div>
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

          <div className="flex gap-2 justify-end pt-4">
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
