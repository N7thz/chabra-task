"use client"

import { findManySpace } from "@/actions/spaces/find-many-spaces"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { DropdownMenuEditDialog } from "./dropdown-menu-edit-list"

export const SpaceList = () => {

    const {
        data: spaces,
        isLoading,
        error
    } = useQuery({
        queryKey: ["find-many-space"],
        queryFn: () => findManySpace()
    })

    if (error) return (
        <div>
            error
        </div>
    )

    if (isLoading || !spaces) return (
        <Card className="w-2/3 bg-background">
            <CardHeader>
                <CardTitle>
                    Regiões
                </CardTitle>
                <CardDescription>
                    Gerencie as regiões associadas às suas listas de tarefas.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Skeleton />
            </CardContent>
        </Card>
    )

    return (
        <Card className="w-2/3 bg-background">
            <CardHeader>
                <CardTitle>
                    Regiões
                </CardTitle>
                <CardDescription>
                    Gerencie as regiões associadas às suas listas de tarefas.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {
                    spaces.length === 0
                        ? (
                            <span className="text-muted-foreground text-xl italic">
                                Nenhum espaço cadastrado.
                            </span>
                        )
                        : spaces.map(({ id, name }) => (
                            <Card key={id}>
                                <CardHeader>
                                    <CardAction>
                                        <DropdownMenuEditDialog
                                            id={id}
                                            name={name}
                                        />
                                    </CardAction>
                                    <CardTitle>
                                        {name}
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        ))
                }
            </CardContent>
        </Card>
    )
}
