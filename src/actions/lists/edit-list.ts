"use server"

import { prisma } from "@/lib/prisma"
import { findListByName } from "./find-list-by-name"

export async function editList({
    oldName, newName
}: {
    oldName: string, newName: string
}) {

    await findListByName(oldName)

    return await prisma.list.update({
        where: {
            name: oldName
        },
        data: {
            name: newName
        }
    })
}