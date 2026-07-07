import { ArrowRightLeft, BarChart2, Box, Command, FileText, HelpCircle, LayoutDashboard, MessageSquare, Settings, ShieldCheck, Users, Workflow } from "lucide-react"

export const navigationData = {
    user: {
        name: "Young Alaska",
        email: "Business",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Nexus",
            logo: Command,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: Command,
            plan: "Startup",
        },
    ],
    navGroups: [
        {
            label: "GENERAL",
            permission: ["users"],
            items: [
                {
                    title: "Usuarios",
                    url: "/dashboard/users",
                    icon: Users,
                    permission: ["users"]
                },
                {
                    title: "Payment",
                    url: "#",
                    icon: ArrowRightLeft,
                    permission: ["users_create"]
                },
                {
                    title: "Message",
                    url: "#",
                    icon: MessageSquare,
                    badge: "8",
                    permission: ["users"]
                },
                {
                    title: "Dashboard",
                    url: "#",
                    icon: LayoutDashboard,
                    isActive: true,
                    permission: ["users_create"]
                },
            ],
        },
        {
            label: "TOOLS",
            permission: ["users"],
            items: [
                {
                    title: "Product",
                    url: "#",
                    icon: Box,
                    permission: ["users_view"]
                },
                {
                    title: "Invoice",
                    url: "#",
                    icon: FileText,
                    permission: ["users_view"]
                },
                {
                    title: "Analytics",
                    url: "#",
                    icon: BarChart2,
                    permission: ["admin"]
                },
                {
                    title: "Automation",
                    url: "#",
                    icon: Workflow,
                    badge: "BETA",
                    permission: ["admin"]
                },
            ]
        },
        {
            label: "SUPPORT",
            permission: ["users"],
            items: [
                {
                    title: "Settings",
                    url: "#",
                    icon: Settings,
                    permission: ["users_view"],
                    items: [
                        {
                            title: "Crear setting",
                            url: "#",
                            permission: ["users_view"],
                        },
                        {
                            title: "Actualizar setting",
                            url: "#",
                            permission: ["admin"],
                        },
                    ],
                },
                {
                    title: "Security",
                    url: "#",
                    icon: ShieldCheck,
                    permission: ["users_view"]
                },
                {
                    title: "Help",
                    url: "#",
                    icon: HelpCircle,
                    permission: ["admin"]
                },
            ]
        }
    ],
}