"use client"

import { findManyRegion } from "@/actions/regions/find-many-region"
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

export const RegionsList = () => {

    const {
        data: regions,
        isLoading,
        error
    } = useQuery({
        queryKey: ["find-many-region"],
        queryFn: () => findManyRegion()
    })

    if (error) return (
        <div>
            error
        </div>
    )

    if (isLoading || !regions) return (
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
            <CardContent>
                {
                    regions.length === 0
                        ? (
                            <span className="text-muted-foreground text-xl italic">
                                Nenhuma região cadastrada.
                            </span>
                        )
                        : regions.map(({ id, name }) => (
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
