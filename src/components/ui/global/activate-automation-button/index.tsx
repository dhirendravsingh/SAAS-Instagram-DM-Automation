import React from 'react'
import { Button } from '../../button'
import { ActiveAutomation } from '@/icons/active-automation'
import Loader from '../loader'
const ActiveAutomationButton = () => {
  return (
    <Button className='lg:px-10 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#DC143C] font-medium to-[#811331] ml-4'>
        <Loader state={false}>
            <ActiveAutomation/>
            <p className='lg:inline hidden'>
                Activate
            </p>
        </Loader>
    </Button>
  )
}

export default ActiveAutomationButton