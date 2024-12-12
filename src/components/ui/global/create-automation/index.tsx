import React from 'react'
import { Button } from '../../button'
import Loader from '../loader'
import { AutomationDuoToneBlue, AutomationDuoToneWhite } from '@/icons'
const CreateAutomation = () => {
  return (
    <Button className='lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#cc3361] font-medium to-[#701c35]' >
        <Loader state={false}>
            <AutomationDuoToneWhite/>
            <p className='lg:inline hidden'>Create an Automation</p>
        </Loader>
    </Button>
  )
}

export default CreateAutomation