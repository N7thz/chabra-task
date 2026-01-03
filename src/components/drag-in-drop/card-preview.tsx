import { Button } from "@/components/ui/button"
import {
    CardHeader,
    CardTitle,
    Card as UICard
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Card } from "@/types"
import { GripHorizontal } from "lucide-react"

export function CardPreview({ card: { title } }: { card: Card }) {
    return (
        <UICard className="w-100 shadow-xl pt-2.5 gap-1.5 overflow-hidden">
            <CardHeader>
                <Button disabled variant={"ghost"}>
                    <GripHorizontal className="size-6" />
                </Button>
            </CardHeader>
            <Separator />
            <CardHeader>
                <CardTitle className="text-base text-muted-foreground">
                    {title}
                </CardTitle>
            </CardHeader>
        </UICard>
    )
}
