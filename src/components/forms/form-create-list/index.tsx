"use client"

import { SpanErrorMessage } from "@/components/span-error"
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import {
    FormCreateListProps, createListSchema
} from "@/schemas/create-list-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const FormCreateList = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormCreateListProps>({
        resolver: zodResolver(createListSchema),
    })

    function onSubmit({ name }: FormCreateListProps) {
        
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
                >
                    Confirmar
                </AlertDialogAction>
            </AlertDialogFooter>
        </form>
    )
}
