"use client"

import { findCardById } from "@/actions/cards/find-card-by-id"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useSidebar } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { CardComplete } from "@/types"
import { queryKeys } from "@/utils/query-keys"
import { useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Clock, Ellipsis, RotateCw } from "lucide-react"
import { CardCommentsActivity } from "./card-comments-activity"
import { CardInfoTask } from "./card-info-task"
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
        tasks
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
            <CardHeader>
                <CardAction>
                    <Button variant={"ghost"}>
                        <Ellipsis />
                    </Button>
                </CardAction>
                <CardTitle>
                    {title}
                </CardTitle>
                <CardDescription className="flex gap-2 items-center text-primary">
                    <Clock className="size-3.5" />
                    {
                        formatDate(
                            createdAt,
                            "dd 'de' MMM 'de' yyyy 'às' HH:mm",
                            { locale: ptBR }
                        )
                    }
                </CardDescription>
                <CardDescription className="text-primary">
                    {cnpj}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex space-x-4">
                <ResizablePanelGroup
                    direction="horizontal"
                    className="size-full rounded-lg border"
                >
                    <ResizablePanel
                        defaultSize={70}
                        minSize={30}
                        className="size-full"
                    >
                        <CardInfoTask card={card} />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={30}>
                        <CardCommentsActivity
                            id={id}
                            activities={activities}
                            comments={comments}
                        />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </CardContent>
            <CardFooter className="justify-end">
                <Button className="w-1/2">
                    Salvar alterações
                </Button>
            </CardFooter>
        </Card >
    )
}