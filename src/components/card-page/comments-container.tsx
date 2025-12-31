import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Comments } from "@prisma/client"
import { ChevronDown, MessageSquareText } from "lucide-react"
import { CommentsItem } from "./comments-item"

type CommentsContainerProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    comments: Comments[]
    toggleExclusive(target: "comments" | "activities"): void
}

export const CommentsContainer = ({
    open,
    onOpenChange,
    comments,
    toggleExclusive
}: CommentsContainerProps) => {
    return (
        <Collapsible
            open={open}
            onOpenChange={(open) => {
                toggleExclusive("comments")
                onOpenChange(open)
            }}
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
