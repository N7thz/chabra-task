"use server"

import { prisma } from "@/lib/prisma"

export async function createSpace(name: string) {

    const space = await prisma.space.findUnique({
        where: {
            name
        }
    })

    if (space) throw new Error("Espaço já existe", {
        cause: "Você está tentado cadatrar um novo cartão com um nome que já existe em uma lista."
    })

    return await prisma.space.create({
        data: {
            name
        }
    })
}