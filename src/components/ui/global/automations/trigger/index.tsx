"use client"

import { useQueryAutomation } from '@/hooks/user-queries'
import ActiveTrigger from './active'
import React from 'react'
import { Separator } from '@radix-ui/react-separator'
type Props = {
    id : string
}
const Trigger = ({id}: Props) => {
  // here we have to use the hook useTrigger which will be used for storing state and we will be using redux for that
  // fro this project we have a library which is a combination of react context api and redux

  const {data} = useQueryAutomation(id)

  if( data?.data && data?.data?.trigger.length > 0) {
    return <div className='flex flex-col gap-y-6 items-center'>
      <ActiveTrigger type={'COMMENT'} keywords={data.data.keywords}/>
      {data?.data?.trigger.length > 1 && <>
      <div className='relative w-6/12 mt-4'>
        <p className='absolute transform px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2'>
          or
        </p>
        <Separator orientation='horizontal'
        className='border-muted border-[1px]'/>
      </div>
      <ActiveTrigger type={data.data.trigger[1].type} keywords={data.data.keywords}/>
      </>}
      
    </div>
  }
}

export default Trigger