"use server"

import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { findUserById } from "./find-user-by-id"

export async function updateUser(id: string, formData: Prisma.UserUpdateInput) {
	await findUserById(id)

	const userUpdated = await prisma.user.update({
		where: {
			id,
		},
		data: formData,
	})

	return { userUpdated }
}
