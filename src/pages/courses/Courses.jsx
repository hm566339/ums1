import React, { useState } from 'react'
import { Plus, Edit, Trash2, Users, Clock, MapPin, BookOpen, Search, Grid3X3, List } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Label } from '../../components/ui/Label'
import { courseData as initialCourseData, facultyData } from '../../data/dummyData'
import { cn } from '../../utils/cn'

export function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [courses, setCourses] = useState(initialCourseData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')
  const [viewMode, setViewMode] = useState('grid')
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

  const stats = [
    { label: 'Total Courses', value: courses.length, icon: BookOpen, color: 'primary' },
    { label: 'Enrolled Students', value: totalStudents, icon: Users, color: 'success' },
    { label: 'Total Credits', value: totalCredits, icon: Clock, color: 'info' },
    { label: 'Departments', value: departments.length, icon: MapPin, color: 'warning' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Course Management</h1>
          <p className="text-muted-foreground mt-1">Manage all academic courses and schedules</p>
        </div>
        <Button onClick={handleAddCourse}>
          <Plus className="w-4 h-4" />
          <span>Add Course</span>
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
                  stat.color === 'success' && 'bg-success/10 text-success',
                  stat.color === 'info' && 'bg-info/10 text-info',
                  stat.color === 'warning' && 'bg-warning/10 text-warning'
                )}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="h-10 rounded-xl border border-border bg-input px-3.5 py-2 text-sm text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
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

      {/* Course Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <Card key={course.id} hover>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary mb-2">
                      {course.code}
                    </span>
                    <CardTitle className="text-base">{course.name}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEditCourse(course)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-info hover:bg-info/10 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Credits</p>
                    <p className="text-sm font-medium text-foreground">{course.credits}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Students</p>
                    <p className="text-sm font-medium text-foreground">{course.students}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="truncate">{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="truncate">{course.schedule || 'TBD'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{course.room || 'TBD'}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <span className={cn(
                    'inline-flex px-2.5 py-1 rounded-lg text-xs font-medium',
                    course.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                  )}>
                    {course.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Code</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Instructor</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Credits</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Students</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-5">
                        <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary">
                          {course.code}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-sm font-medium text-foreground">{course.name}</td>
                      <td className="py-4 px-5 text-sm text-muted-foreground">{course.instructor}</td>
                      <td className="py-4 px-5 text-sm text-foreground">{course.credits}</td>
                      <td className="py-4 px-5 text-sm text-foreground">{course.students}</td>
                      <td className="py-4 px-5">
                        <span className={cn(
                          'inline-flex px-2.5 py-1 rounded-lg text-xs font-medium',
                          course.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                        )}>
                          {course.status}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleEditCourse(course)}
                            className="p-2 rounded-lg text-muted-foreground hover:text-info hover:bg-info/10 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(course.id)}
                            className="p-2 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
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
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Course Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter course name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Course Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., CS101"
                required
              />
            </div>

            <div className="space-y-2">
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

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <select
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="flex h-10 w-full rounded-xl border border-border bg-input px-3.5 py-2 text-sm text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
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

            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <select
                id="instructor"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                className="flex h-10 w-full rounded-xl border border-border bg-input px-3.5 py-2 text-sm text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              >
                <option value="">Select Instructor</option>
                {facultyData.map(f => (
                  <option key={f.id} value={f.name}>{f.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="room">Room</Label>
              <Input
                id="room"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                placeholder="e.g., CS-101"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="schedule">Schedule</Label>
            <Input
              id="schedule"
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              placeholder="e.g., Mon/Wed/Fri 9:00 AM"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-border">
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
