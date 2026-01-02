import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { ListWithCards } from "@/types"
import Link from "next/link"
import { CardContainer } from "../card-container"
import { DropdownMenuEditDialog } from "../dropdown-menu-edit-list"

export const ListContainerItem = ({ list, space }: {
    list: ListWithCards,
    space: string
}) => {

    const { id, name, color, cards = [] } = list

    return (
        <Card className="w-100 h-min pt-0 overflow-hidden">
            <CardHeader style={{
                background: color ?? undefined
            }}>
                <CardAction className="mt-5">
                    <DropdownMenuEditDialog
                        id={id}
                        name={name}
                    />
                </CardAction>
                <CardTitle className="truncate mt-5">
                    {name}
                    <span className="ml-2 text-muted-foreground">
                        {cards.length}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {
                    cards.length === 0
                        ? (
                            <CardDescription>
                                Sem cartões nesta lista.
                            </CardDescription>
                        ) : cards.map(card => (
                            <CardContainer
                                key={card.id}
                                card={card}
                                space={space}
                            />
                        ))
                }
            </CardContent>
            <CardFooter>
                <Button
                    asChild
                    className="w-full"
                >
                    <Link href={`/${space}/${id}/create-card`}>
                        Adicionar cartão
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
