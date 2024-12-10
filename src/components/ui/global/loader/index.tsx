import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

type Props = {
    state : boolean
    color? : string
    className? : string
    children : React.ReactNode
}

const Loader = ({children, state, color, className} : Props) =>{
    return state? <div className={cn(className)}>
        <Spinner color = {color}/>
    </div> : children
}

export default Loader