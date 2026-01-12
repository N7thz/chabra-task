import { ReadFilter } from "@/actions/notifications/find-many-notifications"
import { Label } from "@/components/ui/label"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { ComponentProps } from "react"
import {
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"

type NotifcationRadioGroupProps =
    ComponentProps<typeof DropdownMenuRadioGroup> & {
        includeRead: ReadFilter
        setIncludeRead: (value: ReadFilter) => void
        setOpen: (open: boolean) => void
    }

export const NotifcationRadioGroup = ({
    includeRead,
    setIncludeRead,
    setOpen,
    className,
    ...props
}: NotifcationRadioGroupProps) => {

    const options: { value: ReadFilter, text: string }[] = [
        {
            value: "all",
            text: "todas"
        },
        {
            value: "read",
            text: "lidas"
        },
        {
            value: "unread",
            text: "não lidas"
        },
    ]

    return (
        <DropdownMenuRadioGroup
            value={includeRead}
            onValueChange={(value) => {
                setIncludeRead(value as ReadFilter)
                setTimeout(() => setOpen(true), 0)
            }}
            {...props}
            className={cn("flex p-2 justify-evenly", className)}
        >
            {
                options.map(({ text, value }) => (
                    <DropdownMenuRadioItem
                        key={value}
                        value={value}
                        className="flex items-center gap-3"
                    >
                        {text}
                    </DropdownMenuRadioItem>
                ))
            }
        </DropdownMenuRadioGroup>
    )
}
