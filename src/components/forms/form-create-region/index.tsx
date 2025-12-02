"use client"

import { createRegion } from "@/actions/regions/create-region"
import { SpanErrorMessage } from "@/components/span-error"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
    FormCreateRegionProps,
    createRegionSchema
} from "@/schemas/create-region-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "@/components/toast"
import { queryClient } from "@/components/theme-provider"
import { Region } from "@prisma/client"
import { Spinner } from "@/components/ui/spinner"

export const FormCreateRegion = () => {

    const {
        mutate,
        isPending,
    } = useMutation({
        mutationKey: ["create-region"],
        mutationFn: (name: string) => createRegion(name),
        onSuccess: ({ name, ...rest }) => {

            toast({
                title: `Região ${name} criada com sucesso!`,
                description: "Você já pode usar essa região para organizar suas listas de tarefas."
            })

            queryClient.setQueryData<Region[]>(["find-many-region"],
                (oldData) => {

                    if (!oldData) return [{ name, ...rest }]

                    return [...oldData, { name, ...rest }]
                }
            )
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
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormCreateRegionProps>({
        resolver: zodResolver(createRegionSchema)
    })

    function onSubmit({ name }: FormCreateRegionProps) {
        mutate(name)
    }

    return (
        <>
            <CardContent>
                <form id="form-create-region" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-3">
                        <Label>
                            Nome da região:
                        </Label>
                        <Input
                            {...register("name")}
                            className={cn(
                                errors.name && [
                                    "focus-visible:ring-destructive",
                                    "not-focus-visible:border-destructive",
                                ]
                            )}
                        />
                        {
                            errors.name &&
                            <SpanErrorMessage message={errors.name.message} />
                        }
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button
                    form="form-create-region"
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                >
                    {
                        isPending
                            ? <Spinner />
                            : "Adicionar região"
                    }
                </Button>
            </CardFooter>
        </>
    )
}
