import Sidebar from "@/app/components/Sidebar/Sidebar";
import { getConversations } from "@/app/actions/getConversations";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({ children }: { children: React.ReactNode }) {
  const conversations = await getConversations()

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList conversations={conversations} />
        {children}
      </div>
    </Sidebar>

  );
}
