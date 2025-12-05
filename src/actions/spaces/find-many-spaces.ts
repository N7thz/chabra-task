"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function findManySpace(props: Prisma.SpaceFindManyArgs = {}) {
    return await prisma.space.findMany(props)
}