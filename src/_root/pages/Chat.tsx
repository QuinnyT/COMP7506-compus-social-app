import React, { useState } from 'react';
import { chats } from '@/constant/chat';
import Chatbox from '@/components/pages/Chat/Chatbox';

const Chat = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const handleBackToChatList = () => {
    setSelectedChatId(null);
  };

  // 如果选择了聊天，显示聊天窗口
  if (selectedChatId) {
    return (
      <div className="flex-1 flex flex-col bg-background">
        <Chatbox 
          chatId={selectedChatId} 
          onBack={handleBackToChatList} 
        />
      </div>
    );
  }

  // 显示聊天列表
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <h1 className="text-lg font-semibold text-foreground">Messages</h1>
      </div>

      {/* Chat List */}
      <div className="p-4 space-y-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleChatSelect(chat.id.toString())}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">{chat.avatar}</span>
              </div>
              {chat.unread && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">
                    {chat.unreadCount || 1}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground truncate">{chat.name}</h3>
                <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {chats.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">No conversations yet</p>
            <p className="text-xs text-muted-foreground mt-1">Start chatting with your friends!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat; 