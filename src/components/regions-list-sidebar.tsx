"use client"

import { findManyRegion } from "@/actions/regions/find-many-region"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "./ui/skeleton"
import Link from "next/link"
import { Blend } from "lucide-react"

export const RegionsListSidebar = () => {

    const {
        data: regions,
        isLoading,
        error
    } = useQuery({
        queryKey: ["find-many-region"],
        queryFn: () => findManyRegion()
    })

    if (error) return (
        <div>
            error
        </div>
    )

    if (isLoading || !regions) return (
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
                regions.map(({ id, name }) => (
                    <SidebarMenuItem key={id}>
                        <SidebarMenuButton asChild>
                            <Link href={`/regions/${name}`}>
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
