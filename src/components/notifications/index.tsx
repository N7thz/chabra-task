"use client"

import { findNotificationsyUserId } from "@/actions/notifications/find-many-notifications"
import { Animation } from "@/components/animation"
import { toast } from "@/components/toast"
import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu"
import { useQuery } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Bell, Ellipsis, RotateCw } from "lucide-react"
import { Button } from "../ui/button"
import { NotificationItem } from "./notification-item"

type NotificationsContainerProps = { recipientId: string }

export const NotificationsContainer = ({
	recipientId
}: NotificationsContainerProps) => {

	const { open } = useSidebar()

	const {
		data: notifications,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["find-many-notifications-by-recipient-id", recipientId],
		queryFn: () => findNotificationsyUserId(recipientId),
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

	if (isLoading || !notifications) {
		return (
			<SidebarMenuItem>
				<SidebarMenuButton className="justify-between">
					<div className="flex items-center gap-2">
						<Bell className="size-4" />
						<span>Notificações</span>
					</div>
					<Badge>99</Badge>
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
							<span>Notificações</span>
						</div>
						<Badge>{notifications.length}</Badge>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				asChild
				align="end"
				className={cn(open ? "translate-x-50" : "translate-x-16")}
			>
				<div className="w-100">
					<DropdownMenuLabel className="text-base flex gap-2 justify-between">
						<div className="flex gap-2 items-center">
							<Bell className="size-4" />
							Notificações
						</div>
						<Badge>{notifications.length}</Badge>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<ScrollArea className="h-104 w-full">
						<ScrollBar />
						<DropdownMenuGroup className="space-y-2">
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
									: (
										notifications.map((notification, i) => (
											<Animation
												key={notification.id}
												initial={{ x: -100, opacity: 0 }}
												animate={{ x: 0, opacity: 1 }}
												exit={{ x: -100, opacity: 0 }}
												transition={{
													duration: 0.5,
													delay: i * 0.3,
												}}>
												<NotificationItem
													notification={notification}
												/>
											</Animation>
										))
									)}
						</DropdownMenuGroup>
					</ScrollArea>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
