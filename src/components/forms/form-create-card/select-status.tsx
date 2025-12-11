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
import { Status } from "@prisma/client"
import { cn } from "@/lib/utils";

export const statusArray = [
    {
        value: "PENDING",
        text: "Pendente"
    },
    {
        value: "IN_PROGRESS",
        text: "Em andamento"
    },
    {
        value: "COMPLETED",
        text: "Concluída"
    }
] as const;


export const SelectStatus = () => {

    const { setValue } = useFormContext<CreateCardProps>()

    return (
        <Select onValueChange={(value) => setValue("status", value as Status)}>
            <SelectTrigger className="w-full text-muted-foreground">
                <SelectValue
                    placeholder="Selecione o status"
                    className="capitalize"
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {
                        statusArray.map(({ text, value }) => (
                            <SelectItem
                                key={value}
                                value={value}
                                className="capitalize"
                            >
                                <span className={cn(
                                    "size-2 rounded-full",
                                    value === "PENDING" && "bg-red-500",
                                    value === "IN_PROGRESS" && "bg-yellow-500",
                                    value === "COMPLETED" && "bg-green-500",
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
