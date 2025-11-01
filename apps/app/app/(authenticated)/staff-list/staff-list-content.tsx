"use client"

import { useState } from "react"
import { Header } from "@/app/(authenticated)/components/header"
import { Button } from "@repo/design-system/components/ui/button"
import { Input } from "@repo/design-system/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/design-system/components/ui/select"
import { Badge } from "@repo/design-system/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/design-system/components/ui/avatar"
import { IconSearch, IconPlus, IconMail, IconPhone, IconEdit } from "@tabler/icons-react"

// Sample staff data
const staffData = [
  {
    id: "STF-001",
    name: "Dr. Priya Sharma",
    role: "Cardiologist",
    department: "Cardiology",
    email: "priya.sharma@waylio.com",
    phone: "+91 98765 11111",
    status: "Active",
    joinDate: "2020-03-15",
    specialization: "Interventional Cardiology",
    avatar: "",
  },
  {
    id: "STF-002",
    name: "Dr. Arjun Reddy",
    role: "Radiologist",
    department: "Radiology",
    email: "arjun.reddy@waylio.com",
    phone: "+91 98765 22222",
    status: "Active",
    joinDate: "2019-07-22",
    specialization: "Diagnostic Imaging",
    avatar: "",
  },
  {
    id: "STF-003",
    name: "Dr. Kavita Menon",
    role: "General Practitioner",
    department: "General Medicine",
    email: "kavita.menon@waylio.com",
    phone: "+91 98765 33333",
    status: "Active",
    joinDate: "2021-01-10",
    specialization: "Family Medicine",
    avatar: "",
  },
  {
    id: "STF-004",
    name: "Nurse Anita Deshmukh",
    role: "Head Nurse",
    department: "Nursing",
    email: "anita.deshmukh@waylio.com",
    phone: "+91 98765 44444",
    status: "Active",
    joinDate: "2018-05-20",
    specialization: "Critical Care",
    avatar: "",
  },
  {
    id: "STF-005",
    name: "Dr. Vikram Malhotra",
    role: "Surgeon",
    department: "Surgery",
    email: "vikram.malhotra@waylio.com",
    phone: "+91 98765 55555",
    status: "On Leave",
    joinDate: "2017-09-12",
    specialization: "General Surgery",
    avatar: "",
  },
  {
    id: "STF-006",
    name: "Nurse Meera Krishnan",
    role: "Registered Nurse",
    department: "Nursing",
    email: "meera.krishnan@waylio.com",
    phone: "+91 98765 66666",
    status: "Active",
    joinDate: "2022-02-28",
    specialization: "Pediatric Care",
    avatar: "",
  },
  {
    id: "STF-007",
    name: "Dr. Rohan Kapoor",
    role: "Pediatrician",
    department: "Pediatrics",
    email: "rohan.kapoor@waylio.com",
    phone: "+91 98765 77777",
    status: "Active",
    joinDate: "2020-11-05",
    specialization: "Child Healthcare",
    avatar: "",
  },
  {
    id: "STF-008",
    name: "Therapist Neha Joshi",
    role: "Physical Therapist",
    department: "Rehabilitation",
    email: "neha.joshi@waylio.com",
    phone: "+91 98765 88888",
    status: "Active",
    joinDate: "2021-06-18",
    specialization: "Sports Medicine",
    avatar: "",
  },
]

export function StaffListContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || staff.department === departmentFilter
    const matchesStatus = statusFilter === "all" || staff.status === statusFilter

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">{status}</Badge>
      case "On Leave":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">{status}</Badge>
      case "Inactive":
        return <Badge className="bg-gray-500/10 text-gray-700 hover:bg-gray-500/20">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const totalStaff = staffData.length
  const activeStaff = staffData.filter((s) => s.status === "Active").length
  const departments = new Set(staffData.map((s) => s.department)).size

  return (
    <>
      <Header page="Staff List" pages={["Clinic", "Staff List"]}>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          Add Staff Member
        </Button>
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="@container/main flex flex-1 flex-col gap-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-4">
              <div className="text-muted-foreground text-sm font-medium">Total Staff</div>
              <div className="mt-2 text-2xl font-bold">{totalStaff}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-muted-foreground text-sm font-medium">Active Staff</div>
              <div className="mt-2 text-2xl font-bold text-green-600">{activeStaff}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-muted-foreground text-sm font-medium">Departments</div>
              <div className="mt-2 text-2xl font-bold">{departments}</div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-sm">
              <IconSearch className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Radiology">Radiology</SelectItem>
                  <SelectItem value="General Medicine">General Medicine</SelectItem>
                  <SelectItem value="Nursing">Nursing</SelectItem>
                  <SelectItem value="Surgery">Surgery</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="Rehabilitation">Rehabilitation</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Staff Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredStaff.map((staff) => (
              <Card key={staff.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={staff.avatar} alt={staff.name} />
                        <AvatarFallback>{getInitials(staff.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{staff.name}</CardTitle>
                        <CardDescription className="text-sm">{staff.role}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <IconEdit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Staff ID</span>
                    <span className="font-mono text-sm font-medium">{staff.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Department</span>
                    <span className="text-sm font-medium">{staff.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Specialization</span>
                    <span className="text-sm">{staff.specialization}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconMail className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm">{staff.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconPhone className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm">{staff.phone}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-muted-foreground text-sm">Status</span>
                    {getStatusBadge(staff.status)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

