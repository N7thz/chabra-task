"use client"

import { Button } from "@/components/ui/button"
import {
	Cropper,
	CropperCropArea,
	CropperDescription,
	CropperImage,
} from "@/components/ui/cropper"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { useFileUpload } from "@/hooks/use-file-upload"
import { cn } from "@/lib/utils"
import { UploadImageProps } from "@/schemas/upload-file-schema"
import { deleteCookie } from "cookies-next/client"
import {
	ArrowLeftIcon,
	Camera,
	CircleUserRoundIcon,
	XIcon,
	ZoomInIcon,
	ZoomOutIcon,
} from "lucide-react"
import ImageNext from "next/image"
import { ComponentProps, useCallback, useEffect, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"

type Area = {
	x: number
	y: number
	width: number
	height: number
}

const createImage = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image()
		image.addEventListener("load", () => resolve(image))
		image.addEventListener("error", error => reject(error))
		image.setAttribute("crossOrigin", "anonymous")
		image.src = url
	})

async function getCroppedImg(
	imageSrc: string,
	pixelCrop: Area,
	outputWidth: number = pixelCrop.width,
	outputHeight: number = pixelCrop.height
): Promise<Blob | null> {
	try {
		const image = await createImage(imageSrc)
		const canvas = document.createElement("canvas")
		const ctx = canvas.getContext("2d")

		if (!ctx) {
			return null
		}

		canvas.width = outputWidth
		canvas.height = outputHeight

		ctx.drawImage(
			image,
			pixelCrop.x,
			pixelCrop.y,
			pixelCrop.width,
			pixelCrop.height,
			0,
			0,
			outputWidth,
			outputHeight
		)

		return new Promise(resolve => {
			canvas.toBlob(blob => {
				resolve(blob)
			}, "image/jpeg")
		})
	} catch (error) {
		console.error("Error in getCroppedImg:", error)
		return null
	}
}

type InputFileProps = ComponentProps<typeof Input> & {
	defaultUrl?: string
}

export const InputFile = ({
	defaultUrl,
	className,
	...props
}: InputFileProps) => {
	const { setValue } = useFormContext<UploadImageProps>()

	const [
		{ files, isDragging },
		{
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			removeFile,
			getInputProps,
		},
	] = useFileUpload()

	const previewUrl = files[0]?.preview || null
	const fileId = files[0]?.id

	const [finalImageUrl, setFinalImageUrl] = useState<string | null>(null)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
	const [zoom, setZoom] = useState(1)
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	const previousFileIdRef = useRef<string | undefined | null>(null)

	const handleCropChange = useCallback((pixels: Area | null) => {
		setCroppedAreaPixels(pixels)
	}, [])

	const handleApply = async () => {
		if (!previewUrl || !fileId || !croppedAreaPixels) {
			console.error("Dados faltantes para aplicar:", {
				previewUrl,
				fileId,
				croppedAreaPixels,
			})

			if (fileId) {
				removeFile(fileId)
				setCroppedAreaPixels(null)
			}

			return
		}

		try {
			const croppedBlob = await getCroppedImg(previewUrl, croppedAreaPixels)

			if (!croppedBlob) {
				throw new Error("Falha ao gerar blob de imagem recortada.")
			}

			const fileName = files[0].file.name
			const type = files[0].file.type

			const file = new File([croppedBlob], fileName, { type })

			setValue("file", file)

			const newFinalUrl = URL.createObjectURL(croppedBlob)

			if (finalImageUrl) {
				URL.revokeObjectURL(finalImageUrl)
			}

			setFinalImageUrl(newFinalUrl)
			setIsDialogOpen(false)
		} catch (error) {
			console.error("Error durante a aplicação:", error)

			setIsDialogOpen(false)
		}
	}

	const handleRemoveFinalImage = () => {
		if (finalImageUrl) {
			URL.revokeObjectURL(finalImageUrl)
		}
		setFinalImageUrl(null)
	}

	useEffect(() => {
		const currentFinalUrl = finalImageUrl

		return () => {
			if (currentFinalUrl && currentFinalUrl.startsWith("blob:")) {
				URL.revokeObjectURL(currentFinalUrl)
			}
		}
	}, [finalImageUrl])

	useEffect(() => {
		if (fileId && fileId !== previousFileIdRef.current) {
			setIsDialogOpen(true)
			setCroppedAreaPixels(null)
			setZoom(1)
		}

		previousFileIdRef.current = fileId
	}, [fileId])

	if (!isClient) {
		return (
			<Skeleton className="size-50 rounded-full">
				<CircleUserRoundIcon strokeWidth="0.5" className="size-50 opacity-60" />
			</Skeleton>
		)
	}

	let imageExist = finalImageUrl || defaultUrl || ""

	return (
		<div className={cn("flex flex-col items-center gap-2")}>
			<div className="relative inline-flex">
				<button
					type="button"
					className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 relative flex items-center justify-center overflow-hidden rounded-full border border-dashed outline-none focus-visible:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none size-50 group transition-all cursor-pointer"
					onClick={openFileDialog}
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
					data-dragging={isDragging || undefined}
					aria-label={finalImageUrl ? "Change image" : "Upload image"}>
					<Camera className="absolute size-8  hidden group-hover:flex opacity-100" />
					{imageExist !== "" ? (
						<ImageNext
							className="size-full object-cover group-hover:opacity-60"
							src={imageExist}
							alt="User avatar"
							width={200}
							height={200}
							style={{ objectFit: "cover" }}
							unoptimized
						/>
					) : (
						<div aria-hidden="true">
							<CircleUserRoundIcon
								strokeWidth="0.5"
								className="size-50 opacity-60"
							/>
						</div>
					)}
				</button>
				{finalImageUrl && (
					<Button
						type="button"
						onClick={handleRemoveFinalImage}
						size="icon"
						className="border-background focus-visible:border-background absolute top-2 right-2 size-8 rounded-full border-2 shadow-none"
						aria-label="Remove image">
						<XIcon className="size-4" />
					</Button>
				)}
				<input
					{...getInputProps()}
					type="file"
					accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
					className="sr-only"
					aria-label="Upload image file"
					tabIndex={-1}
					{...props}
				/>
			</div>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="gap-0 p-0 sm:max-w-140 *:[button]:hidden">
					<DialogDescription className="sr-only">
						Selecione o tamanho da imagem
					</DialogDescription>
					<DialogHeader className="contents space-y-0 text-left">
						<DialogTitle className="flex items-center justify-between border-b p-4 text-base">
							<div className="flex items-center gap-2">
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="-my-1 opacity-60"
									onClick={() => setIsDialogOpen(false)}
									aria-label="Cancel">
									<ArrowLeftIcon aria-hidden="true" />
								</Button>
								<span>Selecione o tamanho da imagem</span>
							</div>
							<Button
								type="button"
								className="-my-1"
								onClick={handleApply}
								disabled={!previewUrl}
								autoFocus>
								Confirmar
							</Button>
						</DialogTitle>
					</DialogHeader>
					{previewUrl && (
						<Cropper
							className="h-96 sm:h-120"
							image={previewUrl}
							zoom={zoom}
							onCropChange={handleCropChange}
							onZoomChange={setZoom}>
							<CropperDescription />
							<CropperImage />
							<CropperCropArea />
						</Cropper>
					)}
					<DialogFooter className="border-t px-4 py-6">
						<div className="mx-auto flex w-full max-w-80 items-center gap-4">
							<ZoomOutIcon
								className="shrink-0 opacity-60"
								size={16}
								aria-hidden="true"
							/>
							<Slider
								defaultValue={[1]}
								value={[zoom]}
								min={1}
								max={3}
								step={0.1}
								onValueChange={value => setZoom(value[0])}
								aria-label="Zoom slider"
							/>
							<ZoomInIcon
								className="shrink-0 opacity-60"
								size={16}
								aria-hidden="true"
							/>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
