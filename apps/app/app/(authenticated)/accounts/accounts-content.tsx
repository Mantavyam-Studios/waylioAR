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
import { Badge } from "@repo/design-system/components/ui/badge"
import { IconSearch, IconPlus, IconCoin, IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"

const accountsData = [
  {
    id: "ACC-001",
    accountName: "Operating Account",
    accountType: "Asset",
    balance: 125000.00,
    lastTransaction: "2024-10-30",
    status: "Active",
  },
  {
    id: "ACC-002",
    accountName: "Payroll Account",
    accountType: "Liability",
    balance: 45000.00,
    lastTransaction: "2024-10-28",
    status: "Active",
  },
  {
    id: "ACC-003",
    accountName: "Equipment Fund",
    accountType: "Asset",
    balance: 80000.00,
    lastTransaction: "2024-10-25",
    status: "Active",
  },
  {
    id: "ACC-004",
    accountName: "Revenue Account",
    accountType: "Revenue",
    balance: 250000.00,
    lastTransaction: "2024-10-30",
    status: "Active",
  },
  {
    id: "ACC-005",
    accountName: "Expense Account",
    accountType: "Expense",
    balance: -95000.00,
    lastTransaction: "2024-10-29",
    status: "Active",
  },
]

export function AccountsContent() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAccounts = accountsData.filter((account) =>
    account.accountName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalAssets = accountsData.filter((a) => a.accountType === "Asset").reduce((sum, a) => sum + a.balance, 0)
  const totalRevenue = accountsData.filter((a) => a.accountType === "Revenue").reduce((sum, a) => sum + a.balance, 0)
  const totalExpenses = Math.abs(accountsData.filter((a) => a.accountType === "Expense").reduce((sum, a) => sum + a.balance, 0))

  return (
    <>
      <Header page="Accounts" pages={["Finance", "Accounts"]}>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          New Account
        </Button>
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="@container/main flex flex-1 flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Total Assets</div>
                <IconTrendingUp className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold text-green-600">${totalAssets.toFixed(2)}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Total Revenue</div>
                <IconCoin className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold text-blue-600">${totalRevenue.toFixed(2)}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm font-medium">Total Expenses</div>
                <IconTrendingDown className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="mt-2 text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border bg-card p-4">
            <div className="relative flex-1 md:max-w-sm">
              <IconSearch className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search accounts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account ID</TableHead>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Last Transaction</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium font-mono text-xs">{account.id}</TableCell>
                    <TableCell className="font-medium">{account.accountName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{account.accountType}</Badge>
                    </TableCell>
                    <TableCell className={`font-semibold ${account.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ${Math.abs(account.balance).toFixed(2)}
                    </TableCell>
                    <TableCell>{account.lastTransaction}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">{account.status}</Badge>
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

