"use server"

import { prisma } from "@/lib/prisma";
import { findListById } from "./find-list-by-id";

export async function changeColorList({ 
    id, color 
}: { id: string, color: string }) {

    await findListById(id)

    return await prisma.list.update({
        where: {
            id
        },
        data: {
            color
        }
    })
}