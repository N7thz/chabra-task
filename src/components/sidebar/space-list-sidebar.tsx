"use client"

import { findManySpace } from "@/actions/spaces/find-many-spaces"
import { toast } from "@/components/toast"
import {
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { Blend, Dot, RotateCw } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const SpaceListSidebar = () => {
	const { open } = useSidebar()

	const pathname = usePathname()

	const validPathname = usePathname().startsWith("/space")
		? decodeURI(pathname).slice(7)
		: pathname

	const {
		data: spaces,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["find-many-spaces"],
		queryFn: () => findManySpace(),
	})

	if (error) {
		return toast({
			title: error.name,
			description: error.message,
			variant: "destructive",
			duration: Infinity,
			closeButton: true,
			action: {
				label: (
					<span className="flex items-center gap-2 group">
						Tentar novamente
						<RotateCw className="size-3 group-hover:rotate-180 transition-transform" />
					</span>
				),
				onClick: () => refetch(),
			},
		})
	}

	if (isLoading || !spaces)
		return (
			<>
				<SidebarMenuItem>
					<SidebarMenuButton>
						<Skeleton />
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem className="opacity-50">
					<SidebarMenuButton>
						<Skeleton />
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem className="opacity-30">
					<SidebarMenuButton>
						<Skeleton />
					</SidebarMenuButton>
				</SidebarMenuItem>
			</>
		)

	return (
		<>
			{spaces.length === 0 && open ? (
				<span className="text-center">Você ainda não possui espaços</span>
			) : (
				spaces.map(({ id, name }) => (
					<SidebarMenuItem key={id}>
						<SidebarMenuButton asChild>
							<Link
								href={`/space/${name}`}
								className={cn(
									validPathname === name &&
										"border border-primary flex justify-between"
								)}>
								<div className="flex items-center gap-2">
									<Blend />
									<span
										className={cn(
											"capitalize",
											validPathname === name ? "font-semibold" : "font-light"
										)}>
										{name}
									</span>
								</div>
								{validPathname === name && <Dot className="scale-200" />}
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))
			)}
		</>
	)
}
