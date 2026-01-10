import { findCardById } from "@/actions/cards/find-card-by-id"
import { CardPage } from "@/components/card-page"
import { cn } from "@/lib/utils"
import { Metadata } from "next"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ space: string; id: string }>
}): Promise<Metadata> {
	const { id } = await params

	const { title } = await findCardById(id)

	return {
		title: `Chabra Tasks | ${title}`,
	}
}

export default async function CreateCard({
	params,
}: {
	params: Promise<{ space: string; id: string }>
}) {
	const { id, space } = await params

	return (
		<main
			className={cn(
				"h-dvh w-full flex justify-center items-center p-8 gap-4",
				"max-sm:px-4"
			)}>
			<CardPage id={id} space={space} />
		</main>
	)
}
