"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { createNotification } from "../notifications/create-notification"
import { findCardById } from "./find-card-by-id"

export async function deleteCard(id: string) {

    await findCardById(id)

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        throw new Error("Não foi possivel encontrar a sessão.")
    }

    const cardDeleted = await prisma.card.delete({
        where: {
            id
        },
        include: {
            tasks: true
        }
    })

    const { title, ownersId, tasks } = cardDeleted

    const tasksOwnersId = tasks.flatMap(task => task.ownersId)

    const userIds = [
        ...new Set([
            ...ownersId,
            ...tasksOwnersId,
        ])
    ]

    const notification = await createNotification({
        message: `O cartão ${title} foi excluído.`,
        userIds,
    })

    return { cardDeleted, notification }
}