import React, { useState } from 'react'
import { Plus, Edit, Trash2, Eye, Download, Upload, Users, UserCheck, Building2 } from 'lucide-react'
import { DataTable } from '../../components/tables/DataTable'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { Card, CardContent } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Label } from '../../components/ui/Label'
import { studentData as initialStudentData } from '../../data/dummyData'
import { cn } from '../../utils/cn'

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

  const stats = [
    { label: 'Total Students', value: students.length, icon: Users, color: 'primary' },
    { label: 'Active Students', value: activeStudents, icon: UserCheck, color: 'success' },
    { label: 'Departments', value: departments, icon: Building2, color: 'info' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Students Management</h1>
          <p className="text-muted-foreground mt-1">Manage all student records and enrollment</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
          <Button onClick={handleAddStudent}>
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  stat.color === 'info' && 'bg-info/10 text-info'
                )}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <DataTable
        title={`All Students (${students.length})`}
        data={students}
        searchableColumns={['name', 'email', 'department', 'id']}
        columns={[
          { key: 'id', label: 'ID' },
          { 
            key: 'name', 
            label: 'Name',
            render: (row) => (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-medium">
                  {row.name.charAt(0)}
                </div>
                <span className="font-medium">{row.name}</span>
              </div>
            )
          },
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
          <>
            <button
              onClick={() => handleViewStudent(student)}
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              title="View"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleEditStudent(student)}
              className="p-2 rounded-lg text-muted-foreground hover:text-info hover:bg-info/10 transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(student.id)}
              className="p-2 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedStudent ? 'Edit Student' : 'Add New Student'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter student name"
                required
              />
            </div>

            <div className="space-y-2">
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

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+92-XXX-XXXXXXX"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="flex h-10 w-full rounded-xl border border-border bg-input px-3.5 py-2 text-sm text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
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
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Medicine">Medicine</option>
                <option value="Law">Law</option>
                <option value="Psychology">Psychology</option>
                <option value="Economics">Economics</option>
                <option value="English Literature">English Literature</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <select
                id="semester"
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="flex h-10 w-full rounded-xl border border-border bg-input px-3.5 py-2 text-sm text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              >
                <option value="">Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter full address"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-border">
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
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary/20">
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{selectedStudent.name}</h3>
                <p className="text-muted-foreground">{selectedStudent.id}</p>
                <span className={cn(
                  'inline-flex px-2.5 py-1 rounded-lg text-xs font-medium mt-2',
                  selectedStudent.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                )}>
                  {selectedStudent.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Email', value: selectedStudent.email },
                { label: 'Phone', value: selectedStudent.phone },
                { label: 'Department', value: selectedStudent.department },
                { label: 'Semester', value: selectedStudent.semester },
                { label: 'CGPA', value: selectedStudent.cgpa?.toFixed(2) || 'N/A' },
                { label: 'Gender', value: selectedStudent.gender || 'N/A' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-muted/50">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium text-foreground mt-0.5">{item.value}</p>
                </div>
              ))}
              <div className="p-3 rounded-xl bg-muted/50 col-span-2">
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="text-sm font-medium text-foreground mt-0.5">{selectedStudent.address || 'N/A'}</p>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-border">
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
