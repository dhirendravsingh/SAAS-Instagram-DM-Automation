"use server"
import {client} from '@/lib/prisma'

// we are checking if the user with that specific clerkId is present in the data base already or not
export const findUser = async (clerkId : string)=>{
    return await client.user.findUnique({
        where: {
            clerkId
        },
        include:{
            subscription : true,
            integrations : {
                select : {
                    id : true,
                    token : true,
                    expiresAt : true,
                    name : true
                }
            }
        }
    })
}