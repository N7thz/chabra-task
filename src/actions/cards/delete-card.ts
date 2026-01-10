"use server"

import { prisma } from "@/lib/prisma"
import { findCardById } from "./find-card-by-id"

export async function delelteCard(id: string) {
	await findCardById(id)

	return await prisma.card.delete({
		where: { id },
	})
}
