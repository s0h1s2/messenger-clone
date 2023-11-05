'use client'
import useOtherUser from '@/app/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { HiChevronLeft } from 'react-icons/hi2'
interface Props {
  conversation: Conversation & {
    users: User[]
  }
}
export const Header = ({ conversation }: Props) => {
  const otherUser = useOtherUser(conversation)
  const status = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length}`
    }
    return "Active"
  }, [conversation])
  return (
    <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link href="/conversations" className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer">
          <HiChevronLeft size={32} />
        </Link>
      </div>
    </div>
  )
}
