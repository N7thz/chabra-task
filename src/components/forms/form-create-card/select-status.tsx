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

type Status = "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED"

export const SelectStatus = () => {

    const statusArray = [
        {
            value: "ACTIVE",
            text: "ativo"
        },
        {
            value: "INACTIVE",
            text: "inativo"
        },
        {
            value: "PENDING",
            text: "pendente"
        },
        {
            value: "SUSPENDED",
            text: "suspenso"
        }
    ]

    const { setValue } = useFormContext<CreateCardProps>()

    return (
        <Select onValueChange={(value) => setValue("status", value as Status)}>
            <SelectTrigger className="w-full">
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
                                {text}
                            </SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
