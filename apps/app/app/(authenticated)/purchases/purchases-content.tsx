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
import { IconSearch, IconPlus, IconShoppingBag } from "@tabler/icons-react"

const purchasesData = [
  {
    id: "PO-001",
    date: "2024-10-28",
    supplier: "MedSupply Co.",
    items: "Surgical Gloves, Face Masks",
    quantity: 150,
    amount: 1950.00,
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
  },
  {
    id: "PO-002",
    date: "2024-10-25",
    supplier: "PharmaTech Inc.",
    items: "Antibiotics, Pain Relievers",
    quantity: 200,
    amount: 4500.00,
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
  },
  {
    id: "PO-003",
    date: "2024-10-30",
    supplier: "Equipment Solutions",
    items: "Blood Pressure Monitor",
    quantity: 5,
    amount: 1250.00,
    paymentStatus: "Pending",
    deliveryStatus: "In Transit",
  },
  {
    id: "PO-004",
    date: "2024-10-29",
    supplier: "Office Supplies Ltd.",
    items: "Paper, Pens, Folders",
    quantity: 100,
    amount: 350.00,
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
  },
  {
    id: "PO-005",
    date: "2024-10-27",
    supplier: "Cleaning Services Co.",
    items: "Disinfectants, Cleaning Supplies",
    quantity: 50,
    amount: 800.00,
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
  },
]

export function PurchasesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [deliveryFilter, setDeliveryFilter] = useState("all")

  const filteredPurchases = purchasesData.filter((purchase) => {
    const matchesSearch =
      purchase.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.items.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPayment = paymentFilter === "all" || purchase.paymentStatus === paymentFilter
    const matchesDelivery = deliveryFilter === "all" || purchase.deliveryStatus === deliveryFilter

    return matchesSearch && matchesPayment && matchesDelivery
  })

  const totalPurchases = purchasesData.reduce((sum, p) => sum + p.amount, 0)
  const pendingPayments = purchasesData.filter((p) => p.paymentStatus === "Pending").reduce((sum, p) => sum + p.amount, 0)

  return (
    <>
      <Header page="Purchases" pages={["Finance", "Purchases"]}>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          New Purchase Order
        </Button>
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="@container/main flex flex-1 flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Total Purchases</div>
                <IconShoppingBag className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold">${totalPurchases.toFixed(2)}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Pending Payments</div>
                <IconShoppingBag className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold text-yellow-600">${pendingPayments.toFixed(2)}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-muted-foreground text-sm font-medium">Total Orders</div>
              <div className="mt-2 text-2xl font-bold">{purchasesData.length}</div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-sm">
              <IconSearch className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search purchases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={deliveryFilter} onValueChange={setDeliveryFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Delivery" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Deliveries</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Delivery Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPurchases.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell className="font-medium font-mono text-xs">{purchase.id}</TableCell>
                    <TableCell>{purchase.date}</TableCell>
                    <TableCell>{purchase.supplier}</TableCell>
                    <TableCell>{purchase.items}</TableCell>
                    <TableCell>{purchase.quantity}</TableCell>
                    <TableCell className="font-semibold">${purchase.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          purchase.paymentStatus === "Paid"
                            ? "bg-green-500/10 text-green-700 hover:bg-green-500/20"
                            : "bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20"
                        }
                      >
                        {purchase.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          purchase.deliveryStatus === "Delivered"
                            ? "bg-green-500/10 text-green-700 hover:bg-green-500/20"
                            : "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20"
                        }
                      >
                        {purchase.deliveryStatus}
                      </Badge>
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

