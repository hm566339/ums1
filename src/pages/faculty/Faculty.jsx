import React, { useState } from 'react'
import { Plus, Edit, Trash2, Eye, Download, Upload } from 'lucide-react'
import { DataTable } from '../../components/tables/DataTable'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { Card, CardContent } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Label } from '../../components/ui/Label'
import { facultyData as initialFacultyData } from '../../data/dummyData'

export function Faculty() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedFaculty, setSelectedFaculty] = useState(null)
  const [faculty, setFaculty] = useState(initialFacultyData)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    qualification: '',
    specialization: '',
    experience: '',
  })

  const handleAddFaculty = () => {
    setSelectedFaculty(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      qualification: '',
      specialization: '',
      experience: '',
    })
    setIsModalOpen(true)
  }

  const handleViewFaculty = (f) => {
    setSelectedFaculty(f)
    setIsViewModalOpen(true)
  }

  const handleEditFaculty = (f) => {
    setSelectedFaculty(f)
    setFormData({
      name: f.name,
      email: f.email,
      phone: f.phone,
      department: f.department,
      qualification: f.qualification,
      specialization: f.specialization || '',
      experience: f.experience || '',
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedFaculty) {
      setFaculty(faculty.map(f =>
        f.id === selectedFaculty.id ? { ...f, ...formData } : f
      ))
    } else {
      const newFaculty = {
        id: `FAC${String(faculty.length + 1).padStart(3, '0')}`,
        ...formData,
        status: 'Active',
        joiningDate: new Date().toISOString().split('T')[0]
      }
      setFaculty([...faculty, newFaculty])
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      setFaculty(faculty.filter(f => f.id !== id))
    }
  }

  // Calculate stats
  const activeFaculty = faculty.filter(f => f.status === 'Active').length
  const onLeaveFaculty = faculty.filter(f => f.status === 'On Leave').length
  const departments = [...new Set(faculty.map(f => f.department))].length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Faculty Management</h1>
          <p className="text-muted-foreground mt-1">Manage teaching staff and faculty members</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="md">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddFaculty} size="md">
            <Plus className="w-4 h-4 mr-2" />
            Add Faculty
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Faculty</p>
                <p className="text-3xl font-bold text-foreground mt-1">{faculty.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <span className="text-2xl">👨‍🏫</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Faculty</p>
                <p className="text-3xl font-bold text-green-500 mt-1">{activeFaculty}</p>
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
                <span className="text-2xl">🏛️</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <DataTable
        title={`All Faculty (${faculty.length})`}
        data={faculty}
        searchableColumns={['name', 'email', 'department', 'id']}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'department', label: 'Department' },
          { key: 'qualification', label: 'Qualification' },
          { 
            key: 'experience', 
            label: 'Experience',
            render: (row) => <span>{row.experience} years</span>
          },
          { key: 'status', label: 'Status' },
        ]}
        actions={(f) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleViewFaculty(f)}
              className="p-1 rounded-lg text-primary hover:bg-primary/10 transition-colors"
              title="View"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleEditFaculty(f)}
              className="p-1 rounded-lg text-blue-500 hover:bg-blue-500/10 transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(f.id)}
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
        title={selectedFaculty ? 'Edit Faculty' : 'Add Faculty'}
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
                placeholder="Dr. / Prof. Name"
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
                <option value="Mathematics">Mathematics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Architecture">Architecture</option>
              </select>
            </div>

            <div>
              <Label htmlFor="qualification">Qualification</Label>
              <select
                id="qualification"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full h-10 rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                required
              >
                <option value="">Select Qualification</option>
                <option value="PhD">PhD</option>
                <option value="Masters">Masters</option>
                <option value="MBA">MBA</option>
                <option value="MBBS, FCPS">MBBS, FCPS</option>
                <option value="LLM, PhD Law">LLM, PhD Law</option>
              </select>
            </div>

            <div>
              <Label htmlFor="experience">Experience (Years)</Label>
              <Input
                id="experience"
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="Years of experience"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="specialization">Specialization</Label>
            <Input
              id="specialization"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              placeholder="e.g., Artificial Intelligence, Software Engineering"
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {selectedFaculty ? 'Update' : 'Add'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Faculty Details"
        size="lg"
      >
        {selectedFaculty && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold">
                {selectedFaculty.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{selectedFaculty.name}</h3>
                <p className="text-muted-foreground">{selectedFaculty.id} - {selectedFaculty.department}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">{selectedFaculty.email}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium text-foreground">{selectedFaculty.phone}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Qualification</p>
                <p className="text-sm font-medium text-foreground">{selectedFaculty.qualification}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Specialization</p>
                <p className="text-sm font-medium text-foreground">{selectedFaculty.specialization || 'N/A'}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Experience</p>
                <p className="text-sm font-medium text-foreground">{selectedFaculty.experience} years</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Status</p>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  selectedFaculty.status === 'Active' 
                    ? 'bg-green-500/10 text-green-700 dark:text-green-400' 
                    : 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
                }`}>
                  {selectedFaculty.status}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-muted col-span-2">
                <p className="text-xs text-muted-foreground">Joining Date</p>
                <p className="text-sm font-medium text-foreground">{selectedFaculty.joiningDate || 'N/A'}</p>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                setIsViewModalOpen(false)
                handleEditFaculty(selectedFaculty)
              }}>
                Edit Faculty
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
