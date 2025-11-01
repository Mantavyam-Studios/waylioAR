import { PeripheralsContent } from "./peripherals-content"
import type { Metadata } from "next"

const title = "Peripherals"
const description = "Manage medical equipment and peripherals."

export const metadata: Metadata = {
  title,
  description,
}

export default function PeripheralsPage() {
  return <PeripheralsContent />
}

