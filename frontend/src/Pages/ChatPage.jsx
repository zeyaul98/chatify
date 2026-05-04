import { useChatStore } from "../store/useChatStore";

import BorderAnimate from "../components/BorderAnimate";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatList";
import ContactList from "../components/ContactsList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-950">

      <div className="w-full h-full max-w-7xl flex">

        <BorderAnimate className="flex w-full h-full rounded-none sm:rounded-xl overflow-hidden">

          {/* 🟢 LEFT SIDEBAR */}
          <div
            className={`
              ${selectedUser ? "hidden md:flex" : "flex"} 
              w-full md:w-80 
              bg-slate-800/60 backdrop-blur-sm 
              flex-col border-r border-slate-700
            `}
          >
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-2">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/* 🔵 RIGHT CHAT AREA */}
          <div
            className={`
              flex-1 flex flex-col bg-slate-900/60 backdrop-blur-sm
              ${!selectedUser ? "hidden md:flex" : "flex"}
            `}
          >
            {selectedUser ? (
              <ChatContainer />
            ) : (
              <NoConversationPlaceholder />
            )}
          </div>

        </BorderAnimate>
      </div>
    </div>
  );
}

export default ChatPage;