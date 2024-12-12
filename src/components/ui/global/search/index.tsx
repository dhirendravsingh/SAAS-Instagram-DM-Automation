import { SearchIcon } from 'lucide-react'
import React from 'react'
type Props = {
    className?: string
}
const Search = (props : Props) => {
  return (
    <div className='hidden lg:flex overflow-hidden gap-x-2 border-[1px] border-[#701c35] rounded-full px-4 py-3 items-center flex-1'>
        <SearchIcon color="#701c35"/>
    </div>
  )
}

export default Search