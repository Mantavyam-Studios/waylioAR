import { ReservationsContent } from "./reservations-content"
import type { Metadata } from "next"

const title = "Reservations"
const description = "Manage clinic reservations and appointments."

export const metadata: Metadata = {
  title,
  description,
}

export default function ReservationsPage() {
  return <ReservationsContent />
}

