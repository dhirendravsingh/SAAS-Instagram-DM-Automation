import React from 'react'
import Sidebar from '@/components/ui/global/sidebar'
type Props = {
    children : React.ReactNode
    params : {slug :string}

}

const layout = ({children, params} : Props) => {
  return (
    <div className='p-3'>
      <Sidebar slug={params.slug}/>
        <div className='lg-ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto'>

        </div>
    </div>
  )
}

export default layout