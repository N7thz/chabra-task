"use client"

import { findMyCards } from "@/actions/cards/find-my-cards"
import { toast } from "@/components/toast"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { Clock, RotateCw } from "lucide-react"
import { HomeContentItem } from "./home-content-item"

export const HomeContentPage = () => {

    const {
        data: cards,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ["find-my-tasks"],
        queryFn: () => findMyCards()
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

    if (isLoading || !cards) {
        return (
            <CardContent className="grid grid-cols-2 gap-3 h-fit">
                {
                    Array.from({ length: 3 }).map((_, index) => (
                        <Card
                            key={index}
                            className="justify-between"
                        >
                            <CardHeader>
                                <CardTitle>
                                    <Skeleton className="h-6" />
                                </CardTitle>
                                <CardDescription className="flex gap-2 items-center text-primary my-2">
                                    <Clock className="size-3.5" />
                                    <span className="whitespace-nowrap">
                                        Criado em:
                                    </span>
                                    <Skeleton className="h-6" />
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="gap-2">
                                {
                                    Array.from({ length: 2 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="w-40 text-sm rounded-md p-2"
                                        >
                                            <Skeleton className="h-6" />
                                        </div>
                                    ))}
                            </CardFooter>
                        </Card>
                    ))
                }
            </CardContent>
        )
    }

    return (
        <CardContent className="grid grid-cols-2 gap-3">
            {
                cards.length === 0
                    ? (
                        <CardTitle className="text-muted-foreground font-normal">
                            Sem cartões associados a você
                        </CardTitle>
                    )
                    : cards.map(card => (
                        <HomeContentItem
                            key={card.id}
                            card={card}
                        />
                    ))

            }
        </CardContent>
    )
}
