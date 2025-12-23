"use client"

import { findManyList } from "@/actions/lists/find-many-list"
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
import { Skeleton } from "@/components/ui/skeleton"
import { List } from "@/types"
import { queryKeys } from "@/utils/query-keys"
import { useQuery } from "@tanstack/react-query"
import { Clock, Ellipsis, RotateCw } from "lucide-react"
import Link from "next/link"
import { CardContainer } from "./card-container"
import { DropdownMenuEditDialog } from "./dropdown-menu-edit-list"
import { toast } from "./toast"
import { useEffect } from "react"
import { Progress } from "./ui/progress"
import { AvatarGroup } from "./avatar-group"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"

export const ListContainer = ({ space }: { space: string }) => {

    const {
        data: lists,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: queryKeys.list.findMany(),
        queryFn: () => findManyList<List[]>({
            orderBy: {
                createdAt: "asc"
            },
            where: {
                space: {
                    name: decodeURI(space)
                }
            },
            include: {
                cards: {
                    include: {
                        tasks: true,
                    }
                }
            }
        })
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

    if (isLoading || !lists) {

        const images = Array.from({ length: 3 }).map((_, index) => (`${index}`))

        return (
            <div className="flex space-x-4">
                {
                    Array.from({ length: 3 }).map((_, index) => (
                        <Card
                            key={index}
                            className="w-100 pt-0 overflow-hidden"
                        >
                            <div className="bg-green-500 w-full h-12" />
                            <CardContent>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            <Skeleton className="h-4" />
                                        </CardTitle>
                                        <CardAction>
                                            <Button
                                                disabled
                                                variant="ghost"
                                                className="-translate-y-2"
                                            >
                                                <Ellipsis />
                                            </Button>
                                        </CardAction>
                                    </CardHeader>
                                    <CardContent className="space-y-5">
                                        <div className="flex justify-between">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Clock className="size-3" />
                                                {formatDate(new Date(), "dd 'de' MMM", { locale: ptBR })}
                                            </div>
                                            <AvatarGroup images={images} />
                                        </div>
                                        <Progress value={index * 10} />
                                    </CardContent>
                                </Card>
                            </CardContent>
                            <CardFooter>
                                <Button disabled className="w-full">
                                    Adicionar cartão
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                }
            </ div>
        )
    }

    return (
        <div className="flex space-x-4">
            {
                lists.length === 0
                    ? (
                        <p>Você ainda não possui listas criadas.</p>
                    )
                    : lists.map(({ id, name, color, cards = [] }) => (
                        <Card
                            key={id}
                            className="w-100 h-min pt-0 overflow-hidden"
                        >
                            <CardHeader style={{
                                background: color ?? undefined
                            }}>
                                <CardAction className="mt-5">
                                    <DropdownMenuEditDialog id={id} name={name} />
                                </CardAction>
                                <CardTitle className="truncate mt-5">
                                    {name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {
                                    cards.length === 0
                                        ? (
                                            <CardDescription>
                                                Sem cartões nesta lista.
                                            </CardDescription>
                                        ) : cards.map(card => (
                                            <CardContainer
                                                key={card.id}
                                                card={card}
                                                space={space}
                                            />
                                        ))
                                }
                            </CardContent>
                            <CardFooter>
                                <Button
                                    asChild
                                    className="w-full"
                                >
                                    <Link href={`/${space}/${id}/create-card`}>
                                        Adicionar cartão
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
            }
        </div>
    )
}
