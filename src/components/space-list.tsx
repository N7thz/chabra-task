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
import { Ellipsis, RotateCw } from "lucide-react"
import { DropdownMenuEditDialog } from "./dropdown-menu-edit-list"
import { toast } from "./toast"
import { Button } from "./ui/button"

export const SpaceList = () => {

    const {
        data: spaces,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ["find-many-spaces"],
        queryFn: () => findManySpace()
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
                                        <Button variant={"ghost"}>
                                            <Ellipsis />
                                        </Button>
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
