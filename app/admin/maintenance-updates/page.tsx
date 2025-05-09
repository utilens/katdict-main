"use client"

import { useState } from "react"
import {
  Bell,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUpDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Modal } from "@/components/ui/modal"
import { useModal } from "@/hooks/use-modal"

// Sample maintenance updates data
const maintenanceUpdates = [
  {
    id: 1,
    title: "Digital Infrastructure Upgrade Started",
    description:
      "We've begun upgrading our core digital infrastructure to better serve Katsina State government agencies.",
    date: "2025-04-23T10:30:00Z",
    status: "in-progress",
    category: "infrastructure",
    priority: "high",
  },
  {
    id: 2,
    title: "Smart Government House Systems Update",
    description:
      "Implementing enhanced security protocols and performance improvements for the Katsina Smart Government House platform.",
    date: "2025-04-23T12:45:00Z",
    status: "completed",
    category: "security",
    priority: "high",
  },
  {
    id: 3,
    title: "Digital Bridge Initiative Integration",
    description:
      "Integrating new features for the Digital Bridge Initiative to improve collaboration between government, academia, and industry.",
    date: "2025-04-23T14:15:00Z",
    status: "in-progress",
    category: "feature",
    priority: "medium",
  },
  {
    id: 4,
    title: "Eye on Katsina Platform Enhancement",
    description: "Updating the Eye on Katsina monitoring system with improved analytics and reporting capabilities.",
    date: "2025-04-23T16:00:00Z",
    status: "pending",
    category: "feature",
    priority: "medium",
  },
  {
    id: 5,
    title: "Database Optimization",
    description: "Optimizing database performance and implementing improved backup procedures.",
    date: "2025-04-24T08:30:00Z",
    status: "pending",
    category: "infrastructure",
    priority: "high",
  },
  {
    id: 6,
    title: "User Interface Improvements",
    description: "Implementing UI/UX improvements based on user feedback and accessibility standards.",
    date: "2025-04-24T11:00:00Z",
    status: "pending",
    category: "ui",
    priority: "low",
  },
]

export default function MaintenanceUpdatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUpdate, setSelectedUpdate] = useState<any>(null)

  const addUpdateModal = useModal()
  const editUpdateModal = useModal()
  const deleteUpdateModal = useModal()
  const changeStatusModal = useModal()

  // Filter updates based on search query and status filter
  const filteredUpdates = maintenanceUpdates.filter((update) => {
    // Status filter
    if (statusFilter !== "all" && update.status !== statusFilter) return false

    // Search filter
    if (
      searchQuery &&
      !update.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !update.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">In Progress</Badge>
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Pending</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">High</Badge>
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Low</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "infrastructure":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Infrastructure</Badge>
      case "security":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Security</Badge>
      case "feature":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Feature</Badge>
      case "ui":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">UI/UX</Badge>
      default:
        return <Badge variant="outline">Other</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "pending":
        return <AlertCircle className="h-5 w-5 text-gray-400" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const openEditModal = (update: any) => {
    setSelectedUpdate(update)
    editUpdateModal.open()
  }

  const openDeleteModal = (update: any) => {
    setSelectedUpdate(update)
    deleteUpdateModal.open()
  }

  const openChangeStatusModal = (update: any) => {
    setSelectedUpdate(update)
    changeStatusModal.open()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance Updates</h1>
          <p className="text-gray-500 mt-1">Manage maintenance tasks and updates.</p>
        </div>
        <Button onClick={addUpdateModal.open} className="bg-[#009832] hover:bg-[#00b33c]">
          <Plus className="mr-2 h-4 w-4" />
          Add Update
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search updates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              <span>Filter by Status</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Updates List */}
      <div className="space-y-4">
        {filteredUpdates.length > 0 ? (
          filteredUpdates.map((update) => (
            <Card key={update.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getStatusIcon(update.status)}</div>
                    <div>
                      <CardTitle className="text-lg">{update.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {new Date(update.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => openEditModal(update)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Update
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openChangeStatusModal(update)}>
                        <Clock className="mr-2 h-4 w-4" />
                        Change Status
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => openDeleteModal(update)} className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Update
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{update.description}</p>
                <div className="flex flex-wrap gap-2">
                  {getStatusBadge(update.status)}
                  {getCategoryBadge(update.category)}
                  {getPriorityBadge(update.priority)}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed">
            <Bell className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No updates found</h3>
            <p className="text-gray-500 mt-1">No maintenance updates match your current filters.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("")
                setStatusFilter("all")
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Add Update Modal */}
      <Modal isOpen={addUpdateModal.isOpen} onClose={addUpdateModal.close} title="Add Maintenance Update">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Update Title</Label>
            <Input id="title" placeholder="Enter update title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter update description" className="min-h-[100px]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="feature">Feature</SelectItem>
                  <SelectItem value="ui">UI/UX</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={addUpdateModal.close}>
            Cancel
          </Button>
          <Button className="bg-[#009832] hover:bg-[#00b33c]">
            <Plus className="mr-2 h-4 w-4" />
            Add Update
          </Button>
        </div>
      </Modal>

      {/* Edit Update Modal */}
      <Modal isOpen={editUpdateModal.isOpen} onClose={editUpdateModal.close} title="Edit Maintenance Update">
        {selectedUpdate && (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Update Title</Label>
                <Input id="edit-title" defaultValue={selectedUpdate.title} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea id="edit-description" defaultValue={selectedUpdate.description} className="min-h-[100px]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select defaultValue={selectedUpdate.category}>
                    <SelectTrigger id="edit-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="feature">Feature</SelectItem>
                      <SelectItem value="ui">UI/UX</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-priority">Priority</Label>
                  <Select defaultValue={selectedUpdate.priority}>
                    <SelectTrigger id="edit-priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select defaultValue={selectedUpdate.status}>
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={editUpdateModal.close}>
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

      {/* Delete Update Modal */}
      <Modal isOpen={deleteUpdateModal.isOpen} onClose={deleteUpdateModal.close} title="Delete Maintenance Update">
        {selectedUpdate && (
          <>
            <div className="bg-red-50 border border-red-100 rounded-md p-4 mb-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Confirm Deletion</h3>
                  <p className="text-sm text-red-700 mt-1">
                    Are you sure you want to delete the maintenance update "{selectedUpdate.title}"? This action cannot
                    be undone.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={deleteUpdateModal.close}>
                Cancel
              </Button>
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete Update
              </Button>
            </div>
          </>
        )}
      </Modal>

      {/* Change Status Modal */}
      <Modal isOpen={changeStatusModal.isOpen} onClose={changeStatusModal.close} title="Change Update Status">
        {selectedUpdate && (
          <>
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <h3 className="font-medium">{selectedUpdate.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedUpdate.description}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="change-status">New Status</Label>
                <Select defaultValue={selectedUpdate.status}>
                  <SelectTrigger id="change-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-notes">Status Update Notes (Optional)</Label>
                <Textarea
                  id="status-notes"
                  placeholder="Add notes about this status change..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="notify" className="rounded border-gray-300" />
                <Label htmlFor="notify">Notify users about this status change</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={changeStatusModal.close}>
                Cancel
              </Button>
              <Button className="bg-[#009832] hover:bg-[#00b33c]">
                <CheckCircle className="mr-2 h-4 w-4" />
                Update Status
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}
