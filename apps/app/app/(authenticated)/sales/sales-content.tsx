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
import {
  IconSearch,
  IconPlus,
  IconDownload,
  IconTrendingUp,
  IconCash,
  IconReceipt,
} from "@tabler/icons-react"

// Sample sales data
const salesData = [
  {
    id: "INV-2024-001",
    date: "2024-10-30",
    patientName: "Rajesh Kumar",
    patientId: "PAT-001",
    items: "Consultation + Lab Tests",
    quantity: 1,
    amount: 250.00,
    paymentMethod: "Credit Card",
    status: "Paid",
    invoicedBy: "Dr. Priya Sharma",
  },
  {
    id: "INV-2024-002",
    date: "2024-10-30",
    patientName: "Priya Patel",
    patientId: "PAT-002",
    items: "X-Ray Scan",
    quantity: 1,
    amount: 180.00,
    paymentMethod: "Insurance",
    status: "Paid",
    invoicedBy: "Dr. Arjun Reddy",
  },
  {
    id: "INV-2024-003",
    date: "2024-10-29",
    patientName: "Amit Singh",
    patientId: "PAT-003",
    items: "Ultrasound + Consultation",
    quantity: 1,
    amount: 320.00,
    paymentMethod: "Cash",
    status: "Paid",
    invoicedBy: "Dr. Kavita Menon",
  },
  {
    id: "INV-2024-004",
    date: "2024-10-29",
    patientName: "Sneha Desai",
    patientId: "PAT-004",
    items: "ECG Test",
    quantity: 1,
    amount: 150.00,
    paymentMethod: "Debit Card",
    status: "Pending",
    invoicedBy: "Dr. Priya Sharma",
  },
  {
    id: "INV-2024-005",
    date: "2024-10-28",
    patientName: "Aarav Gupta",
    patientId: "PAT-005",
    items: "Blood Test Panel",
    quantity: 1,
    amount: 200.00,
    paymentMethod: "Insurance",
    status: "Paid",
    invoicedBy: "Dr. Arjun Reddy",
  },
  {
    id: "INV-2024-006",
    date: "2024-10-28",
    patientName: "Anjali Nair",
    patientId: "PAT-006",
    items: "Consultation + Prescription",
    quantity: 1,
    amount: 120.00,
    paymentMethod: "Credit Card",
    status: "Paid",
    invoicedBy: "Dr. Kavita Menon",
  },
  {
    id: "INV-2024-007",
    date: "2024-10-27",
    patientName: "Suresh Iyer",
    patientId: "PAT-007",
    items: "Physical Therapy Session",
    quantity: 1,
    amount: 95.00,
    paymentMethod: "Cash",
    status: "Paid",
    invoicedBy: "Therapist Neha Joshi",
  },
  {
    id: "INV-2024-008",
    date: "2024-10-27",
    patientName: "Kavita Rao",
    patientId: "PAT-008",
    items: "Dental Checkup",
    quantity: 1,
    amount: 85.00,
    paymentMethod: "Debit Card",
    status: "Cancelled",
    invoicedBy: "Dr. Priya Sharma",
  },
]

export function SalesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")

  const filteredSales = salesData.filter((sale) => {
    const matchesSearch =
      sale.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.items.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || sale.status === statusFilter
    const matchesPayment = paymentFilter === "all" || sale.paymentMethod === paymentFilter

    return matchesSearch && matchesStatus && matchesPayment
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">{status}</Badge>
      case "Pending":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">{status}</Badge>
      case "Cancelled":
        return <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const totalRevenue = salesData.filter((s) => s.status === "Paid").reduce((sum, sale) => sum + sale.amount, 0)
  const pendingAmount = salesData.filter((s) => s.status === "Pending").reduce((sum, sale) => sum + sale.amount, 0)
  const totalTransactions = salesData.length
  const paidTransactions = salesData.filter((s) => s.status === "Paid").length

  return (
    <>
      <Header page="Sales" pages={["Finance", "Sales"]}>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          New Invoice
        </Button>
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="@container/main flex flex-1 flex-col gap-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Total Revenue</div>
                <IconTrendingUp className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</div>
              <p className="text-muted-foreground mt-1 text-xs">From {paidTransactions} paid transactions</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Pending Amount</div>
                <IconCash className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold text-yellow-600">${pendingAmount.toFixed(2)}</div>
              <p className="text-muted-foreground mt-1 text-xs">Awaiting payment</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Total Transactions</div>
                <IconReceipt className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold">{totalTransactions}</div>
              <p className="text-muted-foreground mt-1 text-xs">This period</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Average Sale</div>
                <IconTrendingUp className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold">
                ${paidTransactions > 0 ? (totalRevenue / paidTransactions).toFixed(2) : "0.00"}
              </div>
              <p className="text-muted-foreground mt-1 text-xs">Per transaction</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-sm">
              <IconSearch className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search invoices..."
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
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Debit Card">Debit Card</SelectItem>
                  <SelectItem value="Insurance">Insurance</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <IconDownload className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Sales Table */}
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Items/Services</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Invoiced By</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.id}</TableCell>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>{sale.patientName}</TableCell>
                    <TableCell className="font-mono text-xs">{sale.patientId}</TableCell>
                    <TableCell>{sale.items}</TableCell>
                    <TableCell className="font-semibold">${sale.amount.toFixed(2)}</TableCell>
                    <TableCell>{sale.paymentMethod}</TableCell>
                    <TableCell>{sale.invoicedBy}</TableCell>
                    <TableCell>{getStatusBadge(sale.status)}</TableCell>
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

