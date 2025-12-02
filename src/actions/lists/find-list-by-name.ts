"use server"

import { prisma } from "@/lib/prisma"

export async function findListByName(name: string) {

    const list = await prisma.list.findUnique({
        where: {
            name
        }
    })

    if (!list) throw new Error("Lista não encontrada")

    return list
}