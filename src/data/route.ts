import {
	FileInput,
	FilePlus2,
	FileSpreadsheet,
	Info,
	LayoutPanelLeft,
	LucideIcon,
	Sparkles,
	Wallpaper,
	ShieldUser,
} from "lucide-react"
import { Route } from "next"

export type RouteProps = {
	href: Route
	text: string
	Icon: LucideIcon
}

export const routes: RouteProps[] = [
	{
		href: "/whats-new",
		text: "Atualizações e novidades",
		Icon: Sparkles,
	},
	{
		href: "/home",
		text: "Home",
		Icon: LayoutPanelLeft,
	},
	{
		href: "/create-products",
		text: "Registrar produto",
		Icon: FilePlus2,
	},
	{
		href: "/create-products-exit",
		text: "Registrar saida de produto",
		Icon: FileInput,
	},
	{
		href: "/products",
		text: "Tabela de produtos",
		Icon: FileSpreadsheet,
	},
	{
		href: "/products-exit",
		text: "Tabela de saida de produtos",
		Icon: FileSpreadsheet,
	},
	{
		href: "/appearance",
		text: "Configurações",
		Icon: Wallpaper,
	},
	{
		href: "/help",
		text: "Ajuda",
		Icon: Info,
	},
] as const
