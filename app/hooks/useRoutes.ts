import { usePathname } from "next/navigation"
import { useConverstion } from "./useConverstion"
import { useMemo } from "react"
import { HiChat, HiUsers } from "react-icons/hi"
import { HiArrowLeftOnRectangle } from "react-icons/hi2"
import { signOut } from "next-auth/react"
const useRoutes = () => {
  const pathName = usePathname()
  const { conversationId } = useConverstion()
  const routes = useMemo(() => ([
    {
      label: "Chat",
      href: "/conversations",
      icon: HiChat,
      active: pathName == "/conversations" || !!conversationId
    },
    {
      label: "Users",
      href: "/users",
      icon: HiUsers,
      active: pathName == "/users"
    },
    {
      label: "Logout",
      href: "#",
      icon: HiArrowLeftOnRectangle,
      active: false,
      onClick: () => signOut()
    },
  ]), [pathName, conversationId])
  return routes;
}
export default useRoutes
