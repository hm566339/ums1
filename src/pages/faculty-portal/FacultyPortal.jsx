import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { BookOpen, Users, Calendar, FileText, Clock, Bell, CheckCircle, Edit, Eye } from 'lucide-react'
import { facultyPortalData } from '../../data/dummyData'

export function FacultyPortal() {
  const [activeSection, setActiveSection] = useState('overview')
  const { profile, courses, announcements, events, scheduleRows, pendingGrades, recentSubmissions } = facultyPortalData

  const totalStudents = courses.reduce((sum, c) => sum + c.students, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Faculty Portal</h1>
          <p className="text-muted-foreground mt-1">Welcome, {profile.name}</p>
        </div>
        <div className="text-right p-4 rounded-lg bg-muted">
          <p className="text-sm font-medium text-foreground">{profile.department}</p>
          <p className="text-xs text-muted-foreground">{profile.designation}</p>
          <p className="text-xs text-muted-foreground">{profile.email}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">My Courses</p>
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
                <p className="text-sm text-muted-foreground">Total Students</p>
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
                <p className="text-sm text-muted-foreground">Pending Grades</p>
                <p className="text-3xl font-bold text-yellow-500 mt-1">{pendingGrades.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/10">
                <FileText className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weekly Hours</p>
                <p className="text-3xl font-bold text-primary mt-1">9</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Clock className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'courses', label: 'My Courses' },
          { id: 'grades', label: 'Grades' },
          { id: 'schedule', label: 'Schedule' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`px-4 py-3 font-medium border-b-2 transition whitespace-nowrap ${
              activeSection === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {announcements.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <p className="text-sm text-foreground">{item}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {events.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                    <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm text-foreground">{item}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recent Submissions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Recent Submissions
              </CardTitle>
              <CardDescription>Latest student assignment submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSubmissions.map((submission, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div>
                      <p className="font-medium text-foreground">{submission.studentName}</p>
                      <p className="text-sm text-muted-foreground">
                        {submission.course} - {submission.assignment}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{submission.submittedAt}</p>
                      <div className="flex gap-2 mt-2">
                        <button className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-green-500 hover:bg-green-500/10 transition-colors">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Courses Section */}
      {activeSection === 'courses' && (
        <div className="space-y-4">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {course.code}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{course.name}</h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {course.schedule}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students} students
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        Room: {course.room}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Grades Section */}
      {activeSection === 'grades' && (
        <div className="space-y-6">
          {/* Pending Grades */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Grade Submissions</CardTitle>
              <CardDescription>Students awaiting grade entry</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingGrades.length > 0 ? (
                <div className="space-y-3">
                  {pendingGrades.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-foreground">{item.studentName}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.studentId} - {item.course} - {item.assignment}
                        </p>
                      </div>
                      <Button size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Grade
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
                  <p className="text-muted-foreground">All grades are up to date!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Grade Management</CardTitle>
              <CardDescription>Quick actions for grade management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex-col">
                  <FileText className="w-6 h-6 mb-2" />
                  <span>Upload Grades</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col">
                  <Eye className="w-6 h-6 mb-2" />
                  <span>View All Grades</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col">
                  <CheckCircle className="w-6 h-6 mb-2" />
                  <span>Submit Final Grades</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Schedule Section */}
      {activeSection === 'schedule' && (
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
            <CardDescription>Your teaching schedule for this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-foreground">Time</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Monday</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Tuesday</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Wednesday</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Thursday</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Friday</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleRows.map((row, idx) => (
                    <tr key={idx} className="border-b border-border">
                      <td className="py-3 px-4 font-medium text-foreground">{row.time}</td>
                      <td className={`py-3 px-4 ${row.mon ? 'bg-primary/10 rounded' : ''}`}>
                        {row.mon && (
                          <span className="text-sm font-medium text-primary">{row.mon}</span>
                        )}
                      </td>
                      <td className={`py-3 px-4 ${row.tue ? 'bg-primary/10 rounded' : ''}`}>
                        {row.tue && (
                          <span className="text-sm font-medium text-primary">{row.tue}</span>
                        )}
                      </td>
                      <td className={`py-3 px-4 ${row.wed ? 'bg-primary/10 rounded' : ''}`}>
                        {row.wed && (
                          <span className="text-sm font-medium text-primary">{row.wed}</span>
                        )}
                      </td>
                      <td className={`py-3 px-4 ${row.thu ? 'bg-primary/10 rounded' : ''}`}>
                        {row.thu && (
                          <span className="text-sm font-medium text-primary">{row.thu}</span>
                        )}
                      </td>
                      <td className={`py-3 px-4 ${row.fri ? 'bg-primary/10 rounded' : ''}`}>
                        {row.fri && (
                          <span className="text-sm font-medium text-primary">{row.fri}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
