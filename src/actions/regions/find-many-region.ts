"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function findManyRegion(props: Prisma.RegionFindManyArgs = {}) {
    return await prisma.region.findMany(props)
}