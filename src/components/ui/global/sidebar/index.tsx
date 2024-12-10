'use client'
import Items from './items'
import React from 'react'
import { usePaths } from '@/hooks/use-nav'
import { LogoSmall } from '@/svgs/logo-small'
import { Separator } from '@/components/ui/separator'
import { HelpDuoToneWhite } from '@/icons'
import ClerkAuthState from '../clerk-auth-state'
import UpgradeCard from './upgrade'
import { SubscriptionPlan } from '../subscription-plan'

type Props = {
    slug:  string
}
const Sidebar = ({slug} : Props) => {
    //we will require the path to get the slug, hence we made this component a client component
    const {page} = usePaths()
  return (
    <div       className="w-[250px] 
    border-[1px]
    radial 
    fixed 
    left-0 
    lg:inline-block
    border-[#545454] 
    bg-gradient-to-b from-[#000000] 
    via-[#210000]
     to-[#000000] 
     hidden 
     bottom-0 
     top-0 
     m-3 
     rounded-3xl 
     overflow-hidden"> 
    <div className='flex flex-col
    gap-y-5
    w-full
    h-full
    p-3
    bg-[#050101]
    bg-opacity-90
    bg-clip-padding
    backdrop-filter
    backdrop--blur__safari
    backdrop-blur-3xl'>
        <div className='flex gap-x-2 items-center p-5 justify-center'>
            <LogoSmall/>
        </div>
        <div className="flex flex-col py-3">
           <Items page={page} slug={slug}/>
        </div>
        <div className='px-16'>
          <Separator
          orientation="horizontal"
          className='bg-[#770737]'/>

        </div>
        <div className='px-3 flex flex-col gap-y-5'>
          <div className='flex gap-x-2'>
            <ClerkAuthState/>
            <p className='text-[#989CA0]'>Profile</p>
          </div>
          <div className='flex gap-x-3'>
            <HelpDuoToneWhite/>
            <p className='text-[#989CA0]'>Help</p>
          </div>
        </div>
        <SubscriptionPlan type="FREE">
        <div className='flex-1 flex flex-col justify-end'>
        <UpgradeCard/>
        </div>
        </SubscriptionPlan>
    </div>
    </div>
  )
}

export default Sidebar