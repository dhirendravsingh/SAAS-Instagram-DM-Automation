import { client } from "@/lib/prisma"

export const matchKeyword = async (keyword : string)=> {
    return await client.keyword.findFirst({
        where : {
            word : {
                equals : keyword,
                mode : 'insensitive'
            }
        }
    })
}

export const getKeywordAutomation = async(
    automationId : string,
    dm : boolean
)=>  {
    return await client.automation.findUnique({
        where : {
            id : automationId
        },
        include : {
            dms : dm,
            trigger : {
                where :  {
                    type : dm ? 'DM' : 'COMMENT'
                },
            },
            listener : true,
            User : {
                select : {
                    subscription : {
                        select : {
                            plan : true
                        }
                    },
                    integrations : {
                        select : {
                            token : true
                        }
                    }
                }
            }
        }
    })
}

export const trackResponses = async (
    automationId : string,
    type : "COMMENT" | "DM"
 ) =>{
    if(type === 'COMMENT'){
        return await client.listener.update({
            where : {automationId},
            data : {
                commentCount : {
                    increment : 1
                }
            }
        })
    }
    if(type === "DM"){
        return await client.listener.update({
            where : {automationId},
            data : {
                dmCount : {
                    increment : 1
                }
            }
        })
    }
 }

 export const createChatHistory=(automationId : string, sender : string, receiver: string, message : string) => {
    return client.automation.update({
        where : {
            id : automationId
        },
        data : {
            dms : {
                create : {
                    receiver,
                    senderId : sender,
                    message
                }
            }
        }
    })
 }

 export const getKeywordPost = async (postId : string, automationId : string)=> {
    return await client.post.findFirst({
        where :  {
            AND :[{postId : postId}, {automationId}]
        },
        select : {
            automationId : true
        }
    })
 }

 export const getChatHistory = async (sender: string, receiver: string) => {
    const history = await client.dms.findMany({
        where: {
            OR: [
                { senderId: sender, receiver: receiver },
                { senderId: receiver, receiver: sender }
            ]
        },
        orderBy: {
            createdAt: 'asc' // Assuming there is a createdAt field to order messages
        }
    });
    return history;
 }

 export const findAutomation = async (id : string)=> {
    return await client.automation.findUnique({
        where : {
            id,
        },
        include : {
            keywords : true,
            trigger : true,
            posts : true,
            listener : true,
            User : {
                select : {
                    subscription : true,
                    integrations : true
                 }
            }
        }
    })
 }
