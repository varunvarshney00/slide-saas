import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'
import { ActiveAutomation } from '@/icons/active-automation'

type Props = {
    id: string
}

const ActivateAutomationButton = ({id}: Props) => {
  return (
    <Button className='lg:px-10 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352cc] font-medium to-[#1c2d70] ml-4'>
        <Loader state={false}>
            <ActiveAutomation/>
            <p className='lg:inline hidden'>Activate</p>
        </Loader>
    </Button>
  )
}

export default ActivateAutomationButton