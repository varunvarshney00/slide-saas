import React from 'react'
import {
    Sheet as ShadcnSheet,
    SheetContent,
    SheetTrigger
} from '@/components/ui/sheet'

type Props = {
    trigger: React.ReactNode;
    children: React.ReactNode;
    classname?: string;
    side: 'left' | 'right';
}

const index = ({ children, trigger, classname, side }: Props) => {
    return (
        <ShadcnSheet>
            <SheetTrigger className={classname}>{trigger}</SheetTrigger>
            <SheetContent
                side={side}
                className='p-0'
            >
                {children}
            </SheetContent>
        </ShadcnSheet>
    )
}

export default index