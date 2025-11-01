import { StaffListContent } from "./staff-list-content"
import type { Metadata } from "next"

const title = "Staff List"
const description = "Manage clinic staff and personnel."

export const metadata: Metadata = {
  title,
  description,
}

export default function StaffListPage() {
  return <StaffListContent />
}

