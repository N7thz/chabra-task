"use client"

import { changeListCard } from "@/actions/cards/change-list-card"
import { findManyList } from "@/actions/lists/find-many-list"
import { AvatarGroup } from "@/components/avatar-group"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import {
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    Card as CardUI
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { queryClient } from "@/providers/theme-provider"
import type { Card, ListWithCards } from "@/types"
import { queryKeys } from "@/utils/query-keys"
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    closestCorners
} from "@dnd-kit/core"
import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable"
import { useMutation, useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Clock, Ellipsis, RotateCw } from "lucide-react"
import { useState } from "react"
import { createPortal } from "react-dom"
import { CardPreview } from "./card-preview"
import { Column } from "./column"

interface BoardProps {
    initialLists: ListWithCards[]
    space: string
}

export const Board = ({ space }: { space: string }) => {

    const {
        data: lists,
        isLoading,
        error,
        refetch
    } = useQuery({
        refetchOnWindowFocus: true,
        queryKey: queryKeys.list.findMany(space),
        queryFn: () => findManyList<ListWithCards[]>({
            where: {
                space: {
                    name: space
                }
            },
            include: {
                cards: true
            }
        })
    })

    if (isLoading || !lists) {

        const images = Array.from({ length: 3 }).map((_, index) => (`${index}`))

        return (
            <div className="flex space-x-4">
                {
                    Array.from({ length: 3 }).map((_, index) => (
                        <CardUI
                            key={index}
                            className="w-100 pt-0 overflow-hidden"
                        >
                            <div className="bg-green-500 w-full h-12" />
                            <CardContent>
                                <CardUI>
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
                                </CardUI>
                            </CardContent>
                            <CardFooter>
                                <Button disabled className="w-full">
                                    Adicionar cartão
                                </Button>
                            </CardFooter>
                        </CardUI>
                    ))
                }
            </ div>
        )
    }

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

    return (
        <BoardData
            space={space}
            initialLists={lists}
        />
    )
}

export const BoardData = ({ initialLists, space }: BoardProps) => {

    const [lists, setLists] = useState<ListWithCards[]>(initialLists)
    const [activeCard, setActiveCard] = useState<Card | null>(null)
    const [fromListId, setFromListId] = useState<string | null>(null)

    const { mutate } = useMutation({
        mutationKey: ["change-list-card"],
        mutationFn: ({
            cardId,
            currentListId,
            newListId
        }: {
            currentListId: string
            newListId: string
            cardId: string
        }) => changeListCard({ cardId, currentListId, newListId }),
        onSuccess: ({ card: { title, list } }) => {

            toast({
                title: `O cartão ${title} foi movido para a lista ${list?.name}`
            })

            queryClient.invalidateQueries({
                queryKey: queryKeys.list.findMany(space)
            })
        }
    })

    function findCard(id: string) {
        return lists.flatMap(list => list.cards).find(card => card.id === id)
    }

    function findListByCardId(cardId: string) {
        return lists.find(list =>
            list.cards.some(card => card.id === cardId)
        )
    }

    function findListById(listId: string) {
        return lists.find(list => list.id === listId)
    }

    function handleDragStart(event: DragStartEvent) {

        const card = findCard(event.active.id as string)

        if (card) setActiveCard(card)

        const activeId = event.active.id as string
        const sourceList = findListByCardId(activeId)

        if (sourceList) {
            setFromListId(sourceList.id)
        }
    }

    function handleDragOver(event: DragOverEvent) {

        const { active, over } = event
        if (!over) return

        const activeId = active.id as string
        const overId = over.id as string

        const sourceList = findListByCardId(activeId)
        if (!sourceList) return

        const targetList =
            lists.find(list => list.id === overId) ||
            findListByCardId(overId)

        if (!targetList || sourceList.id === targetList.id) return

        setLists(prev => {
            const source = prev.find(l => l.id === sourceList.id)!
            const target = prev.find(l => l.id === targetList.id)!

            const sourceCards = [...source.cards]
            const targetCards = [...target.cards]

            const cardIndex = sourceCards.findIndex(c => c.id === activeId)
            const [movedCard] = sourceCards.splice(cardIndex, 1)

            movedCard.listId = target.id

            return prev.map(list => {
                if (list.id === source.id)
                    return { ...list, cards: sourceCards }

                if (list.id === target.id)
                    return { ...list, cards: [...targetCards, movedCard] }

                return list
            })
        })
    }

    function handleDragEnd(event: DragEndEvent) {

        const { active, over } = event

        if (!over) return

        const activeId = active.id as string
        const overId = over.id as string

        const toList =
            // caso solte direto na coluna
            findListById(overId) ||
            // caso solte em cima de outro card
            findListByCardId(overId)

        if (!toList || !fromListId) return

        console.log("LISTA INICIAL:", fromListId)
        console.log("LISTA FINAL:", toList.id)

        if (fromListId !== toList.id) {
            mutate({
                cardId: activeId,
                currentListId: fromListId,
                newListId: toList.id
            })
        }

        setFromListId(null)
    }


    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="flex gap-6 items-start">
                {lists.map(list => (
                    <SortableContext
                        key={list.id}
                        items={list.cards.map(card => card.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <Column
                            list={list}
                            space={space}
                        />
                    </SortableContext>
                ))}
            </div>

            {createPortal(
                <DragOverlay>
                    {activeCard && <CardPreview card={activeCard} />}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    )
}