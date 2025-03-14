import React from 'react'
import { Button } from '@/components/ui/button'
import { onOAuthInstagram } from '@/actions/integrations'
import { onUserInfo } from '@/actions/user'
import { useQuery } from '@tanstack/react-query'

type Props = {
    title : string
    description : string
    icon : React.ReactNode
    strategy : 'INSTAGRAM' | 'CRM'
}
const IntegrationCard = ({title, description, icon, strategy}: Props) => {

  const onInstaOAuth = ()=> onOAuthInstagram(strategy)

  const {data} = useQuery({
    queryKey : ['user-profile'],
    queryFn : onUserInfo
  })
  
  //this will check for the integrations, and if the integration are present then it will look for its name
  const integrated = data?.data?.integrations.find(
    (integration)=> integration.name === strategy
  )

  return (
    <div className='flex items-center justify-center '>
    <div className='border-2 w-3/5 border-[#DC143C]  rounded-2xl gap-x-5 p-5 flex items-center justify-between'>
        {icon}
        <div className='flex flex-col flex-1'>
            <h3 className='text-xl'>{title}</h3>
            <p className='text-[#9D9D9D] pb-2 text-base '>{description}</p>
            </div>
            <Button onClick={onInstaOAuth} 
            disabled={integrated?.name === strategy} 
            className='bg-gradient-to-br text-white rounded-full text-lg from-[#DC143C] font-medium to-[#770737] hover:opacity-70 transition duration-100'>
             {integrated ? 'Connected' : 'Connect'} 
            Connect
            </Button>
       
    </div>
    </div>
  )
}

export default IntegrationCard