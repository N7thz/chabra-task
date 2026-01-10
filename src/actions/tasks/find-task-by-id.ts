"use server"

import { prisma } from "@/lib/prisma"

export async function findTaskById(id: string) {
	const task = await prisma.task.findUnique({
		where: {
			id,
		},
	})

	if (!task) throw new Error("Tarefa não encontrada.")

	return task
}
