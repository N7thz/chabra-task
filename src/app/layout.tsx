import { AppSidebar } from "@/components/app-sidebar"
import { Background } from "@/components/background"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import { cookies } from "next/headers"
import "./globals.css"

const jetBrains = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
	weight: ["300", "400", "600", "700"],
})

export const metadata: Metadata = {
	title: "Chabra Tasks",
	description: "A Next.js application for restoring lost data",
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {

	const cookieStore = await cookies()
	const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<head />
			<body className={cn(jetBrains.className, "antialiased")}>
				<ThemeProvider attribute="class" defaultTheme="system">
					<Background>
						<SidebarProvider defaultOpen={defaultOpen}>
							<AppSidebar />
							{children}
						</SidebarProvider>
					</Background>
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	)
}
