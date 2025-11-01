import { PatientsContent } from "./patients-content"
import type { Metadata } from "next"

const title = "Patients"
const description = "Manage patient records and information."

export const metadata: Metadata = {
  title,
  description,
}

export default function PatientsPage() {
  return <PatientsContent />
}

