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
import { CommentsItem } from "./comments-item"

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
            <ScrollArea className="max-h-30">
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
                            : comments.map(comment => (
                                <CommentsItem
                                    key={comment.id}
                                    comment={comment}
                                />
                            ))
                    }
                </CollapsibleContent>
            </ScrollArea>
        </Collapsible>
    )
}
