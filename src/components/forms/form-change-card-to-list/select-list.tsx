import { findManyList } from "@/actions/lists/find-many-list"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { ChangeCardListProps } from "@/schemas/change-card-list-schema"
import { ListWithCards } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useFormContext } from "react-hook-form"

export const SelectList = ({
    space,
    listName
}: {
    space: string
    listName: string | undefined
}) => {

    const { setValue } = useFormContext<ChangeCardListProps>()

    const {
        data: lists,
        isLoading
    } = useQuery({
        queryKey: ["find-many-lists"],
        queryFn: () => findManyList<ListWithCards[]>({
            where: {
                space: {
                    name: space
                }
            }
        })
    })

    if (!lists || isLoading) {
        return (
            <Select>
                <SelectTrigger disabled className="w-full">
                    <SelectValue placeholder="Selecione nova lista a lista" />
                </SelectTrigger>
            </Select>
        )
    }

    return (
        <Select onValueChange={(value) => setValue("newListId", value)}>
            <SelectTrigger className={cn(
                "w-full capitalize",
                "placeholder:normal-case"
            )}>
                <SelectValue placeholder="Selecione nova lista" />
            </SelectTrigger>
            <SelectContent className="w-full">
                <SelectGroup>
                    <SelectLabel>
                        Listas
                    </SelectLabel>
                    <SelectSeparator />
                    {
                        lists.map(({ id, name }) => (
                            <SelectItem
                                key={id}
                                value={id}
                                disabled={listName === name}
                            >
                                {name}
                                {
                                    listName === name &&
                                    <div className="text-muted-foreground">
                                        {`(Lista atual)`}
                                    </div>
                                }
                            </SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
