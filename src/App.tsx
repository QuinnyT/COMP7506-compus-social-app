import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import SigninForm from "@/components/ui/signin-form";
import BottomNav from "@/components/BottomNav";
import Home from "@/components/pages/Home";
import Chat from "@/components/pages/Chat";
import Chatbox from "@/components/pages/Chat/Chatbox";
import Profile from "@/components/pages/Profile";

import "./globals.css";

/**
 * 校园社交应用主组件
 * 
 * 移动端页面框架：
 * - Feed (Home) - 首页帖子流
 * - 聊天列表(Chat) - 消息列表
 * - 个人中心(Profile) - 用户资料和设置
 */
const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'chat':
        return <Chat />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <main className="flex h-screen w-screen flex-col">
      <Routes>
        {/* 登录页面 */}
        <Route path="/sign-in" element={<SigninForm />} />
        
        {/* 主应用页面 */}
        <Route path="/" element={
          <div className="flex-1 relative">
            {/* 主内容区域 */}
            <div className="h-full pb-16">
              {renderContent()}
            </div>
            
            {/* 底部导航 */}
            <BottomNav 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />
          </div>
        } />
        {/* 聊天页面：支持/chat和/chat/:userId */}
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:userId" element={<Chatbox />} />
      </Routes>

      {/* 全局消息提示组件 */}
      <Toaster />
    </main>
  );
};

export default App;
