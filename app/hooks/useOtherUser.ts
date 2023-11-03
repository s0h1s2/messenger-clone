import { Conversation, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";

const useOtherUser = (conversation: FullConversationType | { users: User[] }) => {
  const session = useSession()
  const otherUsers = useMemo(() => {
    const currUserMail = session.data?.user?.email;
    const otherUser = conversation.users.filter((user) => user.email !== currUserMail)
    return otherUser
  }, [session.data?.user?.email, conversation.users])
  return otherUsers[0]
}

export default useOtherUser
