import { SalesContent } from "./sales-content"
import type { Metadata } from "next"

const title = "Sales"
const description = "Manage sales transactions and revenue."

export const metadata: Metadata = {
  title,
  description,
}

export default function SalesPage() {
  return <SalesContent />
}

