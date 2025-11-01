"use client"

import { useState } from "react"
import Link from "next/link"
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
import { IconSearch, IconPlus, IconEdit, IconTrash } from "@tabler/icons-react"

// Sample peripherals data
const peripheralsData = [
  {
    id: "PER001",
    equipmentName: "X-Ray Machine",
    model: "Siemens Mobilett XP",
    serialNumber: "SN-XR-2023-001",
    category: "Diagnostic Equipment",
    manufacturer: "Siemens",
    purchaseDate: "2023-01-15",
    warrantyExpiry: "2026-01-15",
    lastMaintenance: "2024-09-15",
    nextMaintenance: "2024-12-15",
    status: "Operational",
    location: "Radiology Room 1",
    assignedTo: "Dr. Sarah Johnson",
  },
  {
    id: "PER002",
    equipmentName: "Ultrasound Scanner",
    model: "GE Voluson E10",
    serialNumber: "SN-US-2023-002",
    category: "Diagnostic Equipment",
    manufacturer: "GE Healthcare",
    purchaseDate: "2023-03-20",
    warrantyExpiry: "2026-03-20",
    lastMaintenance: "2024-10-01",
    nextMaintenance: "2025-01-01",
    status: "Operational",
    location: "Ultrasound Room",
    assignedTo: "Dr. Michael Chen",
  },
  {
    id: "PER003",
    equipmentName: "ECG Machine",
    model: "Philips PageWriter TC70",
    serialNumber: "SN-ECG-2022-015",
    category: "Diagnostic Equipment",
    manufacturer: "Philips",
    purchaseDate: "2022-06-10",
    warrantyExpiry: "2025-06-10",
    lastMaintenance: "2024-08-20",
    nextMaintenance: "2024-11-20",
    status: "Under Maintenance",
    location: "Cardiology Department",
    assignedTo: "Dr. Emily Rodriguez",
  },
  {
    id: "PER004",
    equipmentName: "Patient Monitor",
    model: "Mindray BeneView T8",
    serialNumber: "SN-PM-2023-008",
    category: "Monitoring Equipment",
    manufacturer: "Mindray",
    purchaseDate: "2023-05-12",
    warrantyExpiry: "2026-05-12",
    lastMaintenance: "2024-10-10",
    nextMaintenance: "2025-01-10",
    status: "Operational",
    location: "ICU Ward",
    assignedTo: "Nurse Station A",
  },
  {
    id: "PER005",
    equipmentName: "Defibrillator",
    model: "Zoll AED Plus",
    serialNumber: "SN-DEF-2023-012",
    category: "Emergency Equipment",
    manufacturer: "Zoll Medical",
    purchaseDate: "2023-07-25",
    warrantyExpiry: "2028-07-25",
    lastMaintenance: "2024-09-25",
    nextMaintenance: "2024-12-25",
    status: "Operational",
    location: "Emergency Room",
    assignedTo: "Emergency Team",
  },
  {
    id: "PER006",
    equipmentName: "Infusion Pump",
    model: "Baxter Sigma Spectrum",
    serialNumber: "SN-IP-2022-045",
    category: "Treatment Equipment",
    manufacturer: "Baxter",
    purchaseDate: "2022-11-08",
    warrantyExpiry: "2025-11-08",
    lastMaintenance: "2024-10-05",
    nextMaintenance: "2025-01-05",
    status: "Operational",
    location: "General Ward B",
    assignedTo: "Nurse Station B",
  },
  {
    id: "PER007",
    equipmentName: "Ventilator",
    model: "Dräger Evita V800",
    serialNumber: "SN-VEN-2023-003",
    category: "Life Support",
    manufacturer: "Dräger",
    purchaseDate: "2023-02-14",
    warrantyExpiry: "2028-02-14",
    lastMaintenance: "2024-10-20",
    nextMaintenance: "2025-01-20",
    status: "Operational",
    location: "ICU Ward",
    assignedTo: "ICU Team",
  },
  {
    id: "PER008",
    equipmentName: "Surgical Light",
    model: "Trumpf TruLight 5000",
    serialNumber: "SN-SL-2021-022",
    category: "Surgical Equipment",
    manufacturer: "Trumpf Medical",
    purchaseDate: "2021-09-30",
    warrantyExpiry: "2024-09-30",
    lastMaintenance: "2024-07-15",
    nextMaintenance: "2024-10-15",
    status: "Needs Maintenance",
    location: "Operating Room 2",
    assignedTo: "Surgical Team",
  },
]

export function PeripheralsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPeripherals = peripheralsData.filter((peripheral) => {
    const matchesSearch =
      peripheral.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peripheral.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peripheral.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peripheral.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || peripheral.category === categoryFilter
    const matchesStatus = statusFilter === "all" || peripheral.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Operational":
        return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">{status}</Badge>
      case "Under Maintenance":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">{status}</Badge>
      case "Needs Maintenance":
        return <Badge className="bg-orange-500/10 text-orange-700 hover:bg-orange-500/20">{status}</Badge>
      case "Out of Service":
        return <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const operationalCount = peripheralsData.filter((p) => p.status === "Operational").length
  const maintenanceCount = peripheralsData.filter(
    (p) => p.status === "Under Maintenance" || p.status === "Needs Maintenance"
  ).length

  return (
    <>
      <Header page="Peripherals" pages={["Physical Asset", "Peripherals"]}>
        <Link href="/peripherals/add">
          <Button>
            <IconPlus className="mr-2 h-4 w-4" />
            Add Equipment
          </Button>
        </Link>
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="@container/main flex flex-1 flex-col gap-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="text-muted-foreground text-sm font-medium">Total Equipment</div>
              <div className="mt-2 text-2xl font-bold">{peripheralsData.length}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-muted-foreground text-sm font-medium">Operational</div>
              <div className="mt-2 text-2xl font-bold text-green-600">{operationalCount}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-muted-foreground text-sm font-medium">Maintenance Required</div>
              <div className="mt-2 text-2xl font-bold text-yellow-600">{maintenanceCount}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-muted-foreground text-sm font-medium">Categories</div>
              <div className="mt-2 text-2xl font-bold">
                {new Set(peripheralsData.map((p) => p.category)).size}
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-sm">
              <IconSearch className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Diagnostic Equipment">Diagnostic Equipment</SelectItem>
                  <SelectItem value="Monitoring Equipment">Monitoring Equipment</SelectItem>
                  <SelectItem value="Emergency Equipment">Emergency Equipment</SelectItem>
                  <SelectItem value="Treatment Equipment">Treatment Equipment</SelectItem>
                  <SelectItem value="Life Support">Life Support</SelectItem>
                  <SelectItem value="Surgical Equipment">Surgical Equipment</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Operational">Operational</SelectItem>
                  <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                  <SelectItem value="Needs Maintenance">Needs Maintenance</SelectItem>
                  <SelectItem value="Out of Service">Out of Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Peripherals Table */}
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment ID</TableHead>
                  <TableHead>Equipment Name</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Next Maintenance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPeripherals.map((peripheral) => (
                  <TableRow key={peripheral.id}>
                    <TableCell className="font-medium">{peripheral.id}</TableCell>
                    <TableCell>{peripheral.equipmentName}</TableCell>
                    <TableCell>{peripheral.model}</TableCell>
                    <TableCell className="font-mono text-xs">{peripheral.serialNumber}</TableCell>
                    <TableCell>{peripheral.category}</TableCell>
                    <TableCell>{peripheral.location}</TableCell>
                    <TableCell>{peripheral.assignedTo}</TableCell>
                    <TableCell>{peripheral.nextMaintenance}</TableCell>
                    <TableCell>{getStatusBadge(peripheral.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <IconEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <IconTrash className="h-4 w-4" />
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

