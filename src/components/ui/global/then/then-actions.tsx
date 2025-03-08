import React from 'react'
import { useListener } from '@/hooks/use-automations'
import {TriggerButton} from '@/components/ui/global/trigger-button'
import { AUTOMATION_LISTENERS } from '@/constants/automation'
import { SubscriptionPlan } from '../subscription-plan'
import { cn } from '@/lib/utils'
import { Textarea } from '../../textarea'
import { Input } from '../../input'
import { Button } from '../../button'
import Loader from '../loader'

interface Props {
  id : string
}

const ThenAction = ({id} : Props) => {
  //we require a custom hook here which will be resposible for storing the state of the then action
  //we will be using redux for that
    const {
      onSetListener,
      listener : Listener,
      onFormSubmit,
      register,
      isPending
    } = useListener(id)
  return (
   <TriggerButton label= "Then">
      <div className='flex flex-col gap-y-2'>
        {AUTOMATION_LISTENERS.map((listener)=> listener.type === "SMARTAI" ? 
        <SubscriptionPlan key={listener.type} type="PRO">
          <div onClick={()=> onSetListener(listener.type)} 
            key={listener.id} className={cn(Listener === listener.type ? "bg-gradient-to-br from-[#3352cc] to-[#1c2d70]" : "bg-background-80", "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80  transition duration-100")} >
              <div className='flex gap-x-2 items-center'>{listener.icon}
                <p>{listener.label}</p>
              </div>
              {listener.description}
          </div></SubscriptionPlan>: (
               <div onClick={()=> onSetListener(listener.type)} 
               key={listener.id} className={cn(Listener === listener.type ? "bg-gradient-to-br from-[#3352cc] to-[#1c2d70]" : "bg-background-80", "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80  transition duration-100")} >
                 <div className='flex gap-x-2 items-center'>{listener.icon}
                   <p>{listener.label}</p>
                 </div>
                 {listener.description}
             </div>
          ))}
          <form onSubmit={onFormSubmit} className='flex flex-col gap-y-2'>
            <Textarea placeholder={Listener=== 'SMARTAI'? "Add a prompt that your smart ai can use..." : "Add a message you want to send to your cutomers"}
            // we have to use register here to register this element 
             {...register('prompt')}
            className='bg-background-80 outline-none border-none ring-0 focus:ring-0'
            />
            <Input {...register('reply')}
            placeholder= " Add an reply for comments (Optional)"
            className='bg-background-80 outline-none border-none ring-0 focus:ring-0'
            />
           <Button className='bg-gradient-to-br w-full from-[#3352cc] font-medium text-white to-[#1c2d70]'>
              <Loader state={isPending}>Add Listener</Loader>
           </Button>
          </form>
      </div>
   </TriggerButton>
  )
}

export default ThenAction