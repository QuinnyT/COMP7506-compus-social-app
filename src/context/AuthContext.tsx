import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import { IUser } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";

// 初始用户状态 - 用于重置用户数据
const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
  campus: "",
  phone: "",
};

// 模拟用户数据 - 用于开发调试
const MOCK_USER = {
  id: "mock-user-id",
  name: "校园测试用户",
  username: "campususer",
  email: "test@hku.hk",
  imageUrl: "https://cloud.appwrite.io/v1/storage/buckets/64f86b8b0c3c8b8c8c8c/files/64f86b8b0c3c8b8c8c8c/view?project=64f86b8b0c3c8b8c8c8c&mode=admin",
  bio: "这是一个用于开发调试的校园用户",
  campus: "hku_main",
  phone: "12345678",
};

// 初始上下文状态 - 定义认证上下文的默认值
const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

// 认证上下文类型定义
type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

// 创建认证上下文
const AuthContext = createContext<IContextType>(INITIAL_STATE);

/**
 * 认证提供者组件 - 管理整个应用的认证状态
 * 功能：
 * 1. 管理用户登录状态
 * 2. 检查用户认证状态
 * 3. 自动重定向未认证用户
 * 4. 提供用户信息给子组件
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  
  // 用户状态管理
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  
  // 认证状态管理 - 控制用户是否已登录
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // 加载状态管理 - 用于显示加载指示器
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 检查用户认证状态的核心函数
   * 流程：
   * 1. 设置加载状态
   * 2. 调用Appwrite API获取当前用户信息
   * 3. 如果用户存在，更新用户状态和认证状态
   * 4. 返回认证结果
   */
  const checkAuthUser = async () => {
    setIsLoading(true);
    
    // 开发模式下的强制登录功能
    const isDevelopment = import.meta.env.DEV;
    const forceLogin = isDevelopment && import.meta.env.VITE_FORCE_LOGIN === 'true';
    
    if (forceLogin) {
      console.log("🔧 开发模式：启用强制登录");
      setUser(MOCK_USER);
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    }
    
    try {
      // 从Appwrite获取当前账户信息
      const currentAccount = await getCurrentUser();
      setIsAuthenticated(true);
      
      if (currentAccount) {
        // 用户存在，更新用户状态
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
          campus: currentAccount.campus || "",
          phone: currentAccount.phone || "",
        });
        
        // 设置认证状态为true
        setIsAuthenticated(true);
        
        console.log("✅ 用户认证成功:", currentAccount.name);
        return true;
      }

      // 用户不存在，认证失败
      console.log("❌ 用户认证失败: 未找到用户信息");
      return false;
    } catch (error) {
      console.error("❌ 认证检查出错:", error);
      
      // 开发模式下，如果API调用失败，使用模拟数据
      if (isDevelopment) {
        console.log("🔧 开发模式：API调用失败，使用模拟用户数据");
        setUser(MOCK_USER);
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 应用启动时的认证检查
   * 功能：
   * 1. 检查本地存储的cookie信息
   * 2. 如果cookie无效，重定向到登录页
   * 3. 执行用户认证检查
   */
  useEffect(() => {
    // 检查本地存储中的cookie回退信息
    const cookieFallback = localStorage.getItem("cookieFallback");

    const isDevelopment = import.meta.env.DEV;
    // 开发环境下不重定向
    if (!isDevelopment && (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    )) {
      console.log("🔒 检测到无效cookie，重定向到登录页");
      navigate("/sign-in");
    }

    // 执行用户认证检查
    checkAuthUser();
  }, []);

  // 提供上下文值给子组件
  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 自定义Hook：使用认证上下文
export const useUserContext = () => useContext(AuthContext); 