import { Board } from "@/components/drag-in-drop/board"

export default async function Home({
    params,
}: {
    params: Promise<{ space: string }>
}) {

    const { space } = await params

    return (
        <main className="min-h-screen w-full">
            <Board space={space} />
        </main>
    )
}