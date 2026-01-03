"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { createActivity } from "../activities/create-activity"
import { findListById } from "../lists/find-list-by-id"
import { findCardById } from "./find-card-by-id"

type ChangeListCardProps = {
    listId: string
    cardId: string
}

export async function changeListCard({ cardId, listId }: ChangeListCardProps) {

    await findListById(listId)

    await findCardById(cardId)

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        throw new Error("Não foi possivel encontrar a sessão, tente logar novamente.")
    }

    const card = await prisma.card.update({
        where: {
            id: cardId
        },
        data: {
            listId
        },
        include: {
            list: true
        }
    })

    await createActivity({
        author: {
            connect: {
                id: session.user.id
            }
        },
        message:
            `O cartão ${card.title} foi movido para a lista ${card.list?.name}`,
        card: {
            connect: {
                id: cardId
            }
        }
    })

    return card
}