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
import { LoadingProvider } from "@/providers/loading-provider"

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
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<head />
			<body className={cn(jetBrains.className, "antialiased")}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
				>
					<LoadingProvider>
						<Background>
							{children}
						</Background>
					</LoadingProvider>
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	)
}
