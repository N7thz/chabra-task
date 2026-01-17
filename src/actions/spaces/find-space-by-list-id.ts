"use server"

import { prisma } from "@/lib/prisma"
import { findListById } from "../lists/find-list-by-id"
import { Prisma } from "@prisma/client"

export async function findSpaceByListId(
    listId: string,
    props: Prisma.SpaceFindFirstArgs = {}
) {

    await findListById(listId)

    const space = await prisma.space.findFirst({
        where: {
            lists: {
                some: {
                    id: listId
                }
            }
        },
        ...props
    })

    if (!space) throw new Error("Não foi possivel encontrar o espaço")

    return space
}