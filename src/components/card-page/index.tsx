"use client"

import { findCardById } from "@/actions/card/find-card-by-id"
import { SelectOwners } from "@/components/forms/form-create-card/select-owners"
import {
    SelectPriority
} from "@/components/forms/form-create-card/select-priority"
import { SelectStatus } from "@/components/forms/form-create-card/select-status"
import { SelectTerm } from "@/components/forms/form-create-card/select-term"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { CardComplete } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Clock, MessageSquareText } from "lucide-react"
import { ActivitiesContainer } from "./activities"
import { CommentsContainer } from "./comments"
import { CardContainer } from "../card-container"
import { Input } from "../ui/input"

export const CardPage = ({ id, space }: { id: string, space: string }) => {

    const { data: card, isLoading } = useQuery<CardComplete>({
        queryKey: ["find-card-by-id"],
        queryFn: () => findCardById(id)
    })

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
        completedAt,
        createdAt,
        description,
        priority,
        status,
        term,
        ownersId,
        activities,
        comments,
        tasks
    } = card

    console.log(card.activities)

    return (
        <Card className="min-w-3/5 max-w-4/6 max-h-5/6 pt-0 overflow-hidden">
            <div
                style={{
                    background: color ?? undefined
                }}
                className="h-50 w-full bg-red-50"
            />
            <CardHeader style={{
                background: color ?? undefined
            }}>
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
                        <Card className="size-full border-none">
                            <CardContent className="space-y-4">
                                <Label
                                    htmlFor="describe"
                                    className="flex flex-col gap-2"
                                >
                                    Descrição:
                                    <Textarea
                                        id="describe"
                                        defaultValue={description ? description : undefined}
                                        className="max-h-20"
                                    />
                                </Label>
                                <Label className="flex flex-col gap-2">
                                    Status:
                                    <SelectStatus
                                        defaultValue={status}
                                        onValueChange={(value) => console.log(value)}
                                    />
                                </Label>
                                <Label className="flex flex-col gap-2">
                                    Prioridade:
                                    <SelectPriority
                                        defaultValue={priority}
                                        onValueChange={(value) => console.log(value)}
                                    />
                                </Label>
                                <Label className="flex flex-col gap-2">
                                    Responsáveis:
                                    <SelectOwners
                                        selected={ownersId}
                                        onSelectionChange={(value) => console.log(value)}
                                    />
                                </Label>
                                <Label className="flex flex-col gap-2">
                                    Prazo:
                                    <SelectTerm
                                        date={term}
                                        setDate={(date) => console.log(date)}
                                    />
                                </Label>
                            </CardContent>
                        </Card>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={30}>
                        <Card className="size-full border-none">
                            <CardHeader>
                                <CardTitle className="flex items-center text-base gap-2 whitespace-nowrap">
                                    <MessageSquareText className="size-5" />
                                    Comentários e atividade
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 px-3 flex flex-col gap-2">
                                <ActivitiesContainer
                                    activities={activities}
                                />
                                <CommentsContainer
                                    comments={comments}
                                />
                            </CardContent>
                            <CardFooter className="px-3">
                                <Input placeholder="escreva um comentário..." />
                            </CardFooter>
                        </Card>
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