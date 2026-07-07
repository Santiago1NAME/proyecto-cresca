"use client"

import { NavUser } from "./nav-user"
import { Bell } from "lucide-react"

const ContenedorUser = () => {
    return (
        <>
            <button className="text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
            </button>
            <NavUser user={{ name: "Edwin Santiago", email: "esanti1020@gmail.com", avatar: "" }} />
        </>
    )
}

export default ContenedorUser