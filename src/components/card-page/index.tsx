"use client"

import { findCardById } from "@/actions/cards/find-card-by-id"
import { toast } from "@/components/toast"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { useSidebar } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { CardComplete } from "@/types"
import { queryKeys } from "@/utils/query-keys"
import { useQuery } from "@tanstack/react-query"
import { RotateCw } from "lucide-react"
import { FormUpdateCard } from "../forms/form-update-card"
import { ChangeColorCardDialog } from "./change-color-card-dialog"

export const CardPage = ({ id, space }: { id: string, space: string }) => {

    const { open: sidebarOpen } = useSidebar()

    const {
        data: card,
        isLoading,
        error,
        refetch
    } = useQuery<CardComplete>({
        queryKey: queryKeys.card.find(id),
        queryFn: () => findCardById(id)
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

    if (!card || isLoading) {
        return (
            <Card className="min-w-3/5 max-w-4/6">
                <CardHeader>
                    <CardTitle>
                        <Skeleton />
                    </CardTitle>
                    <CardDescription>
                        <Skeleton />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Skeleton />
                </CardContent>
                <CardFooter>
                    <Skeleton />
                </CardFooter>
            </Card>
        )
    }

    const {
        title,
        cnpj,
        color,
        createdAt,
        activities,
        comments,
    } = card

    return (
        <Card className={cn(
            "pt-0 transition-all overflow-hidden max-h-11/12",
            sidebarOpen ? "w-5/6" : "w-10/12"
        )}>
            <ChangeColorCardDialog
                id={id}
                color={color}
            />
            <FormUpdateCard card={card} />
        </Card>
    )
}