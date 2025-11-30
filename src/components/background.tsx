import React, { ReactNode } from 'react'
import { LightRays } from './ui/light-rays'

export const Background = ({ children }: { children: ReactNode }) => {
    return (
        <div className="relative h-dvh z-0 w-full overflow-hidden rounded-xl border">
            <LightRays />
            {children}
        </div>
    )
}
