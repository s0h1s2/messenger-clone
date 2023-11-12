"use client";
import { useConverstion } from '@/app/hooks/useConverstion'
import { FullMessageType } from '@/app/types';
import React, { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox';
import axios from 'axios';
interface Props {
  initialMessages: FullMessageType[]
}
const Body = ({ initialMessages }: Props) => {
  const { conversationId } = useConverstion();
  const [messages, setMessages] = useState(initialMessages)
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`).then(() => { }).catch(() => { })
  }, [conversationId])
  const bottomRef = useRef<HTMLDivElement>(null)
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => {
        return <MessageBox key={message.id} isLast={i == messages.length - 1} data={message} />
      })}
      <div ref={bottomRef} className="pt-24" />
    </div>
  )
}
export default Body
