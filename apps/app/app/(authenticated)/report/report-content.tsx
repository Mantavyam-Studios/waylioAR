"use client"

import { useState } from "react"
import { Header } from "@/app/(authenticated)/components/header"
import { Button } from "@repo/design-system/components/ui/button"
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
import { IconDownload, IconReport, IconFileAnalytics, IconChartBar } from "@tabler/icons-react"

const reportsData = [
  {
    id: "RPT-001",
    name: "Stock Inventory Report",
    description: "Complete inventory status and stock levels",
    category: "Inventory",
    lastGenerated: "2024-10-30",
    format: "PDF",
  },
  {
    id: "RPT-002",
    name: "Equipment Maintenance Report",
    description: "Equipment maintenance schedule and history",
    category: "Equipment",
    lastGenerated: "2024-10-28",
    format: "Excel",
  },
  {
    id: "RPT-003",
    name: "Asset Valuation Report",
    description: "Total asset value and depreciation analysis",
    category: "Financial",
    lastGenerated: "2024-10-25",
    format: "PDF",
  },
  {
    id: "RPT-004",
    name: "Peripheral Usage Report",
    description: "Equipment utilization and efficiency metrics",
    category: "Equipment",
    lastGenerated: "2024-10-27",
    format: "Excel",
  },
]

export function ReportContent() {
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredReports = reportsData.filter(
    (report) => categoryFilter === "all" || report.category === categoryFilter
  )

  const getIcon = (category: string) => {
    switch (category) {
      case "Inventory":
        return <IconReport className="h-8 w-8" />
      case "Equipment":
        return <IconFileAnalytics className="h-8 w-8" />
      case "Financial":
        return <IconChartBar className="h-8 w-8" />
      default:
        return <IconReport className="h-8 w-8" />
    }
  }

  return (
    <>
      <Header page="Report" pages={["Physical Asset", "Report"]}>
        <Button>
          <IconDownload className="mr-2 h-4 w-4" />
          Generate New Report
        </Button>
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="@container/main flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-semibold">Asset Reports</h3>
              <p className="text-muted-foreground text-sm">View and download asset-related reports</p>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Inventory">Inventory</SelectItem>
                <SelectItem value="Equipment">Equipment</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-muted-foreground">{getIcon(report.category)}</div>
                      <div>
                        <CardTitle className="text-base">{report.name}</CardTitle>
                        <CardDescription className="text-sm">{report.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Category</span>
                    <span className="text-sm font-medium">{report.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Last Generated</span>
                    <span className="text-sm">{report.lastGenerated}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Format</span>
                    <span className="text-sm font-medium">{report.format}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <IconDownload className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button size="sm" className="flex-1">
                      Regenerate
                    </Button>
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

