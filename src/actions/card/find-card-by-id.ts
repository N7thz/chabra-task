"use server"

import { prisma } from "@/lib/prisma"
import { Card, CardComplete } from "@/types"

export async function findCardById(
    id: string,
) {

    const card = await prisma.card.findUnique({
        where: {
            id
        },
        include: {
            activities: {
                include: {
                    author: true
                }
            },
            comments: {
                include: {
                    author: true
                }
            },
            tasks: true,
        }
    })

    if (!card) throw new Error("Card não encontrado.")

    return card as CardComplete
}