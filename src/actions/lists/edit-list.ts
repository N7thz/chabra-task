"use server"

import { prisma } from "@/lib/prisma"
import { findListById } from "./find-list-by-id"

export async function editList({
    id, name
}: {
    id: string, name: string
}) {

    await findListById(id)

    return await prisma.list.update({
        where: {
            id
        },
        data: {
            name
        }
    })
}