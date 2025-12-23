"use client"

import { findManySpace } from "@/actions/spaces/find-many-spaces"
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "./ui/skeleton"
import Link from "next/link"
import { Blend, RotateCw } from "lucide-react"
import { queryKeys } from "@/utils/query-keys"
import { toast } from "./toast"

export const SpaceListSidebar = () => {

    const { open } = useSidebar()

    const {
        data: spaces,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: queryKeys.space.findMany(),
        queryFn: () => findManySpace()
    })

    if (error) {
        return (
            toast({
                title: error.name,
                description: error.message,
                variant: "destructive",
                duration: Infinity,
                closeButton: true,
                action: {
                    label: (
                        <span className="flex items-center gap-2 group">
                            Tentar novamente
                            <RotateCw className="size-3 group-hover:rotate-180 transition-transform" />
                        </span>
                    ),
                    onClick: () => refetch()
                }
            })
        )
    }

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
