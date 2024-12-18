import React from 'react'
import AutomationBreadCrumb from '@/components/ui/global/bread-crumbs/automations'
import { Warning } from '@/icons'
import Trigger from '@/components/ui/global/automations/trigger'
type Props = {
 params : {id : string}
}
const page = ({params} : Props) => {
  return (
    <div className='flex flex-col items-center item gap-y-20'>
        <AutomationBreadCrumb id={params.id}/>
        <div className='w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col text-white bg-[#1d1d1d] gap-y-3'>
        <div className='flex gap-x-2'>
            <Warning/>
            When...
        </div>
        <Trigger id={params.id}/>
        </div>
    </div>
  )
}

export default page