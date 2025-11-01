"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@repo/design-system/components/ui/separator"
import { SidebarTrigger } from "@repo/design-system/components/ui/sidebar"

// Map routes to page titles
const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/reservations": "Reservations",
  "/patients": "Patients",
  "/treatments": "Treatments",
  "/staff-list": "Staff List",
  "/accounts": "Accounts",
  "/sales": "Sales",
  "/purchases": "Purchases",
  "/payment-method": "Payment Method",
  "/stocks": "Stocks",
  "/peripherals": "Peripherals",
  "/report": "Report",
  "/customer-support": "Customer Support",
}

export function SiteHeader() {
  const pathname = usePathname()
  const pageTitle = routeTitles[pathname] || "Waylio"

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{pageTitle}</h1>
      </div>
    </header>
  )
}
