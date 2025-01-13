'use client'

import { PencilDuoToneBlack } from '@/icons'
import { ChevronRight, PencilIcon } from 'lucide-react'
import React from 'react'
import ActivateAutomationButton from '../../activate-automation-button'
import { useQueryAutomation } from '@/hooks/user-queries'
import { useEditAutomation } from '@/hooks/use-automations'
import { Input } from '@/components/ui/input'
import { useMutationDataState } from '@/hooks/use-mutation-data'

type Props = {
    id: string
}

const AutomationsBreadCrumb = ({ id }: Props) => {

    const { data } = useQueryAutomation(id);
    // console.log('useQueryAutomationdata-->', data);

    const { edit, enableEdit, disableEdit, inputRef, isPending } = useEditAutomation(id);
    // console.log('useEditAutomation elements-->', edit, enableEdit, disableEdit, inputRef, isPending)

    const { latestVariable } = useMutationDataState(['update-automation'])
    // console.log('useMutationDataStatelatestVariable-->', latestVariable);


    return (
        <div className='rounded-full w-full p-5 bg-[#18181B1A] flex items-center'>

            <div className='flex items-center gap-x-3 min-w-0'>

                <p className='text-[#9b9ca0] truncate'>Automations</p>

                <ChevronRight className='flex-shrink-0' color='#9b9ca0' />

                <span className='flex gap-x-3 items-center min-w-0'>
                    {edit ? (
                        <Input
                            ref={inputRef}
                            placeholder={isPending ? latestVariable.variables : 'Add a new name'}
                            className='bg-transparent h-auto outline-none text-base border-none p-0'
                        />
                    ) : (
                        <p className='text-[#9b9ca0] truncate'>
                            {latestVariable?.variables ? latestVariable?.variables.name : data?.data?.name}
                        </p>
                    )}

                    {edit ? (
                        <></>
                    ) : (
                        <span className='cursor-pointer hover:opacity-75 duration-100 transition flex-shrink-0 mr-4'
                            onClick={enableEdit}
                        >
                            <PencilIcon size={14} />
                        </span>
                    )}


                </span>
            </div>

            <div className='flex items-center gap-x-5 ml-auto'>
                <p className='hidden md:block text-text-secondary/60 text-sm  truncate min-w-0'>All states are automatically saved</p>

                <div className='flex gap-x-5 flex-shrink-0'>
                    <p className='text-text-secondary text-sm truncate min-w-0'>
                        Changes saved
                    </p>
                </div>
            </div>

            <ActivateAutomationButton id={id} />

        </div>
    )
}

export default AutomationsBreadCrumb
