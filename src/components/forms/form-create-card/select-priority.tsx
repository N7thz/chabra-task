import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useFormContext } from "react-hook-form"
import { CreateCardProps } from "@/schemas/create-card-schema"
import { Priority } from "@prisma/client"
import { cn } from "@/lib/utils"

const priorityArray: { value: Priority, text: string }[] = [
    {
        value: "URGENT",
        text: "urgente"
    },
    {
        value: "HIGH",
        text: "alta"
    },
    {
        value: "MID",
        text: "média"
    },
    {
        value: "LOW",
        text: "baixa"
    }
]

export const SelectPriority = () => {

    const { setValue } = useFormContext<CreateCardProps>()

    return (
        <Select onValueChange={(value) => setValue("priority", value as Priority)}>
            <SelectTrigger className="w-full text-muted-foreground">
                <SelectValue
                    placeholder="Selecione a prioridade"
                    className="capitalize"
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Prioridade</SelectLabel>
                    {
                        priorityArray.map(({ text, value }) => (
                            <SelectItem
                                key={value}
                                value={value}
                                className="capitalize"
                            >
                                <span className={cn(
                                    "size-2 rounded-full",
                                    value === "URGENT" && "bg-red-500",
                                    value === "HIGH" && "bg-amber-600",
                                    value === "MID" && "bg-yellow-500",
                                    value === "LOW" && "bg-green-500",
                                )} />
                                {text}
                            </SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
