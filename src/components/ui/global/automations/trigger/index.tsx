"use client"

import { useQueryAutomation } from '@/hooks/user-queries'
import ActiveTrigger from './active'
import React from 'react'
import { Separator } from '@radix-ui/react-separator'
import ThenAction from '../then/then-actions'
import { TriggerButton } from '../trigger-button'
import { AUTOMATIONS_TRIGGERS } from '@/constants/automation'
import { useTriggers } from '@/hooks/use-automations'
import { cn } from '@/lib/utils'
import Keywords from './keywords'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'

type Props = {
    id : string
}
const Trigger = ({id}: Props) => {

  const {types, onSetTrigger, onSaveTrigger, isPending} = useTriggers(id)

  // here we have to use the hook useTrigger which will be used for storing state and we will be using redux for that
  // fro this project we have a library which is a combination of react context api and redux

  const {data} = useQueryAutomation(id)

  if( data?.data && data?.data?.trigger.length > 0) {
    return <div className='flex flex-col gap-y-6 items-center'>
      <ActiveTrigger type={data.data.trigger[0].type} keywords={data.data.keywords}/>
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
       {!data.data.listener && <ThenAction id={id}/>}
    </div>
  }
  return <TriggerButton label="Add Trigger">
    <div className='flex flex-col gap-y-2'>
      {AUTOMATIONS_TRIGGERS.map((trigger)=> (
        <div key={trigger.id} onClick={()=> onSetTrigger(trigger.type)}
        className={cn('hover:opacity-80 text-white rounded-xl flex cursor-pointer flex-col p-3 gap-y-2', !types?.find((t)=> t===trigger.type) ? 'bg-background-80' : 'bg-gradient-to-br from-[#3352cc] font-medium to-[#1c2d70]')}
        >
          <div className='flex gap-x-2 items-center'>{trigger.icon} 
            <p className='font-bold'>{trigger.label}</p>
          </div>
          <p className='text-sm font-light'>{trigger.description}</p>
        </div>
      )
      )}
      <Keywords id ={id}/>
      <Button onClick={onSaveTrigger} disabled={types?.length===0} className='bg-gradient-to-br from-[#3352cc] font-medium text-white to-[#1c2d70]'>
      <Loader state={isPending}>Create Trigger</Loader>
      </Button>

    </div>
  </TriggerButton>
}

export default Trigger