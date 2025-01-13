'use client'

import { useQueryAutomation } from '@/hooks/user-queries';
import React from 'react'
import ActiveTrigger from './active';
import { Separator } from '@/components/ui/separator';

type Props = {
    id: string;
}

const Trigger = ({ id }: Props) => {

    const { data } = useQueryAutomation(id);
    console.log(data)

    // if (data?.data && data?.data?.trigger.length > 0) {
    return (
        <div className='flex flex-col gap-y-6 items-center'>
            {/* WIP */}
            {/* <ActiveTrigger
                type={data.data.trigger[0].type}
                keywords={data.data.keywords}
            /> */}

            <ActiveTrigger
                type={'COMMENT'}
                keywords={[
                    {
                        id: '1234',
                        word: 'get started',
                        automationId: id
                    }
                ]}
            />

            {/* {data?.data?.trigger.length > 1 && ( */}
            <>
                <div className='relative w-6/12 my-4'>
                    <p className='absolute transform px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2'>
                        or
                    </p>

                    <Separator
                        orientation='horizontal'
                        className='border-muted border-[1px]'
                    />
                </div>

                {/*  <ActiveTrigger
                    type={data.data.trigger[1].type}
                    keywords={data.data.keywords}
                /> */}
                <ActiveTrigger
                    type={'XYZ'}
                    keywords={[
                        {
                            id: '1234',
                            word: 'get started',
                            automationId: id
                        }
                    ]}
                />
            </>
            {/* )} */}
        </div>
    )
    // }

    return (
        <div>Trigger</div>
    )
}

export default Trigger