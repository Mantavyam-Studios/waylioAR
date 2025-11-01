import { Header } from "@/app/(authenticated)/components/header"
import type { Metadata } from "next"

const title = "Patients"
const description = "Manage patient records and information."

export const metadata: Metadata = {
  title,
  description,
}

export default function PatientsPage() {
  return (
    <>
      <Header page="Patients" pages={["Clinic", "Patients"]}>
        {/* Additional header content can go here */}
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="rounded-lg border p-8">
              <h2 className="text-2xl font-semibold">Patients</h2>
              <p className="text-muted-foreground mt-2">
                Manage patient records and information here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

