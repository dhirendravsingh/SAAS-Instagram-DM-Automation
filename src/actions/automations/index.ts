'use server'

import { onCurrentUser } from "../user"
import { createAutomation } from "./queries"
import { getAutomations } from "./queries"
import { findAutomation } from "./queries"
import { updateAuomation } from "./queries"
import { addListener } from "./queries"
import { addTrigger } from "./queries"
import { addKeyword } from "./queries"
import { removeKeyword } from "./queries"
import { findUser } from "../user/queries"
import { addPost } from "./queries"

export const createAutomations = async (id?: string)=>{
    //first thing we had to do is to verify the user
    const user = await onCurrentUser()
    try {
        const create = await createAutomation(user.id, id)
        if(create) return {status : 200, data: 'Automation created', res: create}
        return {status : 404, data: 'Oops! something went wrong'}
    } catch (e) {
       
     
        return {status : 500, data: 'Internal Error'}
        

    }
}


export const getAllAutomations=async ()=>{
//first thing we had to do is to verify the user
const user = await onCurrentUser()
try {
    const automations = await getAutomations(user.id)
    if(automations) return {status : 200, data : automations.automations}

    return {status : 404, data: []}
} catch (error) {
    return {status : 500, data:[]}
}
}

export const getAutomationInfo = async (id : string)=>{
    await onCurrentUser()
    try {
        const automation = await findAutomation(id)
        if(automation) return {status : 200, data : automation }
        return {status : 404}
    } catch (error) {
        return {status : 500}
    }
}

export const updateAutomationName= async(automationId : string, data : {
    name?:string,
    active?: boolean,
    automation? : string
})=>{
    await onCurrentUser()
    try {
        const update = await updateAuomation(automationId, data)
        if(update){
            return {status : 200, data :  "Automation successfully updated"}
        }
        return {status : 404, data : "Oops! could not find automation"}
    } catch (error) {
        return {status : 500, data : "Oops! something went wrong"}
    }
}

export const saveListener = async (
    automationId : string,
    listener : "MESSAGE" | "SMARTAI",
    prompt : string,
    reply? : string
) => {
    await onCurrentUser()
    //another server action has to be created of adding a listener
        try {
            const create  = await addListener(automationId, listener, prompt, reply)
            if(create) return {status : 200, data : "Listener created"}
            return {status : 404, data : "Can't save listener"}
        } catch (error) {
            return {status : 500, data : "Oops! something went wrong"}
        }
    
}

export const saveTrigger = async (automationId : string, trigger : string[])=> {
    await onCurrentUser()
    //another server action has to be created of adding a trigger
    try {
        const create = await addTrigger(automationId , trigger)
        if(create) return {status : 200, data : "Trigger saved"}
        return { status: 404, data: "Cannot save trigger"}
    } catch (error) {
        return {status : 500, data : "Oops! something went wrong"}
    }
}

export const saveKeyword= async (automationId : string, keyword : string)=>{ 
    await onCurrentUser()
    //another server action has to be created of adding a trigger
    try {
        const create = await addKeyword(automationId , keyword)
        if(create) return {status : 200, data : "Keyword added successfully"}
        return { status: 404, data: "Cannot add this keyword"}
    } catch (error) {
        return {status : 500, data : "Oops! something went wrong"}
    }
}

export const deleteKeyword = async (id : string) => {
    await onCurrentUser()
    //another server action has to be created of adding a trigger
    try {
        const deleted = await removeKeyword(id)
        if(deleted) return {status : 200, data : "Keyword deleted successfully"}
        return { status: 404, data: "Keyword not found"}
    } catch (error) {
        return {status : 500, data : "Oops! something went wrong"}
    }
}

export const getProfilePosts = async () => {
    const user = await onCurrentUser()
    try {
        const profile = await findUser(user.id)
        const posts = await fetch(
            `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${profile?.integrations[0].token}`
        )
        const parsed = await posts.json()
        if(parsed) return {status : 200, data: parsed}
        console.log("Error in getting posts")
        return {status : 400}
    } catch (error) {
        console.log("Server side Error in getting posts", error)
        return {status : 500}
    }
}

export const savePosts = async (
    automationId : string,
    posts : {
        postId : string
        caption? : string
        media : string
        mediaType : 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
    }[]
) => {
    await onCurrentUser()

    try {
        const create = await addPost(automationId, posts)
        if(create) return {status : 200, data : "Posts attached"}
        return {status : 400, data : 'Automation not found'}
    } catch (error) {
        return {status : 500, data: 'Oops! something went wrong'}
    }
}