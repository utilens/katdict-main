"use client"

import { useState } from "react"
import { Save, Mail, Upload, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Modal } from "@/components/ui/modal"
import { useModal } from "@/hooks/use-modal"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const resetConfirmModal = useModal()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-gray-500 mt-1">Configure the KATDICT maintenance system settings.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>Configure basic information about the maintenance site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-title">Site Title</Label>
                <Input id="site-title" defaultValue="KATDICT Maintenance" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  className="min-h-[100px]"
                  defaultValue="KATDICT is currently undergoing scheduled maintenance. We'll be back online shortly with improvements to enhance your digital experience in Katsina State."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="support@katdict.gov.ng" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-12 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-xs text-gray-500">Current Logo</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Logo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Language Settings</CardTitle>
              <CardDescription>Configure language options for the maintenance site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-language">Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="default-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ha">Hausa</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Available Languages</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="lang-en" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="lang-en" className="text-sm">
                      English
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="lang-ha" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="lang-ha" className="text-sm">
                      Hausa
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="lang-fr" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="lang-fr" className="text-sm">
                      French
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-[#009832] hover:bg-[#00b33c]">
              <Save className="mr-2 h-4 w-4" />
              Save General Settings
            </Button>
          </div>
        </TabsContent>

        {/* Maintenance Settings */}
        <TabsContent value="maintenance" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Mode</CardTitle>
              <CardDescription>Configure the maintenance mode settings for the KATDICT system.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">
                    When enabled, the maintenance page will be displayed to all visitors.
                  </p>
                </div>
                <Switch id="maintenance-mode" defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="maintenance-end">Scheduled End Date/Time</Label>
                <Input
                  id="maintenance-end"
                  type="datetime-local"
                  defaultValue={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintenance-message">Maintenance Message</Label>
                <Textarea
                  id="maintenance-message"
                  className="min-h-[100px]"
                  defaultValue="We're currently performing scheduled maintenance on our systems. We'll be back online shortly with improvements to enhance your digital experience in Katsina State."
                />
              </div>
              <div className="space-y-2">
                <Label>Allowed IP Addresses</Label>
                <p className="text-sm text-gray-500 mb-2">
                  These IP addresses will be able to access the site during maintenance.
                </p>
                <Textarea
                  placeholder="Enter one IP address per line"
                  className="min-h-[80px]"
                  defaultValue="127.0.0.1
192.168.1.1"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Online Services</CardTitle>
              <CardDescription>Configure which online services remain available during maintenance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Available Services During Maintenance</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="service-eportal" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="service-eportal" className="text-sm">
                      E-Governance Portal
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="service-docs" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="service-docs" className="text-sm">
                      Document Repository
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="service-helpdesk" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="service-helpdesk" className="text-sm">
                      Helpdesk
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="service-data" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="service-data" className="text-sm">
                      Open Data Portal
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="service-facility" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="service-facility" className="text-sm">
                      Facility Usage Request
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-[#009832] hover:bg-[#00b33c]">
              <Save className="mr-2 h-4 w-4" />
              Save Maintenance Settings
            </Button>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure email notification settings for the system.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">SMTP Host</Label>
                <Input id="smtp-host" defaultValue="smtp.katdict.gov.ng" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input id="smtp-port" defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-security">Security</Label>
                  <Select defaultValue="tls">
                    <SelectTrigger id="smtp-security">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                      <SelectItem value="tls">TLS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-username">SMTP Username</Label>
                <Input id="smtp-username" defaultValue="notifications@katdict.gov.ng" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-password">SMTP Password</Label>
                <Input id="smtp-password" type="password" defaultValue="********" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from-email">From Email</Label>
                <Input id="from-email" defaultValue="notifications@katdict.gov.ng" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from-name">From Name</Label>
                <Input id="from-name" defaultValue="KATDICT Maintenance" />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Test Email
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Events</CardTitle>
              <CardDescription>Configure which events trigger notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Admin Notifications</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-facility" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="notify-facility" className="text-sm">
                      New Facility Request
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-user" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="notify-user" className="text-sm">
                      New User Registration
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-feedback" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="notify-feedback" className="text-sm">
                      New Feedback Submission
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-maintenance" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="notify-maintenance" className="text-sm">
                      Maintenance Status Change
                    </Label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>User Notifications</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="notify-user-facility"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="notify-user-facility" className="text-sm">
                      Facility Request Status Update
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="notify-user-maintenance"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="notify-user-maintenance" className="text-sm">
                      Maintenance Completion
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="notify-user-password"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="notify-user-password" className="text-sm">
                      Password Reset
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-[#009832] hover:bg-[#00b33c]">
              <Save className="mr-2 h-4 w-4" />
              Save Notification Settings
            </Button>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>Configure authentication settings for the system.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-login-attempts">Maximum Login Attempts</Label>
                <Input id="max-login-attempts" type="number" defaultValue="5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lockout-duration">Account Lockout Duration (minutes)</Label>
                <Input id="lockout-duration" type="number" defaultValue="15" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Require two-factor authentication for all admin users.</p>
                </div>
                <Switch id="two-factor" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password Policy</CardTitle>
              <CardDescription>Configure password requirements for user accounts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="min-password-length">Minimum Password Length</Label>
                <Input id="min-password-length" type="number" defaultValue="8" />
              </div>
              <div className="space-y-2">
                <Label>Password Requirements</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="req-uppercase" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="req-uppercase" className="text-sm">
                      Require Uppercase Letters
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="req-lowercase" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="req-lowercase" className="text-sm">
                      Require Lowercase Letters
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="req-numbers" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="req-numbers" className="text-sm">
                      Require Numbers
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="req-special" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="req-special" className="text-sm">
                      Require Special Characters
                    </Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                <Input id="password-expiry" type="number" defaultValue="90" />
                <p className="text-xs text-gray-500 mt-1">Set to 0 to disable password expiration.</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-[#009832] hover:bg-[#00b33c]">
              <Save className="mr-2 h-4 w-4" />
              Save Security Settings
            </Button>
          </div>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Automated Backups</CardTitle>
              <CardDescription>Configure automated backup settings for the system.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-backup">Automated Backups</Label>
                  <p className="text-sm text-gray-500">Enable automated backups of the system database and files.</p>
                </div>
                <Switch id="auto-backup" defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Backup Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="backup-frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-time">Backup Time</Label>
                <Input id="backup-time" type="time" defaultValue="02:00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-retention">Backup Retention (days)</Label>
                <Input id="backup-retention" type="number" defaultValue="30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-location">Backup Storage Location</Label>
                <Select defaultValue="local">
                  <SelectTrigger id="backup-location">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local Storage</SelectItem>
                    <SelectItem value="cloud">Cloud Storage</SelectItem>
                    <SelectItem value="both">Both Local and Cloud</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manual Backup</CardTitle>
              <CardDescription>Create and download a manual backup of the system.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Backup Contents</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="backup-database" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="backup-database" className="text-sm">
                      Database
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="backup-files" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="backup-files" className="text-sm">
                      Files and Media
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="backup-settings" className="rounded border-gray-300" defaultChecked />
                    <Label htmlFor="backup-settings" className="text-sm">
                      System Settings
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="backup-logs" className="rounded border-gray-300" />
                    <Label htmlFor="backup-logs" className="text-sm">
                      System Logs
                    </Label>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Create Backup
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Reset</CardTitle>
              <CardDescription>Reset the system to its default state. This action cannot be undone.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 border border-red-100 rounded-md p-4 mb-4">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Warning: Destructive Action</h3>
                    <p className="text-sm text-red-700 mt-1">
                      Resetting the system will delete all data and return the system to its default state. This action
                      cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="destructive" onClick={resetConfirmModal.open}>
                Reset System
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-[#009832] hover:bg-[#00b33c]">
              <Save className="mr-2 h-4 w-4" />
              Save Backup Settings
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Reset Confirmation Modal */}
      <Modal isOpen={resetConfirmModal.isOpen} onClose={resetConfirmModal.close} title="Confirm System Reset">
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-100 rounded-md p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Warning: Destructive Action</h3>
                <p className="text-sm text-red-700 mt-1">
                  You are about to reset the entire system to its default state. This will delete all data, including:
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm text-red-700">
                  <li>All user accounts (except the primary admin)</li>
                  <li>All facility requests</li>
                  <li>All maintenance updates</li>
                  <li>All system settings</li>
                  <li>All custom content</li>
                </ul>
                <p className="text-sm text-red-700 mt-2">
                  <strong>This action cannot be undone.</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reset-confirm">Type "RESET" to confirm</Label>
            <Input id="reset-confirm" placeholder="Type RESET here" />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="reset-backup" className="rounded border-gray-300" />
            <Label htmlFor="reset-backup">Create a backup before resetting</Label>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={resetConfirmModal.close}>
            Cancel
          </Button>
          <Button variant="destructive">Reset System</Button>
        </div>
      </Modal>
    </div>
  )
}
