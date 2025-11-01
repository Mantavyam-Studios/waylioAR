"use client"

import { useState } from "react"
import { Header } from "@/app/(authenticated)/components/header"
import { Button } from "@repo/design-system/components/ui/button"
import { Input } from "@repo/design-system/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/design-system/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/design-system/components/ui/select"
import { Badge } from "@repo/design-system/components/ui/badge"
import { IconSearch, IconPlus, IconUsers, IconEdit, IconEye } from "@tabler/icons-react"

// Sample patients data
const patientsData = [
  {
    id: "PAT-001",
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    bloodType: "O+",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    address: "123 MG Road, Mumbai, Maharashtra",
    lastVisit: "2024-10-28",
    status: "Active",
    assignedDoctor: "Dr. Priya Sharma",
  },
  {
    id: "PAT-002",
    name: "Priya Patel",
    age: 32,
    gender: "Female",
    bloodType: "A+",
    phone: "+91 98765 43211",
    email: "priya.patel@email.com",
    address: "456 Nehru Nagar, Delhi",
    lastVisit: "2024-10-30",
    status: "Active",
    assignedDoctor: "Dr. Arjun Reddy",
  },
  {
    id: "PAT-003",
    name: "Amit Singh",
    age: 58,
    gender: "Male",
    bloodType: "B+",
    phone: "+91 98765 43212",
    email: "amit.singh@email.com",
    address: "789 Park Street, Kolkata, West Bengal",
    lastVisit: "2024-10-29",
    status: "Active",
    assignedDoctor: "Dr. Kavita Menon",
  },
  {
    id: "PAT-004",
    name: "Sneha Desai",
    age: 28,
    gender: "Female",
    bloodType: "AB+",
    phone: "+91 98765 43213",
    email: "sneha.desai@email.com",
    address: "321 Brigade Road, Bangalore, Karnataka",
    lastVisit: "2024-10-25",
    status: "Active",
    assignedDoctor: "Dr. Priya Sharma",
  },
  {
    id: "PAT-005",
    name: "Aarav Gupta",
    age: 12,
    gender: "Male",
    bloodType: "O-",
    phone: "+91 98765 43214",
    email: "parent.gupta@email.com",
    address: "654 Anna Salai, Chennai, Tamil Nadu",
    lastVisit: "2024-10-20",
    status: "Active",
    assignedDoctor: "Dr. Vikram Malhotra",
  },
  {
    id: "PAT-006",
    name: "Anjali Nair",
    age: 41,
    gender: "Female",
    bloodType: "A-",
    phone: "+91 98765 43215",
    email: "anjali.nair@email.com",
    address: "987 MG Road, Kochi, Kerala",
    lastVisit: "2024-09-15",
    status: "Inactive",
    assignedDoctor: "Dr. Kavita Menon",
  },
  {
    id: "PAT-007",
    name: "Suresh Iyer",
    age: 65,
    gender: "Male",
    bloodType: "B-",
    phone: "+91 98765 43216",
    email: "suresh.iyer@email.com",
    address: "147 FC Road, Pune, Maharashtra",
    lastVisit: "2024-10-27",
    status: "Active",
    assignedDoctor: "Dr. Priya Sharma",
  },
  {
    id: "PAT-008",
    name: "Kavita Rao",
    age: 36,
    gender: "Female",
    bloodType: "O+",
    phone: "+91 98765 43217",
    email: "kavita.rao@email.com",
    address: "258 Banjara Hills, Hyderabad, Telangana",
    lastVisit: "2024-10-22",
    status: "Active",
    assignedDoctor: "Dr. Arjun Reddy",
  },
]

export function PatientsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")

  const filteredPatients = patientsData.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    const matchesGender = genderFilter === "all" || patient.gender === genderFilter

    return matchesSearch && matchesStatus && matchesGender
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">{status}</Badge>
      case "Inactive":
        return <Badge className="bg-gray-500/10 text-gray-700 hover:bg-gray-500/20">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const totalPatients = patientsData.length
  const activePatients = patientsData.filter((p) => p.status === "Active").length
  const newPatientsThisMonth = 3 // Mock data

  return (
    <>
      <Header page="Patients" pages={["Clinic", "Patients"]}>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="@container/main flex flex-1 flex-col gap-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Total Patients</div>
                <IconUsers className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold">{totalPatients}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Active Patients</div>
                <IconUsers className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold text-green-600">{activePatients}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">New This Month</div>
                <IconUsers className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold text-blue-600">{newPatientsThisMonth}</div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-sm">
              <IconSearch className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Patients Table */}
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Blood Type</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Assigned Doctor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium font-mono text-xs">{patient.id}</TableCell>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{patient.bloodType}</Badge>
                    </TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>{patient.assignedDoctor}</TableCell>
                    <TableCell>{getStatusBadge(patient.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <IconEye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <IconEdit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

