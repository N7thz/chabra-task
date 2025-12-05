"use client"

import { createList } from "@/actions/lists/create-list"
import { SpanErrorMessage } from "@/components/span-error"
import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import {
    FormCreateListProps, createListSchema
} from "@/schemas/create-list-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { List } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { useForm } from "react-hook-form"

export const FormCreateList = () => {

    const pathname = usePathname()

    const space = pathname.split("/")[2]

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormCreateListProps>({
        resolver: zodResolver(createListSchema),
    })

    const {
        mutate,
        isPending,
        isSuccess
    } = useMutation({
        mutationKey: ["create-list"],
        mutationFn: (name: string) => createList({ name, space }),
        onSuccess: ({ name, ...rest }) => {

            toast({
                title: "Lista criada com sucesso!",
                description: `A lista ${name} foi criada com sucesso.`,
            })

            queryClient.setQueryData<List[]>(["find-many-lists"], (oldData) => {

                if (!oldData) return [{ name, ...rest }]

                return [...oldData, { name, ...rest }]
            })
        },
        onError: (error) => {

            console.error("Erro ao criar a lista:", error)

            toast({
                title: "Erro ao criar a lista",
                description: "Ocorreu um erro ao criar a lista. Por favor, tente novamente.",
                variant: "destructive"
            })
        }
    })

    function onSubmit({ name }: FormCreateListProps) {
        mutate(name)
    }

    return (
        <form
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div>
                <Input
                    placeholder="Nome da lista"
                    {...register("name")}
                />
                {
                    errors.name &&
                    <SpanErrorMessage message={errors.name.message} />
                }
            </div>
            <AlertDialogFooter>
                <AlertDialogCancel type="button" >
                    Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                    type="submit"
                    variant={"default"}
                    disabled={isPending || isSuccess}
                >
                    {
                        isPending ? <Spinner /> : "Confirmar"
                    }
                </AlertDialogAction>
            </AlertDialogFooter>
        </form>
    )
}
