"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDroppable } from "@dnd-kit/core"
import type { List } from "@/types"
import { CardContainer } from "../card-container"
import { SortableCard } from "./sortable-card"
import { cn } from "@/lib/utils"

type ColumnProps = {
    list: List
    space: string
}

export function Column({ list, space }: ColumnProps) {

    const { setNodeRef, isOver } = useDroppable({ id: list.id })

    return (
        <Card
            ref={setNodeRef}
            className={cn(
                "w-100 transition-colors",
                isOver ? "bg-primary/10" : "bg-muted/50"
            )}
        >
            <CardHeader>
                <CardTitle className="font-semibold text-xl">
                    {list.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {list.cards.map(card => (
                    <SortableCard
                        key={card.id}
                        id={card.id}
                    >
                        <CardContainer 
                            card={card}
                            space={space}
                        />
                    </SortableCard>
                ))}
            </CardContent>
        </Card>
    )
}
