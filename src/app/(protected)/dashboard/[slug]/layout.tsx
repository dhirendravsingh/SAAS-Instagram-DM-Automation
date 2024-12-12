import React from 'react'
import Sidebar from '@/components/ui/global/sidebar'
import Navbar from '@/components/ui/global/navbar'
type Props = {
    children : React.ReactNode
    params : {slug :string}

}

const layout = ({children, params} : Props) => {
  return (
    <div className='p-3'>
      <Sidebar slug={params.slug}/>
        <div className='lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto'>
        <Navbar slug={params.slug}/>
        
        {children}
        
        </div>
    </div>
  )
}

export default layout