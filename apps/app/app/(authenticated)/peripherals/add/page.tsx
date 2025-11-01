import { AddPeripheralForm } from "./add-peripheral-form"
import type { Metadata } from "next"

const title = "Add Equipment"
const description = "Add new medical equipment to inventory."

export const metadata: Metadata = {
  title,
  description,
}

export default function AddPeripheralPage() {
  return <AddPeripheralForm />
}

