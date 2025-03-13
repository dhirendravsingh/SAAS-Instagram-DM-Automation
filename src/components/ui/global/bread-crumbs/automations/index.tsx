'use client'

import { PencilDuoToneBlack } from '@/icons'
import { ActiveAutomation } from '@/icons/active-automation'
import { ChevronRight, PencilIcon } from 'lucide-react'
import React from 'react'
import ActiveAutomationButton from '../../activate-automation-button'
import { useQueryAutomation } from '@/hooks/user-queries'
import { useEditAutomation } from '@/hooks/use-automations'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import { Input } from '@/components/ui/input'
type Props = { 
    id : string
}
const AutomationBreadCrumb = ({id}: Props) => {
    const {data} = useQueryAutomation(id)
    const {edit, enableEdit, inputRef, isPending} = useEditAutomation(id)
 
    const {latestVariable} = useMutationDataState(['update-automation'])


  return (
    <div className='rounded-full w-full p-5 bg-[#18181B1A] flex  items-center'>
        <div className='flex items-center gap-x-3 min-w-0'>
            <p className='text-[#1f1c1c] truncate'>Automations</p>
            <ChevronRight color='#1f1c1c' className='flex-shrink-0'/>
            <span className='flex gap-x-3 items-center min-w-0'>
                {edit ? (<Input className='bg-transparent h-auto outline-none text-base border-none p-0' ref={inputRef} placeholder={isPending ? latestVariable.variables: 'Add a new name'}/>) : (<p className='text-[#1f1c1c] truncate'>{latestVariable?.variables ? latestVariable?.variables.name : data?.data?.name}</p> )}
                {edit ? <></> : (<span className='cursor-pointer hover:opacity-75 duration-100 transition flex-shrink-0 mr-4' onClick={enableEdit}>
                    <PencilIcon size={14}/>
                </span>) }
            </span>
        </div>
        <div className='flex items-center ml-auto gap-x-5'>
            <p className='hidden md:block text-[#1f1c1c]/60 text-sm truncate min-w-0'>
                All updates are automatically saved
            </p>
            <div className='flex gap-x-5 flex-shrink-0'>
                <p className='text-[#1f1c1c] text-sm truncate min-w-0'>Changes Saved</p>


            </div>
        </div>
        <ActiveAutomationButton id={id}/>
    </div>
  )
}

export default AutomationBreadCrumb