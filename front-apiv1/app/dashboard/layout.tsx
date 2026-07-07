"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import ContenedorUser from "@/components/dashboard/contenedor-user"
import { useTokenStore } from "@/modules/auth/hooks/authToken";
import { useEffect } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const hydrate = useTokenStore((s) => s.hydrate);
    useEffect(() => {
        hydrate();
    }, []);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
                    <div className="flex items-center gap-2 mr-auto">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search"
                                className="pl-9 w-[300px] bg-muted/50 border-none shadow-none focus-visible:ring-1"
                            />
                            <kbd className="pointer-events-none absolute right-2.5 top-2.5 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                <span className="text-xs">⌘</span>F
                            </kbd>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <ContenedorUser />
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 bg-gray-100">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
