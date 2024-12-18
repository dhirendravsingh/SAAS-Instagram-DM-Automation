import React from 'react'
import { Button } from '@/components/ui/button'

type Props = {
    title : string
    description : string
    icon : React.ReactNode
    strategy : 'INSTAGRAM' | 'CRM'
}
const IntegrationCard = ({title, description, icon, strategy}: Props) => {
  return (
    <div className='flex items-center justify-center '>
    <div className='border-2 w-3/5 border-[#DC143C]  rounded-2xl gap-x-5 p-5 flex items-center justify-between'>
        {icon}
        <div className='flex flex-col flex-1'>
            <h3 className='text-xl'>{title}</h3>
            <p className='text-[#9D9D9D] pb-2 text-base '>{description}</p>
            </div>
            <Button //onClick={onInstaOAuth} 
            //disabled={integraded?.name === strategy} 
            className='bg-gradient-to-br text-white rounded-full text-lg from-[#DC143C] font-medium to-[#770737] hover:opacity-70 transition duration-100'>
            {/* {inegrated ? 'Connected' : 'Connect'} */}
            Connect
            </Button>
       
    </div>
    </div>
  )
}

export default IntegrationCard