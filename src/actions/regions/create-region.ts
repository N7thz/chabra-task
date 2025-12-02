"use server"

import { prisma } from "@/lib/prisma";

export async function createRegion(name: string) {

    const region = await prisma.region.findUnique({
        where: {
            name
        }
    })

    if (region) throw new Error("Região já existe")

    return await prisma.region.create({
        data: {
            name
        }
    })
}