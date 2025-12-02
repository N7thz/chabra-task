"use client"

import { findManyList } from "@/actions/lists/find-many-list"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { Ellipsis } from "lucide-react"

export const ListContainer = ({ region }: { region: string }) => {

    const {
        data: lists,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ["find-many-lists"],
        queryFn: () => findManyList({
            where: {
                region: {
                    name: region
                }
            }
        })
    })

    if (error) {
        return (
            <Card className="w-1/4">
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
                    <Card key={index} className="w-100">
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
                lists.length === 0 ? (
                    <p>Você ainda não possui listas criadas.</p>
                ) : lists.map(({ id, name }) => (
                    <Card key={id} className="w-100 pt-0 overflow-hidden">
                        <div className="bg-blue-400 w-full h-12" />
                        <CardHeader>
                            <CardAction>
                                <Button variant={"ghost"}>
                                    <Ellipsis />
                                </Button>
                            </CardAction>
                            <CardTitle className="truncate">
                                {name}
                            </CardTitle>
                        </CardHeader>
                        <CardFooter>
                            <Button className="w-full">
                                Adicionar cartão
                            </Button>
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
    )
}
