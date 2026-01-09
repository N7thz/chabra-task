import { Analytics } from "@vercel/analytics/next"
import { Background } from "@/components/background"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { LoadingProvider } from "@/providers/loading-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
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
	return (
		<html lang="ptBR" suppressHydrationWarning>
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
				<Analytics />
			</body>
		</html>
	)
}
