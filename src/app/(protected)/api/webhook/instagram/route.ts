import { NextRequest, NextResponse } from "next/server";
import { matchKeyword } from "@/actions/webhook/queries";
import { getKeywordAutomation } from "@/actions/webhook/queries";
import { sendDM } from "@/lib/fetch";
import { trackResponses } from "@/actions/webhook/queries";
import OpenAI from "openai"
import { createChatHistory } from "@/actions/webhook/queries";
import { client } from "@/lib/prisma";
import { getKeywordPost } from "@/actions/webhook/queries";
import { findAutomation } from "@/actions/automations/queries";
import { getChatHistory } from "@/actions/webhook/queries";

export async function GET(req : NextRequest){
    //this is done to validate the webhook, this is required by instagram
    //hence through this the instagram will validate the end points of the webhook
    const hub = req.nextUrl.searchParams.get("hub.challenge")
    return new NextResponse(hub)
}


export async function POST(req:  NextRequest){
    const openai = new OpenAI({
        apiKey: process.env.OPEN_AI_KEY, // API key from env variables
      });
    const webhook_payload = await req.json()
    //the matcher is a boolean, it will check if the entered keyword is in the message or not, this will decide whether there is going to be an automation or not
    let matcher
    try {
        if(webhook_payload.entry[0].messaging){
            //below a helper function is used that tells if the word exists or not
            matcher = await matchKeyword(webhook_payload[0].messaging[0].message.text)
        }

        if (webhook_payload.entry[0].changes){
            matcher = await matchKeyword(
                webhook_payload.entry[0].changes[0].value.text
            )
        }
        if(matcher && matcher.automationId){
            if(webhook_payload.entry[0].messaging){
            //first we will check here whether it is a comment on a post or a dm, hence this will allow us to know the path to handle
            const automation = await getKeywordAutomation(
                matcher.automationId,
                true
            )
            if(automation && automation.trigger){
                if(automation.listener && automation.listener.listener === 'MESSAGE'){
                    const direct_message = await sendDM(
                        //from instagram side, the person receiving the text will be considered under the sender id
                        webhook_payload.entry[0].id,
                        webhook_payload.entry[0].messaging[0].sender.id,
                        automation.listener?.prompt,
                        automation.User?.integrations[0].token!
                    )
                    if(direct_message.status === 200){
                        const tracked = await trackResponses(automation.id, 'DM')
                        if(tracked){
                            return NextResponse.json(
                                {
                                    message : 'Message sent'
                                },
                                {
                                    status : 200
                                }
                            )
                        }
                    }
                }
                if(automation.listener && automation.listener.listener === "SMARTAI" && automation.User?.subscription?.plan === 'PRO' ){
                    const smart_ai_message = await openai.chat.completions.create({
                        model : 'gpt-4o',
                        messages : [
                            {
                                role : 'assistant',
                                content : `${automation.listener?.prompt}: Keep responses under 2 sentences`,
                            }
                        ]
                    })
                    if(smart_ai_message.choices[0].message.content){
                        const receiver = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            webhook_payload.entry[0].messaging[0].message.text
                        )

                        const sender = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            smart_ai_message.choices[0].message.content
                        )

                        await client.$transaction([receiver, sender])

                        const direct_message = await sendDM(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            smart_ai_message.choices[0].message.content,
                            automation.User?.integrations[0].token!
                        )

                        if(direct_message.status===200){
                            const tracked = await trackResponses(automation.id, 'DM')
                            if(tracked){
                                return NextResponse.json(
                                    {
                                        message : 'Message sent'
                                    },
                                    {
                                        status : 200
                                    }
                                )
                            }
                        }
                    }
                }
            }
        }
            if(
                webhook_payload.entry[0].changes && webhook_payload.entry[0].changes[0].field === 'comments'
            ){
                const automation = await getKeywordAutomation(
                matcher.automationId,
                false
                )
                const automations_post = await getKeywordPost(
                    webhook_payload.entry[0].changes[0].value.media.id,
                    automation?.id!
                )
                if(automation && automations_post && automation.trigger){
                    if(automation.listener){
                        if(automation.listener.listener === 'MESSAGE'){
                            const direct_message = await sendDM(
                                webhook_payload.entry[0].id,
                                webhook_payload.entry[0].changes[0].value.from.id,
                                automation.listener?.prompt,
                                automation.User?.integrations[0].token!
                            )
                            if(direct_message.status===200){
                                const tracked = await trackResponses(automation.id, 'COMMENT')

                                if(tracked){
                                    return NextResponse.json(
                                        {
                                            message : "Message sent"
                                        },
                                        {
                                            status : 200
                                        }
                                    )
                                }
                            }
                        }
                        if(
                            automation.listener.listener === 'SMARTAI' && automation.User?.subscription?.plan === 'PRO'
                        ){
                            const smart_ai_message = await openai.chat.completions.create({
                                model : 'gpt-4o',
                                messages : [
                                    {
                                        role : 'assistant',
                                        content : `${automation.listener?.prompt}: Keep responses under 2 sentences`
                                    }
                                ]
                            })
                            if(smart_ai_message.choices[0].message.content){
                                const receiver = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    webhook_payload.entry[0].changes[0].value.text
                                )

                                const sender = createChatHistory(
                                    automation.id,
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    smart_ai_message.choices[0].message.content
                                )

                                await client.$transaction([receiver, sender])

                                const direct_message = await sendDM(
                                    webhook_payload.entry[0].id,
                                    webhook_payload.entry[0].changes[0].value.from.id,
                                    smart_ai_message.choices[0].message.content,
                                    automation.User?.integrations[0].token!
                                )

                                if(direct_message.status === 200){
                                    const tracked = await trackResponses(automation.id, 'COMMENT')

                                    if(tracked){
                                        return NextResponse.json(
                                            {
                                                message : "Message sent"
                                            },
                                            {
                                                status : 200
                                            }
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if(!matcher){
            const customer_history = await getChatHistory(
                webhook_payload.entry[0].messaging[0].sender.id,
                webhook_payload.entry[0].messaging[0].recipient.id
            )

            if(customer_history.length > 0){
                const automation = await findAutomation(customer_history[0].automationId!)
                
                if(automation?.User?.subscription?.plan==='PRO' && automation.listener?.listener=== 'SMARTAI'){
                    const smart_ai_message = await openai.chat.completions.create({
                        model : 'gpt-4o',
                        messages : [
                            {
                                role : 'assistant',
                                content : `${automation.listener?.prompt}: keep responses under 2 sentences`
                            },
                            ...customer_history.map(history => ({
                                role : 'user',
                                content : history.message
                            })),
                            {
                                role : 'user',
                                content : webhook_payload.entry[0].messaging[0].message.text
                            }
                        ]
                    })
                    if(smart_ai_message.choices[0].message.content){
                        const receiver = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            webhook_payload.entry[0].messaging[0].message.text
                        )

                        const sender = createChatHistory(
                            automation.id,
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            smart_ai_message.choices[0].message.content
                        )
                        await client.$transaction([receiver, sender])
                        const direct_message = await sendDM(
                            webhook_payload.entry[0].id,
                            webhook_payload.entry[0].messaging[0].sender.id,
                            smart_ai_message.choices[0].message.content,
                            automation.User?.integrations[0].token!
                        )

                        if(direct_message.status===200){
                            return NextResponse.json(
                                {
                                    message : 'Message sent'
                                },
                                {
                                    status : 200
                                }
                            )
                        }
                    }
                }
            }
            return NextResponse.json(
                {
                    message : 'No automation set'
                },
                {
                    status : 404
                }
            )
        }
        return NextResponse.json(
            {
                message : 'No automation set'
            },
            {
                status : 400
            }
        )
    } catch (error) {
        return NextResponse.json(
            {
                message : 'No automation set'
            },
            {
                status : 500
            }
        )
    }
}