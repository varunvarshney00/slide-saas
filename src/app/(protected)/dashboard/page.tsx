// scenario 1 -> repeated user
// redirect to respective dashboard 
// redirect -> /dashboard/varunvarshney

// scenario 2 -> new user
// redirect -> sign in

import { onBoardUser, onCurrentUser } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

const Page = async (props: Props) => {
  console.log('dash k andar-->')
  const user = await onBoardUser();
  console.log('dasmh-->',user.data?.firstname, user.data?.lastname)
  if (user.status === 200 || user.status === 201) {
    return redirect(`dashboard/${user.data?.firstname}${user.data?.lastname}`)
  }

  return redirect('/sign-in')
}

export default Page