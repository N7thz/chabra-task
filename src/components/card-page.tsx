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

    return (
        <Card className="min-w-3/5 max-w-4/6">
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
            <CardContent className="size-full flex">
                <div className="w-2/3 border-r p-2">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti non quasi repellat sequi unde aliquid mollitia illum nulla dolor sit repellendus voluptatem repudiandae ullam, incidunt quod culpa ducimus porro fugit amet asperiores assumenda. Nobis provident blanditiis architecto magni omnis! Tempora, ducimus culpa dolorem nam fugit autem quam sit dolorum nemo, quis laboriosam, amet alias ratione accusantium voluptatum beatae magnam hic maxime laudantium et? Aperiam cumque corporis dolore, minima maiores necessitatibus. Atque aut, optio natus expedita qui minus sunt? Omnis hic totam dolorum voluptate dolorem modi reprehenderit tenetur eos velit? Rerum delectus soluta ut amet, repellat assumenda consectetur temporibus magnam nobis!
                </div>
                <div className="w-1/3 border-l p-2">
                    sLorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti non quasi repellat sequi unde aliquid mollitia illum nulla dolor sit repellendus voluptatem repudiandae ullam, incidunt quod culpa ducimus porro fugit amet asperiores assumenda. Nobis provident blanditiis architecto magni omnis! Tempora, ducimus culpa dolorem nam fugit autem quam sit dolorum nemo, quis laboriosam, amet alias ratione accusantium voluptatum beatae magnam hic maxime laudantium et? Aperiam cumque corporis dolore, minima maiores necessitatibus. Atque aut, optio natus expedita qui minus sunt? Omnis hic totam dolorum voluptate dolorem modi reprehenderit tenetur eos velit? Rerum delectus soluta ut amet, repellat assumenda consectetur temporibus magnam nobis!
                </div>
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    )
}
