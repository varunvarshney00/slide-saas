'use client'

import { Separator } from '@/components/ui/separator'
import { useQueryAutomation } from '@/hooks/user-queries'
import { InstagramBlue, Warning } from '@/icons'
import Image from 'next/image'
import React from 'react'

type Props = {
    id: string
}

const PostNode = ({ id }: Props) => {

    const { data } = useQueryAutomation(id);

    return (
        data?.data && data.data.posts.length > 0 && (
            <div className='w-10/12 lg:w-8/12 relative xl:w-4/12 p-5 rounded-xl flex flex-col bg-[#1d1d1d] gap-y-3'>


                <div className='absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50'>
                    <span className='h-[9px] w-[9px] bg-connector/10 rounded-full' />
                    <Separator
                        orientation="vertical"
                        className='bottom-full flex-1 border-[1px] border-connector/10'
                    />
                    <span className='h-[9px] w-[9px] bg-connector/10 rounded-full' />
                </div>

                <div className='flex gap-x-2'>
                    <Warning />
                    If they comment on...
                </div>

                <div className='bg-background-80 p-3 rounded-xl flex flex-col gap-y-2'>
                    <div className='flex gap-x-2 items-center'>
                        <InstagramBlue />
                        <p className='font-bold text-lg'>These posts</p>
                    </div>

                    <div className='flex gap-x-2 flex-wrap mt-3'>
                        {data.data.posts.map((post) => (
                            <div
                                key={post.id}
                                className='relative w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden'
                            >
                                <Image
                                    fill
                                    sizes='100vw'
                                    src={post.media}
                                    alt="post image"
                                />
                            </div>
                        ))}

                    </div>

                </div>

            </div>
        )
    )
}

export default PostNode