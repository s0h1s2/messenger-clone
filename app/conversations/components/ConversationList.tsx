"use client";
import { FullConversationType } from '@/app/types';
import { MdOutlineGroupAdd } from "react-icons/md"
import clsx from 'clsx';
import { ConversationBox } from './ConversationBox';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useConverstion } from '@/app/hooks/useConverstion';
export interface Props {
  conversations: FullConversationType[]
}

const ConversationList = ({ conversations }: Props) => {
  const convs = useState(conversations)
  const router = useRouter()
  const { conversationId, isOpen } = useConverstion()
  console.log(isOpen)
  return (
    <aside className={clsx("fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 ", isOpen ? "hidden" : "block w-full left-0")} >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-netural-800">
            Messages
          </div>
          <div className='rounded-full p-2 bg-gray-100 text-gray-600 hover:opacity-75 transition'>
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {conversations.map((conv) => (
          <ConversationBox key={conv.id} data={conv} selected={conversationId == conv.id} />
        ))}
      </div>
    </aside >
  );
}


export default ConversationList
