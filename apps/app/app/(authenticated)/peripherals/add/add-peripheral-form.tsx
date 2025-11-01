"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/app/(authenticated)/components/header"
import { Button } from "@repo/design-system/components/ui/button"
import { Input } from "@repo/design-system/components/ui/input"
import { Label } from "@repo/design-system/components/ui/label"
import { Textarea } from "@repo/design-system/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/design-system/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card"
import { IconArrowLeft, IconDeviceFloppy } from "@tabler/icons-react"

export function AddPeripheralForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    equipmentName: "",
    model: "",
    serialNumber: "",
    category: "",
    manufacturer: "",
    purchaseDate: "",
    warrantyExpiry: "",
    location: "",
    assignedTo: "",
    status: "Operational",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    // Show success message and redirect
    alert("Equipment added successfully!")
    router.push("/peripherals")
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <Header page="Add Equipment" pages={["Physical Asset", "Peripherals", "Add Equipment"]}>
        <Button variant="outline" onClick={() => router.back()}>
          <IconArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="@container/main mx-auto w-full max-w-4xl">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Equipment Information</CardTitle>
                <CardDescription>
                  Enter the details of the new medical equipment or peripheral device.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="equipmentName">
                        Equipment Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="equipmentName"
                        placeholder="e.g., X-Ray Machine"
                        value={formData.equipmentName}
                        onChange={(e) => handleChange("equipmentName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">
                        Model <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="model"
                        placeholder="e.g., Siemens Mobilett XP"
                        value={formData.model}
                        onChange={(e) => handleChange("model", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serialNumber">
                        Serial Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="serialNumber"
                        placeholder="e.g., SN-XR-2024-001"
                        value={formData.serialNumber}
                        onChange={(e) => handleChange("serialNumber", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manufacturer">
                        Manufacturer <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="manufacturer"
                        placeholder="e.g., Siemens"
                        value={formData.manufacturer}
                        onChange={(e) => handleChange("manufacturer", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Category and Status */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Classification</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Diagnostic Equipment">Diagnostic Equipment</SelectItem>
                          <SelectItem value="Monitoring Equipment">Monitoring Equipment</SelectItem>
                          <SelectItem value="Emergency Equipment">Emergency Equipment</SelectItem>
                          <SelectItem value="Treatment Equipment">Treatment Equipment</SelectItem>
                          <SelectItem value="Life Support">Life Support</SelectItem>
                          <SelectItem value="Surgical Equipment">Surgical Equipment</SelectItem>
                          <SelectItem value="Laboratory Equipment">Laboratory Equipment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">
                        Status <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Operational">Operational</SelectItem>
                          <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                          <SelectItem value="Needs Maintenance">Needs Maintenance</SelectItem>
                          <SelectItem value="Out of Service">Out of Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Purchase and Warranty */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Purchase & Warranty</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="purchaseDate">
                        Purchase Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="purchaseDate"
                        type="date"
                        value={formData.purchaseDate}
                        onChange={(e) => handleChange("purchaseDate", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="warrantyExpiry">Warranty Expiry Date</Label>
                      <Input
                        id="warrantyExpiry"
                        type="date"
                        value={formData.warrantyExpiry}
                        onChange={(e) => handleChange("warrantyExpiry", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Location and Assignment */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Location & Assignment</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="location">
                        Location <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="location"
                        placeholder="e.g., Radiology Room 1"
                        value={formData.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assignedTo">Assigned To</Label>
                      <Input
                        id="assignedTo"
                        placeholder="e.g., Dr. Sarah Johnson"
                        value={formData.assignedTo}
                        onChange={(e) => handleChange("assignedTo", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Additional Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Enter any additional notes or special instructions..."
                      value={formData.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <IconDeviceFloppy className="mr-2 h-4 w-4" />
                    Save Equipment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </>
  )
}

