"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { useTokenStore } from "@/modules/auth/hooks/authToken"

export function NavMain({
    groups,
}: {
    groups: {
        label: string,
        permission: string[],
        items: {
            title: string
            url: string,
            permission: string[],
            icon?: LucideIcon
            isActive?: boolean
            badge?: string
            items?: {
                title: string
                url: string,
                permission: string[],
            }[]
        }[]
    }[]
}) {
    const { isMobile, state } = useSidebar();

    const { roles } = useTokenStore();

    return (
        <>
            {groups.map((group) => (
                <div key={group.label}>
                    {roles?.map((role) => group.permission.includes(role) && (
                        <div key={role}>
                            <SidebarGroup>
                                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                                <SidebarMenu>
                                    {group.items.map((item) => {
                                        const hasSubItems = item.items && item.items.length > 0;
                                        const useFloating = hasSubItems && (isMobile || state === "collapsed");

                                        if (useFloating) {
                                            return (
                                                <SidebarMenuItem key={role}>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <SidebarMenuButton tooltip={item.title} isActive={item.isActive}>
                                                                {item.icon && <item.icon />}
                                                                <span>{item.title}</span>
                                                                {item.badge && (
                                                                    <span className="ml-auto bg-purple-100 text-purple-600 text-[10px] px-1.5 py-0.5 rounded-sm font-medium">
                                                                        {item.badge}
                                                                    </span>
                                                                )}
                                                                <ChevronRight className="ml-auto size-4" />
                                                            </SidebarMenuButton>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent
                                                            side={isMobile ? "bottom" : "right"}
                                                            align={isMobile ? "end" : "start"}
                                                            className="min-w-56 rounded-lg"
                                                        >
                                                            {item.items?.map((subItem) => (
                                                                roles.map((role) => subItem.permission.includes(role) && (
                                                                    <DropdownMenuItem key={subItem.title} asChild>
                                                                        <a href={subItem.url}>
                                                                            <span>{subItem.title}</span>
                                                                        </a>
                                                                    </DropdownMenuItem>
                                                                ))
                                                            ))}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </SidebarMenuItem>
                                            )
                                        }

                                        return hasSubItems ? (
                                            <Collapsible
                                                key={item.title}
                                                asChild
                                                defaultOpen={item.isActive}
                                                className="group/collapsible"
                                            >
                                                <SidebarMenuItem>
                                                    <CollapsibleTrigger asChild>
                                                        <SidebarMenuButton tooltip={item.title}>
                                                            {item.icon && <item.icon />}
                                                            <span>{item.title}</span>
                                                            {item.badge && (
                                                                <span className="ml-auto bg-purple-100 text-purple-600 text-[10px] px-1.5 py-0.5 rounded-sm font-medium">
                                                                    {item.badge}
                                                                </span>
                                                            )}
                                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                        </SidebarMenuButton>
                                                    </CollapsibleTrigger>
                                                    <CollapsibleContent>
                                                        <SidebarMenuSub>
                                                            {item.items?.map((subItem) => (
                                                                roles.map((role) => subItem.permission.includes(role) && (
                                                                    <SidebarMenuSubItem key={subItem.title}>
                                                                        <SidebarMenuSubButton asChild>
                                                                            <a href={subItem.url}>
                                                                                <span>{subItem.title}</span>
                                                                            </a>
                                                                        </SidebarMenuSubButton>
                                                                    </SidebarMenuSubItem>
                                                                ))
                                                            ))}
                                                        </SidebarMenuSub>
                                                    </CollapsibleContent>
                                                </SidebarMenuItem>
                                            </Collapsible>
                                        ) : (
                                            roles.map((role) => item.permission.includes(role) && (
                                                <SidebarMenuItem key={role}>
                                                    <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive}>
                                                        <a href={item.url}>
                                                            {item.icon && <item.icon />}
                                                            <span>{item.title}</span>
                                                            {item.badge && (
                                                                <span className="ml-auto bg-purple-100 text-purple-600 text-[10px] px-1.5 py-0.5 rounded-sm font-medium">
                                                                    {item.badge}
                                                                </span>
                                                            )}
                                                        </a>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))
                                        )
                                    })}
                                </SidebarMenu>
                            </SidebarGroup>
                            <Separator className="my-2" />
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}
