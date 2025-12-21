import { FormCreateSpace } from "@/components/forms/form-create-space"
import { SpaceList } from "@/components/space-list"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Configurações | Chabra Tasks",
}

export default async function Settings() {
    return (
        <main className={cn(
            "h-dvh w-full flex justify-center items-center p-8 gap-4",
            "max-sm:px-4"
        )}>
            <Card className="size-full">
                <CardHeader>
                    <CardTitle>
                        Configurações
                    </CardTitle>
                    <CardDescription>
                        Configurações da sua conta e preferências do aplicativo.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4">
                    <SpaceList />
                    <Card className="w-1/3 bg-background">
                        <CardHeader>
                            <CardTitle>
                                Cadastrar regiões
                            </CardTitle>
                            <CardDescription>
                                Cadastre novas regiões para organizar suas listas de tarefas.
                            </CardDescription>
                        </CardHeader>
                        <FormCreateSpace />
                    </Card>
                </CardContent>
            </Card>
        </main>
    )
}
