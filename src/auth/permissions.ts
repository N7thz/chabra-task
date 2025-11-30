import { createAccessControl } from "better-auth/plugins/access"
import {
	defaultStatements,
	adminAc,
	userAc,
} from "better-auth/plugins/admin/access"

const statement = {
	...defaultStatements,
	project: ["create", "share", "update", "delete"],
} as const

export const ac = createAccessControl(statement)

export const admin = ac.newRole({
	project: ["create", "update", "delete", "share"],
	...adminAc.statements,
})

export const user = ac.newRole({
	project: ["create", "update", "delete", "share"],
	...userAc.statements,
})
