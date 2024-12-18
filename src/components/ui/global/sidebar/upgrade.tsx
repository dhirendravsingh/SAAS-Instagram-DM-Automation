import React from 'react'
import PaymentButton from '../payment-button'
type Props = {

}
const UpgradeCard = (props : Props) => {
  return (
    <div className='bg-[#252525] p-3 rounded-2xl flex flex-col gap-y-3'>
        <span className="text-sm font-medium text-[#f4f4f4]">
        Upgrade to {''}
        <span
          className="bg-gradient-to-r 
        from-[#DC143C] 
        via-[#faeb36]
        to-[#487de7] 
        font-bold 
        bg-clip-text 
        text-transparent"
        >
          Smart AI
        </span>
      </span>
      <p className="text-[#9B9CA0] font-light text-sm">
        Unlock all features <br /> including AI and more
      </p>
      <PaymentButton />
    </div>
  )
}

export default UpgradeCard