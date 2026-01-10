import { User } from "@prisma/client"
import {
    Avatar as AvatarPrimitive,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import { getInitials } from "@/functions/get-initials"
import { ComponentProps } from "react"

type AvatarProps = ComponentProps<typeof AvatarPrimitive> & { user: User }

export const Avatar = ({
    user: {
        image, name
    },
    className,
    ...props
}: AvatarProps) => {
    return (
        <AvatarPrimitive
            className={className}
            {...props}
        >
            <AvatarImage src={image ?? undefined} />
            <AvatarFallback>
                {getInitials(name)}
            </AvatarFallback>
        </AvatarPrimitive>
    )
}
