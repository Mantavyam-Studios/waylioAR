import { PaymentMethodContent } from "./payment-method-content"
import type { Metadata } from "next"

const title = "Payment Method"
const description = "Manage payment methods and billing options."

export const metadata: Metadata = {
  title,
  description,
}

export default function PaymentMethodPage() {
  return <PaymentMethodContent />
}

