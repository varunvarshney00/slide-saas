import Loader from '@/components/global/loader'
import React from 'react'

const Loading = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <Loader state >...loading</Loader>
        </div>
    )
}

export default Loading