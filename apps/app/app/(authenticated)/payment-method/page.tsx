import { Header } from "@/app/(authenticated)/components/header"
import type { Metadata } from "next"

const title = "Payment Method"
const description = "Manage payment methods and billing options."

export const metadata: Metadata = {
  title,
  description,
}

export default function PaymentMethodPage() {
  return (
    <>
      <Header page="Payment Method" pages={["Finance", "Payment Method"]}>
        {/* Additional header content can go here */}
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="rounded-lg border p-8">
              <h2 className="text-2xl font-semibold">Payment Method</h2>
              <p className="text-muted-foreground mt-2">
                Manage payment methods and billing options here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

