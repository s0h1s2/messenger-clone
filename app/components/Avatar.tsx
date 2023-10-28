'use client';
import { User } from '@prisma/client'
import Image from "next/image"
import React from 'react'

interface Props {
  user?: User
}
export const Avatar = ({ user }: Props) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image src={user?.image || "/images/placeholder.jpg"} alt='avatar' fill></Image>
      </div>
    </div>
  )
}
