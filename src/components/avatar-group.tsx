import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Ellipsis } from "lucide-react"

export const AvatarGroup = ({ images }: { images: string[] }) => {
	return (
		<div className="-space-x-[0.6rem] flex">
			{images.map(image => (
				<Avatar key={image} className="ring-2 ring-background">
					<AvatarImage alt="U1" src={image} />
					<AvatarFallback>
						<Ellipsis />
					</AvatarFallback>
				</Avatar>
			))}
		</div>
	)
}
