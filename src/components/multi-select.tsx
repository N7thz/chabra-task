"use client"

import { useState, useRef, useEffect } from "react"
import { Check, X, ChevronDown, AlertCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"

interface Option {
    value: string
    label: string
}

interface MultiSelectProps {
    options: Option[]
    selected: string[]
    onSelectionChange: (selected: string[]) => void
    placeholder?: string
    maxHeight?: number
    name?: string
    id?: string
    label?: string
    disabled?: boolean
    description?: string
}

export function MultiSelect({
    options,
    selected,
    onSelectionChange,
    placeholder = "Selecione os itens...",
    maxHeight = 300,
    name,
    id,
    label,
    disabled,
}: MultiSelectProps) {

    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const containerRef = useRef<HTMLDivElement>(null)
    const selectId = id || name || "multi-select"

    const filteredOptions = options
        .filter((option) => option.label
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))

    useEffect(() => {

        function handleClickOutside(event: MouseEvent) {

            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSelect = (value: string) => {

        if (disabled) return

        if (selected.includes(value)) {
            onSelectionChange(selected.filter((item) => item !== value))
        } else {
            onSelectionChange([...selected, value])
        }
    }

    const handleRemove = (value: string) => {
        if (disabled) return
        onSelectionChange(selected.filter((item) => item !== value))
    }

    const getSelectedLabels = () => {
        return selected.map((val) => options.find((opt) => opt.value === val)?.label).filter(Boolean)
    }

    return (
        <div
            ref={containerRef}
            className="w-full space-y-2"
        >
            {label && (
                <label
                    htmlFor={selectId}
                    className="block text-sm font-medium text-foreground"
                >
                    {label}
                </label>
            )}

            <div className="relative">
                <button
                    type="button"
                    id={selectId}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={cn(
                        "bg-input/30 w-full px-3 py-2 border rounded-lg text-foreground text-left flex items-center justify-between transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
                        disabled
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-muted cursor-pointer",
                    )}
                >
                    <div className="flex items-center gap-2 flex-wrap">
                        {selected.length > 0 ? (
                            <>
                                {getSelectedLabels()
                                    .slice(0, 2)
                                    .map((label, i) => (
                                        <span
                                            key={i}
                                            className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm flex items-center gap-1 group"
                                        >
                                            {label}
                                            <span
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleRemove(selected[i])
                                                }}
                                                className="hover:opacity-70 transition-opacity cursor-pointer"
                                                aria-label={`Remover ${label}`}
                                            >
                                                <X size={14} />
                                            </span>
                                        </span>
                                    ))}
                                {selected.length > 2 && <span className="text-muted-foreground text-sm">+{selected.length - 2}</span>}
                            </>
                        ) : (
                            <span className="text-muted-foreground">
                                {placeholder}
                            </span>
                        )}
                    </div>
                    <ChevronDown
                        size={20}
                        className={cn(
                            "transition-transform",
                            isOpen && "rotate-180"
                        )}
                    />
                </button>

                {isOpen && !disabled && (
                    <div
                        style={{ maxHeight: `${maxHeight}px` }}
                        className="absolute top-full left-0 right-0 mt-1 bg-card border border-input rounded-lg shadow-lg z-50 overflow-hidden"
                        role="listbox"
                    >
                        <div className="p-2 border-b border-input sticky top-0  z-10 bg-card">
                            <Input
                                type="text"
                                placeholder="Pesquisar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                aria-label="Pesquisar opções"
                            />
                        </div>

                        <ScrollArea style={{
                            maxHeight: `calc(${maxHeight}px - 50px)`
                        }}>
                            {filteredOptions.length > 0
                                ? (
                                    filteredOptions.map((option) => (
                                        <button
                                            type="button"
                                            key={option.value}
                                            onClick={() => handleSelect(option.value)}
                                            className="w-full px-3 py-2 text-left hover:bg-muted transition-colors flex items-center justify-between group"
                                            role="option"
                                            aria-selected={selected.includes(option.value)}
                                        >
                                            <span>
                                                {option.label}
                                            </span>
                                            {
                                                selected.includes(option.value) && <Check
                                                    size={18}
                                                    className="text-primary"
                                                />
                                            }
                                        </button>
                                    ))
                                )
                                : (
                                    <div className="px-3 py-2 text-center text-muted-foreground text-sm">
                                        Nenhum resultado encontrado
                                    </div>
                                )}
                        </ScrollArea>
                    </div>
                )}
            </div>
        </div>
    )
}
