import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
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
import { Activity } from "@prisma/client"
import { formatDate } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronDown, History } from "lucide-react"
import { useState } from "react"

type ActivitiesContainerProps = {
    activities: Activity[]
    open: boolean
    setOpen: (open: boolean) => void
    toggleExclusive(target: "comments" | "activities"): void
}

export const ActivitiesContainer = ({
    open,
    setOpen,
    activities,
    toggleExclusive
}: ActivitiesContainerProps) => {

    return (
        <Collapsible
            open={open}
            onOpenChange={(open) => {
                toggleExclusive("activities")
                setOpen(open)
            }}
            className="flex flex-col gap-2"
        >
            <CollapsibleTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-between"
                >
                    <div className="truncate flex gap-1.5 items-center">
                        <History />
                        Atividades
                    </div>
                    <ChevronDown className={cn(
                        "duration-200",
                        open ? "rotate-180" : "-rotate-0"
                    )} />
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <ScrollArea className="h-40">
                    <ScrollBar />
                    <div className="size-full space-y-3">
                        {
                            activities.map(({ id, message, createdAt }) => (
                                <Card
                                    key={id}
                                    className="size-full bg-transparent p-2"
                                >
                                    <CardHeader className="px-2 gap-3">
                                        <CardTitle className="text-sm">
                                            {message}
                                        </CardTitle>
                                        <CardDescription className="truncate text-xs ml-auto">
                                            {formatDate(createdAt, "dd 'de' MMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            ))
                        }
                    </div>
                </ScrollArea>
            </CollapsibleContent>
        </Collapsible>
    )
}
