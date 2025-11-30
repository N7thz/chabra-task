import { Header } from "@/components/header"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { LayoutProps } from "@/types"

export default async function PrivateLayout({ children }: LayoutProps) {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) redirect("/sign-in")

	return (
		<div className="flex flex-col h-dvh itemce">
			<Header />
			<ScrollArea className="h-container flex overflow-y-hidden">
				<ScrollBar />
				{children}
			</ScrollArea>
		</div>
	)
}
