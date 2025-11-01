import { CustomerSupportContent } from "./customer-support-content"
import type { Metadata } from "next"

const title = "Customer Support"
const description = "Access customer support and help resources."

export const metadata: Metadata = {
  title,
  description,
}

export default function CustomerSupportPage() {
  return <CustomerSupportContent />
}

