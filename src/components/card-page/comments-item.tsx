import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Comments } from "@prisma/client"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Ellipsis } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { getInitials } from "@/functions/get-initials"
import { stringToHTML } from "@/functions/string-to-HTML"
import { Skeleton } from "../ui/skeleton"

export const CommentsItem = ({
    comment: { message, createdAt }
}: { comment: Comments }) => {

    const { data } = authClient.useSession()

    if (!data) {
        return (
            <Card className="bg-transparent">
                <CardHeader className="px-4">
                    <div className="w-full flex gap-2 items-center py-0.5">
                        <Avatar className="mb-2">
                            <AvatarImage
                                src={undefined}
                                alt="@shadcn"
                            />
                            <AvatarFallback>
                                <Ellipsis />
                            </AvatarFallback>
                        </Avatar>
                        <CardTitle>
                            <Skeleton />
                        </CardTitle>
                    </div>
                    <CardAction>
                        <Button disabled variant="ghost">
                            <Ellipsis />
                        </Button>
                    </CardAction>
                </CardHeader>
            </Card>
        )
    }

    const { user: { name, image } } = data

    const initials = getInitials(name)

    const message_element = stringToHTML(message)

    const date = formatDate(createdAt, "dd 'de' MMM 'de' yyyy 'às' HH:mm", { locale: ptBR })

    return (
        <Card className="bg-transparent py-4">
            <CardHeader className="px-4">
                <div className="w-full flex gap-2 items-center py-0.5">
                    <Avatar className="mb-2">
                        <AvatarImage
                            src={image ? image : undefined}
                            alt="@shadcn"
                        />
                        <AvatarFallback>
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-base font-normal capitalize">
                        {name}
                    </CardTitle>
                </div>
                <CardDescription className="text-primary">
                    {message_element}
                </CardDescription>
                <CardAction>
                    <Button variant="ghost">
                        <Ellipsis />
                    </Button>
                </CardAction>
            </CardHeader>
            <CardFooter className="text-xs justify-end text-muted-foreground">
                {date}
            </CardFooter>
        </Card>
    )
}
