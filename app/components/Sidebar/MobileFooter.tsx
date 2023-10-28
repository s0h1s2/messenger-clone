'use client'
import { useConverstion } from '@/app/hooks/useConverstion'
import useRoutes from '@/app/hooks/useRoutes'
import React from 'react'
import { MobileItem } from './MobileItem'

export const MobileFooter = () => {
  const routes = useRoutes()
  const { isOpen } = useConverstion()
  if (isOpen) {
    return null
  }

  return (
    <div className='fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden'>
      {routes.map((route) => (
        <MobileItem key={route.label} href={route.href} active={route.active} label={route.label} icon={route.icon} onClick={route.onClick} />
      ))}</div>
  )
}
