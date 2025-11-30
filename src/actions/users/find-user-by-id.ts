"use server"

import { prisma } from "@/lib/prisma"

export async function findUserById(id: string) {

	const user = await prisma.user.findUnique({
		where: { id },
	})

	if (!user) throw new Error("Não foi possivel encontrar o usuario")

	return user
}
