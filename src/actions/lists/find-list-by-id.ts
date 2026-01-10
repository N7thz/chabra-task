"use server"

import { prisma } from "@/lib/prisma"

export async function findListById(id: string) {
	const list = await prisma.list.findUnique({
		where: {
			id,
		},
	})

	if (!list) throw new Error("Lista não encontrada")

	return list
}
