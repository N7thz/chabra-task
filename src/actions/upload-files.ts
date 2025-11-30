"use server"

import { supabase } from "@/lib/supabase"

function getPublicUrl(path: string) {

	const {
		data: { publicUrl },
	} = supabase.storage.from("avatars").getPublicUrl(path)

	return publicUrl
}

function generateNameFile({ id, filename }: { id: string; filename: string }) {
	return `${id}_${filename}`
}

async function deleteImage(filename: string) {
	const removeFile = await supabase.storage.from("avatars").remove([filename])

	if (removeFile.error) throw new Error("Não foi possivel atualizar a imagem")
}

async function updateImage(id: string, file: File) {
	const filename = generateNameFile({ id, filename: file.name })

	const { data, error } = await supabase.storage
		.from("avatars")
		.upload(filename, file, {
			cacheControl: "0",
			upsert: true,
			contentType: file.type,
		})

	if (error) throw new Error("Não foi possivel atualizar a imagem")

	return data
}
