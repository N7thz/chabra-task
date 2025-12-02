"use server"

import { prisma } from "@/lib/prisma";

export async function updateList({ id, name }: { id: string, name: string }) {
    return await prisma.list.update({
        where: {
            id
        },
        data: {
            name
        }
    })
}