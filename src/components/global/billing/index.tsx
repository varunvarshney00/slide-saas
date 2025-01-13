import React from 'react'
import PaymentCard from './payment-card'

type Props = {}

const Billing = (props: Props) => {
    // WIP: Here we will fetch billing information for the customers.
    return (
        <div className='flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container'>
            <PaymentCard
                current={'FREE'}
                label="FREE"
            />

            <PaymentCard
                current={'FREE'}
                label="PRO"
            />

            {/* payment card 1 */}

            {/* payment card 2 */}
        </div>
    )
}

export default Billing