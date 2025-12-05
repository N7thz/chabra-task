"use server"

import { prisma } from "@/lib/prisma";

type CreateListProps = {
    name: string,
    space: string
}

export async function createList({ name, space }: CreateListProps) {

    const list = await prisma.list.findUnique({
        where: {
            name
        }
    })

    if (list) {
        throw new Error("Já existe uma lista com esse nome")
    }

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