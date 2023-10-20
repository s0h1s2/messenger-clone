import React from 'react'
import { IconType } from 'react-icons'
interface Props {
  icon: IconType,
  onClick: () => void
}
export const AuthSocialButton: React.FC<Props> = ({ icon: Icon, onClick }) => {
  return (
    <button type="button" onClick={onClick} className='inline-flex w-full justify-center rounded-md px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-offset-0 '><Icon /></button>
  )
}
