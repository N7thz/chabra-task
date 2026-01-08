"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type * as React from "react"
import { QueryDevtools } from "./react-query-dev-tools"

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

export const queryClient = new QueryClient()

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<QueryDevtools />
			<NextThemesProvider {...props}>{children}</NextThemesProvider>
		</QueryClientProvider>
	)
}
