"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Building,
  Globe,
  Bell,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Search,
  BellIcon,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Suspense } from "react"

interface AdminLayoutProps {
  children: React.ReactNode
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Facility Requests",
    href: "/admin/facility-requests",
    icon: Building,
    badge: "12",
  },
  {
    title: "Online Services",
    href: "/admin/online-services",
    icon: Globe,
  },
  {
    title: "Maintenance Updates",
    href: "/admin/maintenance-updates",
    icon: Bell,
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const NavItems = () => (
    <>
      {navigationItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-[#009832]/90 to-[#009832] text-white font-medium shadow-sm"
                : "text-gray-700 hover:bg-[#009832]/10 hover:text-[#009832] hover:translate-x-1"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-500 group-hover:text-[#009832]"}`} />
            <span className="flex-1">{item.title}</span>
            {item.badge && (
              <Badge
                className={`${isActive ? "bg-white text-[#009832]" : "bg-[#009832]/10 text-[#009832]"} rounded-full px-2 py-0.5 text-xs`}
              >
                {item.badge}
              </Badge>
            )}
          </Link>
        )
      })}
    </>
  )

  if (!isMounted) return null

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-col fixed inset-y-0 z-50 border-r border-gray-200 bg-white shadow-sm">
        <div className="p-4 flex items-center">
          <Link href="/admin" className="flex items-center">
            <Image src="/images/logo.png" alt="KATDICT Logo" width={120} height={48} className="h-auto" priority />
          </Link>
        </div>
        <div className="px-3 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search..." className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-[#009832]" />
          </div>
        </div>
        <Separator className="bg-gray-200" />
        <ScrollArea className="flex-1 py-4 px-3">
          <nav className="space-y-1.5">
            <div className="mb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Main</div>
            <NavItems />
          </nav>
        </ScrollArea>
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#009832]/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-[#009832]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@katdict.gov.ng</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-[#009832]/10">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-gray-200 bg-white z-40 flex items-center px-4 shadow-sm">
        <div className="flex items-center justify-between w-full">
          <Link href="/admin" className="flex items-center">
            <Image src="/images/logo.png" alt="KATDICT Logo" width={100} height={40} className="h-auto" priority />
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <BellIcon className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessageSquare className="h-5 w-5 text-gray-600" />
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                  <Menu className="h-5 w-5 text-gray-600" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4">
                    <Link href="/admin" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                      <Image
                        src="/images/logo.png"
                        alt="KATDICT Logo"
                        width={100}
                        height={40}
                        className="h-auto"
                        priority
                      />
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="px-4 pb-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search..."
                        className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-[#009832]"
                      />
                    </div>
                  </div>
                  <Separator className="bg-gray-200" />
                  <ScrollArea className="flex-1 py-4">
                    <nav className="space-y-1.5 px-3">
                      <div className="mb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Main</div>
                      <NavItems />
                    </nav>
                  </ScrollArea>
                  <Separator className="bg-gray-200" />
                  <div className="p-4 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#009832]/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-[#009832]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                        <p className="text-xs text-gray-500 truncate">admin@katdict.gov.ng</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-[#009832]/10">
                        <LogOut className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 lg:ml-72">
        <div className="md:p-8 p-4 pt-20 md:pt-8 max-w-7xl mx-auto">
          <Suspense>{children}</Suspense>
        </div>
      </main>
    </div>
  )
}
