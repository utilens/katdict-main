"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Building,
  Calendar,
  Users,
  FileText,
  ChevronLeft,
  CheckCircle,
  AlertTriangle,
  Info,
  Check,
  X,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import the Modal component and useModal hook
import { Modal } from "@/components/ui/modal"
import { useModal } from "@/hooks/use-modal"

// Facility usage guidelines
const facilityGuidelines = {
  permitted: [
    "Official government meetings and workshops",
    "ICT training sessions and educational programs",
    "Technology exhibitions and demonstrations",
    "Digital literacy programs",
    "Approved community development initiatives",
  ],
  prohibited: [
    "Political campaign events or partisan activities",
    "Religious ceremonies or sectarian gatherings",
    "Commercial activities without prior authorization",
    "Events promoting discrimination or divisive content",
    "Activities that may damage equipment or infrastructure",
  ],
  guidelines: [
    "Requests must be submitted at least 14 days before the intended date",
    "A designated point of contact must be present throughout the event",
    "Maximum capacity limits must be strictly observed",
    "All equipment must be handled according to provided instructions",
    "Premises must be vacated by the agreed end time",
    "Any damages must be reported immediately to facility management",
  ],
  penalties: [
    "Violation of guidelines may result in immediate termination of the event",
    "Damages to equipment or facilities will be charged to the requesting organization",
    "Misrepresentation of event purpose may lead to blacklisting from future facility use",
    "Failure to adhere to capacity limits may result in fines",
    "Late cancellations (less than 72 hours) may incur administrative fees",
  ],
}

// Available facilities
const facilities = [
  {
    id: "ict-training-lab",
    name: "ICT Training Laboratory",
    capacity: 30,
    features: ["30 Workstations", "Projector", "Interactive Whiteboard", "High-speed Internet"],
    availableEquipment: ["Laptops", "Tablets", "VR Headsets", "3D Printers"],
    image: "/placeholder.svg?key=5phmm",
  },
  {
    id: "conference-hall",
    name: "Digital Conference Hall",
    capacity: 100,
    features: ["Video Conferencing", "Sound System", "Stage", "Podium", "Adjustable Lighting"],
    availableEquipment: ["Microphones", "Presentation Clickers", "Recording Equipment"],
    image: "/modern-conference-hall.png",
  },
  {
    id: "innovation-hub",
    name: "Innovation Hub",
    capacity: 50,
    features: ["Collaborative Workspaces", "Brainstorming Areas", "Prototype Testing Zone"],
    availableEquipment: ["Design Tablets", "Prototyping Tools", "Smart Boards"],
    image: "/innovation-hub-workspace.png",
  },
  {
    id: "media-studio",
    name: "Digital Media Studio",
    capacity: 15,
    features: ["Green Screen", "Audio Recording Booth", "Editing Stations"],
    availableEquipment: ["Professional Cameras", "Lighting Equipment", "Audio Mixers"],
    image: "/digital-media-studio.png",
  },
]

// Event types
const eventTypes = [
  "Government Meeting",
  "Training Workshop",
  "Technology Exhibition",
  "Digital Literacy Program",
  "Community Development Initiative",
  "Research Presentation",
  "Hackathon/Competition",
  "Other (please specify)",
]

export default function FacilityUsagePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("request")
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Move the useModal hook inside the component
  const guidelinesModal = useModal()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle the form submission here
    // For demo purposes, we'll just show a success message
    setFormSubmitted(true)
    window.scrollTo(0, 0)
  }

  const resetForm = () => {
    setFormSubmitted(false)
    setSelectedFacility(null)
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" alt="KATDICT Logo" width={150} height={60} className="h-auto" priority />
            </Link>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-[#009832]">
              <ChevronLeft className="h-4 w-4" />
              Back to Maintenance Page
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Facility Usage Request</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Request to use KATDICT facilities for your events and activities during our maintenance period. Please
              review the guidelines before submitting your request.
            </p>
          </div>

          {/* Success Message */}
          {formSubmitted && (
            <div className="bg-green-50 border border-green-100 rounded-lg p-6 mb-8 animate-fadeIn">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-green-800">Request Submitted Successfully</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      Thank you for your facility usage request. Our team will review your submission and contact you
                      within 2-3 business days. You will receive a confirmation email shortly with the details of your
                      request.
                    </p>
                    <div className="mt-4">
                      <Button
                        onClick={resetForm}
                        className="bg-white text-green-700 border border-green-300 hover:bg-green-50"
                      >
                        Submit Another Request
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!formSubmitted && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger
                  value="request"
                  className="data-[state=active]:bg-[#009832] data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  Request Form
                </TabsTrigger>
                <TabsTrigger
                  value="guidelines"
                  className="data-[state=active]:bg-[#009832] data-[state=active]:text-white rounded-md transition-all duration-300"
                >
                  Guidelines & Facilities
                </TabsTrigger>
              </TabsList>

              {/* Request Form Tab */}
              <TabsContent value="request" className="animate-fadeIn">
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                    {/* Requestor Information */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                        <User className="mr-2 h-5 w-5 text-[#009832]" />
                        Requestor Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">
                            Full Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="fullName"
                            placeholder="Enter your full name"
                            required
                            className="rounded-md border-gray-200 focus:border-[#009832] focus:ring-[#009832]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">
                            Position/Title <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="position"
                            placeholder="Enter your position or title"
                            required
                            className="rounded-md border-gray-200 focus:border-[#009832] focus:ring-[#009832]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="organization">
                            Organization/Agency <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="organization"
                            placeholder="Enter your organization or agency"
                            required
                            className="rounded-md border-gray-200 focus:border-[#009832] focus:ring-[#009832]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Input
                            id="department"
                            placeholder="Enter your department (if applicable)"
                            className="rounded-md border-gray-200 focus:border-[#009832] focus:ring-[#009832]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            required
                            className="rounded-md border-gray-200 focus:border-[#009832] focus:ring-[#009832]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            Phone Number <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="phone"
                            placeholder="Enter your phone number"
                            required
                            className="rounded-md border-gray-200 focus:border-[#009832] focus:ring-[#009832]"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Event Details */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                        <Calendar className="mr-2 h-5 w-5 text-[#009832]" />
                        Event Details
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="eventName">
                            Event Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="eventName"
                            placeholder="Enter the name of your event"
                            required
                            className="rounded-md border-gray-200 focus:border-[#009832] focus:ring-[#009832]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="eventType">
                            Event Type <span className="text-red-500">*</span>
                          </Label>
                          <Select required>
                            <SelectTrigger
                              id="eventType"
                              className="rounded-md border-gray-200 focus:border-[#009832] focus:ring-[#009832]"
                            >
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                            <SelectContent>
                              {eventTypes.map((type) => (
                                <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, "-")}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="eventDate">
                            Event Date <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="eventDate"
                            type="date"
                            required
                            min={new Date().toISOString().split("T")[0]}
                            className="rounded-md border-gray-200 focus:border-[#009832] focus:ring-[#009832]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="alternateDate">Alternate Date</Label>
                          <Input
                            id="alternateDate"
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            className="rounded-md border-gray-200 focus:border-[#009832] focus:ring-[#009832]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="startTime">
                            Start Time <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="startTime"
                            type="time"
                            required
                            className="rounded-md border-gray-200 focus:border-[#009832] focus:ring-[#009832]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endTime">
                            End Time <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="endTime"
                            type="time"
                            required
                            className="rounded-md border-gray-200 focus:border-[#009832] focus:ring-[#009832]"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="eventDescription">
                            Event Description <span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            id="eventDescription"
                            placeholder="Provide a detailed description of your event, including its purpose and activities"
                            required
                            className="min-h-[100px] rounded-md border-gray-200 focus:border-[#009832] focus:ring-[#009832]"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Facility Selection */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                        <Building className="mr-2 h-5 w-5 text-[#009832]" />
                        Facility Selection
                      </h2>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {facilities.map((facility) => (
                            <div
                              key={facility.id}
                              className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                                selectedFacility === facility.id
                                  ? "border-[#009832] ring-2 ring-[#009832]/20"
                                  : "border-gray-200 hover:border-[#009832]/50"
                              }`}
                              onClick={() => setSelectedFacility(facility.id)}
                            >
                              <div className="relative h-40">
                                <Image
                                  src={facility.image || "/placeholder.svg"}
                                  alt={facility.name}
                                  fill
                                  className="object-cover"
                                />
                                {selectedFacility === facility.id && (
                                  <div className="absolute top-2 right-2 bg-[#009832] text-white rounded-full p-1">
                                    <Check className="h-4 w-4" />
                                  </div>
                                )}
                              </div>
                              <div className="p-4">
                                <h3 className="font-medium text-gray-900">{facility.name}</h3>
                                <p className="text-sm text-gray-500 flex items-center mt-1">
                                  <Users className="h-3.5 w-3.5 mr-1" /> Capacity: {facility.capacity} people
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="attendees">
                            Expected Number of Attendees <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="attendees"
                            type="number"
                            min="1"
                            placeholder="Enter the expected number of attendees"
                            required
                            className="rounded-md border-gray-200 focus:border-[#009832] focus:ring-[#009832]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Required Equipment</Label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                            {[
                              "Projector",
                              "Microphones",
                              "Laptops",
                              "Tablets",
                              "Sound System",
                              "Video Conferencing",
                              "Recording Equipment",
                              "Other",
                            ].map((item) => (
                              <div key={item} className="flex items-center space-x-2">
                                <Checkbox id={`equipment-${item.toLowerCase().replace(/\s+/g, "-")}`} />
                                <Label
                                  htmlFor={`equipment-${item.toLowerCase().replace(/\s+/g, "-")}`}
                                  className="text-sm font-normal"
                                >
                                  {item}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="specialRequirements">Special Requirements or Setup Instructions</Label>
                          <Textarea
                            id="specialRequirements"
                            placeholder="Describe any special requirements or specific setup instructions for your event"
                            className="min-h-[100px] rounded-md border-gray-200 focus:border-[#009832] focus:ring-[#009832]"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Terms and Conditions */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                        <FileText className="mr-2 h-5 w-5 text-[#009832]" />
                        Terms and Conditions
                      </h2>

                      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
                        <div className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-amber-800">
                            Please review all guidelines carefully before submitting your request. By submitting this
                            form, you agree to comply with all terms and conditions.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox id="agree-guidelines" required />
                          <div>
                            <Label htmlFor="agree-guidelines" className="text-sm font-normal">
                              I have read and agree to the facility usage guidelines{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <p className="text-xs text-gray-500 mt-1">
                              Including permitted and prohibited activities, usage guidelines, and penalties for
                              violations.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox id="agree-responsibility" required />
                          <div>
                            <Label htmlFor="agree-responsibility" className="text-sm font-normal">
                              I accept responsibility for any damages that may occur{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <p className="text-xs text-gray-500 mt-1">
                              I understand that I am responsible for any damages to the facility or equipment during my
                              event.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox id="agree-cancellation" required />
                          <div>
                            <Label htmlFor="agree-cancellation" className="text-sm font-normal">
                              I understand the cancellation policy <span className="text-red-500">*</span>
                            </Label>
                            <p className="text-xs text-gray-500 mt-1">
                              Cancellations must be made at least 72 hours in advance to avoid administrative fees.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-[#009832] to-[#00b33c] hover:from-[#00b33c] hover:to-[#009832] text-white transition-all duration-500 hover:shadow-md rounded-md px-8"
                      >
                        Submit Request
                      </Button>
                    </div>
                  </form>
                </div>
              </TabsContent>

              {/* Guidelines Tab */}
              <TabsContent value="guidelines" className="animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Guidelines Section */}
                  <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">Facility Usage Guidelines</h2>

                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                          <Check className="mr-2 h-5 w-5 text-green-600" />
                          Permitted Activities
                        </h3>
                        <ul className="space-y-2 pl-7 list-disc text-gray-700">
                          {facilityGuidelines.permitted.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                          <X className="mr-2 h-5 w-5 text-red-600" />
                          Prohibited Activities
                        </h3>
                        <ul className="space-y-2 pl-7 list-disc text-gray-700">
                          {facilityGuidelines.prohibited.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                          <Info className="mr-2 h-5 w-5 text-blue-600" />
                          Usage Guidelines
                        </h3>
                        <ul className="space-y-2 pl-7 list-disc text-gray-700">
                          {facilityGuidelines.guidelines.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                          <AlertTriangle className="mr-2 h-5 w-5 text-amber-600" />
                          Penalties for Violations
                        </h3>
                        <ul className="space-y-2 pl-7 list-disc text-gray-700">
                          {facilityGuidelines.penalties.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Available Facilities */}
                  <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">Available Facilities</h2>

                    <div className="space-y-6">
                      {facilities.map((facility) => (
                        <Card key={facility.id} className="overflow-hidden">
                          <div className="relative h-48">
                            <Image
                              src={facility.image || "/placeholder.svg"}
                              alt={facility.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-2">{facility.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 mb-4">
                              <Users className="h-4 w-4 mr-1" />
                              <span>Capacity: {facility.capacity} people</span>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                                  {facility.features.map((feature, index) => (
                                    <li key={index} className="text-sm text-gray-600 flex items-center">
                                      <Check className="h-3.5 w-3.5 text-[#009832] mr-1.5" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Available Equipment:</h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                                  {facility.availableEquipment.map((equipment, index) => (
                                    <li key={index} className="text-sm text-gray-600 flex items-center">
                                      <Check className="h-3.5 w-3.5 text-[#009832] mr-1.5" />
                                      {equipment}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} KATDICT - Katsina Directorate of Information and Communications Technology. All
            rights reserved.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            For urgent inquiries, please contact{" "}
            <span className="text-[#009832] font-medium hover:underline transition-all duration-300">
              support@katdict.gov.ng
            </span>
          </p>
        </div>
      </footer>

      {/* Facility Guidelines Modal */}
      <Modal
        isOpen={guidelinesModal.isOpen}
        onClose={guidelinesModal.close}
        title={
          <div className="flex items-center">
            <Building className="mr-2 h-5 w-5 text-[#009832]" />
            Facility Usage Guidelines
          </div>
        }
        footer={
          <div className="flex justify-end">
            <Button
              onClick={guidelinesModal.close}
              className="bg-gradient-to-r from-[#009832] to-[#00b33c] hover:from-[#00b33c] hover:to-[#009832] text-white transition-all duration-300 rounded-md"
            >
              I Understand
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                Please review all guidelines carefully before submitting a facility usage request. By submitting a
                request, you agree to comply with all terms and conditions.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-600" />
              Permitted Activities
            </h3>
            <ul className="space-y-2 pl-7 list-disc text-gray-700">
              {facilityGuidelines.permitted.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <X className="mr-2 h-5 w-5 text-red-600" />
              Prohibited Activities
            </h3>
            <ul className="space-y-2 pl-7 list-disc text-gray-700">
              {facilityGuidelines.prohibited.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Info className="mr-2 h-5 w-5 text-blue-600" />
              Usage Guidelines
            </h3>
            <ul className="space-y-2 pl-7 list-disc text-gray-700">
              {facilityGuidelines.guidelines.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-600" />
              Penalties for Violations
            </h3>
            <ul className="space-y-2 pl-7 list-disc text-gray-700">
              {facilityGuidelines.penalties.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  )
}
