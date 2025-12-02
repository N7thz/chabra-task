"use server"

import { prisma } from "@/lib/prisma";

export async function deleteList(id: string) {
    return await prisma.list.delete({
        where: { id }
    })
}