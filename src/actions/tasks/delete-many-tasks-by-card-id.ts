"use server"

import { prisma } from "@/lib/prisma"
import { findCardById } from "../cards/find-card-by-id"

export async function deleteManyTasksByCardId(cardId: string) {
	await findCardById(cardId)

	return await prisma.task.deleteMany({
		where: {
			cardId,
		},
	})
}
