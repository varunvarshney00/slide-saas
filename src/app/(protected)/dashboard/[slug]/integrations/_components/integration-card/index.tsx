import { Button } from '@/components/ui/button';
import React from 'react'

type Props = {
    title: string;
    icon: React.ReactNode;
    description: string;
    strategy: 'INSTAGRAM' | 'CRM';
}

const IntegrationCard = ({ title, icon, strategy, description }: Props) => {
    return (
        <div className='border-2 border-[#3352cc] rounded-2xl gap-x-5 p-5 flex items-center justify-between'>
            {icon}
            <div className='flex flex-col flex-1'>
                <h3 className='text-xl'>
                    {title}
                </h3>
                <p className='text-[#9d9d9d] text-base'>{description}</p>
            </div>
            <Button className='bg-gradient-to-br text-white rounded-full text-lg from-[#3352cc] font-medium to-[#1c2d70] hover:opacity-70 transition duration-100'>
                Connect
            </Button>
        </div>
    )
}

export default IntegrationCard