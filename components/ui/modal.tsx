"use client"

import type React from "react"

import { useState, useRef, useEffect, forwardRef, type ReactNode } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
  contentClassName?: string
  showCloseButton?: boolean
  closeOnOutsideClick?: boolean
  preventScroll?: boolean
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      footer,
      className,
      contentClassName,
      showCloseButton = true,
      closeOnOutsideClick = true,
      preventScroll = true,
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)
    const previousActiveElement = useRef<Element | null>(null)

    // Handle animation states
    useEffect(() => {
      if (isOpen) {
        setIsVisible(true)
        // Store the currently focused element to restore it when the modal closes
        previousActiveElement.current = document.activeElement
      } else {
        const timer = setTimeout(() => {
          setIsVisible(false)
        }, 200) // Match this with the CSS transition duration
        return () => clearTimeout(timer)
      }
    }, [isOpen])

    // Handle body scroll locking
    useEffect(() => {
      if (isOpen && preventScroll) {
        // Save current scroll position
        const scrollY = window.scrollY
        // Add styles to prevent body scrolling
        document.body.style.position = "fixed"
        document.body.style.top = `-${scrollY}px`
        document.body.style.width = "100%"
        document.body.style.overflow = "hidden"

        return () => {
          // Remove styles and restore scroll position
          document.body.style.position = ""
          document.body.style.top = ""
          document.body.style.width = ""
          document.body.style.overflow = ""
          window.scrollTo(0, scrollY)
        }
      }
    }, [isOpen, preventScroll])

    // Handle keyboard events (Escape to close)
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) {
          onClose()
        }
      }

      if (isOpen) {
        window.addEventListener("keydown", handleKeyDown)
      }

      return () => {
        window.removeEventListener("keydown", handleKeyDown)
      }
    }, [isOpen, onClose])

    // Handle outside click
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOutsideClick && e.target === e.currentTarget) {
        onClose()
      }
    }

    // Focus trap inside modal
    useEffect(() => {
      if (!isOpen) return

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== "Tab" || !contentRef.current) return

        const focusableElements = contentRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )

        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        // If going backward (shift+tab) and on first element, go to last element
        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
        // If going forward (tab) and on last element, go to first element
        else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }

      document.addEventListener("keydown", handleTabKey)

      // Auto-focus the first focusable element in the modal
      setTimeout(() => {
        const focusableElements = contentRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (focusableElements && focusableElements.length > 0) {
          ;(focusableElements[0] as HTMLElement).focus()
        }
      }, 50)

      return () => {
        document.removeEventListener("keydown", handleTabKey)
        // Restore focus to the previously active element when modal closes
        if (previousActiveElement.current && "focus" in previousActiveElement.current) {
          ;(previousActiveElement.current as HTMLElement).focus()
        }
      }
    }, [isOpen])

    if (!isVisible && !isOpen) return null

    return (
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0",
          className,
        )}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <div
          ref={ref}
          className={cn(
            "bg-white rounded-lg shadow-lg w-full max-w-[80vw] max-h-[80vh] flex flex-col transition-all duration-200 overflow-hidden",
            isOpen ? "scale-100" : "scale-95",
            contentClassName,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              {title && (
                <h2 id="modal-title" className="text-xl font-semibold text-gray-800">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-1 rounded-sm hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div ref={contentRef} className="flex-grow overflow-y-auto p-4">
            {children}
          </div>

          {/* Footer */}
          {footer && <div className="p-4 border-t border-gray-100">{footer}</div>}
        </div>
      </div>
    )
  },
)

Modal.displayName = "Modal"

export { Modal }
