import { StocksContent } from "./stocks-content"
import type { Metadata } from "next"

const title = "Stocks"
const description = "Manage inventory and stock levels."

export const metadata: Metadata = {
  title,
  description,
}

export default function StocksPage() {
  return <StocksContent />
}

