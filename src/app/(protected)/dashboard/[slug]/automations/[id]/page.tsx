import React from 'react'
import AutomationBreadCrumb from '@/components/ui/global/bread-crumbs/automations'
import { Warning } from '@/icons'
import Trigger from '@/components/ui/global/automations/trigger'
import { getAutomationInfo } from '@/actions/automations'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { PrefetchUserAutomation } from '@/react-query/prefetch'
import ThenNode from '@/components/ui/global/automations/then/node'

type Props = {
 params : {id : string}
}

export async function generateMetadata({params} : {params : {
  id: string
}}) {
  const info = await getAutomationInfo(params.id)
  return {
    title: info.data?.name,
  }
}

const page = async ({params} : Props) => {

  const query = new QueryClient()
  await PrefetchUserAutomation(query, params.id)

  return (
    <HydrationBoundary state={dehydrate(query)}>
    <div className='flex flex-col items-center item gap-y-20'>
        <AutomationBreadCrumb id={params.id}/>
        <div className='w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col text-white bg-[#1d1d1d] gap-y-3'>
        <div className='flex gap-x-2'>
            <Warning/>
            When...
        </div>
        <Trigger id={params.id}/>
        </div>
        <ThenNode id={params.id}/>
    </div>
    </HydrationBoundary>
  )
}

export default page