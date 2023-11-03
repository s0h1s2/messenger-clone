import { useParams } from "next/navigation";
import { useMemo } from "react";
const useConverstion = () => {
  const params = useParams()
  const conversationId = useMemo(() => {
    if (!params?.id) {
      return ""
    }
    return params.converstionId as string

  }, [params?.id])
  const isOpen = useMemo(() => !!conversationId, [conversationId])
  return useMemo(() => ({
    isOpen,
    conversationId
  }), [isOpen, conversationId])
}
export { useConverstion }
