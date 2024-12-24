import React from 'react'
import Sidebar from '@/components/ui/global/sidebar'
import Navbar from '@/components/ui/global/navbar'
import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query'
import { PrefetchUserAutomations, PrefetchUserProfile } from '@/react-query/prefetch'
type Props = {
    children : React.ReactNode
    params : {slug :string}

}

const layout = async ({children, params} : Props) => {

  //we have created a client to work with react query function
  const query = new QueryClient()
  //now we have to make a helper function which will pre fetch the data for different server action
  //this will be a server side action
 await PrefetchUserProfile(query)

await PrefetchUserAutomations(query)

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className='p-3'>
      <Sidebar slug={params.slug}/>
        <div className='lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto'>
        <Navbar slug={params.slug}/>
        
        {children}
        
        </div>
    </div>
    </HydrationBoundary>
  )
}

export default layout