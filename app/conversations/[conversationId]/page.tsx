import React from 'react'
interface IParams {
  ConversationId: string
}
const ConversationId = async ({ params }: { params: IParams }) => {
  return (
    <div>ConversationId </div>
  )
}
export default ConversationId
