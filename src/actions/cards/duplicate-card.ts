"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { createNotification } from "../notifications/create-notification"

export async function duplicateCard(id: string) {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        throw new Error(
            "Não foi possivel encontrar a sessão, tente logar novamente."
        )
    }

    const card = await prisma.card.findUnique({
        where: {
            id
        },
        include: {
            tasks: true,
            list: true
        }
    })

    if (!card) {
        throw new Error("Não foi possivel encontrar o cartão.")
    }

    const {
        id: _,
        createdAt: __,
        updatedAt: ___,
        cnpj,
        color,
        completedAt,
        description,
        labelId,
        priority,
        status,
        term,
        ownersId,
        list,
        title,
        tasks,
        listId,
    } = card

    const { user } = session

    const { id: userId, name } = user

    const cardDuplicated = await prisma.card.create({
        data: {
            title: `${title} (1)`,
            cnpj,
            priority,
            status,
            term,
            color,
            description,
            ownersId,
            completedAt,
            activities: {
                create: {
                    message: `O usuario ${name} duplicou o cartão ${title}.`,
                    author: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            },
            list: {
                connect: {
                    id: listId!
                },
            },
            tasks: {
                createMany: {
                    data: tasks.map(({ 
                        id, cardId, createdAt, updatedAt, ...rest 
                    }) => rest),
                },
            },
        },
        include: {
            comments: true,
            label: true,
            tasks: true,
        },
    })

    const notification = await createNotification({
        message: `Você foi duplicou o cartão ${card.title}`,
        userIds: card.ownersId
    })

    return { cardDuplicated, notification }
}