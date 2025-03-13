import { useState } from "react"
import axios from "axios"

export const useSubscription = ()=> {
    const [isProcessing, setIsProcessing] = useState(false)
    const onSubscribe = async ()=> {
        setIsProcessing(true)
        //here we have to make an api call
        const response = await axios.get('/api/payment')
        if(response.data.status === 200){
            return (window.location.href= `${response.data.session_url}`)
        }
        setIsProcessing(false)
    }
    return {onSubscribe, isProcessing}
}