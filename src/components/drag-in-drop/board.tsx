"use client"

import { useEffect, useState } from "react"
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    DragOverlay,
    closestCorners
} from "@dnd-kit/core"
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove
} from "@dnd-kit/sortable"
import { createPortal } from "react-dom"

import type { Card, ListWithCards } from "@/types"
import { Column } from "./column"
import { CardPreview } from "./card-preview"
import { useMutation, useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/utils/query-keys"
import { findManyList } from "@/actions/lists/find-many-list"
import { toast } from "../toast"
import { RotateCw } from "lucide-react"
import { changeListCard } from "@/actions/cards/change-list-card"
import { prisma } from "@/lib/prisma"
import { findCardById } from "@/actions/cards/find-card-by-id"
import { queryClient } from "../theme-provider"

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
        queryKey: queryKeys.list.findMany(),
        queryFn: () => findManyList<ListWithCards[]>({
            where: {
                space: {
                    name: decodeURI(space)
                }
            },
            include: {
                cards: true
            }
        })
    })

    if (isLoading || !lists) {
        return (
            <span>
                Carregando...
            </span>
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
        mutationFn: ({ cardId, listId }: {
            listId: string
            cardId: string
        }) => changeListCard({ cardId, listId }),
        onSuccess: ({ title, list }) => {

            toast({
                title: `O cartão ${title} foi movido para a lista ${list?.name}`
            })

            queryClient.invalidateQueries({
                queryKey: queryKeys.list.findMany()
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
            mutate({ cardId: activeId, listId: toList.id })
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