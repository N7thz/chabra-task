import { findImageByUserId } from "@/actions/users/find-image-by-user-id"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useQuery } from "@tanstack/react-query"
import { Ellipsis, RotateCw } from "lucide-react"
import { toast } from "@/components/toast"

export const AvatarGroup = ({ usersId }: { usersId: string[] }) => {

	const {
		data: users,
		isLoading,
		error,
		refetch
	} = useQuery({
		queryKey: ["find-image-by-user-id"],
		queryFn: () => findImageByUserId(usersId)
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

	if (isLoading || !users) {
		return (
			<div className="-space-x-[0.6rem] flex">
				{
					["", "", ""].map((_, index) => (
						<Avatar
							key={index}
							className="ring-2 ring-background"
						>
							<AvatarImage alt="U1" src={_} />
							<AvatarFallback>
								<Ellipsis />
							</AvatarFallback>
						</Avatar>
					))
				}
			</div>
		)
	}

	return (
		<div className="-space-x-[0.6rem] flex">
			{
				users.map(user => {

					if (!user) return

					return (
						<Avatar
							key={user.id}
							className="ring-2 ring-background"
						>
							<AvatarImage
								alt="U1"
								src={user.image ?? undefined}
							/>
							<AvatarFallback>
								<Ellipsis />
							</AvatarFallback>
						</Avatar>
					)
				})
			}
		</div>
	)
}
