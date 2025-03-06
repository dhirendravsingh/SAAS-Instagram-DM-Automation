import { useQueryAutomation } from '@/hooks/user-queries'
import React from 'react'
type Props = {
    id : string
}
const Trigger = ({id}: Props) => {
  // here we have to use the hook useTrigger which will be used for storing state and we will be using redux for that
  // fro this project we have a library which is a combination of react context api and redux

  const {data} = useQueryAutomation(id)

  if( data?.data && data?.data?.trigger.length > 0) {
    return <div className='flex flex-col gap-y-6 items-center'>
      <ActiveTrigger/>
    </div>
  }
}

export default Trigger