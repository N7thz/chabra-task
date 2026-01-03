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
import { auth } from "@/lib/auth"
import {
    Calendar,
    ChevronUp,
    Cog,
    Home,
    Settings,
    UserCircle
} from "lucide-react"
import { headers } from "next/headers"
import Link from "next/link"
import { NotificationsContainer } from "./notifications"
import { SidebarTrigger } from "./sidebar-trigger"
import { SignOutButton } from "./sign-out-button"
import { SpaceListSidebar } from "./space-list-sidebar"

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
                            {
                                session && session.user &&
                                <NotificationsContainer
                                    recipientId={session.user.id}
                                />
                            }
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href={"/home"}>
                                        <Home />
                                        <span>
                                            Home
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href={"#"}>
                                        <Calendar />
                                        <span>
                                            Agenda
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href={"/settings"}>
                                        <Settings />
                                        <span>
                                            Opções
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
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