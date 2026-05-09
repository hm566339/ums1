import React, { useState } from 'react'
import { Plus, Edit, Trash2, Users, Clock, MapPin, BookOpen } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Label } from '../../components/ui/Label'
import { courseData as initialCourseData, facultyData } from '../../data/dummyData'

export function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [courses, setCourses] = useState(initialCourseData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    credits: '',
    instructor: '',
    department: '',
    schedule: '',
    room: '',
  })

  const departments = [...new Set(courses.map(c => c.department))]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = !filterDepartment || course.department === filterDepartment
    return matchesSearch && matchesDepartment
  })

  const handleAddCourse = () => {
    setSelectedCourse(null)
    setFormData({
      name: '',
      code: '',
      credits: '',
      instructor: '',
      department: '',
      schedule: '',
      room: '',
    })
    setIsModalOpen(true)
  }

  const handleEditCourse = (course) => {
    setSelectedCourse(course)
    setFormData({
      name: course.name,
      code: course.code,
      credits: course.credits,
      instructor: course.instructor,
      department: course.department,
      schedule: course.schedule || '',
      room: course.room || '',
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedCourse) {
      setCourses(courses.map(c =>
        c.id === selectedCourse.id ? { ...c, ...formData } : c
      ))
    } else {
      const newCourse = {
        id: formData.code,
        ...formData,
        students: 0,
        semester: 'Fall 2024',
        status: 'Active'
      }
      setCourses([...courses, newCourse])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id))
    }
  }

  // Stats
  const totalStudents = courses.reduce((sum, c) => sum + c.students, 0)
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Course Management</h1>
          <p className="text-muted-foreground mt-1">Manage all academic courses and schedules</p>
        </div>
        <Button onClick={handleAddCourse} size="md">
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-3xl font-bold text-foreground mt-1">{courses.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Enrolled Students</p>
                <p className="text-3xl font-bold text-green-500 mt-1">{totalStudents}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <Users className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Credits</p>
                <p className="text-3xl font-bold text-primary mt-1">{totalCredits}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Clock className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Departments</p>
                <p className="text-3xl font-bold text-orange-500 mt-1">{departments.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-500/10">
                <MapPin className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="h-10 rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground max-w-xs"
        >
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
                    {course.code}
                  </span>
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-500/10 transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Credits</p>
                  <p className="text-sm font-medium text-foreground">{course.credits}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Students</p>
                  <p className="text-sm font-medium text-foreground">{course.students}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Instructor</p>
                <p className="text-sm font-medium text-foreground">{course.instructor}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Schedule</p>
                <p className="text-sm font-medium text-foreground">{course.schedule || 'TBD'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Room</p>
                <p className="text-sm font-medium text-foreground">{course.room || 'TBD'}</p>
              </div>
              <div className="pt-2">
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  course.status === 'Active' 
                    ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                    : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
                }`}>
                  {course.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No courses found</p>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCourse ? 'Edit Course' : 'Add Course'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Course Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter course name"
                required
              />
            </div>

            <div>
              <Label htmlFor="code">Course Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., CS101"
                required
              />
            </div>

            <div>
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                type="number"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })}
                placeholder="e.g., 3"
                min="1"
                max="6"
                required
              />
            </div>

            <div>
              <Label htmlFor="department">Department</Label>
              <select
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full h-10 rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                required
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Medicine">Medicine</option>
                <option value="Law">Law</option>
                <option value="Psychology">Psychology</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English Literature">English Literature</option>
                <option value="Chemistry">Chemistry</option>
              </select>
            </div>

            <div>
              <Label htmlFor="instructor">Instructor</Label>
              <select
                id="instructor"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                className="w-full h-10 rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                required
              >
                <option value="">Select Instructor</option>
                {facultyData.map(f => (
                  <option key={f.id} value={f.name}>{f.name}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="room">Room</Label>
              <Input
                id="room"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                placeholder="e.g., CS-101"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="schedule">Schedule</Label>
            <Input
              id="schedule"
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              placeholder="e.g., Mon/Wed/Fri 9:00 AM"
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {selectedCourse ? 'Update' : 'Add'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
