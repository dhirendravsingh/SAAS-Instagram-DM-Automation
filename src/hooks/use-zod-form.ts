import { z,ZodSchema } from 'zod';
import { UseMutateFunction } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
const useZodForm = (schema : ZodSchema, mutation : UseMutateFunction, defaultValues? : any)=>{
    const {
        register,
        formState:  {errors},
        handleSubmit,
        watch,
        reset
    } = useForm<z.infer<typeof schema>>({
        resolver : zodResolver(schema),
        defaultValues : {
            ...defaultValues
        }
    })

    const onFormSubmit = handleSubmit((values)=> mutation({...values}))
    return {
        register,
        errors,
        watch,
        reset,
        onFormSubmit
    }
  }


  export default useZodForm