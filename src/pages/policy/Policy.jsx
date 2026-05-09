import React, { useState } from 'react'
import { 
  FileText, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Eye
} from 'lucide-react'
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
  {
    id: 'POL007',
    title: 'IT and Network Usage Policy',
    category: 'Facilities',
    description: 'Guidelines for use of university computers, network resources, email, and internet access.',
    effectiveDate: '2024-01-01',
    lastUpdated: '2024-07-01',
    status: 'Active',
    version: '2.5',
    content: [
      'University network is for academic and research purposes only.',
      'Downloading copyrighted material without authorization is prohibited.',
      'Users must not share their login credentials with others.',
      'Accessing inappropriate or illegal content will result in account suspension.',
      'All university email communications are subject to monitoring for security purposes.'
    ]
  },
  {
    id: 'POL008',
    title: 'Hostel Accommodation Policy',
    category: 'Residential',
    description: 'Rules and regulations for students residing in university hostels including room allocation, visitors, and facilities.',
    effectiveDate: '2024-01-01',
    lastUpdated: '2024-06-20',
    status: 'Active',
    version: '1.6',
    content: [
      'Room allocation is based on first-come-first-served basis with priority to outstation students.',
      'Visitors are allowed only in common areas during designated hours (4 PM - 8 PM).',
      'Overnight guests are strictly prohibited without prior approval.',
      'Students must vacate rooms within 48 hours of semester end.',
      'Damage to hostel property will be charged to the responsible student(s).'
    ]
  },
  {
    id: 'POL009',
    title: 'Anti-Harassment Policy',
    category: 'Disciplinary',
    description: 'Zero-tolerance policy against harassment, procedures for reporting, and protection of complainants.',
    effectiveDate: '2024-01-01',
    lastUpdated: '2024-09-10',
    status: 'Active',
    version: '3.1',
    content: [
      'Sexual harassment, verbal abuse, and intimidation are strictly prohibited.',
      'All complaints will be investigated confidentially by the Harassment Committee.',
      'Complainants are protected from retaliation.',
      'Anonymous reporting mechanisms are available through the online portal.',
      'Perpetrators face penalties ranging from warning to permanent expulsion.'
    ]
  },
  {
    id: 'POL010',
    title: 'Research Ethics Policy',
    category: 'Academic',
    description: 'Guidelines for ethical conduct in research including human subjects, data integrity, and publication ethics.',
    effectiveDate: '2024-01-01',
    lastUpdated: '2024-04-25',
    status: 'Active',
    version: '2.2',
    content: [
      'All research involving human subjects must be approved by the Ethics Review Board.',
      'Informed consent is mandatory for all research participants.',
      'Research data must be stored securely and maintained for at least 5 years.',
      'Fabrication, falsification, and misrepresentation of data is prohibited.',
      'Proper acknowledgment of funding sources and collaborators is required.'
    ]
  },
  {
    id: 'POL011',
    title: 'Grievance Redressal Policy',
    category: 'Administrative',
    description: 'Procedures for addressing student grievances and complaints regarding academic and non-academic matters.',
    effectiveDate: '2024-01-01',
    lastUpdated: '2024-03-15',
    status: 'Active',
    version: '1.4',
    content: [
      'Grievances can be submitted online or in writing to the Student Affairs Office.',
      'Initial response will be provided within 5 working days.',
      'Complex cases will be referred to the appropriate committee within 10 days.',
      'Students have the right to appeal decisions within 15 days.',
      'All grievance proceedings are confidential.'
    ]
  },
  {
    id: 'POL012',
    title: 'Scholarship and Financial Aid Policy',
    category: 'Financial',
    description: 'Eligibility criteria, application procedures, and conditions for various scholarship and financial aid programs.',
    effectiveDate: '2024-01-01',
    lastUpdated: '2024-08-20',
    status: 'Active',
    version: '2.4',
    content: [
      'Merit scholarships require a minimum CGPA of 3.5 to be eligible.',
      'Need-based financial aid applications must include income documentation.',
      'Scholarship recipients must maintain required CGPA each semester.',
      'Scholarships can be revoked for disciplinary violations.',
      'External scholarship applications must be routed through the Financial Aid Office.'
    ]
  }
]

const categories = ['All', 'Academic', 'Financial', 'Disciplinary', 'Facilities', 'Residential', 'Administrative']

export function Policy() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedPolicy, setExpandedPolicy] = useState(null)
  const [viewMode, setViewMode] = useState('list') // 'list' or 'grid'

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || policy.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
      case 'Under Review': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
      case 'Archived': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Academic': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'Financial': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'Disciplinary': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      case 'Facilities': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
      case 'Residential': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
      case 'Administrative': return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">University Policies</h1>
          <p className="text-muted-foreground mt-1">
            Official policies, rules, and regulations governing university operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'p-2 rounded-lg transition-colors',
              viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'p-2 rounded-lg transition-colors',
              viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{policies.length}</p>
              <p className="text-sm text-muted-foreground">Total Policies</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{policies.filter(p => p.status === 'Active').length}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">4</p>
              <p className="text-sm text-muted-foreground">Updated This Month</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">6</p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search policies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
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
        <div className="space-y-4">
          {filteredPolicies.map(policy => (
            <div
              key={policy.id}
              className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg"
            >
              {/* Policy Header */}
              <div
                className="p-4 cursor-pointer"
                onClick={() => setExpandedPolicy(expandedPolicy === policy.id ? null : policy.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', getCategoryColor(policy.category))}>
                        {policy.category}
                      </span>
                      <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', getStatusColor(policy.status))}>
                        {policy.status}
                      </span>
                      <span className="text-xs text-muted-foreground">v{policy.version}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{policy.title}</h3>
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
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                      <Eye className="w-4 h-4" />
                    </button>
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
                <div className="px-4 pb-4 border-t border-border pt-4">
                  <h4 className="font-medium text-foreground mb-3">Key Points:</h4>
                  <ul className="space-y-2">
                    {policy.content.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                          {index + 1}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPolicies.map(policy => (
            <div
              key={policy.id}
              className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => setExpandedPolicy(expandedPolicy === policy.id ? null : policy.id)}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', getCategoryColor(policy.category))}>
                  {policy.category}
                </span>
                <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', getStatusColor(policy.status))}>
                  {policy.status}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">{policy.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{policy.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>v{policy.version}</span>
                <span>{new Date(policy.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredPolicies.length === 0 && (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No policies found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
