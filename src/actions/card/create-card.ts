"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { findListByName } from "../lists/find-list-by-name"

type CreateCardProps = {
    tasks: Prisma.TaskCreateInput[]
    data: Prisma.CardCreateInput,
    listName: string
}

export async function createCard({ tasks, data, listName }: CreateCardProps) {

    await findListByName(listName)

    return await prisma.card.create({
        data: {
            ...data,
            list: {
                connect: {
                    name: listName
                }
            },
            tasks: {
                createMany: {
                    data: tasks
                }
            }
        },
        include: {
            tasks: true,
            comments: true,
            owner: true
        }
    })
}