import { SelectOwners } from "@/components/forms/form-create-card/select-owners"
import { SelectTerm } from "@/components/forms/form-create-card/select-term"
import {
    Card,
    CardAction,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Task } from "@prisma/client"

export const CardTask = ({
    task: {
        id, name, term, ownersId
    }
}: { task: Task }) => {
    return (
        <Card
            key={id}
            className="bg-transparent"
        >
            <CardHeader>
                <CardAction>
                    <Checkbox />
                </CardAction>
                <CardTitle className="text-sm">
                    {name}
                </CardTitle>
                <SelectTerm
                    date={term ?? undefined}
                    onDateChange={(date) => console.log("term", date)}
                />
                <SelectOwners
                    selected={ownersId}
                    onSelectionChange={() => console.log(ownersId)}
                />
            </CardHeader>
        </Card>
    )
}
