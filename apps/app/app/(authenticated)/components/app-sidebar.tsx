"use client"

import * as React from "react"
import {
  IconDashboard,
  IconCalendarEvent,
  IconUsers,
  IconMedicineSyrup,
  IconUserCheck,
  IconCoin,
  IconShoppingCart,
  IconShoppingBag,
  IconCreditCard,
  IconPackage,
  IconDevices,
  IconReport,
  IconHeadset,
  IconInnerShadowTop,
  IconLogout,
} from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth, useUser } from "@repo/auth/client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/design-system/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@repo/design-system/components/ui/sidebar"

// Navigation structure with sections
const navigationSections = [
  {
    title: null, // No label for Dashboard
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: IconDashboard,
      },
    ],
  },
  {
    title: "CLINIC",
    items: [
      {
        title: "Reservations",
        url: "/reservations",
        icon: IconCalendarEvent,
      },
      {
        title: "Patients",
        url: "/patients",
        icon: IconUsers,
      },
      {
        title: "Treatments",
        url: "/treatments",
        icon: IconMedicineSyrup,
      },
      {
        title: "Staff List",
        url: "/staff-list",
        icon: IconUserCheck,
      },
    ],
  },
  {
    title: "FINANCE",
    items: [
      {
        title: "Accounts",
        url: "/accounts",
        icon: IconCoin,
      },
      {
        title: "Sales",
        url: "/sales",
        icon: IconShoppingCart,
      },
      {
        title: "Purchases",
        url: "/purchases",
        icon: IconShoppingBag,
      },
      {
        title: "Payment Method",
        url: "/payment-method",
        icon: IconCreditCard,
      },
    ],
  },
  {
    title: "PHYSICAL ASSET",
    items: [
      {
        title: "Stocks",
        url: "/stocks",
        icon: IconPackage,
      },
      {
        title: "Peripherals",
        url: "/peripherals",
        icon: IconDevices,
      },
      {
        title: "Report",
        url: "/report",
        icon: IconReport,
      },
    ],
  },
  {
    title: null, // No label for Customer Support
    items: [
      {
        title: "Customer Support",
        url: "/customer-support",
        icon: IconHeadset,
      },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { signOut } = useAuth()
  const { user } = useUser()

  const userName = user?.fullName || user?.firstName || "User"
  const userEmail = user?.primaryEmailAddress?.emailAddress || ""
  const userAvatar = user?.imageUrl || ""
  const userInitials = user?.firstName?.[0] || user?.lastName?.[0] || "U"

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Waylio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navigationSections.map((section, sectionIndex) => (
          <SidebarGroup key={sectionIndex}>
            {section.title && (
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground">
                {section.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isActive = pathname === item.url
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={isActive}
                        className={isActive ? "bg-primary/10 text-primary" : ""}
                      >
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/profile">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="rounded-lg">{userInitials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userName}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {userEmail}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarSeparator />
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSignOut} tooltip="Sign out">
              <IconLogout />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
