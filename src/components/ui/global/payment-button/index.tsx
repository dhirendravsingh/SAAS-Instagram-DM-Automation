import React from 'react'
import { Button } from '../../button'
type Props = {

}
const PaymentButton = (props : Props) => {
  return (
    <Button className='bg-gradient-to-br text-[#FFF5EE] hover:text-[#000000] rounded-full from-[#ff0c49] via-[#fe608d] font-bold to-[#ff0c49] '>Upgrade</Button>
  )
}

export default PaymentButton