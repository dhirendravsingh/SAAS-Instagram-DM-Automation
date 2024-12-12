import { SearchIcon } from 'lucide-react'
import React from 'react'
import { Input } from '../../input'
type Props = {
    className?: string
}
const Search = (props : Props) => {
  return (
    <div className='flex overflow-hidden gap-x-2 border-[1px] border-[#701c35] rounded-full px-4 py-3 items-center flex-1'>
        <SearchIcon color="#701c35"/>
        <Input placeholder = "Search by name, email or status" className={`border-none outline-none ring-0 focus:ring-0 flex-1 `}/>    </div>
  )
}

export default Search