"use client"

import { useState } from "react"
import { Header } from "@/app/(authenticated)/components/header"
import { Button } from "@repo/design-system/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/design-system/components/ui/card"
import { Badge } from "@repo/design-system/components/ui/badge"
import { IconPlus, IconCreditCard, IconCash, IconBuildingBank, IconEdit, IconTrash } from "@tabler/icons-react"

const paymentMethodsData = [
  {
    id: "PM-001",
    type: "Credit Card",
    name: "Visa ending in 4242",
    isDefault: true,
    expiryDate: "12/2025",
    status: "Active",
  },
  {
    id: "PM-002",
    type: "Bank Transfer",
    name: "Chase Business Account",
    isDefault: false,
    accountNumber: "****5678",
    status: "Active",
  },
  {
    id: "PM-003",
    type: "Cash",
    name: "Cash Payments",
    isDefault: false,
    status: "Active",
  },
  {
    id: "PM-004",
    type: "Insurance",
    name: "Insurance Claims",
    isDefault: false,
    status: "Active",
  },
]

export function PaymentMethodContent() {
  const [paymentMethods] = useState(paymentMethodsData)

  const getIcon = (type: string) => {
    switch (type) {
      case "Credit Card":
        return <IconCreditCard className="h-8 w-8" />
      case "Cash":
        return <IconCash className="h-8 w-8" />
      case "Bank Transfer":
        return <IconBuildingBank className="h-8 w-8" />
      default:
        return <IconCreditCard className="h-8 w-8" />
    }
  }

  return (
    <>
      <Header page="Payment Method" pages={["Finance", "Payment Method"]}>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="@container/main flex flex-1 flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paymentMethods.map((method) => (
              <Card key={method.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-muted-foreground">{getIcon(method.type)}</div>
                      <div>
                        <CardTitle className="text-base">{method.type}</CardTitle>
                        <CardDescription className="text-sm">{method.name}</CardDescription>
                      </div>
                    </div>
                    {method.isDefault && (
                      <Badge className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20">Default</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {method.expiryDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Expiry Date</span>
                      <span className="text-sm font-medium">{method.expiryDate}</span>
                    </div>
                  )}
                  {method.accountNumber && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Account</span>
                      <span className="font-mono text-sm font-medium">{method.accountNumber}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-muted-foreground text-sm">Status</span>
                    <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">{method.status}</Badge>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <IconEdit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <IconTrash className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

