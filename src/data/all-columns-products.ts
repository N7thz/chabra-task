import { ColumnDefinition } from "@/lib/advanced-excel-export"

export const allColumns: readonly ColumnDefinition[] = [
	{
		header: "Id",
		key: "id",
	},
	{
		header: "Nome",
		key: "name",
	},
	{
		header: "Descrição",
		key: "description",
	},
	{
		header: "Data",
		key: "createdAt",
	},
	{
		header: "Quantidade",
		key: "quantity",
	},
	{
		header: "Quantidade minima",
		key: "minQuantity",
	},
]

export const allColumnsProductExit: readonly ColumnDefinition[] = [
	{
		header: "Entrege a",
		key: "name",
	},
	...allColumns,
]
