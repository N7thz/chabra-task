"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function findManyComments(props: Prisma.CommentsFindManyArgs = {}) {
    return await prisma.comments.findMany(props)
}