'use client';

import { Input } from "@/app/components/Input/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
type Variant="LOGIN"|"REGISTER"
export const AuthForm = () => {
  const [variant,setVariant]=useState<Variant>("LOGIN")
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const toggleVariant=useCallback(()=>{
        if(variant=="LOGIN"){
            setVariant("REGISTER")
            return 
        }   
        setVariant("LOGIN")

  },[variant])
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
        name:'',
        email:'',
        password:'',
    }
  })
  const onSubmit:SubmitHandler<FieldValues>=(data)=>{
    setIsLoading(true)
    if(variant=='REGISTER'){}
    if(variant=='LOGIN'){}
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input/>
        </form>
</div>
    </div>
  )
}
