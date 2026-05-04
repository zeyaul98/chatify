import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import ChatHeader from './ChatHeader';
import NochatHistoryPlaceholder from './NochatHistoryPlaceholder';
import MessageInput from './MessageInput';
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton';

function ChatContainer() {

  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-chat-pattern">

      {/* HEADER */}
      <ChatHeader />

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4">

        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-4xl mx-auto space-y-4">

            {messages.map((msg) => {
              const isMe = msg.senderId === authUser._id;

              return (
                <div
                  key={msg._id}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] sm:max-w-[60%] px-4 py-2 rounded-2xl shadow-md 
                    ${isMe
                        ? 'bg-cyan-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 rounded-bl-none'
                      }`}
                  >

                    {/* IMAGE */}
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="sent"
                        className="rounded-lg mb-2 max-h-60 w-full object-cover"
                      />
                    )}

                    {/* TEXT */}
                    {msg.text && (
                      <p className="text-sm sm:text-base">{msg.text}</p>
                    )}

                    {/* TIME */}
                    <p className="text-[10px] sm:text-xs mt-1 opacity-70 text-right">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>

                  </div>
                </div>
              );
            })}

            <div ref={messageEndRef} />

          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NochatHistoryPlaceholder name={selectedUser?.fullName} />
        )}

      </div>

      {/* INPUT */}
      <div>
        <MessageInput />
      </div>

    </div>
  );
}

export default ChatContainer;