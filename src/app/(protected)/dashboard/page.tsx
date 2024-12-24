import { onBoardUser } from "@/actions/user"
import {redirect} from 'next/navigation'

type Props = {

}

const Page= async (props : Props)=>{
    const user = await onBoardUser()
    //now we have to check whether the user is present or not by the status codes of already present user and a created user
    if(user.status===200 || user.status===201){
        return redirect(`dashboard/${user.data?.firstName}`)
    }
    return <div>
        Page
    </div>
}

export default Page