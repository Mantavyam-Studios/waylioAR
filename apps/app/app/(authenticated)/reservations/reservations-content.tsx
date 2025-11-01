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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/design-system/components/ui/dialog"
import { Label } from "@repo/design-system/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/design-system/components/ui/select"
import { Badge } from "@repo/design-system/components/ui/badge"
import { Textarea } from "@repo/design-system/components/ui/textarea"
import { IconSearch, IconPlus, IconCalendar, IconClock } from "@tabler/icons-react"

// Sample reservations data
const reservationsData = [
  {
    id: "RES-001",
    patientName: "Rajesh Kumar",
    patientId: "PAT-001",
    phone: "+91 98765 43210",
    appointmentDate: "2024-11-02",
    appointmentTime: "09:00 AM",
    doctor: "Dr. Priya Sharma",
    department: "Cardiology",
    type: "Consultation",
    status: "Confirmed",
    notes: "Follow-up for ECG results",
  },
  {
    id: "RES-002",
    patientName: "Priya Patel",
    patientId: "PAT-002",
    phone: "+91 98765 43211",
    appointmentDate: "2024-11-02",
    appointmentTime: "10:30 AM",
    doctor: "Dr. Arjun Reddy",
    department: "Radiology",
    type: "X-Ray",
    status: "Confirmed",
    notes: "Chest X-Ray",
  },
  {
    id: "RES-003",
    patientName: "Amit Singh",
    patientId: "PAT-003",
    phone: "+91 98765 43212",
    appointmentDate: "2024-11-02",
    appointmentTime: "11:00 AM",
    doctor: "Dr. Kavita Menon",
    department: "General Medicine",
    type: "Check-up",
    status: "Waiting",
    notes: "Annual health check-up",
  },
  {
    id: "RES-004",
    patientName: "Sneha Desai",
    patientId: "PAT-004",
    phone: "+91 98765 43213",
    appointmentDate: "2024-11-02",
    appointmentTime: "02:00 PM",
    doctor: "Dr. Priya Sharma",
    department: "Cardiology",
    type: "ECG Test",
    status: "Pending",
    notes: "",
  },
  {
    id: "RES-005",
    patientName: "Aarav Gupta",
    patientId: "PAT-005",
    phone: "+91 98765 43214",
    appointmentDate: "2024-11-03",
    appointmentTime: "09:30 AM",
    doctor: "Dr. Rohan Kapoor",
    department: "Pediatrics",
    type: "Consultation",
    status: "Confirmed",
    notes: "Child vaccination",
  },
  {
    id: "RES-006",
    patientName: "Anjali Nair",
    patientId: "PAT-006",
    phone: "+91 98765 43215",
    appointmentDate: "2024-11-03",
    appointmentTime: "11:00 AM",
    doctor: "Dr. Kavita Menon",
    department: "General Medicine",
    type: "Consultation",
    status: "Cancelled",
    notes: "Patient requested cancellation",
  },
]

export function ReservationsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newReservation, setNewReservation] = useState({
    patientName: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
    doctor: "",
    department: "",
    type: "",
    notes: "",
  })

  const filteredReservations = reservationsData.filter((reservation) => {
    const matchesSearch =
      reservation.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.doctor.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">{status}</Badge>
      case "Waiting":
        return <Badge className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20">{status}</Badge>
      case "Pending":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">{status}</Badge>
      case "Cancelled":
        return <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleAddReservation = () => {
    console.log("Adding reservation:", newReservation)
    setIsAddDialogOpen(false)
    // Reset form
    setNewReservation({
      patientName: "",
      phone: "",
      appointmentDate: "",
      appointmentTime: "",
      doctor: "",
      department: "",
      type: "",
      notes: "",
    })
  }

  const totalReservations = reservationsData.length
  const confirmedCount = reservationsData.filter((r) => r.status === "Confirmed").length
  const waitingCount = reservationsData.filter((r) => r.status === "Waiting").length

  return (
    <>
      <Header page="Reservations" pages={["Clinic", "Reservations"]}>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <IconPlus className="mr-2 h-4 w-4" />
              Add to Waitlist
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Patient to Waitlist</DialogTitle>
              <DialogDescription>Enter patient and appointment details to add to the waitlist.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    placeholder="Enter patient name"
                    value={newReservation.patientName}
                    onChange={(e) => setNewReservation({ ...newReservation, patientName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 000-0000"
                    value={newReservation.phone}
                    onChange={(e) => setNewReservation({ ...newReservation, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="appointmentDate">Appointment Date *</Label>
                  <Input
                    id="appointmentDate"
                    type="date"
                    value={newReservation.appointmentDate}
                    onChange={(e) => setNewReservation({ ...newReservation, appointmentDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointmentTime">Appointment Time *</Label>
                  <Input
                    id="appointmentTime"
                    type="time"
                    value={newReservation.appointmentTime}
                    onChange={(e) => setNewReservation({ ...newReservation, appointmentTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    value={newReservation.department}
                    onValueChange={(value) => setNewReservation({ ...newReservation, department: value })}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Radiology">Radiology</SelectItem>
                      <SelectItem value="General Medicine">General Medicine</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="Surgery">Surgery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor *</Label>
                  <Select
                    value={newReservation.doctor}
                    onValueChange={(value) => setNewReservation({ ...newReservation, doctor: value })}
                  >
                    <SelectTrigger id="doctor">
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="Dr. Michael Chen">Dr. Michael Chen</SelectItem>
                      <SelectItem value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</SelectItem>
                      <SelectItem value="Dr. David Lee">Dr. David Lee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type *</Label>
                <Select
                  value={newReservation.type}
                  onValueChange={(value) => setNewReservation({ ...newReservation, type: value })}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                    <SelectItem value="Check-up">Check-up</SelectItem>
                    <SelectItem value="X-Ray">X-Ray</SelectItem>
                    <SelectItem value="ECG Test">ECG Test</SelectItem>
                    <SelectItem value="Blood Test">Blood Test</SelectItem>
                    <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes..."
                  value={newReservation.notes}
                  onChange={(e) => setNewReservation({ ...newReservation, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddReservation}>Add to Waitlist</Button>
            </div>
          </DialogContent>
        </Dialog>
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="@container/main flex flex-1 flex-col gap-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Total Reservations</div>
                <IconCalendar className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold">{totalReservations}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Confirmed</div>
                <IconClock className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold text-green-600">{confirmedCount}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Waiting</div>
                <IconClock className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold text-blue-600">{waitingCount}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-muted-foreground text-sm font-medium">Today's Appointments</div>
              <div className="mt-2 text-2xl font-bold">
                {reservationsData.filter((r) => r.appointmentDate === "2024-11-02").length}
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-sm">
              <IconSearch className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search reservations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Waiting">Waiting</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reservations Table */}
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reservation ID</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">{reservation.id}</TableCell>
                    <TableCell>{reservation.patientName}</TableCell>
                    <TableCell className="font-mono text-xs">{reservation.patientId}</TableCell>
                    <TableCell>{reservation.phone}</TableCell>
                    <TableCell>{reservation.appointmentDate}</TableCell>
                    <TableCell>{reservation.appointmentTime}</TableCell>
                    <TableCell>{reservation.doctor}</TableCell>
                    <TableCell>{reservation.department}</TableCell>
                    <TableCell>{reservation.type}</TableCell>
                    <TableCell>{getStatusBadge(reservation.status)}</TableCell>
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

