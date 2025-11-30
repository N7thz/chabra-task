import { deleteProductExit } from "@/actions/products-exit/delete-prduct-exit"
import { queryClient } from "@/components/theme-provider"
import { toast } from "@/components/toast"
import { queryKey } from "@/lib/query-keys"
import { Notification, ProductExit } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"

export function useDeleteProductExit(
	id: string,
	setOpen: (open: boolean) => void
) {
	return useMutation({
		mutationKey: queryKey.deleteProduct(),
		mutationFn: () => deleteProductExit(id),
		onSuccess: ({ notification, productExit }) => {
			setOpen(false)

			queryClient.setQueryData<Notification[]>(
				queryKey.findAllNotifications(),
				oldData => {
					if (!oldData) return [notification]

					return [...oldData, notification]
				}
			)

			queryClient.setQueryData<ProductExit[]>(
				queryKey.findAllProductsExit(),
				oldData => {
					if (!oldData) return [productExit]

					const productsFilterd = oldData.filter(
						({ id }) => id !== productExit.id
					)

					return productsFilterd
				}
			)

			toast({
				title: "A saida de produto foi excluida.",
				description: `${notification.description}`,
			})
		},
		onError: err => {
			console.error(err)

			toast({
				title: "Não foi possivel excluir o produto",
				description: err.message,
				variant: "error",
			})
		},
	})
}
