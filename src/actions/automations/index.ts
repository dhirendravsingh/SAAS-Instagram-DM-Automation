'use server'

import { onCurrentUser } from "../user"
import { createAutomation } from "./queries"

export const getAllAutomations = async ()=>{
    const user = await onCurrentUser()
    try {
        const create = await createAutomation(user.id)
        if(create) return {status : 200, data: 'Automation created'}
        return {status : 404, data: 'Oops! something went wrong'}
    } catch (error) {
        return {status : 500, data: 'Internal Server Error'}

    }
}