"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type * as React from "react"

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

export const queryClient = new QueryClient()

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<NextThemesProvider {...props}>{children}</NextThemesProvider>
		</QueryClientProvider>
	)
}
