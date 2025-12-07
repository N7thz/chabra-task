import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { admin as adminPlugin } from "better-auth/plugins"
import { prisma } from "./prisma"

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	account: {
		accountLinking: {
			enabled: true,
		},
	},
	user: {
		deleteUser: {
			enabled: true,
		},
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
	},
})
