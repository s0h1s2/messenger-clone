import { usePathname } from "next/navigation"
import { useConverstion } from "./useConverstion"
import { useMemo } from "react"
import { HiChat, HiUsers } from "react-icons/hi"
import { HiArrowLeftOnRectangle } from "react-icons/hi2"
import { signOut } from "next-auth/react"
const useRoutes = () => {
  const pathName = usePathname()
  const { converstionId } = useConverstion()
  const routes = useMemo(() => ([
    {
      label: "Chat",
      href: "/converstions",
      icon: HiChat,
      active: pathName == "/converstions" || !!converstionId
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
  ]), [pathName, converstionId])
  return routes;
}
export default useRoutes
