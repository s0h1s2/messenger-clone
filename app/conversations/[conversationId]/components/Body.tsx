"use client";
import { useConverstion } from '@/app/hooks/useConverstion'
import { FullMessageType } from '@/app/types';
import React, { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox';
import axios from 'axios';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';
interface Props {
  initialMessages: FullMessageType[]
}
const Body = ({ initialMessages }: Props) => {
  const { conversationId } = useConverstion();
  const [messages, setMessages] = useState(initialMessages)
  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView()
    const messageHandler = (message: FullMessageType) => {
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current
        }
        return [...current, message]
      })
      bottomRef?.current?.scrollIntoView()
    }
    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((message) => {
        if (message.id == newMessage.id) {
          return newMessage
        }
        return message
      }))
    }
    pusherClient.bind("messages:new", messageHandler)
    pusherClient.bind("message:update", updateMessageHandler)
    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind("messages:new")
      pusherClient.unbind("message:update")
    }
  }, [conversationId])
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
