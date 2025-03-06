'use client'

import React, { useMemo } from 'react'
import { Button } from '../../button'
import { v4 } from 'uuid'
import Loader from '../loader'
import { AutomationDuoToneBlue, AutomationDuoToneWhite } from '@/icons'
import { useCreateAutomation } from '@/hooks/use-automations'
const CreateAutomation = () => {
  const mutationId = useMemo(()=> v4(), [])

  //in order to create the automations we have to create a custom hook
  const {isPending, mutate} = useCreateAutomation(mutationId)
  return (
    <Button className='lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#cc3361] font-medium to-[#701c35]'
     onClick={()=> mutate({name : "testing", id:mutationId, createdAt : new Date(), keywords : []})} >
        <Loader state={isPending}>
            <AutomationDuoToneWhite/>
            <p className='lg:inline hidden'>Create an Automation</p>
        </Loader>
    </Button>
  )
}

export default CreateAutomation