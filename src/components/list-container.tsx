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
import { useQuery } from "@tanstack/react-query"
import { DropdownMenuEditDialog } from "./dropdown-menu-edit-list"
import Link from "next/link"
import { List } from "@/types"
import { CardContainer } from "./card-container"
import { queryKeys } from "@/utils/query-keys"

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
            <Card className="w-100 pt-0 overflow-hidden">
                <div className="bg-green-500 w-full h-12" />
                <CardHeader>
                    <CardTitle>
                        {(error) && "Erro ao carregar listas"}
                    </CardTitle>
                    {
                        error &&
                        <CardDescription>
                            {error.message}
                        </CardDescription>
                    }
                </CardHeader>
                <CardFooter>
                    <Button
                        className="w-full"
                        onClick={() => refetch()}
                    >
                        Tentar novamente
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    if (isLoading || !lists) return (
        <div className="flex space-x-4">
            {
                Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index} className="w-100 pt-0 overflow-hidden">
                        <div className="bg-green-500 w-full h-12" />
                        <CardHeader>
                            <CardTitle>
                                <Skeleton />
                            </CardTitle>
                        </CardHeader>
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
