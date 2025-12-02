import { FormCreateRegion } from "@/components/forms/form-create-region"
import { RegionsList } from "@/components/regions-list"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Configurações | Chabra Tasks",
}

export default async function Home() {
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
                    <RegionsList />
                    <Card className="w-1/3 bg-background">
                        <CardHeader>
                            <CardTitle>
                                Cadastrar regiões
                            </CardTitle>
                            <CardDescription>
                                Cadastre novas regiões para organizar suas listas de tarefas.
                            </CardDescription>
                        </CardHeader>
                        <FormCreateRegion />
                    </Card>
                </CardContent>
            </Card>
        </main>
    )
}
