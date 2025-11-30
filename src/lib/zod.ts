import { UseFormSetError } from "react-hook-form"
import { ZodError } from "zod"

export function validateErrors<T>(
	error: ZodError<T>,
	setError: UseFormSetError<any>
) {
	error._zod.def.map(error => {
		const path = error.path.join(".") as any

		const message = error.message

		setError(path, { message })
	})
}
