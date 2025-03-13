"use server"
import {redirect} from 'next/navigation'
import { findUser, updateSubscription } from './queries'
import { refreshToken } from '@/lib/fetch'
import { currentUser } from '@clerk/nextjs/server'
import { updateIntegration } from '../integrations/queries'
import { createUser } from './queries'
import { stripe } from '@/app/(protected)/api/payment/route'

export const onCurrentUser = async()=>{
    //the currentUser function of NextJs returns the data of the user that is already logged in into the system
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

                    if(!update_token){
                        console.log('Update token failed')
                    }
                }

           }

           return {
            status : 200,
            data: {
                firstName : found.firstName,
                lastname : found.lastName
            }
           }
        }
        const created = await createUser(
            user.id,
            user.firstName!,
            user.lastName!,
            user.emailAddresses[0].emailAddress
        )
        return {status : 201 , data : created}
    } catch (error) {
        console.log(error)
        return {status : 500}
    }
}


export const onUserInfo=async ()=>{
    const user = await onCurrentUser()

    try {
        const profile = await findUser(user.id)
        if(profile) return {status:200, data: profile}

        return {status: 404}
    } catch (error) {
        return {status: 500}

    }
}

export const onSubscribe = async (session_id : string)=> {
    const user = await onCurrentUser()
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id)
        if(session){
            const subscribed = await updateSubscription(user.id , {
                customerId : session.customer as string,
                plan : 'PRO'
            })
            if(subscribed) return {status : 200}
            return {status : 401}
        }
        return {status : 404}
    } catch (error) {
        return {status : 500}
    }
}