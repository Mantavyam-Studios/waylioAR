import { ReportContent } from "./report-content"
import type { Metadata } from "next"

const title = "Report"
const description = "View and generate asset reports."

export const metadata: Metadata = {
  title,
  description,
}

export default function ReportPage() {
  return <ReportContent />
}

