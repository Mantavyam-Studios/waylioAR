import { PurchasesContent } from "./purchases-content"
import type { Metadata } from "next"

const title = "Purchases"
const description = "Manage purchase orders and expenses."

export const metadata: Metadata = {
  title,
  description,
}

export default function PurchasesPage() {
  return <PurchasesContent />
}

