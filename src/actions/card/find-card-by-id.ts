"use server"

import { prisma } from "@/lib/prisma"

export async function findCardById(id: string) {

    const list = await prisma.card.findUnique({
        where: {
            id
        }
    })

    if (!list) throw new Error("Card não encontrado.")

    return list
}