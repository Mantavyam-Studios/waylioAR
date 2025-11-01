import { TreatmentsContent } from "./treatments-content"
import type { Metadata } from "next"

const title = "Treatments"
const description = "Manage medical treatments and procedures."

export const metadata: Metadata = {
  title,
  description,
}

export default function TreatmentsPage() {
  return <TreatmentsContent />
}

