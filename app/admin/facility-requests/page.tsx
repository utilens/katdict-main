"use client"

import { useState } from "react"
import { Building, Search, Filter, CheckCircle, XCircle, MoreHorizontal, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Modal } from "@/components/ui/modal"
import { useModal } from "@/hooks/use-modal"

// Sample facility requests data
const facilityRequests = [
  {
    id: "FR-2025-001",
    requesterName: "Ibrahim Mohammed",
    organization: "Ministry of Education",
    facilityName: "ICT Training Laboratory",
    eventName: "Teacher ICT Training Workshop",
    eventDate: "2025-05-20",
    startTime: "09:00",
    endTime: "16:00",
    attendees: 25,
    status: "pending",
    submittedAt: "2025-04-23T10:30:00Z",
    priority: "medium",
  },
  {
    id: "FR-2025-002",
    requesterName: "Fatima Usman",
    organization: "Katsina State University",
    facilityName: "Digital Conference Hall",
    eventName: "Academic Research Symposium",
    eventDate: "2025-05-25",
    startTime: "10:00",
    endTime: "15:00",
    attendees: 80,
    status: "approved",
    submittedAt: "2025-04-22T14:15:00Z",
    priority: "high",
  },
  {
    id: "FR-2025-003",
    requesterName: "Ahmed Bello",
    organization: "Ministry of Health",
    facilityName: "Innovation Hub",
    eventName: "Health Tech Innovation Workshop",
    eventDate: "2025-06-05",
    startTime: "09:30",
    endTime: "17:00",
    attendees: 40,
    status: "pending",
    submittedAt: "2025-04-21T09:45:00Z",
    priority: "high",
  },
  {
    id: "FR-2025-004",
    requesterName: "Zainab Yusuf",
    organization: "Women in Tech Katsina",
    facilityName: "Digital Media Studio",
    eventName: "Women in Tech Mentorship Program",
    eventDate: "2025-06-10",
    startTime: "13:00",
    endTime: "17:00",
    attendees: 15,
    status: "rejected",
    submittedAt: "2025-04-20T16:20:00Z",
    priority: "medium",
    rejectionReason: "Conflicting schedule with a previously approved event",
  },
  {
    id: "FR-2025-005",
    requesterName: "Mohammed Ibrahim",
    organization: "Katsina Youth Development",
    facilityName: "ICT Training Laboratory",
    eventName: "Youth Digital Skills Training",
    eventDate: "2025-06-15",
    startTime: "10:00",
    endTime: "15:00",
    attendees: 30,
    status: "approved",
    submittedAt: "2025-04-19T11:10:00Z",
    priority: "medium",
  },
  {
    id: "FR-2025-006",
    requesterName: "Aisha Abdullahi",
    organization: "Department of Agriculture",
    facilityName: "Digital Conference Hall",
    eventName: "AgriTech Conference",
    eventDate: "2025-06-20",
    startTime: "09:00",
    endTime: "17:00",
    attendees: 95,
    status: "pending",
    submittedAt: "2025-04-18T13:30:00Z",
    priority: "low",
  },
]

export default function FacilityRequestsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [facilityFilter, setFacilityFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)

  const detailsModal = useModal()
  const approveModal = useModal()
  const rejectModal = useModal()

  // Filter requests based on active tab, search query, and filters
  const filteredRequests = facilityRequests.filter((request) => {
    // Tab filter
    if (activeTab !== "all" && request.status !== activeTab) return false

    // Search filter
    if (
      searchQuery &&
      !request.requesterName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.organization.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.eventName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    // Status filter
    if (statusFilter !== "all" && request.status !== statusFilter) return false

    // Facility filter
    if (facilityFilter !== "all" && !request.facilityName.toLowerCase().includes(facilityFilter.toLowerCase()))
      return false

    return true
  })

  const openDetailsModal = (request: any) => {
    setSelectedRequest(request)
    detailsModal.open()
  }

  const openApproveModal = (request: any) => {
    setSelectedRequest(request)
    approveModal.open()
  }

  const openRejectModal = (request: any) => {
    setSelectedRequest(request)
    rejectModal.open()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Pending</Badge>
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Facility Requests</h1>
        <p className="text-gray-500 mt-1">Manage and respond to facility usage requests.</p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search requests..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>Status</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={facilityFilter} onValueChange={setFacilityFilter}>
            <SelectTrigger className="w-[150px]">
              <div className="flex items-center">
                <Building className="mr-2 h-4 w-4" />
                <span>Facility</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Facilities</SelectItem>
              <SelectItem value="ict training">ICT Training Lab</SelectItem>
              <SelectItem value="conference">Conference Hall</SelectItem>
              <SelectItem value="innovation">Innovation Hub</SelectItem>
              <SelectItem value="media">Media Studio</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            All Requests
            <Badge className="ml-2 bg-gray-100 text-gray-800">{facilityRequests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            <Badge className="ml-2 bg-amber-100 text-amber-800">
              {facilityRequests.filter((r) => r.status === "pending").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved
            <Badge className="ml-2 bg-green-100 text-green-800">
              {facilityRequests.filter((r) => r.status === "approved").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected
            <Badge className="ml-2 bg-red-100 text-red-800">
              {facilityRequests.filter((r) => r.status === "rejected").length}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Requests Table */}
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="bg-gray-50">
              <tr className="border-b transition-colors">
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Request ID</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Requester</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Event</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Facility</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Date</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Priority</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b transition-colors hover:bg-gray-50 cursor-pointer"
                    onClick={() => openDetailsModal(request)}
                  >
                    <td className="p-4 align-middle font-medium">{request.id}</td>
                    <td className="p-4 align-middle">
                      <div>
                        <p className="font-medium">{request.requesterName}</p>
                        <p className="text-xs text-gray-500">{request.organization}</p>
                      </div>
                    </td>
                    <td className="p-4 align-middle">{request.eventName}</td>
                    <td className="p-4 align-middle">{request.facilityName}</td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                        <span>
                          {new Date(request.eventDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 align-middle">{getStatusBadge(request.status)}</td>
                    <td className="p-4 align-middle">{getPriorityBadge(request.priority)}</td>
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
                            <DropdownMenuItem onClick={() => openDetailsModal(request)}>View Details</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {request.status === "pending" && (
                              <>
                                <DropdownMenuItem onClick={() => openApproveModal(request)}>
                                  Approve Request
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => openRejectModal(request)}>
                                  Reject Request
                                </DropdownMenuItem>
                              </>
                            )}
                            {request.status !== "pending" && <DropdownMenuItem>Change Status</DropdownMenuItem>}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="h-24 text-center text-gray-500">
                    No facility requests found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Details Modal */}
      <Modal
        isOpen={detailsModal.isOpen}
        onClose={detailsModal.close}
        title="Facility Request Details"
        contentClassName="max-w-3xl"
      >
        {selectedRequest && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{selectedRequest.eventName}</h3>
                <p className="text-sm text-gray-500">{selectedRequest.id}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(selectedRequest.status)}
                {getPriorityBadge(selectedRequest.priority)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    Requester Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-medium">{selectedRequest.requesterName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Organization</p>
                    <p>{selectedRequest.organization}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Submission Date</p>
                    <p>
                      {new Date(selectedRequest.submittedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Event Date</p>
                    <p className="font-medium">
                      {new Date(selectedRequest.eventDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p>
                      {selectedRequest.startTime} - {selectedRequest.endTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Expected Attendees</p>
                    <p>{selectedRequest.attendees} people</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Building className="h-4 w-4 mr-2 text-gray-500" />
                    Facility Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Requested Facility</p>
                    <p className="font-medium">{selectedRequest.facilityName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Equipment Needed</p>
                    <p>Projector, Microphones, Laptops (10)</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Special Requirements</p>
                    <p>{selectedRequest.specialRequirements || "No special requirements specified."}</p>
                  </div>
                </CardContent>
              </Card>

              {selectedRequest.status === "rejected" && (
                <Card className="md:col-span-2 border-red-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center text-red-600">
                      <XCircle className="h-4 w-4 mr-2" />
                      Rejection Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedRequest.rejectionReason}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={detailsModal.close}>
                Close
              </Button>
              {selectedRequest.status === "pending" && (
                <>
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => {
                      detailsModal.close()
                      openRejectModal(selectedRequest)
                    }}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    className="bg-[#009832] hover:bg-[#00b33c]"
                    onClick={() => {
                      detailsModal.close()
                      openApproveModal(selectedRequest)
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Approve Request Modal */}
      <Modal isOpen={approveModal.isOpen} onClose={approveModal.close} title="Approve Facility Request">
        {selectedRequest && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-100 rounded-md p-4">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">Confirm Approval</h3>
                  <p className="text-sm text-green-700 mt-1">
                    You are about to approve the facility request for <strong>{selectedRequest.eventName}</strong> by{" "}
                    <strong>{selectedRequest.requesterName}</strong> from{" "}
                    <strong>{selectedRequest.organization}</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Approval Notes (Optional)</label>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-gray-300 shadow-sm focus:border-[#009832] focus:ring-[#009832]"
                  placeholder="Add any notes or special instructions for the requester..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign Staff Member</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff1">Amina Yusuf - Facility Manager</SelectItem>
                    <SelectItem value="staff2">Mohammed Ibrahim - IT Support</SelectItem>
                    <SelectItem value="staff3">Fatima Bello - Admin Assistant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={approveModal.close}>
                Cancel
              </Button>
              <Button className="bg-[#009832] hover:bg-[#00b33c]">
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirm Approval
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Reject Request Modal */}
      <Modal isOpen={rejectModal.isOpen} onClose={rejectModal.close} title="Reject Facility Request">
        {selectedRequest && (
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-100 rounded-md p-4">
              <div className="flex">
                <XCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Confirm Rejection</h3>
                  <p className="text-sm text-red-700 mt-1">
                    You are about to reject the facility request for <strong>{selectedRequest.eventName}</strong> by{" "}
                    <strong>{selectedRequest.requesterName}</strong> from{" "}
                    <strong>{selectedRequest.organization}</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Rejection <span className="text-red-500">*</span>
                </label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="schedule">Conflicting Schedule</SelectItem>
                    <SelectItem value="capacity">Exceeds Facility Capacity</SelectItem>
                    <SelectItem value="maintenance">Facility Under Maintenance</SelectItem>
                    <SelectItem value="policy">Violates Usage Policy</SelectItem>
                    <SelectItem value="incomplete">Incomplete Information</SelectItem>
                    <SelectItem value="other">Other Reason</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Explanation <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-gray-300 shadow-sm focus:border-[#009832] focus:ring-[#009832]"
                  placeholder="Provide a detailed explanation for the rejection..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Suggest Alternative (Optional)</label>
                <textarea
                  className="w-full min-h-[80px] rounded-md border border-gray-300 shadow-sm focus:border-[#009832] focus:ring-[#009832]"
                  placeholder="Suggest alternative dates, facilities, or solutions..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={rejectModal.close}>
                Cancel
              </Button>
              <Button variant="destructive">
                <XCircle className="mr-2 h-4 w-4" />
                Confirm Rejection
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
