import Sidebar from "@/app/components/Sidebar/Sidebar"
import getUsers from "../actions/getUsers"
import { UsersList } from "./components/UsersList"
export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  const users = await getUsers()
  return (
    <Sidebar>
      <div className="h-full">
        <UsersList users={users} />
        {children}
      </div>
    </Sidebar>
  )
}
