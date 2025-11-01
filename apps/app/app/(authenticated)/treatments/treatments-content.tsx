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
import { IconSearch, IconPlus, IconMedicineSyrup } from "@tabler/icons-react"

// Sample treatments data
const treatmentsData = [
  {
    id: "TRT-001",
    patientName: "Rajesh Kumar",
    patientId: "PAT-001",
    treatmentName: "Cardiac Rehabilitation",
    category: "Cardiology",
    doctor: "Dr. Priya Sharma",
    startDate: "2024-10-15",
    endDate: "2024-12-15",
    sessions: 12,
    completedSessions: 5,
    status: "In Progress",
    cost: 2400.00,
  },
  {
    id: "TRT-002",
    patientName: "Priya Patel",
    patientId: "PAT-002",
    treatmentName: "Physical Therapy",
    category: "Rehabilitation",
    doctor: "Therapist Neha Joshi",
    startDate: "2024-10-20",
    endDate: "2024-11-20",
    sessions: 8,
    completedSessions: 3,
    status: "In Progress",
    cost: 960.00,
  },
  {
    id: "TRT-003",
    patientName: "Amit Singh",
    patientId: "PAT-003",
    treatmentName: "Diabetes Management",
    category: "General Medicine",
    doctor: "Dr. Kavita Menon",
    startDate: "2024-09-01",
    endDate: "2025-09-01",
    sessions: 24,
    completedSessions: 8,
    status: "In Progress",
    cost: 4800.00,
  },
  {
    id: "TRT-004",
    patientName: "Sneha Desai",
    patientId: "PAT-004",
    treatmentName: "Allergy Immunotherapy",
    category: "Immunology",
    doctor: "Dr. Arjun Reddy",
    startDate: "2024-08-01",
    endDate: "2024-11-01",
    sessions: 16,
    completedSessions: 16,
    status: "Completed",
    cost: 1920.00,
  },
  {
    id: "TRT-005",
    patientName: "Aarav Gupta",
    patientId: "PAT-005",
    treatmentName: "Pediatric Vaccination Program",
    category: "Pediatrics",
    doctor: "Dr. Rohan Kapoor",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    sessions: 6,
    completedSessions: 4,
    status: "In Progress",
    cost: 480.00,
  },
  {
    id: "TRT-006",
    patientName: "Suresh Iyer",
    patientId: "PAT-007",
    treatmentName: "Post-Surgery Recovery",
    category: "Surgery",
    doctor: "Dr. Vikram Malhotra",
    startDate: "2024-10-25",
    endDate: "2024-11-25",
    sessions: 10,
    completedSessions: 2,
    status: "In Progress",
    cost: 1500.00,
  },
]

export function TreatmentsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredTreatments = treatmentsData.filter((treatment) => {
    const matchesSearch =
      treatment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      treatment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      treatment.treatmentName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || treatment.status === statusFilter
    const matchesCategory = categoryFilter === "all" || treatment.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress":
        return <Badge className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20">{status}</Badge>
      case "Completed":
        return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">{status}</Badge>
      case "Cancelled":
        return <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const totalTreatments = treatmentsData.length
  const inProgress = treatmentsData.filter((t) => t.status === "In Progress").length
  const completed = treatmentsData.filter((t) => t.status === "Completed").length

  return (
    <>
      <Header page="Treatments" pages={["Clinic", "Treatments"]}>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          New Treatment Plan
        </Button>
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="@container/main flex flex-1 flex-col gap-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Total Treatments</div>
                <IconMedicineSyrup className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold">{totalTreatments}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">In Progress</div>
                <IconMedicineSyrup className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold text-blue-600">{inProgress}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Completed</div>
                <IconMedicineSyrup className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold text-green-600">{completed}</div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-sm">
              <IconSearch className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Rehabilitation">Rehabilitation</SelectItem>
                  <SelectItem value="General Medicine">General Medicine</SelectItem>
                  <SelectItem value="Immunology">Immunology</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="Surgery">Surgery</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Treatments Table */}
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Treatment ID</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Treatment</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTreatments.map((treatment) => (
                  <TableRow key={treatment.id}>
                    <TableCell className="font-medium font-mono text-xs">{treatment.id}</TableCell>
                    <TableCell>{treatment.patientName}</TableCell>
                    <TableCell className="font-medium">{treatment.treatmentName}</TableCell>
                    <TableCell>{treatment.category}</TableCell>
                    <TableCell>{treatment.doctor}</TableCell>
                    <TableCell>{treatment.startDate}</TableCell>
                    <TableCell>{treatment.endDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          {treatment.completedSessions}/{treatment.sessions}
                        </span>
                        <div className="h-2 w-20 rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-blue-600"
                            style={{
                              width: `${(treatment.completedSessions / treatment.sessions) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">${treatment.cost.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(treatment.status)}</TableCell>
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

