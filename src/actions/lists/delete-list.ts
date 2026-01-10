"use server"

import { prisma } from "@/lib/prisma"
import { findListById } from "./find-list-by-id"

export async function deleteList(id: string) {
	await findListById(id)

	return await prisma.list.delete({
		where: { id },
	})
}
