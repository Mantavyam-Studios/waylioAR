import { AccountsContent } from "./accounts-content"
import type { Metadata } from "next"

const title = "Accounts"
const description = "Manage financial accounts and ledgers."

export const metadata: Metadata = {
  title,
  description,
}

export default function AccountsPage() {
  return <AccountsContent />
}

