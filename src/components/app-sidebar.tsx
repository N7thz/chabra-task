import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import {
    Bell,
    Calendar,
    ChevronUp,
    Home,
    LucideIcon,
    Settings,
    UserCircle,
    LogOut,
    Cog
} from "lucide-react"
import Link from "next/link"
import { SidebarTrigger } from "./sidebar-trigger"
import { SpaceListSidebar } from "./space-list-sidebar"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { SignOutButton } from "./sign-out-button"

type SidebarItem = {
    title: string
    url: any
    Icon: LucideIcon
}

const items: SidebarItem[] = [
    {
        title: "Home",
        url: "/home",
        Icon: Home,
    },
    {
        title: "Notificações",
        url: "/notifications",
        Icon: Bell,
    },
    {
        title: "Agenda",
        url: "/calendar",
        Icon: Calendar,
    },
    {
        title: "Opções",
        url: "/settings",
        Icon: Settings,
    },
]

export const AppSidebar = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    return (
        <Sidebar
            variant="floating"
            collapsible="icon"
        >
            <SidebarContent >
                <SidebarGroup>
                    <SidebarGroupLabel className="text-primary text-xl mb-4">
                        Chabra Tasks
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarTrigger />
                            {items.map(({ Icon, title, url }) => (
                                <SidebarMenuItem key={title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={url}>
                                            <Icon />
                                            <span>{title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Espaços
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SpaceListSidebar />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <UserCircle />
                                    {
                                        (session && session.user) &&
                                        <span>
                                            {session.user.name}
                                        </span>
                                    }
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top">
                                <DropdownMenuItem>
                                    <Cog />
                                    <span>
                                        Opções
                                    </span>
                                </DropdownMenuItem>
                                <SignOutButton />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
        </Sidebar >
    )
}