import { useState, useEffect, useRef } from 'react';
import { messages, Message } from '@/constant/messages';
import { chats } from '@/constant/chat';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

interface ChatboxProps {
  chatId?: string;
  onBack?: () => void;
}

const Chatbox: React.FC<ChatboxProps> = ({ chatId: propChatId, onBack }) => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const chatId = (propChatId || params.userId)?.toString();
  const [messageText, setMessageText] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 获取聊天对象信息
  let chatInfo = chats.find(chat => String(chat.id) === String(chatId));
  // 如果chats中没有，尝试用userId渲染临时会话
  if (!chatInfo && chatId) {
    chatInfo = {
      id: chatId as any,
      name: chatId,
      avatar: chatId.slice(0, 2).toUpperCase(),
      lastMessage: '',
      timestamp: new Date().toISOString(),
      unread: false,
      unreadCount: 0,
      type: 'private',
      members: [],
    };
  }
  const isGroup = chatInfo?.type === 'group';
  const groupMembers = isGroup && chatInfo && chatInfo.members ? chatInfo.members : [];
  const chatKey = isGroup ? 'study-group' : (chatInfo?.name.toLowerCase().replace(' ', '-') || '');
  
  // 创建聊天键名映射
  const chatKeyMap: Record<string, string> = {
    'sarah-chen': 'sarah-chen',
    'mike-johnson': 'mike-johnson',
    'emma-wilson': 'emma-wilson',
    'david-kim': 'david-kim',
    'lisa-park': 'lisa-park',
    'alex-thompson': 'alex-thompson',
    'rachel-green': 'rachel-green',
    'tom-anderson': 'tom-anderson',
  };
  
  const actualChatKey = chatKeyMap[chatKey] || chatKey;

  // 模拟实时消息
  useEffect(() => {
    // 加载初始消息（无则空白）
    const initialMessages = messages[actualChatKey] || [];
    setChatMessages(initialMessages);

    // 模拟实时消息接收
    const interval = setInterval(() => {
      if (messages[actualChatKey] && Math.random() < 0.1) { // 仅有历史消息的对话才模拟新消息
        const newMessage: Message = {
          id: Date.now().toString(),
          senderId: actualChatKey,
          receiverId: 'current-user',
          content: getRandomMessage(),
          type: 'text',
          timestamp: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }),
          isRead: false,
        };
        setChatMessages(prev => [...prev, newMessage]);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [actualChatKey]);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const getRandomMessage = () => {
    const randomMessages = [
      "That's interesting!",
      "I see what you mean.",
      "Thanks for sharing!",
      "Got it!",
      "Sounds good!",
      "I'll check it out.",
      "Let me know if you need anything else.",
      "Perfect!",
      "That works for me.",
      "I'll get back to you soon.",
    ];
    return randomMessages[Math.floor(Math.random() * randomMessages.length)];
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'current-user',
        receiverId: actualChatKey,
        content: messageText,
        type: 'text',
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        isRead: true,
      };
      setChatMessages(prev => [...prev, newMessage]);
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const newMessage: Message = {
          id: Date.now().toString(),
          senderId: 'current-user',
          receiverId: actualChatKey,
          content: 'Image',
          type: 'image',
          timestamp: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }),
          isRead: true,
          imageUrl: imageUrl,
        };
        setChatMessages(prev => [...prev, newMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 群聊成员列表
  const renderGroupMembers = () => (
    <div className="flex flex-wrap gap-2 mb-2">
      {groupMembers.map((member: any) => (
        <div key={member.id} className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-xs">
          <span>{member.avatar}</span>
          <span>{member.name}</span>
        </div>
      ))}
    </div>
  );

  const renderMessage = (message: Message) => {
    const isOwnMessage = message.senderId === 'current-user';
    // 查找发送者信息
    const sender = isGroup ? groupMembers.find((m: any) => m.id === message.senderId) : chatInfo;
    return (
      <div
        key={message.id}
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
          {!isOwnMessage && (
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">{sender?.avatar}</span>
              </div>
              <span className="text-xs text-muted-foreground">{sender?.name}</span>
            </div>
          )}
          <div
            className={`rounded-lg px-4 py-2 ${
              isOwnMessage
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground'
            }`}
          >
            {message.type === 'image' && message.imageUrl ? (
              <div className="space-y-2">
                <img
                  src={message.imageUrl}
                  alt="Shared image"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-sm opacity-80">{message.content}</p>
              </div>
            ) : (
              <p className="text-sm">{message.content}</p>
            )}
            <p className={`text-xs mt-1 ${isOwnMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
              {message.timestamp}
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (!chatInfo) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Chat not found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              if (onBack) {
                onBack();
              } else if (location.state && (location.state as any).fromChat) {
                navigate('/chat');
              } else if (location.state && (location.state as any).fromHome) {
                navigate('/');
              } else {
                window.history.length > 1 ? window.history.back() : navigate('/chat');
              }
            }}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <span className="text-lg">←</span>
          </button>
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">{chatInfo.avatar}</span>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground">{chatInfo.name}{isGroup && ' (Group)'}</h2>
            <p className="text-xs text-muted-foreground">
              {isTyping ? 'Typing...' : 'Online'}
            </p>
          </div>
        </div>
        {isGroup && renderGroupMembers()}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {chatMessages.length > 0 ? (
          chatMessages.map(renderMessage)
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No messages yet</p>
            <p className="text-xs text-muted-foreground mt-1">Start a conversation!</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full p-3 border border-border rounded-lg bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={handleImageClick}
            className="p-3 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-xl">📷</span>
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className="p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-lg">➤</span>
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default Chatbox;
