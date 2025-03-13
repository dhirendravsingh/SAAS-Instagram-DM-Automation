'use client'

import React from 'react'
import { Button } from '../../button'
import { useSubscription } from '@/hooks/use-subscription'
import { CreditCardIcon, Loader2 } from 'lucide-react'

type Props = {

}
const PaymentButton = (props : Props) => {
  const {onSubscribe, isProcessing} = useSubscription()
  return (
    <Button disabled={isProcessing} onClick={onSubscribe} className='bg-gradient-to-r text-[#000000] hover:text-[#00000087] rounded-full from-[#DC143C] via-[#faeb36] font-bold to-[#487de7] '>
      {isProcessing ? <Loader2 className='animate-spin'/> : <CreditCardIcon/>}
      Upgrade
      </Button>
  )
}

export default PaymentButton