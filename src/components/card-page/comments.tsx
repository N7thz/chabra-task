import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Comments } from "@prisma/client"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronDown, Ellipsis, MessageSquareText } from "lucide-react"

type CommentsContainerProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    comments: Comments[]
}

export const CommentsContainer = ({
    open,
    onOpenChange,
    comments
}: CommentsContainerProps) => {

    console.log(comments)

    return (
        <Collapsible
            open={open}
            onOpenChange={onOpenChange}
            className="flex flex-col gap-2"
        >
            <CollapsibleTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-between"
                >
                    <div className="truncate flex gap-1.5 items-center">
                        <MessageSquareText />
                        Comentários
                    </div>
                    <ChevronDown className={cn(
                        "duration-200",
                        open ? "rotate-180" : "-rotate-0"
                    )} />
                </Button>
            </CollapsibleTrigger>
            <ScrollArea className="max-h-50">
                <ScrollBar />
                <CollapsibleContent className="flex flex-col gap-3">
                    {
                        comments.length === 0
                            ? (
                                <div className="rounded-md border py-2 px-2.5 text-sm flex flex-col gap-5">
                                    <span className="truncate text-center text-muted-foreground italic">
                                        sem comentários ainda...
                                    </span>
                                </div>
                            )
                            : comments.map(({ id, message, createdAt }) => (
                                <Card
                                    key={id}
                                    className="bg-transparent py-4"
                                >
                                    <CardHeader className="px-4">
                                        <Avatar className="mb-2">
                                            <AvatarImage
                                                src="https://github.com/shadcn.png"
                                                alt="@shadcn"
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <CardTitle className="text-sm font-normal">
                                            {message}
                                        </CardTitle>
                                        <CardAction>
                                            <Button variant="ghost">
                                                <Ellipsis />
                                            </Button>
                                        </CardAction>
                                    </CardHeader>
                                    <CardFooter className="text-xs justify-end text-muted-foreground">
                                        {formatDate(createdAt, "dd 'de' MMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                                    </CardFooter>
                                </Card>
                            ))
                    }
                </CollapsibleContent>
            </ScrollArea>
        </Collapsible>
    )
}
