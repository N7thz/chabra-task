import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import { ac, admin, user } from "@/auth/permissions"

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
	plugins: [
		adminClient({
			ac,
			roles: { admin, user },
		}),
	],
})
