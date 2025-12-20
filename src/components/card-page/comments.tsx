import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { Comments } from "@prisma/client"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronDown, MessageSquareText } from "lucide-react"
import { useState } from "react"

export const CommentsContainer = ({ comments }: { comments: Comments[] }) => {

    const [open, setOpen] = useState(false)

    console.log(comments)

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
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
                            <div
                                key={id}
                                className="rounded-md border py-2 px-2.5 text-sm flex flex-col gap-5"
                            >
                                <span className="truncate">
                                    {message}
                                </span>
                                <span className="truncate text-xs text-muted-foreground self-end">
                                    {formatDate(createdAt, "dd 'de' MMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                                </span>
                            </div>
                        ))
                }
            </CollapsibleContent>
        </Collapsible>
    )
}
