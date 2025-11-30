import multer from "multer"
import path from "node:path"
import fs, { promises } from "node:fs"

export async function fileExists(path: string) {
	try {
		await promises.access(path)
		return true
	} catch {
		return false
	}
}

export const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const uploadDir = path.join(process.cwd(), "public/uploads")

		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true })
		}

		cb(null, uploadDir)
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
		const extension = path.extname(file.originalname)
		cb(null, "image-" + uniqueSuffix + extension)
	},
})

export function generateFilename(originalname: string): string {
	return originalname
}

export function validateFile(file: File): string | null {
	const allowedTypes = [
		"image/jpeg",
		"image/jpg",
		"image/png",
		"image/gif",
		"image/webp",
	]

	if (!file.type.startsWith("image/")) {
		return "Apenas imagens são permitidas"
	}

	if (!allowedTypes.includes(file.type)) {
		return "Formatos permitidos: JPEG, PNG, GIF, WebP"
	}

	if (file.size > 10 * 1024 * 1024) {
		return "Arquivo muito grande (máximo 10MB)"
	}

	return null
}

// Tipagem para o arquivo processado
export interface ProcessedFile {
	originalname: string
	filename: string
	mimetype: string
	size: number
	path: string
}
