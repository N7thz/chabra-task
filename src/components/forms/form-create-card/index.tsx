"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CreateCardProps, createCardSchema } from "@/schemas/create-card-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SelectStatus } from "./select-status"
import { SelectTerm } from "./select-term"
import { SpanErrorMessage } from "@/components/span-error"
import { Separator } from "@/components/ui/separator"

export const FormCreateCard = ({ space }: { space: string }) => {

    const form = useForm<CreateCardProps>({
        resolver: zodResolver(createCardSchema),
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = form

    function onSubmit(data: CreateCardProps) {
        console.log(data)
    }

    console.log(errors)

    return (
        <>
            <CardContent>
                <Form {...form}>
                    <form
                        id="form-create-card"
                        onSubmit={handleSubmit(onSubmit)}
                        className="my-2 space-y-5"
                    >
                        <Label
                            htmlFor="title"
                            className="flex flex-col gap-3"
                        >
                            <span className="self-start">
                                Título do cartão:
                            </span>
                            <Input
                                id="title"
                                {...register("title")}
                            />
                        </Label>
                        {
                            errors.title &&
                            <SpanErrorMessage message={errors.title.message} />
                        }
                        <Label
                            htmlFor="cnpj"
                            className="flex flex-col gap-3"
                        >
                            <span className="self-start">
                                CNPJ da empresa:
                            </span>
                            <Input
                                id="cnpj"
                                {...register("cnpj")}
                            />
                        </Label>
                        {
                            errors.cnpj &&
                            <SpanErrorMessage message={errors.cnpj.message} />
                        }
                        <Label className="flex flex-col gap-3">
                            <span className="self-start">
                                Status:
                            </span>
                            <SelectStatus />
                        </Label>
                        <Label className="flex flex-col gap-3">
                            <span className="self-start">
                                Prazo:
                            </span>
                            <SelectTerm />
                        </Label>
                        <Label
                            htmlFor="description"
                            className="flex flex-col gap-3"
                        >
                            <span className="self-start">
                                Observações:
                            </span>
                            <Textarea
                                id="description"
                                {...register("description")}
                            />
                        </Label>
                        <Separator />
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="gap-4 justify-end">
                <Button
                    type="submit"
                    variant={"default"}
                    form="form-create-card"
                    className="w-1/2"
                >
                    Confirmar
                </Button>
            </CardFooter>
        </>
    )
}