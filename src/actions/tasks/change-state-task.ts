"use server"

import { prisma } from "@/lib/prisma"

type ChangeCompletedTaskProps = {
    id: string,
    completed: boolean
}

export async function changeCompletedTask({
    id, completed
}: ChangeCompletedTaskProps) {
    return await prisma.task.update({
        where: {
            id
        },
        data: {
            completed
        },
        include: {
            card: true
        }
    })
}