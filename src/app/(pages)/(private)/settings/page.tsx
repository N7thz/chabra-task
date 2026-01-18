import { Avatar } from "@/components/avatar"
import { FormCreateSpace } from "@/components/forms/form-create-space"
import { SpaceList } from "@/components/space-list"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { auth } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { User } from "@prisma/client"
import { Metadata } from "next"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
	title: "Configurações | Chabra Tasks",
}

export default async function Settings() {

	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) {
		redirect("/sign-in")
	}

	const { user } = session

	return (
		<main
			className={cn(
				"h-dvh w-full flex justify-center items-center p-8 gap-4",
				"max-sm:px-4"
			)}>
			<Card className="h-full w-1/4 pt-0 overflow-hidden">
				<CardHeader className="bg-red-500 h-40 relative">
					<Avatar
						user={user as User}
						className="absolute -bottom-6 left-6 size-25"
					/>
				</CardHeader>
				<CardHeader className="pt-4">
					<CardTitle className="capitalize">
						{user.name}
					</CardTitle>
					<CardDescription>
						{user.email}
					</CardDescription>
				</CardHeader>
			</Card>
			<Card className="h-full w-3/4">
				<CardHeader>
					<CardTitle>Configurações</CardTitle>
					<CardDescription>
						Configurações da sua conta e preferências do aplicativo.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<SpaceList className="w-full" />
					<Card className="w-full bg-background">
						<CardHeader>
							<CardTitle>
								Cadastrar regiões
							</CardTitle>
							<CardDescription>
								Cadastre novas regiões para organizar suas listas de tarefas.
							</CardDescription>
						</CardHeader>
						<FormCreateSpace />
					</Card>
				</CardContent>
			</Card>
		</main>
	)
}
