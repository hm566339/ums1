import React, { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Label } from '../../components/ui/Label'
import { Input } from '../../components/ui/Input'
import { Moon, Sun, Mail, Lock, LogOut, User, Shield, Bell, Palette, Globe, Save, Check } from 'lucide-react'
import { cn } from '../../utils/cn'

export function Settings() {
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    email: 'admin@university.edu',
    fullName: 'Dr. Muhammad Ali',
    phone: '+92-300-1111111',
    language: 'English',
    timezone: 'PKT (Pakistan Time)',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert('Settings saved successfully!')
    }, 1000)
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('currentUser')
      window.location.href = '/login'
    }
  }

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'account', label: 'Account', icon: User },
    { id: 'theme', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-3">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3',
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-foreground hover:bg-muted'
                    )}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">General Settings</CardTitle>
                    <CardDescription>Configure general system preferences</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-xl border border-border bg-input px-3.5 py-2 text-sm text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option>English</option>
                      <option>Urdu</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>Arabic</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-xl border border-border bg-input px-3.5 py-2 text-sm text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option>PKT (Pakistan Time)</option>
                      <option>UTC (Coordinated Universal Time)</option>
                      <option>EST (Eastern Standard Time)</option>
                      <option>PST (Pacific Standard Time)</option>
                      <option>GMT (Greenwich Mean Time)</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-border">
                  <Button onClick={handleSave} isLoading={isSaving}>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Account Settings */}
          {activeTab === 'account' && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-info/10">
                    <User className="w-5 h-5 text-info" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Account Settings</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-primary/20">
                    {formData.fullName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{formData.fullName}</p>
                    <p className="text-sm text-muted-foreground">Administrator</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Change Avatar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-border">
                  <Button onClick={handleSave} isLoading={isSaving}>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Theme Settings */}
          {activeTab === 'theme' && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary/10">
                    <Palette className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Appearance</CardTitle>
                    <CardDescription>Customize your visual preferences</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-border rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted">
                      {theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {theme === 'dark' 
                          ? 'Dark mode reduces eye strain in low-light conditions' 
                          : 'Light mode is best for well-lit environments'}
                      </p>
                    </div>
                  </div>
                  <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={toggleTheme}>
                    {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                  </Button>
                </div>

                {/* Theme Preview */}
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => theme !== 'light' && toggleTheme()}
                    className={cn(
                      'p-4 rounded-2xl border-2 transition-all',
                      theme === 'light' ? 'border-primary shadow-lg shadow-primary/10' : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="h-2 w-16 bg-gray-200 rounded mb-2" />
                      <div className="h-2 w-12 bg-gray-300 rounded" />
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-3">
                      {theme === 'light' && <Check className="w-4 h-4 text-primary" />}
                      <p className="text-sm font-medium text-foreground">Light</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => theme !== 'dark' && toggleTheme()}
                    className={cn(
                      'p-4 rounded-2xl border-2 transition-all',
                      theme === 'dark' ? 'border-primary shadow-lg shadow-primary/10' : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    <div className="bg-slate-900 rounded-xl p-4">
                      <div className="h-2 w-16 bg-slate-700 rounded mb-2" />
                      <div className="h-2 w-12 bg-slate-600 rounded" />
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-3">
                      {theme === 'dark' && <Check className="w-4 h-4 text-primary" />}
                      <p className="text-sm font-medium text-foreground">Dark</p>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-warning/10">
                    <Bell className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { id: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
                  { id: 'browser', label: 'Browser Notifications', description: 'Get push notifications in your browser' },
                  { id: 'enrollment', label: 'New Enrollments', description: 'Notify when new students enroll' },
                  { id: 'payments', label: 'Payment Updates', description: 'Notify for fee payments and dues' },
                  { id: 'announcements', label: 'System Announcements', description: 'Important system updates' },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-xl">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-success/10">
                      <Shield className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Security Settings</CardTitle>
                      <CardDescription>Manage your account security</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Change Password</p>
                        <p className="text-sm text-muted-foreground">Update your password regularly for security</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted">
                        <Shield className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Active Sessions</p>
                        <p className="text-sm text-muted-foreground">Manage devices where you&apos;re logged in</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Logout Card */}
              <Card className="border-danger/30">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-danger/10">
                        <LogOut className="w-5 h-5 text-danger" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Sign Out</p>
                        <p className="text-sm text-muted-foreground">Sign out of your account on this device</p>
                      </div>
                    </div>
                    <Button variant="destructive" onClick={handleLogout}>
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
