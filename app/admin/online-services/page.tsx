"use client"

import { useState } from "react"
import {
  Globe,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Layout,
  FileText,
  LifeBuoy,
  BarChart,
  Building,
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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Modal } from "@/components/ui/modal"
import { useModal } from "@/hooks/use-modal"

// Sample online services data
const onlineServices = [
  {
    id: 1,
    title: "E-Governance Portal",
    description: "Access government services, forms, and applications online.",
    icon: "Layout",
    url: "https://eportal.katdict.gov.ng",
    status: "active",
    lastUpdated: "2025-04-15T10:30:00Z",
    visits: 12450,
    maintenance: false,
  },
  {
    id: 2,
    title: "Document Repository",
    description: "Access and download public documents and publications.",
    icon: "FileText",
    url: "https://docs.katdict.gov.ng",
    status: "active",
    lastUpdated: "2025-04-10T14:15:00Z",
    visits: 8320,
    maintenance: false,
  },
  {
    id: 3,
    title: "Helpdesk",
    description: "Submit support tickets and track their status.",
    icon: "LifeBuoy",
    url: "https://help.katdict.gov.ng",
    status: "active",
    lastUpdated: "2025-04-05T09:45:00Z",
    visits: 5670,
    maintenance: false,
  },
  {
    id: 4,
    title: "Open Data Portal",
    description: "Access public datasets and statistics for research and analysis.",
    icon: "BarChart",
    url: "https://data.katdict.gov.ng",
    status: "active",
    lastUpdated: "2025-03-28T16:20:00Z",
    visits: 3890,
    maintenance: false,
  },
  {
    id: 5,
    title: "Facility Usage Request",
    description: "Request to use KATDICT facilities for events and activities.",
    icon: "Building",
    url: "/facility-usage",
    status: "active",
    lastUpdated: "2025-03-20T11:10:00Z",
    visits: 2150,
    maintenance: false,
    isInternal: true,
  },
  {
    id: 6,
    title: "Digital Skills Portal",
    description: "Access digital skills training and certification programs.",
    icon: "Layout",
    url: "https://skills.katdict.gov.ng",
    status: "inactive",
    lastUpdated: "2025-03-15T13:30:00Z",
    visits: 0,
    maintenance: true,
  },
]

export default function OnlineServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedService, setSelectedService] = useState<any>(null)

  const addServiceModal = useModal()
  const editServiceModal = useModal()
  const deleteServiceModal = useModal()
  const maintenanceModal = useModal()

  // Filter services based on search query
  const filteredServices = onlineServices.filter((service) => {
    if (
      searchQuery &&
      !service.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !service.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
      case "inactive":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Inactive</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Layout":
        return Layout
      case "FileText":
        return FileText
      case "LifeBuoy":
        return LifeBuoy
      case "BarChart":
        return BarChart
      case "Building":
        return Building
      default:
        return Globe
    }
  }

  const openEditModal = (service: any) => {
    setSelectedService(service)
    editServiceModal.open()
  }

  const openDeleteModal = (service: any) => {
    setSelectedService(service)
    deleteServiceModal.open()
  }

  const openMaintenanceModal = (service: any) => {
    setSelectedService(service)
    maintenanceModal.open()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Online Services</h1>
          <p className="text-gray-500 mt-1">Manage the online services available during maintenance.</p>
        </div>
        <Button onClick={addServiceModal.open} className="bg-[#009832] hover:bg-[#00b33c]">
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search services..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => {
          const IconComponent = getIconComponent(service.icon)

          return (
            <Card
              key={service.id}
              className={`overflow-hidden transition-all ${
                service.maintenance ? "border-amber-200 bg-amber-50/30" : ""
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div
                      className={`rounded-full p-2 mr-2 ${
                        service.status === "active" ? "bg-[#009832]/10" : "bg-gray-100"
                      }`}
                    >
                      <IconComponent
                        className={`h-4 w-4 ${service.status === "active" ? "text-[#009832]" : "text-gray-400"}`}
                      />
                    </div>
                    <CardTitle className="text-base">{service.title}</CardTitle>
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
                      <DropdownMenuItem onClick={() => openEditModal(service)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Service
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openMaintenanceModal(service)}>
                        {service.maintenance ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            End Maintenance
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Set Maintenance
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => openDeleteModal(service)} className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Service
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="mt-2">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <Globe className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                      <a
                        href={service.url}
                        target={service.isInternal ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="text-[#009832] hover:underline flex items-center"
                      >
                        {service.url.replace(/^https?:\/\//, "")}
                        {!service.isInternal && <ExternalLink className="h-3 w-3 ml-1" />}
                      </a>
                    </div>
                    {getStatusBadge(service.status)}
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div>Last updated: {new Date(service.lastUpdated).toLocaleDateString()}</div>
                    <div>
                      <span className="font-medium">{service.visits.toLocaleString()}</span> visits
                    </div>
                  </div>

                  {service.maintenance && (
                    <div className="bg-amber-100 text-amber-800 text-xs p-2 rounded flex items-center">
                      <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
                      This service is currently under maintenance
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Add Service Modal */}
      <Modal isOpen={addServiceModal.isOpen} onClose={addServiceModal.close} title="Add New Service">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Service Title</Label>
            <Input id="title" placeholder="Enter service title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter service description" className="min-h-[80px]" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Service URL</Label>
            <Input id="url" placeholder="https://example.katdict.gov.ng" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <select
              id="icon"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-[#009832] focus:ring-[#009832]"
            >
              <option value="Layout">Layout (Portal)</option>
              <option value="FileText">FileText (Documents)</option>
              <option value="LifeBuoy">LifeBuoy (Help)</option>
              <option value="BarChart">BarChart (Data)</option>
              <option value="Building">Building (Facility)</option>
              <option value="Globe">Globe (Web)</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="status" />
            <Label htmlFor="status">Service is active</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="internal" />
            <Label htmlFor="internal">Internal service (no external URL)</Label>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={addServiceModal.close}>
            Cancel
          </Button>
          <Button className="bg-[#009832] hover:bg-[#00b33c]">
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </div>
      </Modal>

      {/* Edit Service Modal */}
      <Modal isOpen={editServiceModal.isOpen} onClose={editServiceModal.close} title="Edit Service">
        {selectedService && (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Service Title</Label>
                <Input id="edit-title" defaultValue={selectedService.title} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea id="edit-description" defaultValue={selectedService.description} className="min-h-[80px]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-url">Service URL</Label>
                <Input id="edit-url" defaultValue={selectedService.url} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-icon">Icon</Label>
                <select
                  id="edit-icon"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-[#009832] focus:ring-[#009832]"
                  defaultValue={selectedService.icon}
                >
                  <option value="Layout">Layout (Portal)</option>
                  <option value="FileText">FileText (Documents)</option>
                  <option value="LifeBuoy">LifeBuoy (Help)</option>
                  <option value="BarChart">BarChart (Data)</option>
                  <option value="Building">Building (Facility)</option>
                  <option value="Globe">Globe (Web)</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="edit-status" defaultChecked={selectedService.status === "active"} />
                <Label htmlFor="edit-status">Service is active</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="edit-internal" defaultChecked={selectedService.isInternal} />
                <Label htmlFor="edit-internal">Internal service (no external URL)</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={editServiceModal.close}>
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

      {/* Delete Service Modal */}
      <Modal isOpen={deleteServiceModal.isOpen} onClose={deleteServiceModal.close} title="Delete Service">
        {selectedService && (
          <>
            <div className="bg-red-50 border border-red-100 rounded-md p-4 mb-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Confirm Deletion</h3>
                  <p className="text-sm text-red-700 mt-1">
                    Are you sure you want to delete the service "{selectedService.title}"? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={deleteServiceModal.close}>
                Cancel
              </Button>
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete Service
              </Button>
            </div>
          </>
        )}
      </Modal>

      {/* Maintenance Modal */}
      <Modal
        isOpen={maintenanceModal.isOpen}
        onClose={maintenanceModal.close}
        title={selectedService?.maintenance ? "End Maintenance Mode" : "Set Service to Maintenance Mode"}
      >
        {selectedService && (
          <>
            <div
              className={`${
                selectedService.maintenance ? "bg-green-50 border-green-100" : "bg-amber-50 border-amber-100"
              } border rounded-md p-4 mb-4`}
            >
              <div className="flex">
                {selectedService.maintenance ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                )}
                <div>
                  <h3
                    className={`text-sm font-medium ${
                      selectedService.maintenance ? "text-green-800" : "text-amber-800"
                    }`}
                  >
                    {selectedService.maintenance ? "End Maintenance Mode" : "Set Service to Maintenance Mode"}
                  </h3>
                  <p className={`text-sm mt-1 ${selectedService.maintenance ? "text-green-700" : "text-amber-700"}`}>
                    {selectedService.maintenance
                      ? `Are you sure you want to end maintenance mode for "${selectedService.title}"? This will make the service available to users again.`
                      : `Setting "${selectedService.title}" to maintenance mode will display a maintenance message to users and may restrict some functionality.`}
                  </p>
                </div>
              </div>
            </div>

            {!selectedService.maintenance && (
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="maintenance-message">Maintenance Message</Label>
                  <Textarea
                    id="maintenance-message"
                    placeholder="Enter a message to display to users during maintenance..."
                    className="min-h-[100px]"
                    defaultValue={`We're currently performing maintenance on the ${selectedService.title}. This service will be back online shortly. We apologize for any inconvenience.`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimated-completion">Estimated Completion</Label>
                  <Input
                    id="estimated-completion"
                    type="datetime-local"
                    defaultValue={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="show-service" defaultChecked />
                  <Label htmlFor="show-service">Show service in list (with maintenance badge)</Label>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={maintenanceModal.close}>
                Cancel
              </Button>
              {selectedService.maintenance ? (
                <Button className="bg-[#009832] hover:bg-[#00b33c]">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  End Maintenance
                </Button>
              ) : (
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Set to Maintenance
                </Button>
              )}
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}
