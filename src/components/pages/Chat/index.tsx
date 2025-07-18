import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { chats } from '@/constant/chat';
import Chatbox from './Chatbox';

const Chat = () => {
  const navigate = useNavigate();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'private' | 'group'>('private');

  const handleChatSelect = (chatId: string) => {
    navigate(`/chat/${chatId}`, { state: { fromChat: true } });
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

  // 聊天tab切换
  const filteredChats = chats.filter(chat => {
    if (activeTab === 'private') return !chat.type || chat.type === 'private';
    if (activeTab === 'group') return chat.type === 'group';
    return true;
  });

  // 显示聊天列表
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <h1 className="text-lg font-semibold text-foreground">Chat</h1>
        <div className="flex gap-2 mt-2">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'private' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('private')}
          >
            Private Chats
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'group' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('group')}
          >
            Group Chats
          </button>
        </div>
      </div>
      {/* Chat List */}
      <div className="p-4 space-y-2">
        {filteredChats.map((chat) => (
          <div 
            key={chat.id} 
            onClick={() => handleChatSelect(chat.id.toString())}
            className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">{chat.avatar}</span>
              </div>
              {/* Unread indicator */}
              {chat.unread && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">
                    {chat.unreadCount || 1}
                  </span>
                </div>
              )}
            </div>
            {/* Chat Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-foreground truncate">
                  {chat.type === 'group' ? chat.name + ' (Group)' : chat.name}
                </p>
                <p className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                  {chat.timestamp}
                </p>
              </div>
              <p className={`text-sm truncate ${
                chat.unread ? 'text-foreground font-medium' : 'text-muted-foreground'
              }`}>
                {chat.lastMessage}
              </p>
              {chat.type === 'group' && chat.members && (
                <p className="text-xs text-muted-foreground mt-1">Members: {chat.members.length}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {filteredChats.length === 0 && (
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