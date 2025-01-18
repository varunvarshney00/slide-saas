import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import React from 'react'

type Props = {
    children: React.ReactNode
    trigger: JSX.Element
    className?: string
}

const PopOver = ({ children, trigger, className }: Props) => {
    return (
        <Popover>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent
                className={cn('bg-[#1d1d1d] shadow-lg rounded-xl', className)}
                align="end"
                side="bottom"
            >
                {children}
            </PopoverContent>
        </Popover>
    )
}

export default PopOver