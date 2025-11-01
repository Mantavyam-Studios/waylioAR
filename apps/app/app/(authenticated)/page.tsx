import { ChartAreaInteractive } from "@/app/(authenticated)/components/chart-area-interactive"
import { DataTable } from "@/app/(authenticated)/components/data-table"
import { SectionCards } from "@/app/(authenticated)/components/section-cards"
import { Header } from "@/app/(authenticated)/components/header"
import type { Metadata } from "next"

import data from "./dashboard/data.json"

const title = "Dashboard"
const description = "Waylio healthcare platform dashboard with analytics and insights."

export const metadata: Metadata = {
  title,
  description,
}

export default function DashboardPage() {
  return (
    <>
      <Header page="Dashboard" pages={["Home"]}>
        {/* Additional header content can go here */}
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </>
  )
}
