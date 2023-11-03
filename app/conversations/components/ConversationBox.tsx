import { Avatar } from '@/app/components/Avatar'
import useOtherUser from '@/app/hooks/useOtherUser'
import { FullConversationType } from '@/app/types'
import { Conversation } from '@prisma/client'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useCallback, useMemo } from "react"
interface Props {
  selected?: boolean,
  data: FullConversationType,

}
export const ConversationBox = ({ data, selected }: Props) => {
  const otherUsers = useOtherUser(data)
  const session = useSession()
  const router = useRouter()
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`)
  }, [data.id])
  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1]
  }, [data.messages])
  const userEmail = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])
  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false
    }
    const seenMessages = lastMessage.seen || []
    if (!userEmail) {
      return false
    }
    return seenMessages.filter((user) => user.email == userEmail).length != 0
  }, [userEmail, lastMessage])
  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image."
    }
    return lastMessage?.body || "Started a conversation"
  }, [lastMessage])
  return (
    <div onClick={handleClick} className={clsx("w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cusror-pointer p-3", selected ? "bg-neutral-100" : "bg-white")}>
      <Avatar user={otherUsers} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUsers.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p className={clsx("truncate text-sm", hasSeen ? 'text-gray-500' : 'text-black font-medium')}>{lastMessageText}</p>
        </div>
      </div>
    </div>
  )
}
