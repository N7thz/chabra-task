"use server"

import { prisma } from "@/lib/prisma"
import { findCardById } from "./find-card-by-id"

export async function changeColorList({ 
    id, color 
}: { id: string, color: string }) {

    await findCardById(id)

    return await prisma.card.update({
        where: {
            id
        },
        data: {
            color
        }
    })
}