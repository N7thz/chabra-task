"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type LoadingContextData = {
    loading: boolean
    startLoading: () => void
    stopLoading: () => void
    setLoading: (value: boolean) => void
}

const LoadingContext = createContext<LoadingContextData | undefined>(undefined)

type LoadingProviderProps = {
    children: ReactNode
}

export function LoadingProvider({ children }: LoadingProviderProps) {

    const [loading, setLoading] = useState(false)

    function startLoading() {
        setLoading(true)
    }

    function stopLoading() {
        setLoading(false)
    }

    const value: LoadingContextData = {
        loading,
        startLoading,
        stopLoading,
        setLoading,
    }

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}

export function useLoading() {

    const context = useContext(LoadingContext)

    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider")
    }

    return context
}
