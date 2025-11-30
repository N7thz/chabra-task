"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { ComponentProps, useRef, useState } from "react"
import { flushSync } from "react-dom"

export const AnimatedThemeToggler = ({
	className,
	...props
}: ComponentProps<"button">) => {
	const { setTheme, theme } = useTheme()
	const [isMounted, setIsMounted] = useState(false)

	const buttonRef = useRef<HTMLButtonElement | null>(null)

	useState(() => {
		setIsMounted(true)
	})

	const changeTheme = async () => {
		if (!buttonRef.current) return

		const newTheme = theme === "dark" ? "light" : "dark"

		await document.startViewTransition(() => {
			flushSync(() => {
				setTheme(newTheme)
			})
		}).ready

		const { top, left, width, height } =
			buttonRef.current.getBoundingClientRect()
		const y = top + height / 2
		const x = left + width / 2

		const right = window.innerWidth - left
		const bottom = window.innerHeight - top
		const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom))

		document.documentElement.animate(
			{
				clipPath: [
					`circle(0px at ${x}px ${y}px)`,
					`circle(${maxRad}px at ${x}px ${y}px)`,
				],
			},
			{
				duration: 700,
				easing: "ease-in-out",
				pseudoElement: "::view-transition-new(root)",
			}
		)
	}

	if (!isMounted) {
		return (
			<Button
				ref={buttonRef}
				variant="outline"
				size="icon"
				className={className}
				aria-label="Toggle theme"
				{...props}>
				<Sun className="opacity-0" />
			</Button>
		)
	}

	return (
		<Button
			ref={buttonRef}
			onClick={changeTheme}
			className={className}
			aria-label="Toggle theme"
			variant="outline"
			size="icon"
			{...props}>
			<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
