'use server'

import { onCurrentUser } from "../user"
import { createAutomation } from "./queries"
import { getAutomations } from "./queries"
export const createAutomations = async ()=>{
    //first thing we had to do is to verify the user
    const user = await onCurrentUser()
    try {
        const create = await createAutomation(user.id)
        if(create) return {status : 200, data: 'Automation created'}
        return {status : 404, data: 'Oops! something went wrong'}
    } catch (error) {
        return {status : 500, data: 'Internal Server Error'}

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