"use client"

import { useState } from "react"
import Link from "next/link"
import { Building, Globe, Bell, Users, ArrowRight, BarChart, TrendingUp, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to the KATDICT administration panel.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Facility Requests</CardTitle>
            <Building className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-500 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                12%
              </span>{" "}
              from last month
            </p>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/admin/facility-requests" className="w-full">
              <Button variant="ghost" size="sm" className="w-full justify-between">
                View all requests
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <Globe className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="flex items-center mt-1">
              <Progress value={83} className="h-2" />
              <span className="text-xs text-gray-500 ml-2">5/6</span>
            </div>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/admin/online-services" className="w-full">
              <Button variant="ghost" size="sm" className="w-full justify-between">
                Manage services
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Tasks</CardTitle>
            <Bell className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <div className="flex gap-2 mt-1">
              <div className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800">
                <span className="font-medium">3</span> Completed
              </div>
              <div className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                <span className="font-medium">2</span> In Progress
              </div>
              <div className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-800">
                <span className="font-medium">2</span> Pending
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/admin/maintenance-updates" className="w-full">
              <Button variant="ghost" size="sm" className="w-full justify-between">
                View maintenance
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Users</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-500 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />3
              </span>{" "}
              new this month
            </p>
          </CardContent>
          <CardFooter className="p-2">
            <Link href="/admin/users" className="w-full">
              <Button variant="ghost" size="sm" className="w-full justify-between">
                Manage users
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Analytics and Recent Activity */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* Analytics */}
        <Card className="md:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>System Analytics</CardTitle>
              <Tabs defaultValue={timeRange} onValueChange={setTimeRange} className="w-[240px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>System usage and performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[240px] flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <BarChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Analytics visualization would appear here</p>
                <p className="text-xs text-gray-400 mt-1">Showing data for the last {timeRange}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  icon: Building,
                  title: "New facility request",
                  description: "ICT Training Lab requested by Ministry of Education",
                  time: "10 minutes ago",
                  status: "pending",
                },
                {
                  icon: Bell,
                  title: "Maintenance update",
                  description: "Digital Bridge Initiative Integration completed",
                  time: "2 hours ago",
                  status: "completed",
                },
                {
                  icon: Users,
                  title: "New user added",
                  description: "Ibrahim Mohammed added as Content Manager",
                  time: "Yesterday",
                  status: "completed",
                },
                {
                  icon: Globe,
                  title: "Service status change",
                  description: "E-Governance Portal temporarily offline",
                  time: "2 days ago",
                  status: "alert",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="relative mt-0.5">
                    <div
                      className={`rounded-full p-1 ${
                        activity.status === "completed"
                          ? "bg-green-100"
                          : activity.status === "pending"
                            ? "bg-amber-100"
                            : "bg-red-100"
                      }`}
                    >
                      <activity.icon
                        className={`h-3.5 w-3.5 ${
                          activity.status === "completed"
                            ? "text-green-600"
                            : activity.status === "pending"
                              ? "text-amber-600"
                              : "text-red-600"
                        }`}
                      />
                    </div>
                    {index < 3 && <div className="absolute top-6 bottom-0 left-1/2 w-px -ml-px bg-gray-200"></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" size="sm" className="w-full">
              View all activity
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Actions and Upcoming Events */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-auto py-4 flex flex-col items-center justify-center space-y-2 bg-[#009832] hover:bg-[#00b33c]">
                <Building className="h-6 w-6" />
                <span>Add Facility</span>
              </Button>
              <Button className="h-auto py-4 flex flex-col items-center justify-center space-y-2 bg-[#009832] hover:bg-[#00b33c]">
                <Globe className="h-6 w-6" />
                <span>Manage Services</span>
              </Button>
              <Button className="h-auto py-4 flex flex-col items-center justify-center space-y-2 bg-[#009832] hover:bg-[#00b33c]">
                <Bell className="h-6 w-6" />
                <span>Add Update</span>
              </Button>
              <Button className="h-auto py-4 flex flex-col items-center justify-center space-y-2 bg-[#009832] hover:bg-[#00b33c]">
                <Users className="h-6 w-6" />
                <span>Add User</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Scheduled maintenance and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "System Maintenance",
                  date: "May 15, 2025",
                  time: "02:00 - 04:00 AM",
                  description: "Scheduled database optimization and backup",
                },
                {
                  title: "Staff Training",
                  date: "May 20, 2025",
                  time: "10:00 AM - 12:00 PM",
                  description: "New admin panel features training for staff",
                },
                {
                  title: "Service Launch",
                  date: "June 1, 2025",
                  time: "09:00 AM",
                  description: "Launch of updated E-Governance Portal",
                },
              ].map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-md bg-[#009832]/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-[#009832]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-[#009832] font-medium mt-0.5">
                      {event.date} • {event.time}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" size="sm" className="w-full">
              View calendar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
