import { changeColorList } from "@/actions/lists/change-color-list"
import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import {
    ChangeColorListProps, changeColorListSchema
} from "@/schemas/change-color-list-schema"
import { colors } from "@/utils/colors"
import { queryKeys } from "@/utils/query-keys"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"

export const FormChangeColorListDialog = ({
    id,
    open,
    onOpenChange
}: {
    id: string
    open: boolean,
    onOpenChange: (open: boolean) => void
}) => {

    const { mutate, isPending } = useMutation({
        mutationKey: ["change-color-list"],
        mutationFn: (color: string) => changeColorList({ id, color }),
        onSuccess: () => {

            toast({
                title: "A lista foi atualizada.",
                onAutoClose: () => onOpenChange(false)
            })

            queryClient.invalidateQueries({
                queryKey: queryKeys.list.findMany()
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
        register,
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
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="space-y-4 w-full">
                <DialogHeader>
                    <DialogTitle>
                        Alterar cor da lista
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea>
                    <ScrollBar />
                    <form
                        id="form-change-color"
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
                                    <Input
                                        className="hidden"
                                        {...register("color")}
                                    />
                                </div>
                            ))
                        }
                    </form>
                </ScrollArea>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="destructive">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button
                        form="form-change-color"
                        type="submit"
                        disabled={isPending || currentColor === undefined}
                    >
                        {
                            (isPending)
                                ? <Spinner />
                                : "Confirmar"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
