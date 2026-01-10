"use server"

import { prisma } from "@/lib/prisma"

export async function findUserByEmail(email: string) {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
		omit: {
			password: true,
			createdAt: true,
		},
	})

	if (!user) throw new Error("Não foi possivel encontrar o usuario")

	return user
}
