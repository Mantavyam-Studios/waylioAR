import { Header } from "@/app/(authenticated)/components/header"
import type { Metadata } from "next"

const title = "Staff List"
const description = "Manage clinic staff and personnel."

export const metadata: Metadata = {
  title,
  description,
}

export default function StaffListPage() {
  return (
    <>
      <Header page="Staff List" pages={["Clinic", "Staff List"]}>
        {/* Additional header content can go here */}
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="rounded-lg border p-8">
              <h2 className="text-2xl font-semibold">Staff List</h2>
              <p className="text-muted-foreground mt-2">
                Manage clinic staff and personnel here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

