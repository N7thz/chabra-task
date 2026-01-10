"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"

export async function findMyCards() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) {
		throw new Error(
			"Não foi possivel encontrar a sessão, tente logar novamente."
		)
	}

	const id = session.user.id

	return await prisma.card.findMany({
		where: {
			OR: [
				{
					ownersId: {
						has: id,
					},
				},
				{
					tasks: {
						some: {
							ownersId: {
								has: id,
							},
						},
					},
				},
			],
		},
	})
}
