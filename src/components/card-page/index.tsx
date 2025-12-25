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
import { useLoading } from "@/providers/loading-provider"
import { Spinner } from "../ui/spinner"
import { AvatarGroup } from "@/components/avatar-group"
import { SelectOwners } from "@/components/forms/form-create-card/select-owners"
import {
    SelectPriority
} from "@/components/forms/form-create-card/select-priority"
import { SelectStatus } from "@/components/forms/form-create-card/select-status"
import { SelectTerm } from "@/components/forms/form-create-card/select-term"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { CreateCardProps, createCardSchema } from "@/schemas/create-card-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card as CardProps, Priority, Status, Task } from "@prisma/client"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { CardTask } from "@/components/card-page/card-task"
import { FormUpdateCard } from "../forms/form-update-card"

export const CardPage = ({ id, space }: { id: string, space: string }) => {

    const { loading } = useLoading()

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
            
            <CardFooter className="justify-end">
                <Button
                    type="submit"
                    form="form-update-card"
                    className="w-1/2"
                    disabled={isLoading}
                >
                    {
                        isLoading
                            ? <Spinner />
                            : "Salvar alterações"
                    }
                </Button>
            </CardFooter>
        </Card>
    )
}