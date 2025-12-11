"use server"

import { prisma } from "@/lib/prisma";

type CreateListProps = {
    name: string,
    space: string
}

export async function createList({ name, space }: CreateListProps) {
    return await prisma.list.create({
        data: {
            name,
            space: {
                connect: {
                    name: space
                }
            }
        },
    })
}