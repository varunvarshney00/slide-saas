import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

type Props = {
    children: React.ReactNode;
    type: 'BUTTON' | 'LINK';
    href?: string;
    classname?: string;
}

const GradientButton = ({ children, type, href, classname }: Props) => {

    const gradient = 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-[2px]';

    switch (type) {
        case 'BUTTON':
            return (
                <div className={gradient}>
                    <Button className={cn(classname, 'rounded-xl')}>
                        {children}
                    </Button>
                </div>
            )

        case 'LINK':
            return (
                <div className={gradient}>
                    <Link
                        href={href!}
                        className={cn(classname, 'rounded-xl')}
                    >
                        Link
                    </Link>
                </div>
            )
        default:
            return null
    }
}

export default GradientButton