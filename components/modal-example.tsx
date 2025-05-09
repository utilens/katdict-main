"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Modal } from "@/components/ui/modal"
import { useModal } from "@/hooks/use-modal"

export function ModalExample() {
  const { isOpen, open, close } = useModal()
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
    // Process form data
    console.log("Form submitted:", formData)
    // Close modal
    close()
    // Reset form
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div>
      <Button onClick={open}>Open Contact Form</Button>

      <Modal
        isOpen={isOpen}
        onClose={close}
        title="Contact Us"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={close}>
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
    </div>
  )
}
