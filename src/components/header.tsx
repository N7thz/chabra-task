"use client"

import { Command } from "@/components/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { authClient } from "@/lib/auth-client"
import { Ellipsis, UserCircle2 } from "lucide-react"
import { useEffect, useState } from "react"
import { AnimatedThemeToggler } from "./magicui/animated-theme-toggler"

export const Header = () => {

	const [open, setOpen] = useState(false)

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "q" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen(open => !open)
			}
		}

		document.addEventListener("keydown", down)

		return () => document.removeEventListener("keydown", down)
	}, [])

	const { data, error } = authClient.useSession()

	if (error || !data) {
		return (
			<header className="h-18 flex items-center justify-between px-4 py-2.5 border border-b-primary">
				<Avatar className="size-8">
					<AvatarImage />
					<AvatarFallback>
						<Ellipsis />
					</AvatarFallback>
				</Avatar>
				<div className="flex gap-2">
					<AnimatedThemeToggler />
				</div>
			</header>
		)
	}

	const {
		user: { image, name },
	} = data

	return (
		<header className="bg-background h-18 flex items-center justify-between px-4 py-2.5 border border-b-primary">
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger>
					<Avatar className="size-8">
						<AvatarImage src={image ?? undefined} />
						<AvatarFallback>
							<UserCircle2 />
						</AvatarFallback>
					</Avatar>
				</SheetTrigger>
				<SheetContent side="left" className="px-6 border-primary">
					<SheetHeader>
						<SheetTitle>{`Olá ${name}`}</SheetTitle>
						<SheetDescription>
							Veja as opções do app e preferências
						</SheetDescription>
					</SheetHeader>
					<Avatar className="size-50 mx-auto">
						<AvatarImage src={image ?? undefined} />
						<AvatarFallback>
							<UserCircle2 strokeWidth={0.2} className="size-48" />
						</AvatarFallback>
					</Avatar>
					<SheetFooter className="w-full flex p-0 pb-4">
						
					</SheetFooter>
				</SheetContent>
			</Sheet>
			<div className="flex gap-2">
				<AnimatedThemeToggler />
				<Command />
				
			</div>
		</header>
	)
}
