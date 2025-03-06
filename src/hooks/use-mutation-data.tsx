import { MutationFunction, useMutation, MutationKey, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useMutationState } from "@tanstack/react-query";
export const useMutationData = (
    mutationKey : MutationKey,
    mutationFn : MutationFunction<any,any>,
    queryKey?: string,
    onSuccess? : ()=> void
)=>{
    const client = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationFn,
        mutationKey,
        onSuccess: (data) => {
            if(onSuccess) onSuccess()
                return toast(data?.status===200 ? "Success" :  "Error", {
            description: data.data
        })
        },
        onSettled : async()=> {
            return await client.invalidateQueries({queryKey: [queryKey]})
        }
    })
    return {mutate, isPending}
}

export const useMutationDataState = (mutationKey : MutationKey)=>{
    const data = useMutationState({
        filters : {mutationKey},
        select: (mutation)=>{
            return {
                variables: mutation.state.variables as any,
                status: mutation.state.status,
            }
        }
    })
    const latestVariable = data[data.length-1]
    return {latestVariable}
}