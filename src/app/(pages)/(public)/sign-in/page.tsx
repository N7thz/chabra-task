import { FormSign } from "@/components/forms/form-sign"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export const metadata = {
	title: "Stock App | Login",
}

export default async function SignInPage() {
	return (
		<main
			className={cn(
				"h-dvh flex items-center justify-center p-8",
				"max-sm:px-4"
			)}>
			<Card className={cn("w-full justify-between border-primary", "xl:w-2/5")}>
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
					<CardDescription>Logue com o e-mail e senha</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<FormSign />
				</CardContent>
			</Card>
		</main>
	)
}
