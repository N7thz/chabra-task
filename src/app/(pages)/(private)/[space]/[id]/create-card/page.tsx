import { FormCreateCard } from "@/components/forms/form-create-card"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Criar cartão | Chabra Tasks",
}

export default async function CreateCard({
    params,
}: {
    params: Promise<{ space: string, id: string }>
}) {

    const { id, space } = await params

    return (
        <main className={cn(
            "h-dvh w-full flex justify-center items-center p-8 gap-4",
            "max-sm:px-4"
        )}>
            <Card className="min-w-3/5 max-w-4/6">
                <CardHeader>
                    <CardTitle>
                        Cadastrar Cartão
                    </CardTitle>
                    <CardDescription>
                        Cadastre um cartão a ida
                    </CardDescription>
                </CardHeader>
                <FormCreateCard
                    space={space}
                    id={id}
                />
            </Card>
        </main>
    )
}
