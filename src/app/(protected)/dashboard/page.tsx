import { onBoardUser } from "@/actions/user"

type Props = {

}

const Page= async (props : Props)=>{
    const user = await onBoardUser()
    return <div>
        Page
    </div>
}

export default Page