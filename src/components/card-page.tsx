"use client"

import { findCardById } from "@/actions/card/find-card-by-id"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { useQueries, useQuery } from "@tanstack/react-query"
import { Skeleton } from "./ui/skeleton"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Input } from "./ui/input"
import { Clock } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { SelectStatus } from "./forms/form-create-card/select-status"
import { SelectPriority } from "./forms/form-create-card/select-priority"
import { SelectTerm } from "./forms/form-create-card/select-term"
import { SelectOwners } from "./forms/form-create-card/select-owners"
import { Button } from "./ui/button"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"

export const CardPage = ({ id, space }: { id: string, space: string }) => {

    const { data: card, isLoading } = useQuery({
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
        ownersId
    } = card

    console.log(card)

    return (
        <Card className="min-w-3/5 max-w-4/6 pt-0 overflow-hidden">
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
            <CardContent className="size-full flex space-x-4">
                <Card className="w-2/3">
                    <CardContent className="space-y-4">
                        <Label
                            htmlFor="describe"
                            className="flex flex-col gap-2"
                        >
                            Descrição:
                            <Textarea
                                id="describe"
                                defaultValue={description ? description : undefined}
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

                <Card className="w-1/3">
                    <ScrollArea className="h-[420px] bg-red-400">
                        <ScrollBar />
                        <CardContent>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea minima eligendi tempora? Voluptates ex aspernatur et veritatis quisquam earum sint unde corrupti libero eaque? Modi, voluptate esse culpa, id non quaerat ab maiores reprehenderit nobis itaque vel quasi molestias aspernatur, libero tenetur dolores nostrum error labore? Maiores, dignissimos voluptatibus sit fugit iure dolores laudantium rerum magnam corporis aliquam. Porro nesciunt tempore, ea inventore, quis cupiditate tenetur officiis ducimus non soluta maiores exercitationem quo similique rem sunt dicta amet minima quam, molestias officia nisi est illo voluptates. Explicabo nemo voluptate tenetur dolore sunt nobis officia mollitia alias optio. Totam, rerum id.
                        </CardContent>
                    </ScrollArea>
                </Card>
            </CardContent>
            <CardFooter className="justify-end">
                <Button className="w-1/2">
                    Salvar alterações
                </Button>
            </CardFooter>
        </Card >
    )
}