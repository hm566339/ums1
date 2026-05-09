import React, { useState } from 'react'
import { 
  FileText, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Grid3X3,
  List,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { cn } from '../../utils/cn'

const policies = [
  {
    id: 'POL001',
    title: 'Academic Integrity Policy',
    category: 'Academic',
    description: 'Guidelines and standards for maintaining academic honesty and integrity in all academic activities including examinations, assignments, and research work.',
    effectiveDate: '2024-01-01',
    lastUpdated: '2024-08-15',
    status: 'Active',
    version: '2.1',
    content: [
      'All students must complete their own work unless explicitly allowed to collaborate.',
      'Plagiarism, cheating, and fabrication of data are strictly prohibited.',
      'Proper citation and referencing of sources is mandatory.',
      'Violations may result in academic penalties including suspension or expulsion.',
      'Faculty members are required to report all suspected violations to the Academic Integrity Committee.'
    ]
  },
  {
    id: 'POL002',
    title: 'Attendance Policy',
    category: 'Academic',
    description: 'Rules and regulations regarding student attendance requirements, leave procedures, and consequences of excessive absences.',
    effectiveDate: '2024-01-01',
    lastUpdated: '2024-07-20',
    status: 'Active',
    version: '1.5',
    content: [
      'Students must maintain a minimum of 75% attendance in each course.',
      'Medical leave requires valid documentation within 3 working days.',
      'Students with less than 75% attendance will not be allowed to sit for final exams.',
      'Late arrivals (more than 10 minutes) will be marked as half attendance.',
      'Three consecutive absences without prior approval will trigger a warning notice.'
    ]
  },
  {
    id: 'POL003',
    title: 'Fee Payment Policy',
    category: 'Financial',
    description: 'Guidelines for tuition fees, payment deadlines, late payment penalties, and refund procedures.',
    effectiveDate: '2024-01-01',
    lastUpdated: '2024-09-01',
    status: 'Active',
    version: '3.0',
    content: [
      'Tuition fees must be paid within the first two weeks of each semester.',
      'Late payment attracts a 5% penalty per week up to a maximum of 20%.',
      'Students with outstanding fees will not receive grade reports or transcripts.',
      'Refund requests must be submitted within 30 days of the semester start.',
      'Scholarship recipients must maintain the required CGPA to continue receiving benefits.'
    ]
  },
  {
    id: 'POL004',
    title: 'Code of Conduct',
    category: 'Disciplinary',
    description: 'Standards of behavior expected from all students on campus and during university-related activities.',
    effectiveDate: '2024-01-01',
    lastUpdated: '2024-06-10',
    status: 'Active',
    version: '2.3',
    content: [
      'Students must treat all members of the university community with respect.',
      'Harassment, bullying, and discrimination of any kind are strictly prohibited.',
      'Use of alcohol, drugs, and tobacco on campus premises is forbidden.',
      'Students must carry their ID cards at all times while on campus.',
      'Vandalism or damage to university property will result in disciplinary action and fines.'
    ]
  },
  {
    id: 'POL005',
    title: 'Examination Rules',
    category: 'Academic',
    description: 'Regulations governing the conduct of examinations, grading system, and appeal procedures.',
    effectiveDate: '2024-01-01',
    lastUpdated: '2024-08-01',
    status: 'Active',
    version: '2.0',
    content: [
      'Students must arrive at least 15 minutes before the exam start time.',
      'No electronic devices are allowed in the examination hall unless specified.',
      'Students caught cheating will receive an automatic F grade and face disciplinary action.',
      'Re-examination requests must be submitted within 7 days with valid documentation.',
      'Grade appeals must be filed within 14 days of result publication.'
    ]
  },
  {
    id: 'POL006',
    title: 'Library Usage Policy',
    category: 'Facilities',
    description: 'Rules for library access, book borrowing, digital resources, and quiet study areas.',
    effectiveDate: '2024-01-01',
    lastUpdated: '2024-05-15',
    status: 'Active',
    version: '1.8',
    content: [
      'Library cards must be presented for borrowing materials.',
      'Books can be borrowed for a maximum of 14 days with one renewal option.',
      'Reference materials cannot be taken out of the library.',
      'Late returns attract a fine of PKR 50 per day.',
      'Silence must be maintained in designated quiet study zones.'
    ]
  },
]

const categories = ['All', 'Academic', 'Financial', 'Disciplinary', 'Facilities', 'Residential', 'Administrative']

export function Policy() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedPolicy, setExpandedPolicy] = useState(null)
  const [viewMode, setViewMode] = useState('list')

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || policy.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryStyles = (category) => {
    switch (category) {
      case 'Academic': return 'bg-info/10 text-info'
      case 'Financial': return 'bg-success/10 text-success'
      case 'Disciplinary': return 'bg-danger/10 text-danger'
      case 'Facilities': return 'bg-secondary/10 text-secondary'
      case 'Residential': return 'bg-warning/10 text-warning'
      case 'Administrative': return 'bg-accent/10 text-accent'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const categoryCounts = categories.reduce((acc, category) => {
    if (category === 'All') {
      acc[category] = policies.length
    } else {
      acc[category] = policies.filter(p => p.category === category).length
    }
    return acc
  }, {})

  const stats = [
    { label: 'Total Policies', value: policies.length, icon: FileText, color: 'primary' },
    { label: 'Active', value: policies.filter(p => p.status === 'Active').length, icon: CheckCircle, color: 'success' },
    { label: 'Updated This Month', value: 4, icon: Clock, color: 'warning' },
    { label: 'Categories', value: 6, icon: AlertCircle, color: 'secondary' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">University Policies</h1>
          <p className="text-muted-foreground mt-1">
            Official policies, rules, and regulations governing university operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-muted rounded-xl">
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 rounded-lg transition-colors',
                viewMode === 'list' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 rounded-lg transition-colors',
                viewMode === 'grid' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-xl',
                  stat.color === 'primary' && 'bg-primary/10 text-primary',
                  stat.color === 'success' && 'bg-success/10 text-success',
                  stat.color === 'warning' && 'bg-warning/10 text-warning',
                  stat.color === 'secondary' && 'bg-secondary/10 text-secondary'
                )}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search policies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-medium transition-all',
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {category} ({categoryCounts[category]})
            </button>
          ))}
        </div>
      </div>

      {/* Policies List/Grid */}
      {viewMode === 'list' ? (
        <div className="space-y-3">
          {filteredPolicies.map(policy => (
            <Card key={policy.id} className="overflow-hidden">
              {/* Policy Header */}
              <div
                className="p-5 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setExpandedPolicy(expandedPolicy === policy.id ? null : policy.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn('px-2.5 py-1 rounded-lg text-xs font-medium', getCategoryStyles(policy.category))}>
                        {policy.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-success/10 text-success">
                        {policy.status}
                      </span>
                      <span className="text-xs text-muted-foreground">v{policy.version}</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{policy.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{policy.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Effective: {new Date(policy.effectiveDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Updated: {new Date(policy.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon-sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    {expandedPolicy === policy.id ? (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedPolicy === policy.id && (
                <div className="px-5 pb-5 border-t border-border pt-4 animate-fade-in">
                  <h4 className="font-medium text-foreground mb-3">Key Points:</h4>
                  <ul className="space-y-2">
                    {policy.content.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-sm text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPolicies.map(policy => (
            <Card key={policy.id} hover>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={cn('px-2.5 py-1 rounded-lg text-xs font-medium', getCategoryStyles(policy.category))}>
                    {policy.category}
                  </span>
                  <span className="text-xs text-muted-foreground">v{policy.version}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{policy.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{policy.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Updated: {new Date(policy.lastUpdated).toLocaleDateString()}
                  </span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon-sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredPolicies.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">No policies found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
