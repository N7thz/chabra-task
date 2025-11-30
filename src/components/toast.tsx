import { CheckCircle, XCircle } from "lucide-react"
import { toast as toastPrimitive, type ExternalToast } from "sonner"

type ToastProps = ExternalToast & {
	title: string
	description?: string | null
	variant?: "success" | "error"
}

export const toast = ({
	title,
	description,
	variant = "success",
	...props
}: ToastProps) =>
	toastPrimitive(title, {
		duration: 2000,
		description: <span className="text-muted-foreground">{description}</span>,
		icon:
			variant === "success" ? (
				<CheckCircle className="size-4 text-primary" />
			) : (
				<XCircle className="size-4 text-destructive" />
			),
		...props,
	})
