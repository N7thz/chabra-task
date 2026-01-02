"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function createActivity(data: Prisma.ActivityCreateInput) {
    return await prisma.activity.create({
        data
    })
} 