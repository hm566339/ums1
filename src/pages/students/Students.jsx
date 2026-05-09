import React, { useState } from 'react'
import { Plus, Edit, Trash2, Eye, Download, Upload } from 'lucide-react'
import { DataTable } from '../../components/tables/DataTable'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Label } from '../../components/ui/Label'
import { studentData as initialStudentData } from '../../data/dummyData'

export function Students() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [students, setStudents] = useState(initialStudentData)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    semester: '',
    gender: '',
    address: '',
  })

  const handleAddStudent = () => {
    setSelectedStudent(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      semester: '',
      gender: '',
      address: '',
    })
    setIsModalOpen(true)
  }

  const handleViewStudent = (student) => {
    setSelectedStudent(student)
    setIsViewModalOpen(true)
  }

  const handleEditStudent = (student) => {
    setSelectedStudent(student)
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      department: student.department,
      semester: student.semester,
      gender: student.gender || '',
      address: student.address || '',
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedStudent) {
      setStudents(students.map(s =>
        s.id === selectedStudent.id ? { ...s, ...formData } : s
      ))
    } else {
      const newStudent = {
        id: `STU${String(students.length + 1).padStart(3, '0')}`,
        ...formData,
        cgpa: 0.00,
        status: 'Active',
        enrollmentDate: new Date().toISOString().split('T')[0]
      }
      setStudents([...students, newStudent])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id))
    }
  }

  // Calculate stats
  const activeStudents = students.filter(s => s.status === 'Active').length
  const inactiveStudents = students.filter(s => s.status === 'Inactive').length
  const departments = [...new Set(students.map(s => s.department))].length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students Management</h1>
          <p className="text-muted-foreground mt-1">Manage all student records and enrollment</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="md">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="md">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddStudent} size="md">
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold text-foreground mt-1">{students.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <span className="text-2xl">👨‍🎓</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Students</p>
                <p className="text-3xl font-bold text-green-500 mt-1">{activeStudents}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Departments</p>
                <p className="text-3xl font-bold text-primary mt-1">{departments}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <span className="text-2xl">📚</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <DataTable
        title={`All Students (${students.length})`}
        data={students}
        searchableColumns={['name', 'email', 'department', 'id']}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'department', label: 'Department' },
          { key: 'semester', label: 'Semester' },
          { 
            key: 'cgpa', 
            label: 'CGPA',
            render: (row) => (
              <span className="font-medium">{row.cgpa?.toFixed(2) || 'N/A'}</span>
            )
          },
          { key: 'status', label: 'Status' },
        ]}
        actions={(student) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleViewStudent(student)}
              className="p-1 rounded-lg text-primary hover:bg-primary/10 transition-colors"
              title="View"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleEditStudent(student)}
              className="p-1 rounded-lg text-blue-500 hover:bg-blue-500/10 transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(student.id)}
              className="p-1 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
              title="Delete"
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
        title={selectedStudent ? 'Edit Student' : 'Add New Student'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter student name"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+92-XXX-XXXXXXX"
                required
              />
            </div>

            <div>
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full h-10 rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
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
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Medicine">Medicine</option>
                <option value="Law">Law</option>
                <option value="Psychology">Psychology</option>
                <option value="Economics">Economics</option>
                <option value="English Literature">English Literature</option>
              </select>
            </div>

            <div>
              <Label htmlFor="semester">Semester</Label>
              <select
                id="semester"
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="w-full h-10 rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                required
              >
                <option value="">Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter full address"
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {selectedStudent ? 'Update Student' : 'Add Student'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Student Details"
        size="lg"
      >
        {selectedStudent && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold">
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{selectedStudent.name}</h3>
                <p className="text-muted-foreground">{selectedStudent.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">{selectedStudent.email}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium text-foreground">{selectedStudent.phone}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Department</p>
                <p className="text-sm font-medium text-foreground">{selectedStudent.department}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Semester</p>
                <p className="text-sm font-medium text-foreground">{selectedStudent.semester}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">CGPA</p>
                <p className="text-sm font-medium text-foreground">{selectedStudent.cgpa?.toFixed(2) || 'N/A'}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Status</p>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  selectedStudent.status === 'Active' 
                    ? 'bg-green-500/10 text-green-700 dark:text-green-400' 
                    : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
                }`}>
                  {selectedStudent.status}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-muted col-span-2">
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="text-sm font-medium text-foreground">{selectedStudent.address || 'N/A'}</p>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                setIsViewModalOpen(false)
                handleEditStudent(selectedStudent)
              }}>
                Edit Student
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
