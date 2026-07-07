"use client"

import * as React from "react"
import {
    ArrowRightLeft,
    BarChart2,
    Box,
    CreditCard,
    FileText,
    HelpCircle,
    LayoutDashboard,
    MessageSquare,
    Settings,
    ShieldCheck,
    Users,
    Workflow,
    Command,
} from "lucide-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { navigationData } from "@/core/data/menu"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-600 text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-bold text-xl text-indigo-900 dark:text-indigo-100">Nexus</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain groups={navigationData.navGroups} />
            </SidebarContent>
            <SidebarFooter>
                <div className="p-2">
                    <div className="flex items-center p-2 rounded-lg bg-sidebar-accent/50 border border-sidebar-border">
                        <div className="flex aspect-square size-8 items-center justify-center rounded bg-teal-500 text-white">
                            <Command className="size-4" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">Team</span>
                            <span className="truncate text-xs">Marketing</span>
                        </div>
                        <ArrowRightLeft className="size-4 rotate-90 text-muted-foreground" />
                    </div>
                    <div className="mt-2">
                        <button className="w-full py-1.5 text-sm font-medium text-center border rounded-md hover:bg-sidebar-accent transition-colors">
                            Upgrade Plan
                        </button>
                    </div>
                </div>
                <div className="text-center text-[10px] text-muted-foreground pb-2">
                    &copy; 2023 Nexus.io, Inc.
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
