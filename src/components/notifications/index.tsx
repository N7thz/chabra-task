"use client"

import {
	findNotificationsyUserId
} from "@/actions/notifications/find-many-notifications"
import { Animation } from "@/components/animation"
import { toast } from "@/components/toast"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { queryKeys } from "@/utils/query-keys"
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu"
import { useQuery } from "@tanstack/react-query"
import { Bell, RotateCw } from "lucide-react"

export const NotificationsContainer = ({
	recipientId
}: { recipientId: string }) => {

	const {
		data: notifications,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: queryKeys.notification.findMany(recipientId),
		queryFn: () => findNotificationsyUserId(recipientId),
	})

	if (error) {
		return (
			toast({
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
					onClick: () => refetch()
				}
			})
		)
	}

	if (isLoading || !notifications) {
		return (
			<SidebarMenuItem>
				<SidebarMenuButton className="justify-between">
					<div className="flex items-center gap-2">
						<Bell className="size-4" />
						<span>
							Notificações
						</span>
					</div>
					<Badge>
						99
					</Badge>
				</SidebarMenuButton>
			</SidebarMenuItem>
		)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuItem>
					<SidebarMenuButton className="justify-between">
						<div className="flex items-center gap-2">
							<Bell className="size-4" />
							<span>
								Notificações
							</span>
						</div>
						<Badge>
							{notifications.length}
						</Badge>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				asChild
				align="end"
				className="translate-x-50"
			>
				<div className="w-100">
					<DropdownMenuLabel className="text-base flex gap-2">
						<Bell />
						Notificações
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<ScrollArea className="h-104 w-full">
						<ScrollBar />
						<DropdownMenuGroup>
							{
								notifications.length === 0
									? (
										<Card className="border-none">
											<CardHeader>
												<CardDescription className="text-center">
													Nenhuma notificação encontrada.
												</CardDescription>
											</CardHeader>
										</Card>
									)
									: notifications.map((notification, i) => (
										<Animation
											key={notification.id}
											initial={{ x: -100, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											exit={{ x: -100, opacity: 0 }}
											transition={{
												duration: 0.5,
												delay: i * 0.3
											}}
										>
											<div>
												{notification.message}
											</div>
										</Animation>
									))
							}
						</DropdownMenuGroup>
					</ScrollArea>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
