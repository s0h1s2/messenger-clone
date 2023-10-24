import { useParams } from "next/navigation";
import { useMemo } from "react";
const useConverstion = () => {
  const params = useParams()
  const converstionId = useMemo(() => {
    if (!params?.id) {
      return ""
    }
    return params.converstionId as string

  }, [params?.id])
  const isOpen = useMemo(() => !!converstionId, [converstionId])
  return useMemo(() => ({
    isOpen,
    converstionId
  }), [isOpen, converstionId])
}
export { useConverstion }
