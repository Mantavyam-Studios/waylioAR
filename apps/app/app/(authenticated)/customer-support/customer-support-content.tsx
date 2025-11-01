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
import { IconSearch, IconPlus, IconHeadset } from "@tabler/icons-react"

const supportTicketsData = [
  {
    id: "TKT-001",
    subject: "Equipment malfunction - X-Ray Machine",
    category: "Technical",
    priority: "High",
    status: "Open",
    createdDate: "2024-10-30",
    assignedTo: "Support Team A",
  },
  {
    id: "TKT-002",
    subject: "Billing inquiry for invoice INV-2024-001",
    category: "Billing",
    priority: "Medium",
    status: "In Progress",
    createdDate: "2024-10-29",
    assignedTo: "Support Team B",
  },
  {
    id: "TKT-003",
    subject: "Request for new feature - Patient portal",
    category: "Feature Request",
    priority: "Low",
    status: "Open",
    createdDate: "2024-10-28",
    assignedTo: "Support Team A",
  },
  {
    id: "TKT-004",
    subject: "Login issues with staff account",
    category: "Technical",
    priority: "High",
    status: "Resolved",
    createdDate: "2024-10-27",
    assignedTo: "Support Team C",
  },
  {
    id: "TKT-005",
    subject: "Question about inventory management",
    category: "General",
    priority: "Low",
    status: "In Progress",
    createdDate: "2024-10-26",
    assignedTo: "Support Team B",
  },
]

export function CustomerSupportContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredTickets = supportTicketsData.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return <Badge className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20">{status}</Badge>
      case "In Progress":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">{status}</Badge>
      case "Resolved":
        return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">{status}</Badge>
      case "Closed":
        return <Badge className="bg-gray-500/10 text-gray-700 hover:bg-gray-500/20">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20">{priority}</Badge>
      case "Medium":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">{priority}</Badge>
      case "Low":
        return <Badge className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20">{priority}</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const totalTickets = supportTicketsData.length
  const openTickets = supportTicketsData.filter((t) => t.status === "Open").length
  const resolvedTickets = supportTicketsData.filter((t) => t.status === "Resolved").length

  return (
    <>
      <Header page="Customer Support" pages={["Support"]}>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          New Ticket
        </Button>
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="@container/main flex flex-1 flex-col gap-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Total Tickets</div>
                <IconHeadset className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold">{totalTickets}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Open Tickets</div>
                <IconHeadset className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold text-blue-600">{openTickets}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Resolved</div>
                <IconHeadset className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold text-green-600">{resolvedTickets}</div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-sm">
              <IconSearch className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Support Tickets Table */}
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Assigned To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium font-mono text-xs">{ticket.id}</TableCell>
                    <TableCell className="font-medium">{ticket.subject}</TableCell>
                    <TableCell>{ticket.category}</TableCell>
                    <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell>{ticket.createdDate}</TableCell>
                    <TableCell>{ticket.assignedTo}</TableCell>
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

