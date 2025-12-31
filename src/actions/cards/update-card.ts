"use server"

import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { CreateTaskProps } from "@/schemas/create-card-schema"
import { findCardById } from "./find-card-by-id"
import { deleteManyTasksByCardId } from "../tasks/delete-many-tasks-by-card-id"

type UpdateCardProps = {
    id: string
    card: Prisma.CardUpdateInput
    tasks: (CreateTaskProps & { id?: string })[]
}

export async function updateCard({ id, card, tasks }: UpdateCardProps) {

    const { tasks: _, ...cardData } = card

    await findCardById(id)

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        throw new Error("Não foi possivel encontrar a sessão.")
    }

    if (tasks.length === 0) {
        await deleteManyTasksByCardId(id)
    }

    for (const { id: taskId, ...task } of tasks) {
        await prisma.task.upsert({
            where: {
                id: taskId ?? ""
            },
            update: task,
            create: {
                ...task,
                card: {
                    connect: { id }
                }
            }
        })
    }


    return await prisma.card.update({
        where: { id },
        data: {
            ...cardData,
            activities: {
                create: {
                    author: {
                        connect: { id: session.user.id }
                    },
                    message: `O usuário ${session.user.name} atualizou os dados do cartão.`
                }
            }
        },
        include: {
            comments: true,
            label: true,
            tasks: true,
            activities: true
        }
    })
}
