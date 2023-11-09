"use client";
import { useConverstion } from '@/app/hooks/useConverstion'
import axios from 'axios';
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const Body = () => {
  const { conversationId } = useConverstion();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  })
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true })
    axios.post("/api/messages/", {
      ...data,
      conversationId
    })
  }
  return (
    <div className="flex-1 overflow-y-auto">
      Messages!
    </div>
  )
}
export default Body
