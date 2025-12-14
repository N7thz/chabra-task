"use server"

import { prisma } from "@/lib/prisma"

export async function findCardById(
    id: string,
) {

    const card = await prisma.card.findUnique({
        where: {
            id
        },
        include: {
            activities: true,
            comments: true,
            tasks: true,
        }
    })

    if (!card) throw new Error("Card não encontrado.")

    return card
}