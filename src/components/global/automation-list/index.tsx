'use client'

import { usePaths } from '@/hooks/user-nav'
import { cn, getMonth } from '@/lib/utils'
import Link from 'next/link'
import React, { useMemo } from 'react'
import GradientButton from '../gradient-button'
import { Button } from '@/components/ui/button'
import { useQueryAutomations } from '@/hooks/user-queries'
import CreateAutomation from '../create-automation'
import { useMutationDataState } from '@/hooks/use-mutation-data'

type Props = {}


const AutomationList = (props: Props) => {

    const { data } = useQueryAutomations();

    const { latestVariable } = useMutationDataState(['create-automation'])

    console.log('latestvariable-->', latestVariable)

    const { pathname } = usePaths();

    const optimisticUiData = useMemo(() => {
        if ((latestVariable && latestVariable?.variables && data)) {
            const test = [latestVariable.variables, ...data.data]
            return { data: test }
        }
        return data || { data: [] }
    }, [latestVariable, data]);


    if (data?.status !== 200 || data.data.length <= 0) {
        return (
            <div className='h-[70vh] flex justify-center items-center flex-col gap-y-3'>
                <h3 className='text-lg text-gray-400'>No Automations</h3>
                <CreateAutomation />
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-y-3'>
            {optimisticUiData.data!.map((automation) => (
                <Link
                    href={`${pathname}/${automation.id}`}
                    key={automation.id}
                    className='bg-[#1d1d1d] hover:opacity-80 transition duration-100 rounded-xl p-5 border-[1px] radial--gradient--automations flex border-[#545454]'
                >
                    <div className='flex flex-col flex-1 items-start'>
                        <h2 className='text-xl font-semibold'>{automation.name}</h2>
                        <p className='text-[#9b9ca0] text-sm font-light mb-2'>This is from the comment</p>

                        {automation.keywords.length > 0 ? (
                            <div className='flex gap-x-2 flex-wrap mt-3'>

                                {
                                    automation.keywords.map((keyword: { id: string, word: string }) => (
                                        <div
                                            key={keyword.id}
                                            className={cn('rounded-full px-4 py-1 capitalize',
                                                (0 + 1) % 1 == 0 &&
                                                'bg-keyword-green/15 border-2 border-keyword-green',
                                                (1 + 1) % 2 == 0 &&
                                                'bg-keyword-purple/15 border-2 border-keyword-purple',
                                                (2 + 1) % 3 == 0 &&
                                                'bg-keyword-yellow/15 border-2 border-keyword-yellow',
                                                (3 + 1) % 4 == 0 &&
                                                'bg-keyword-red/15 border-2 border-keyword-red',
                                            )}
                                        >
                                            {keyword.word}
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1'>
                                <p className='text-sm text-[#bfc0c3]'>No Keywords</p>
                            </div>
                        )}



                    </div>

                    <div className='flex flex-col justify-between'>

                        <p className='capitalize text-sm font-light text-[#9b9ca0]'>
                            {getMonth(automation.createdAt.getUTCMonth() + 1)}{' '}
                            {automation.createdAt.getUTCDate() === 1
                                ? `${automation.createdAt.getUTCDate()}st`
                                : `${automation.createdAt.getUTCDate()}th`}{' '}
                            {automation.createdAt.getUTCFullYear()}
                        </p>


                        {automation.listener?.listener === 'SMARTAI' ? (
                            <GradientButton
                                type='BUTTON'
                                classname='w-full bg-background-80 text-white hover:bg-background-80'
                            >
                                Smart AI
                            </GradientButton>
                        ) : (
                            <Button className='bg-background-80 hover:bg-background-80 text-white'>
                                Standard
                            </Button>
                        )}
                    </div>

                </Link>
            ))
            }
        </div >
    )
}

export default AutomationList
