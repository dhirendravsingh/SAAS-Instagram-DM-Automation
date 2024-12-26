'use client'
import React from 'react'
import { usePaths } from '@/hooks/use-nav'
import Link from 'next/link'
import { Button } from '../../button'
import { cn, getmonth } from '@/lib/utils'
import GradientButton from '../gradient-button'
import { useQueryAutomations } from '@/hooks/user-queries'
import CreateAutomation from '../create-automation'
const AutomationList = () => {
    //here we have to render out all the automations that we get from the database
    const {data} = useQueryAutomations()

if(data?.status !== 200 || data.data.length<=0){
    return (
        <div className='h-[70vh] flex justify-center items-center flex-col gap-y-3'>
            <h3 className='text-lg text-gray-400'>
                No automations created
            </h3>
            <CreateAutomation/>
        </div>
    )
}

    const {pathname} = usePaths()
    
  return (
    <div className='flex flex-col gap-y-3'>
       {data.data!.map((automation)=>(
        <Link key={automation.id} href={`${pathname}/${automation.id}`} className='bg-[#1d1d1d] hover:opacity-80 transition duration-100 rounded-xl p-5 border-[1px] radial--gradient--automations flex border=[#545454]'>

    <div className='flex flex-col flex-1 items-start'>
        <h2 className='text-xl text-white font-semibold'>
           {automation.name}
        </h2>
        <p className='text-[#9b9ca0] text-sm font-light mb-2'>
            This is from the comment
        </p>
        {automation.keywords.length > 0 ? ( 
        <div className='flex gap-x-2 flex-wrap mt-3'>
            <div className={cn('rounded-full px-4 py-1 text-white capitalize', (0+1) % 1 == 0 && 'bg-keyword-green/15 border-2 border-keyword-green', (1+1) % 1 == 0 && 'bg-keyword-purple/15 border-2 border-keyword-purple', (2+1) % 1 == 0 && 'bg-keyword-yellow/15 border-2 border-keyword-yellow', (3+1) % 1 == 0 && 'bg-keyword-red/15 border-2 border-keyword-red')}>
            getStarted
            </div>
        </div>
        ) :(<div className='rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1'>
        <p className='text-sm text-[#bfc0c3]'>No Keywords</p>
    </div>)}
       
    </div>
        <div className='flex flex-col justify-between'>
            <p className='capitalize text-sm font-light text-[#9b9ca0]'>
                {getmonth(automation.createdAt.getUTCMonth()+1)}{' '}
                {automation.createdAt.getUTCDate()===1 ? `${automation.createdAt.getUTCDate()}st` : `${automation.createdAt.getUTCDate()}th`}{' '}
                {automation.createdAt.getUTCFullYear()}
            </p>
            <GradientButton type='BUTTON' className='w-full bg-background-80 text-white hover:bg-background-80'>Smart AI</GradientButton>
            <Button className='bg-background-80 hover:bg-background-80 text-white'>
                Standard
            </Button>
        </div>
        </Link>
        ))}
    </div>
  )
}

export default AutomationList