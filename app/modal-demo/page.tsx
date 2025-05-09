"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Modal } from "@/components/ui/modal"
import { useModal } from "@/hooks/use-modal"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Info, X } from "lucide-react"
import Link from "next/link"

export default function ModalDemoPage() {
  // Basic modal
  const basicModal = useModal()

  // Form modal
  const formModal = useModal()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    formModal.close()
    setFormData({ name: "", email: "", message: "" })
  }

  // Alert modal
  const successModal = useModal()
  const errorModal = useModal()
  const infoModal = useModal()

  // Large content modal
  const largeContentModal = useModal()

  // Custom size modal
  const customSizeModal = useModal()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="text-[#009832] hover:underline mb-4 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Modal Component Demo</h1>
          <p className="text-gray-600">
            This page demonstrates the reusable modal component with various configurations.
          </p>
        </div>

        <Tabs defaultValue="examples" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="examples">Modal Examples</TabsTrigger>
            <TabsTrigger value="usage">Usage Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="examples" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Basic Modal */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Modal</CardTitle>
                  <CardDescription>A simple modal with title and content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    This example shows a basic modal with a title, content, and close button.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={basicModal.open}>Open Modal</Button>
                </CardFooter>
              </Card>

              {/* Form Modal */}
              <Card>
                <CardHeader>
                  <CardTitle>Form Modal</CardTitle>
                  <CardDescription>A modal containing a form</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    This example shows a modal with a form and custom footer buttons.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={formModal.open}>Open Form</Button>
                </CardFooter>
              </Card>

              {/* Alert Modals */}
              <Card>
                <CardHeader>
                  <CardTitle>Alert Modals</CardTitle>
                  <CardDescription>Success, error, and info alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    These examples show modals styled as different types of alerts.
                  </p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button onClick={successModal.open} variant="outline" className="border-green-500 text-green-600">
                    Success
                  </Button>
                  <Button onClick={errorModal.open} variant="outline" className="border-red-500 text-red-600">
                    Error
                  </Button>
                  <Button onClick={infoModal.open} variant="outline" className="border-blue-500 text-blue-600">
                    Info
                  </Button>
                </CardFooter>
              </Card>

              {/* Large Content Modal */}
              <Card>
                <CardHeader>
                  <CardTitle>Scrollable Content</CardTitle>
                  <CardDescription>Modal with scrollable content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    This example shows a modal with content that exceeds the modal height, demonstrating scrolling.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={largeContentModal.open}>Open Modal</Button>
                </CardFooter>
              </Card>

              {/* Custom Size Modal */}
              <Card>
                <CardHeader>
                  <CardTitle>Custom Size</CardTitle>
                  <CardDescription>Modal with custom width</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    This example shows a modal with a custom width, narrower than the default.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={customSizeModal.open}>Open Modal</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How to Use the Modal Component</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">1. Import the components</h3>
                  <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
                    {`import { Modal } from "@/components/ui/modal"
import { useModal } from "@/hooks/use-modal"`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">2. Initialize the modal state</h3>
                  <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
                    {`const { isOpen, open, close } = useModal()`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">3. Use the modal in your component</h3>
                  <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
                    {`<Button onClick={open}>Open Modal</Button>

<Modal
  isOpen={isOpen}
  onClose={close}
  title="Modal Title"
  footer={
    <Button onClick={close}>Close</Button>
  }
>
  <p>Modal content goes here</p>
</Modal>`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Available Props</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <code className="bg-gray-100 px-1">isOpen</code> - Controls whether the modal is visible
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1">onClose</code> - Function to call when the modal should close
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1">title</code> - Optional title for the modal header
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1">children</code> - Content to display in the modal body
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1">footer</code> - Optional content for the modal footer
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1">className</code> - Additional classes for the modal container
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1">contentClassName</code> - Additional classes for the modal
                      content
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1">showCloseButton</code> - Whether to show the close button
                      (default: true)
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1">closeOnOutsideClick</code> - Whether to close when clicking
                      outside (default: true)
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1">preventScroll</code> - Whether to prevent body scrolling when
                      open (default: true)
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Basic Modal */}
        <Modal isOpen={basicModal.isOpen} onClose={basicModal.close} title="Basic Modal Example">
          <div className="space-y-4">
            <p>This is a basic modal with a title and content.</p>
            <p>
              The modal has a maximum width of 80vw and a maximum height of 80vh, ensuring it always fits within the
              viewport while maintaining a consistent size.
            </p>
            <p>Click outside the modal or press the Escape key to close it.</p>
          </div>
        </Modal>

        {/* Form Modal */}
        <Modal
          isOpen={formModal.isOpen}
          onClose={formModal.close}
          title="Contact Form"
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={formModal.close}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} type="submit" form="contact-form">
                Submit
              </Button>
            </div>
          }
        >
          <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full" />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full min-h-[100px]"
              />
            </div>
          </form>
        </Modal>

        {/* Success Modal */}
        <Modal
          isOpen={successModal.isOpen}
          onClose={successModal.close}
          title={
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-5 w-5 mr-2" />
              Success
            </div>
          }
          contentClassName="border-t-4 border-green-500"
        >
          <div className="space-y-4">
            <p>Your operation has been completed successfully!</p>
            <p>This modal demonstrates a success message with custom styling.</p>
          </div>
        </Modal>

        {/* Error Modal */}
        <Modal
          isOpen={errorModal.isOpen}
          onClose={errorModal.close}
          title={
            <div className="flex items-center text-red-600">
              <X className="h-5 w-5 mr-2" />
              Error
            </div>
          }
          contentClassName="border-t-4 border-red-500"
        >
          <div className="space-y-4">
            <p>An error occurred while processing your request.</p>
            <p>This modal demonstrates an error message with custom styling.</p>
          </div>
        </Modal>

        {/* Info Modal */}
        <Modal
          isOpen={infoModal.isOpen}
          onClose={infoModal.close}
          title={
            <div className="flex items-center text-blue-600">
              <Info className="h-5 w-5 mr-2" />
              Information
            </div>
          }
          contentClassName="border-t-4 border-blue-500"
        >
          <div className="space-y-4">
            <p>Here's some important information you should know.</p>
            <p>This modal demonstrates an informational message with custom styling.</p>
          </div>
        </Modal>

        {/* Large Content Modal */}
        <Modal isOpen={largeContentModal.isOpen} onClose={largeContentModal.close} title="Scrollable Content">
          <div className="space-y-4">
            <p>This modal contains a lot of content to demonstrate scrolling behavior.</p>

            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i}>
                This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl
                eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
              </p>
            ))}
          </div>
        </Modal>

        {/* Custom Size Modal */}
        <Modal
          isOpen={customSizeModal.isOpen}
          onClose={customSizeModal.close}
          title="Custom Size Modal"
          contentClassName="max-w-md"
        >
          <div className="space-y-4">
            <p>This modal has a custom width, set to max-w-md (28rem).</p>
            <p>You can customize the width of the modal by passing a contentClassName prop with a max-width class.</p>
          </div>
        </Modal>
      </div>
    </div>
  )
}
