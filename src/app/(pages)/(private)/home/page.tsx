import { HomeContentPage } from "@/components/home-content"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/lib/auth"
import { Metadata } from "next"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: "Chabra tasks | Home"
}

export default async function Home() {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        redirect("/sign-in")
    }

    return (
        <Card className="size-full w-full m-8 border-none bg-sidebar">
            <CardHeader>
                <CardTitle className="text-base">
                    Olá {session.user.name}
                </CardTitle>
                <CardTitle>
                    Minhas tarefas:
                </CardTitle>
            </CardHeader>
            <HomeContentPage />
        </Card>
    )
}