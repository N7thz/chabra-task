import { CardPage } from "@/components/card-page"
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
            <CardPage
                id={id}
                space={space}
            />
        </main>
    )
}
