import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover"
import { ptBR } from "date-fns/locale"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"

export const SelectTerm = ({
    date, setDate
}: { date: Date, setDate: (date: Date) => void }) => {

    const [open, setOpen] = useState(false)

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

                        if (date) setDate(date)

                        setOpen(false)
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}