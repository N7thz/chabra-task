"use server"

import { prisma } from "@/lib/prisma"

export async function findImageByUserId(userIdList: string[]) {
    return await prisma.user.findMany({
        where: {
            id: {
                in: userIdList
            }
        },
        select: {
            id: true,
            image: true
        }
    })
}