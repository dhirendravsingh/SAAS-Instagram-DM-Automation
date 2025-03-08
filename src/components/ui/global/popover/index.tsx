import React from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type Props = {
    trigger : JSX.Element
    children : React.ReactNode
    className ?: string
}

const PopOver = ({trigger, children, className}: Props) => {
  return (
    <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent
          className={cn('bg-[#1d1d1d] shadow-lg', className)}
          align= "end"
          side="bottom"
        >
          {children}
        </PopoverContent>
    </Popover>
  )
}

export default PopOver