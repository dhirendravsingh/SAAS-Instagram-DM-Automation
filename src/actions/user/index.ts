"use server"
import {redirect} from 'next/navigation'
import { findUser } from './queries'
import { refreshToken } from '@/lib/fetch'
import { currentUser } from '@clerk/nextjs/server'
import { updateIntegration } from '../integrations/queries'

export const onCurrentUser = async()=>{
    const user = await currentUser()
    if(!user){
        return redirect('/sign-in')
    }

    return user
}

export const onBoardUser = async ()=>{
    const user = await onCurrentUser()
    try {
        //found contains the information regarding to respective the clerkId of the user, it includes the info of subscriptions and integrations
        const found = await findUser(user.id)
        //the instagram login token refreshes after 5 days, the token is known as refresh token
        if(found){
            if(found.integrations.length>0){
                const today = new Date()
                //to get the refresh token the following command is made
                const time_left = found.integrations[0].expiresAt?.getTime()! - today.getTime()      
                const days = Math.round(time_left/(1000*3600*24))   
                //we have to refresh it if it is less than 5 days
                if(days<5){
                    console.log('refresh')

                    const refresh = await refreshToken(
                        found.integrations[0].token
                    )
                    const today = new Date()

                    const expire_date = today.setDate(today.getDate() + 60)

                    const update_token = await updateIntegration( refresh.access_token, found.integrations[0].id, new Date(expire_date))
                }

           }
        }
    } catch (error) {
        
    }
}