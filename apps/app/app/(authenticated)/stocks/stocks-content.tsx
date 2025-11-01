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
import { IconSearch, IconPlus, IconDownload, IconFilter } from "@tabler/icons-react"

// Sample stock data
const stocksData = [
  {
    id: "STK001",
    itemName: "Surgical Gloves (Box)",
    category: "Medical Supplies",
    quantity: 45,
    minQuantity: 20,
    unit: "Box",
    unitPrice: 12.99,
    totalValue: 584.55,
    supplier: "MedSupply Co.",
    lastRestocked: "2024-10-28",
    expiryDate: "2025-12-31",
    status: "In Stock",
  },
  {
    id: "STK002",
    itemName: "Disposable Syringes 5ml",
    category: "Medical Supplies",
    quantity: 8,
    minQuantity: 15,
    unit: "Pack",
    unitPrice: 8.50,
    totalValue: 68.00,
    supplier: "HealthCare Plus",
    lastRestocked: "2024-10-25",
    expiryDate: "2025-06-30",
    status: "Low Stock",
  },
  {
    id: "STK003",
    itemName: "Bandages (Sterile)",
    category: "Medical Supplies",
    quantity: 120,
    minQuantity: 30,
    unit: "Pack",
    unitPrice: 3.25,
    totalValue: 390.00,
    supplier: "MedSupply Co.",
    lastRestocked: "2024-10-30",
    expiryDate: "2026-03-15",
    status: "In Stock",
  },
  {
    id: "STK004",
    itemName: "Antiseptic Solution 500ml",
    category: "Pharmaceuticals",
    quantity: 25,
    minQuantity: 10,
    unit: "Bottle",
    unitPrice: 6.75,
    totalValue: 168.75,
    supplier: "PharmaDirect",
    lastRestocked: "2024-10-27",
    expiryDate: "2025-09-20",
    status: "In Stock",
  },
  {
    id: "STK005",
    itemName: "Cotton Swabs",
    category: "Medical Supplies",
    quantity: 5,
    minQuantity: 20,
    unit: "Box",
    unitPrice: 4.50,
    totalValue: 22.50,
    supplier: "HealthCare Plus",
    lastRestocked: "2024-10-20",
    expiryDate: "2026-01-10",
    status: "Low Stock",
  },
  {
    id: "STK006",
    itemName: "Face Masks (N95)",
    category: "PPE",
    quantity: 200,
    minQuantity: 50,
    unit: "Box",
    unitPrice: 15.99,
    totalValue: 3198.00,
    supplier: "SafetyFirst Inc.",
    lastRestocked: "2024-10-29",
    expiryDate: "2027-12-31",
    status: "In Stock",
  },
  {
    id: "STK007",
    itemName: "Alcohol Wipes",
    category: "Medical Supplies",
    quantity: 2,
    minQuantity: 15,
    unit: "Pack",
    unitPrice: 5.25,
    totalValue: 10.50,
    supplier: "MedSupply Co.",
    lastRestocked: "2024-10-15",
    expiryDate: "2025-08-30",
    status: "Out of Stock",
  },
  {
    id: "STK008",
    itemName: "Thermometer Covers",
    category: "Medical Supplies",
    quantity: 75,
    minQuantity: 25,
    unit: "Pack",
    unitPrice: 2.99,
    totalValue: 224.25,
    supplier: "HealthCare Plus",
    lastRestocked: "2024-10-26",
    expiryDate: "2026-05-15",
    status: "In Stock",
  },
]

export function StocksContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredStocks = stocksData.filter((stock) => {
    const matchesSearch =
      stock.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.supplier.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || stock.category === categoryFilter
    const matchesStatus = statusFilter === "all" || stock.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">{status}</Badge>
      case "Low Stock":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">{status}</Badge>
      case "Out of Stock":
        return <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const totalValue = filteredStocks.reduce((sum, stock) => sum + stock.totalValue, 0)
  const lowStockItems = stocksData.filter((s) => s.status === "Low Stock" || s.status === "Out of Stock").length

  return (
    <>
      <Header page="Stocks" pages={["Physical Asset", "Stocks"]}>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          Add Stock Item
        </Button>
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="@container/main flex flex-1 flex-col gap-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="text-muted-foreground text-sm font-medium">Total Items</div>
              <div className="mt-2 text-2xl font-bold">{stocksData.length}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-muted-foreground text-sm font-medium">Total Value</div>
              <div className="mt-2 text-2xl font-bold">${totalValue.toFixed(2)}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-muted-foreground text-sm font-medium">Low Stock Alerts</div>
              <div className="mt-2 text-2xl font-bold text-yellow-600">{lowStockItems}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-muted-foreground text-sm font-medium">Categories</div>
              <div className="mt-2 text-2xl font-bold">
                {new Set(stocksData.map((s) => s.category)).size}
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-sm">
              <IconSearch className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search stocks..."
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
                  <SelectItem value="Medical Supplies">Medical Supplies</SelectItem>
                  <SelectItem value="Pharmaceuticals">Pharmaceuticals</SelectItem>
                  <SelectItem value="PPE">PPE</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <IconDownload className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Stocks Table */}
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item ID</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStocks.map((stock) => (
                  <TableRow key={stock.id}>
                    <TableCell className="font-medium">{stock.id}</TableCell>
                    <TableCell>{stock.itemName}</TableCell>
                    <TableCell>{stock.category}</TableCell>
                    <TableCell>
                      {stock.quantity} {stock.unit}
                    </TableCell>
                    <TableCell>${stock.unitPrice.toFixed(2)}</TableCell>
                    <TableCell>${stock.totalValue.toFixed(2)}</TableCell>
                    <TableCell>{stock.supplier}</TableCell>
                    <TableCell>{stock.expiryDate}</TableCell>
                    <TableCell>{getStatusBadge(stock.status)}</TableCell>
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

