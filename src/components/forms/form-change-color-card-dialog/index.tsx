import { changeColorList } from "@/actions/card/change-color-card"
import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
    ChangeColorListProps, changeColorListSchema
} from "@/schemas/change-color-list-schema"
import { colors } from "@/utils/colors"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"

export const FormChangeColorCardDialog = ({
    id, onOpenChange
}: {
    id: string
    onOpenChange: (open: boolean) => void
}) => {

    const { mutate, isPending } = useMutation({
        mutationKey: ["change-color-card"],
        mutationFn: (color: string) => changeColorList({ id, color }),
        onSuccess: () => {

            toast({
                title: "A capa foi atualizada.",
                onAutoClose: () => onOpenChange(false)
            })

            queryClient.invalidateQueries({
                queryKey: ["find-card-by-id", id]
            })
        },
        onError: (error) => {
            toast({
                title: error.name,
                description: error.message,
                variant: "destructive"
            })
        }
    })

    const {
        setValue,
        watch,
        handleSubmit,
    } = useForm<ChangeColorListProps>({
        resolver: zodResolver(changeColorListSchema),
        defaultValues: {
            color: undefined
        }
    })

    const currentColor = watch("color")

    console.log(currentColor)

    function onSubmit({ color }: ChangeColorListProps) {
        mutate(color)
    }

    return (
        <ScrollArea>
            <ScrollBar />
            <form
                id="form-change-card-color"
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-4 gap-3 h-100"
            >
                {
                    colors.map(color => (
                        <div
                            key={color}
                            style={{
                                background: color
                            }}
                            className={cn(
                                "size-24 rounded-sm duration-200", "hover:scale-90",
                                color === currentColor && "flex items-center justify-center border-4 border-primary"
                            )}
                            onClick={() => setValue("color", color)}
                        >
                            <Check className={cn(
                                color === currentColor
                                    ? "visible size-10"
                                    : "invisible"
                            )} />
                        </div>
                    ))
                }
            </form>
        </ScrollArea>
    )
}
