import { onUserInfo } from "@/actions/user";
import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { getAllAutomations, getAutomationInfo } from "@/actions/automations";

const Prefetch = async (
    client : QueryClient,
    action: QueryFunction,
    key : string
)=>{
    return await client.prefetchQuery({
        queryKey: [key],
        queryFn: action,
        staleTime: 60000
    })
}

export const PrefetchUserProfile = async (client : QueryClient) =>{
    return await Prefetch(client, onUserInfo, 'user-profile')
}

export const PrefetchUserAutomations=async (client : QueryClient)=>{
    return await Prefetch(client, getAllAutomations , 'user-automations')
}

export const PrefetchUserAutomation = async (client : QueryClient, automationId : string)=>{
    return await Prefetch(client, ()=> getAutomationInfo(automationId), 'automation-info' )
}