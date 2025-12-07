"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function findManyList<T>(props: Prisma.ListFindManyArgs = {}) {
    return await prisma.list.findMany(props) as T
}