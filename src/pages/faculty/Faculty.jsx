import React, { useState } from 'react'
import { Plus, Edit, Trash2, Eye, Download, Users, UserCheck, Building2 } from 'lucide-react'
import { DataTable } from '../../components/tables/DataTable'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { Card, CardContent } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Label } from '../../components/ui/Label'
import { facultyData as initialFacultyData } from '../../data/dummyData'
import { cn } from '../../utils/cn'

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

  const stats = [
    { label: 'Total Faculty', value: faculty.length, icon: Users, color: 'primary' },
    { label: 'Active Faculty', value: activeFaculty, icon: UserCheck, color: 'success' },
    { label: 'Departments', value: departments, icon: Building2, color: 'info' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Faculty Management</h1>
          <p className="text-muted-foreground mt-1">Manage teaching staff and faculty members</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
          <Button onClick={handleAddFaculty}>
            <Plus className="w-4 h-4" />
            <span>Add Faculty</span>
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
        title={`All Faculty (${faculty.length})`}
        data={faculty}
        searchableColumns={['name', 'email', 'department', 'id']}
        columns={[
          { key: 'id', label: 'ID' },
          { 
            key: 'name', 
            label: 'Name',
            render: (row) => (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white text-xs font-medium">
                  {row.name.charAt(0)}
                </div>
                <span className="font-medium">{row.name}</span>
              </div>
            )
          },
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
          <>
            <button
              onClick={() => handleViewFaculty(f)}
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              title="View"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleEditFaculty(f)}
              className="p-2 rounded-lg text-muted-foreground hover:text-info hover:bg-info/10 transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(f.id)}
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
        title={selectedFaculty ? 'Edit Faculty' : 'Add Faculty'}
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
                placeholder="Dr. / Prof. Name"
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
                <option value="Mathematics">Mathematics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Architecture">Architecture</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification</Label>
              <select
                id="qualification"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="flex h-10 w-full rounded-xl border border-border bg-input px-3.5 py-2 text-sm text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
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

            <div className="space-y-2">
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

          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization</Label>
            <Input
              id="specialization"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              placeholder="e.g., Artificial Intelligence, Software Engineering"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-border">
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
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-secondary/20">
                {selectedFaculty.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{selectedFaculty.name}</h3>
                <p className="text-muted-foreground">{selectedFaculty.id} - {selectedFaculty.department}</p>
                <span className={cn(
                  'inline-flex px-2.5 py-1 rounded-lg text-xs font-medium mt-2',
                  selectedFaculty.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                )}>
                  {selectedFaculty.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Email', value: selectedFaculty.email },
                { label: 'Phone', value: selectedFaculty.phone },
                { label: 'Qualification', value: selectedFaculty.qualification },
                { label: 'Specialization', value: selectedFaculty.specialization || 'N/A' },
                { label: 'Experience', value: `${selectedFaculty.experience} years` },
                { label: 'Joining Date', value: selectedFaculty.joiningDate || 'N/A' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-muted/50">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium text-foreground mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-border">
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
