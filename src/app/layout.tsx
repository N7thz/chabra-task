import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import { Background } from "@/components/background"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import "./globals.css"

const jetBrains = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
	weight: ["300", "400", "600", "700"],
})

export const metadata: Metadata = {
	title: "stock App",
	description: "A Next.js application for restoring lost data",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<head />
			<body className={cn(jetBrains.className, "antialiased")}>
				<ThemeProvider attribute="class" defaultTheme="system">
					<Background>
						<SidebarProvider>
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
