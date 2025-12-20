"use server"

import { prisma } from "@/lib/prisma"
import { findListById } from "../lists/find-list-by-id"
import { CreateTaskProps as Task } from "@/schemas/create-card-schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export type FormDataCreateCard = {
    title: string
    cnpj: string
    description: string | null
    priority: "URGENT" | "HIGH" | "MID" | "LOW"
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED"
    term: Date
    color: string | null
    ownersId: string[]
}

type CreateCardProps = {
    tasks: Task[]
    formData: FormDataCreateCard,
    id: string
}

export async function createCard({
    tasks, formData, id,
}: CreateCardProps) {

    await findListById(id)

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        throw new Error("Não foi possivel encontrar a sessão, tente logar novamente.")
    }

    const { user } = session

    const { id: userId, name } = user

    const card = await prisma.card.create({
        data: {
            ...formData,
            activities: {
                create: {
                    message: `O usuario ${name} criou o cartão ${formData.title}.`,
                    author: {
                        connect: {
                            id: userId
                        }
                    }
                }
            },
            list: {
                connect: {
                    id
                }
            },
            tasks: {
                createMany: {
                    data: tasks
                }
            }
        },
        include: {
            comments: true,
            label: true,
            tasks: true,
        }
    })

    return { card }
}