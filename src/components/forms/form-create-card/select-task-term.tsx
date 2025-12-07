import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { CreateCardProps } from "@/schemas/create-card-schema"
import { ptBR } from "date-fns/locale"

export const SelectTaskTerm = ({ index }: { index: number }) => {

    const [open, setOpen] = useState(false)

    const {
        setValue,
        watch, 
        formState: { errors }
    } = useFormContext<CreateCardProps>()

    useEffect(() => {
        if (errors.term) setOpen(true)
    }, [])

    const date = watch(`tasks.${index}.term`)

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    id="date"
                    variant="outline"
                    className="w-full justify-between font-normal text-muted-foreground"
                >
                    {date
                        ? date.toLocaleDateString()
                        : "Selecione uma data"
                    }
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="w-auto overflow-hidden p-0"
            >
                <Calendar
                    locale={ptBR}
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {

                        if (date) setValue(`tasks.${index}.term`, date)

                        setOpen(false)
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}