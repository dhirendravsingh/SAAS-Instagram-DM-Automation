'use server'

import { onCurrentUser } from "../user"
import { createAutomation } from "./queries"
import { getAutomations } from "./queries"
import { findAutomation } from "./queries"
import { updateAuomation } from "./queries"

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