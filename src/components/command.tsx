"use client"

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
	CommandSeparator,
} from "@/components/ui/command"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { RouteProps, routes } from "@/data/route"
import { authClient } from "@/lib/auth-client"
import { ShieldUser } from "lucide-react"
import { redirect, RedirectType } from "next/navigation"
import { useEffect, useState } from "react"
import { Animation } from "./animation"

export const Command = () => {

	const [open, setOpen] = useState(false)

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen(open => !open)
			}
		}

		document.addEventListener("keydown", down)

		return () => document.removeEventListener("keydown", down)
	}, [])

	const { data } = authClient.useSession()

	const role = data?.user.role

	return (
		<>
			<CommandDialog
				open={open}
				onOpenChange={setOpen}
				className="border-primary">
				<CommandInput placeholder="Pesquise uma opção..." />
				{role === "ADMIN" && (
					<>
						<CommandGroup heading="Administrador">
							<Animation
								initial={{ x: -100, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								exit={{ x: -100, opacity: 0 }}
								transition={{ duration: 0.5 }}
							>
								<CommandItem
									onSelect={() => {
										setTimeout(() => setOpen(false), 800)
										redirect("/create-update", RedirectType.push)
									}}>
									Criar novidades
									<CommandShortcut>
										<ShieldUser />
									</CommandShortcut>
								</CommandItem>
							</Animation>
						</CommandGroup>
						<CommandSeparator />
					</>
				)}
				<CommandList>
					<CommandEmpty className="text-base text-muted-foreground">
						Não foi encontrado o resultado.
					</CommandEmpty>
					<ScrollArea className="h-[320px] p-1.5">
						<ScrollBar />
						<CommandGroup heading="Opções">
							{routes.map(({ href, text, Icon }, i) => (
								<Animation
									key={href}
									initial={{ x: -100, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									exit={{ x: -100, opacity: 0 }}
									transition={{
										duration: 0.5,
										delay: i * 0.3
									}}
								>
									<CommandItem
										key={href}
										onSelect={() => {
											setTimeout(() => setOpen(false), 800)
											redirect(href, RedirectType.push)
										}}>
										{text}
										<CommandShortcut>
											<Icon />
										</CommandShortcut>
									</CommandItem>
								</Animation>
							))}
						</CommandGroup>
					</ScrollArea>
				</CommandList>
			</CommandDialog>
		</>
	)
}
