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
    User2,
    UserCircle
} from "lucide-react"
import Link from "next/link"
import { SidebarTrigger } from "./sidebar-trigger"
import { RegionsListSidebar } from "./regions-list-sidebar"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

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
            <SidebarContent>
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
                        Regiões
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <RegionsListSidebar />
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
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span>Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Billing</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}