
import { createAutomations, updateAutomationName } from "@/actions/automations"
import { useMutationData } from "./use-mutation-data"
import { useEffect, useRef, useState } from "react"
import {z} from "zod"
import { saveListener } from "@/actions/automations"
import useZodForm from "./use-zod-form"
import { useAppSelector } from "@/redux/store"
import { AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { TRIGGER } from "@/redux/slices/automations"
import { saveTrigger } from "@/actions/automations"

export const useCreateAutomation = (id?:string)=>{
    //we will requrie one hook to fetch data in the form of optimistic UI
    const {isPending, mutate} = useMutationData(
        ['create-automation'] , 
        ()=> createAutomations(id),
        'user-automations'
        
    )

    return {isPending, mutate}
}

export const useEditAutomation = (automationId : string)=>{
    const [edit, setEdit] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const enableEdit =()=> setEdit(true)
    const disableEdit =()=> setEdit(false)

    const {isPending, mutate} = useMutationData(['update-automation'], (data:{name:string})=>updateAutomationName(automationId, {name: data.name}), 'automation-info', disableEdit)


   
    useEffect(()=>{
        function handleClickOutside(this: Document, event : MouseEvent){
            if(inputRef.current && !inputRef.current.contains(event.target as Node | null)){
                if(inputRef.current.value !== ''){
                    mutate({name : inputRef.current.value})
                } else {
                    disableEdit()
                }
            }
           
        }

        document.addEventListener('mousedown', handleClickOutside)
        return ()=> {
            document.removeEventListener('mousedown', handleClickOutside)
        }

    }, [])

    return {
        edit, 
        enableEdit,
        disableEdit,
        inputRef,
        isPending
    }
}

export const useListener = (id: string)=>{
    const [listener , setListener] = useState<"MESSAGE" | "SMARTAI">("MESSAGE")
    //we have two options for listeners, one is custom made message by the user and the other option is using AI with the openAI key
    //for the message we need to validate the right inputs, we will be using the Zod library for that

    const promptSchema = z.object({
        prompt : z.string().min(1),
        reply: z.string()
    })
    //save listener is a server action which will be used to save the listener
    const{isPending, mutate} = useMutationData( ['create-listener'], (data:{prompt:string, reply:string})=> saveListener(id, listener || "MESSAGE", data.prompt, data.reply), 'automation-info')
    
    const {errors, onFormSubmit, register, reset, watch} = useZodForm(
        promptSchema,
        mutate
    )

    const onSetListener = (type:  "MESSAGE" | "SMARTAI")=> setListener(type)
    return {onSetListener, register, onFormSubmit, listener, isPending}
}

export const useTriggers = (id: string)=>{ 
    const types = useAppSelector((state)=> state.AutomationReducer.trigger?.types)

    const dispatch : AppDispatch = useDispatch()

    const onSetTrigger = (type : "COMMENT" | "DM") => dispatch(TRIGGER({trigger : {type}}))

    const {isPending, mutate} = useMutationData(['add-trigger'], (data: {types : string[]})=> saveTrigger(id, data.types), 'automation-info'  )

    const onSaveTrigger = ()=> mutate({types})

    return {types, onSetTrigger, onSaveTrigger, isPending}
    }


