"use client"

import { findManySpace } from "@/actions/spaces/find-many-spaces"
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "./ui/skeleton"
import Link from "next/link"
import { Blend } from "lucide-react"

export const SpaceListSidebar = () => {

    const { open } = useSidebar()

    const {
        data: spaces,
        isLoading,
        error
    } = useQuery({
        queryKey: ["find-many-space"],
        queryFn: () => findManySpace()
    })

    if (error) return (
        <div>
            error
        </div>
    )

    if (isLoading || !spaces) return (
        <>
            <SidebarMenuItem>
                <SidebarMenuButton>
                    <Skeleton />
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="opacity-50">
                <SidebarMenuButton>
                    <Skeleton />
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="opacity-30">
                <SidebarMenuButton>
                    <Skeleton />
                </SidebarMenuButton>
            </SidebarMenuItem>
        </>

    )

    return (
        <>
            {
                (spaces.length === 0 && open)
                    ? <span className="text-center">
                        Você ainda não possui espaços
                    </span>
                    : spaces.map(({ id, name }) => (
                        <SidebarMenuItem key={id}>
                            <SidebarMenuButton asChild>
                                <Link href={`/space/${name}`}>
                                    <Blend />
                                    <span>
                                        {name}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))
            }
        </>
    )
}
