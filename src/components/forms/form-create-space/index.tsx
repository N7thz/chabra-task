"use client"

import { createSpace } from "@/actions/spaces/create-space"
import { SpanErrorMessage } from "@/components/span-error"
import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import {
    FormCreateSpaceProps, createSpaceSchema
} from "@/schemas/create-space-schema"
import { queryKeys } from "@/utils/query-keys"
import { zodResolver } from "@hookform/resolvers/zod"
import { Space, Notification } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export const FormCreateSpace = () => {

    const {
        mutate,
        isPending,
    } = useMutation({
        mutationKey: ["create-Space"],
        mutationFn: (name: string) => createSpace(name),
        onSuccess: ({
            spaceCreated: {
                name,
                ...rest
            },
            notification
        }) => {

            toast({
                title: `Região ${name} criada com sucesso!`,
                description: "Você já pode usar essa região para organizar suas listas de tarefas."
            })

            queryClient.setQueryData<Space[]>(queryKeys.space.findMany(),
                (oldData) => {

                    if (!oldData) return [{ name, ...rest }]

                    return [...oldData, { name, ...rest }]
                }
            )

            queryClient.setQueryData<Notification[]>(
                queryKeys.notification.findMany(),
                (oldData) => {

                    if (!oldData) return [notification]

                    return [...oldData, notification]
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
    } = useForm<FormCreateSpaceProps>({
        resolver: zodResolver(createSpaceSchema)
    })

    function onSubmit({ name }: FormCreateSpaceProps) {
        mutate(name)
    }

    return (
        <>
            <CardContent>
                <form id="form-create-Space" onSubmit={handleSubmit(onSubmit)}>
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
                    form="form-create-Space"
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
