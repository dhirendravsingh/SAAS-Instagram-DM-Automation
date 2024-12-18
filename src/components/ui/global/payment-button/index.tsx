import React from 'react'
import { Button } from '../../button'
type Props = {

}
const PaymentButton = (props : Props) => {
  return (
    <Button className='bg-gradient-to-r text-[#000000] hover:text-[#00000087] rounded-full from-[#DC143C] via-[#faeb36] font-bold to-[#487de7] '>Upgrade</Button>
  )
}

export default PaymentButton