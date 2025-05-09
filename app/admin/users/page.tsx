"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash,
  Shield,
  User,
  Key,
  AlertCircle,
  CheckCircle,
  Lock,
  Unlock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Modal } from "@/components/ui/modal"
import { useModal } from "@/hooks/use-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample users data
const users = [
  {
    id: 1,
    name: "Amina Yusuf",
    email: "amina.yusuf@katdict.gov.ng",
    role: "admin",
    department: "IT Department",
    status: "active",
    lastLogin: "2025-04-23T10:30:00Z",
    createdAt: "2024-12-15T09:00:00Z",
  },
  {
    id: 2,
    name: "Ibrahim Mohammed",
    email: "ibrahim.mohammed@katdict.gov.ng",
    role: "content_manager",
    department: "Communications",
    status: "active",
    lastLogin: "2025-04-22T14:15:00Z",
    createdAt: "2025-01-10T11:30:00Z",
  },
  {
    id: 3,
    name: "Fatima Bello",
    email: "fatima.bello@katdict.gov.ng",
    role: "facility_manager",
    department: "Operations",
    status: "active",
    lastLogin: "2025-04-21T09:45:00Z",
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: 4,
    name: "Ahmed Usman",
    email: "ahmed.usman@katdict.gov.ng",
    role: "support",
    department: "IT Department",
    status: "inactive",
    lastLogin: "2025-03-15T16:20:00Z",
    createdAt: "2025-02-01T13:45:00Z",
  },
  {
    id: 5,
    name: "Zainab Ibrahim",
    email: "zainab.ibrahim@katdict.gov.ng",
    role: "content_manager",
    department: "Communications",
    status: "active",
    lastLogin: "2025-04-20T11:10:00Z",
    createdAt: "2025-02-15T09:30:00Z",
  },
  {
    id: 6,
    name: "Mohammed Abdullahi",
    email: "mohammed.abdullahi@katdict.gov.ng",
    role: "support",
    department: "IT Department",
    status: "pending",
    lastLogin: null,
    createdAt: "2025-04-18T13:30:00Z",
  },
]

// Role definitions
const roles = {
  admin: {
    label: "Administrator",
    description: "Full access to all system features and settings",
    color: "bg-red-100 text-red-800",
  },
  content_manager: {
    label: "Content Manager",
    description: "Can manage content, services, and maintenance updates",
    color: "bg-blue-100 text-blue-800",
  },
  facility_manager: {
    label: "Facility Manager",
    description: "Can manage facility requests and bookings",
    color: "bg-purple-100 text-purple-800",
  },
  support: {
    label: "Support Staff",
    description: "Can view and respond to support requests",
    color: "bg-green-100 text-green-800",
  },
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  
  const addUserModal = useModal()
  const editUserModal = useModal()
  const deleteUserModal = useModal()
  const resetPasswordModal = useModal()
  const viewUserModal = useModal()

  // Filter users based on search query, role filter, and status filter
  const filteredUsers = users.filter((user) => {
    // Role filter
    if (roleFilter !== "all" && user.role !== roleFilter) return false
    
    // Status filter
    if (statusFilter !== "all" && user.status !== statusFilter) return false
    
    // Search filter
    if (
      searchQuery &&
      !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user.department.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false
    
    return true
  })

  const getRoleBadge = (role: string) => {
    const roleInfo = roles[role as keyof typeof roles]
    if (!roleInfo) return <Badge variant="outline">Unknown</Badge>
    
    return <Badge className={roleInfo.color}>{roleInfo.label}</Badge>
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactive</Badge>
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Pending</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const openEditModal = (user: any) => {
    setSelectedUser(user)
    editUserModal.open()
  }

  const openDeleteModal = (user: any) => {
    setSelectedUser(user)
    deleteUserModal.open()
  }

  const openResetPasswordModal = (user: any) => {
    setSelectedUser(user)
    resetPasswordModal.open()
  }

  const openViewUserModal = (user: any) => {
    setSelectedUser(user)
    viewUserModal.open()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-gray-500 mt-1">Manage system users and their permissions.</p>
        </div>
        <Button onClick={addUserModal.open} className="bg-[#009832] hover:bg-[#00b33c]">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[150px]">
              <div className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                <span>Role</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="content_manager">Content Manager</SelectItem>
              <SelectItem value="facility_manager">Facility Manager</SelectItem>
              <SelectItem value="support">Support Staff</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Status</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="bg-gray-50">
              <tr className="border-b transition-colors">
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Email</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Department</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Role</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Last Login</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b transition-colors hover:bg-gray-50 cursor-pointer"
                    onClick={() => openViewUserModal(user)}
                  >
                    <td className="p-4 align-middle font-medium">{user.name}</td>
                    <td className="p-4 align-middle">{user.email}</td>
                    <td className="p-4 align-middle">{user.department}</td>
                    <td className="p-4 align-middle">{getRoleBadge(user.role)}</td>
                    <td className="p-4 align-middle">{getStatusBadge(user.status)}</td>
                    <td className="p-4 align-middle">
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Never"}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => openViewUserModal(user)}>
                              <User className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditModal(user)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openResetPasswordModal(user)}>
                              <Key className="mr-2 h-4 w-4" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === "active" ? (
                              <DropdownMenuItem>
                                <Lock className="mr-2 h-4 w-4" />
                                Deactivate User
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <Unlock className="mr-2 h-4 w-4" />
                                Activate User
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => openDeleteModal(user)}
                              className="text-red-600"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="h-24 text-center text-gray-500">
                    No users found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={addUserModal.isOpen}
        onClose={addUserModal.close}
        title="Add New User"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter email address" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" placeholder="Enter department" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="content_manager">Content Manager</SelectItem>
                  <SelectItem value="facility_manager">Facility Manager</SelectItem>
                  <SelectItem value="support">Support Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Temporary Password</Label>
            <Input id="password" type="password" placeholder="Enter temporary password" />
            <p className="text-xs text-gray-500 mt-1">
              User will be prompted to change this password on first login.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Account Status</Label>
            <Select defaultValue="active">
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending Activation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="send-email" className="rounded border-gray-300" />
            <Label htmlFor="send-email">Send welcome email with login instructions</Label>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={addUserModal.close}>
            Cancel
          </Button>
          <Button className="bg-[#009832] hover:bg-[#00b33c]">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={editUserModal.isOpen}
        onClose={editUserModal.close}
        title="Edit User"
      >
        {selectedUser && (
          <>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input id="edit-name" defaultValue={selectedUser.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email Address</Label>
                  <Input id="edit-email" type="email" defaultValue={selectedUser.email} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Input id="edit-department" defaultValue={selectedUser.department} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select defaultValue={selectedUser.role}>
                    <SelectTrigger id="edit-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="content_manager">Content Manager</SelectItem>
                      <SelectItem value="facility_manager">Facility Manager</SelectItem>
                      <SelectItem value="support">Support Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Account Status</Label>
                <Select defaultValue={selectedUser.status}>
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending Activation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="notify-changes" className="rounded border-gray-300" />
                <Label htmlFor="notify-changes">Notify user about these changes</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={editUserModal.close}>
                Cancel
              </Button>
              <Button className="bg-[#009832] hover:bg-[#00b33c]">
                <CheckCircle className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </>
        )}
      </Modal>

      {/* Delete User Modal */}
      <Modal
        isOpen={deleteUserModal.isOpen}
        onClose={deleteUserModal.close}
        title="Delete User"
      >
        {selectedUser && (
          <>
            <div className="bg-red-50 border border-red-100 rounded-md p-4 mb-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Confirm Deletion</h3>
                  <p className="text-sm text-red-700 mt-1">
                    Are you sure you want to delete the user account for{" "}
                    <strong>{selectedUser.name}</strong> ({selectedUser.email})? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="delete-reason">Reason for Deletion (Optional)</Label>
                <textarea
                  id="delete-reason"
                  className="w-full min-h-[80px] rounded-md border border-gray-300 shadow-sm focus:border-[#009832] focus:ring-[#009832]"
                  placeholder="Enter reason for deleting this user account..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="delete-confirm" className="rounded border-gray-300" required />
                <Label htmlFor="delete-confirm">
                  I understand that this action is permanent and cannot be undone
                </Label>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={deleteUserModal.close}>
                Cancel
              </Button>
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete User
              </Button>
            </div>
          </>
        )}
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        isOpen={resetPasswordModal.isOpen}
        onClose={resetPasswordModal.close}
        title="Reset User Password"
      >
        {selectedUser && (
          <>
            <div className="bg-amber-50 border border-amber-100 rounded-md p-4 mb-4">
              <div className="flex">
                <Key className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-amber-800">Password Reset</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    You are about to reset the password for <strong>{selectedUser.name}</strong> (
                    {selectedUser.email}). The user will be required to set a new password on their next login.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">Temporary Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter temporary password"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Or leave blank to generate a random secure password.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="reset-notify" className="rounded border-gray-300" defaultChecked />
                <Label htmlFor="reset-notify">
                  Send email notification with password reset instructions
                </Label>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={resetPasswordModal.close}>
                Cancel
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                <Key className="mr-2 h-4 w-4" />
                Reset Password
              </Button>
            </div>
          </>
        )}
      </Modal>

      {/* View User Modal */}
      <Modal
        isOpen={viewUserModal.isOpen}
        onClose={viewUserModal.close}
        title="User Details"
        contentClassName="max-w-2xl"
      >
        {selectedUser && (
          <>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-[#009832]/10 flex items-center justify-center">
                  <User className="w-12 h-12 text-[#009832]" />
                </div>
                <h3 className="mt-4 font-semibold text-lg text-center">{selectedUser.name}</h3>
                <p className="text-gray-500 text-sm text-center">{selectedUser.email}</p>
                <div className="mt-2">{getStatusBadge(selectedUser.status)}</div>
              </div>

              <div className="md:w-2/3">
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="info">Information</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="permissions">Permissions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Department</p>
                        <p className="font-medium">{selectedUser.department}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Role</p>
                        <div>{getRoleBadge(selectedUser.role)}</div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Created On</p>
                        <p>
                          {new Date(selectedUser.createdAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Last Login</p>
                        <p>
                          {selectedUser.lastLogin
                            ? new Date(selectedUser.lastLogin).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Never"}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="activity" className="space-y-4 mt-4">
                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
                      <p className="text-gray-500">User activity log will be displayed here.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="permissions" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Role Permissions</h4>
                        <p className="text-xs text-gray-500 mb-2">
                          {roles[selectedUser.role as keyof typeof roles]?.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Access Areas</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            "Dashboard",
                            "Facility Requests",
                            "Online Services",
                            "Maintenance Updates",
                            "User Management",
                            "Settings",
                          ].map((area) => (
                            <div key={area} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`access-${area.toLowerCase().replace(/\s+/g, "-")}`}
                                className="rounded border-gray-300"
                                defaultChecked={selectedUser.role === "admin"}
                                disabled
                              />
                              <Label
                                htmlFor={`access-${area.toLowerCase().replace(/\s+/g, "-")}`}
                                className="text-sm"
                              >
                                {area}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={viewUserModal.close}>
                Close
              </Button>
              <Button
                variant="outline"
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
                onClick={() => {
                  viewUserModal.close()
                  openResetPasswordModal(selectedUser)
                }}
              >
                <Key className="mr-2 h-4 w-4" />
                Reset Password
              </Button>
              <Button
                className="bg-[#009832] hover:bg-[#00b33c]"
                onClick={() => {
                  viewUserModal.close()
                  openEditModal(selectedUser)
                }}
              >
                <Edit className={"mr-2 h-4 w-4"} />

\
