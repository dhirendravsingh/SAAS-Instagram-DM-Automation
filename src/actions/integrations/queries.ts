"use server"

import {client} from '@/lib/prisma'

export const updateIntegration = async (token : string, id: string, expire:Date)=>{
    return await client.integrations.update({
        where: { 
            id
        },
        data :  {
            token,
            expiresAt : expire
        }
    })
}