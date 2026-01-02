import { 
    Card as UICard, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card"
import type { Card } from "@/types"

export function CardPreview({ card: { title } }: { card: Card }) {
    return (
        <UICard className="w-100 shadow-xl bg-card">
            <CardHeader>
                <CardTitle className="text-base text-muted-foreground">
                    {title}
                </CardTitle>
            </CardHeader>
        </UICard>
    )
}
