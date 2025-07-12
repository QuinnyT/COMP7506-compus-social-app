# 校园社交应用 (Campus Social App)

一个专为香港大学生设计的社交平台，支持分享、活动组织和二手交易。

## 🚀 功能特性

### 模块1：用户与认证
- ✅ 邮箱登录验证
- ✅ 学校邮箱验证身份
- ✅ 头像、昵称设置
- ✅ 校区选择
- ❌ 手机号+验证码登录（待开发）
- ❌ 条款勾选框（待开发）

### 模块2：核心内容与互动
- ✅ 首页Feed显示
- ✅ 帖子发布（文字+图片）
- ✅ 帖子详情页
- ✅ 用户资料页
- ❌ 顶部分类Tab（待开发）
- ❌ 不同类型帖子（活动、二手）（待开发）
- ❌ 私信按钮（待开发）
- ❌ 评论系统（待开发）

### 模块3：即时通讯（IM）
- ❌ 聊天列表（待开发）
- ❌ 聊天窗口（待开发）
- ❌ 实时消息传输（待开发）

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS + shadcn/ui
- **状态管理**: React Query + Context API
- **路由**: React Router DOM
- **表单**: React Hook Form + Zod
- **后端**: Appwrite
- **实时通信**: WebSocket（计划中）

## 📦 项目结构

```
campus-social-app/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── ui/             # UI基础组件
│   │   ├── shared/         # 共享组件
│   │   └── forms/          # 表单组件
│   ├── _auth/              # 认证相关页面
│   ├── _root/              # 主应用页面
│   ├── context/            # React Context
│   ├── lib/                # 工具库
│   │   ├── appwrite/       # Appwrite配置和API
│   │   ├── react-query/    # React Query配置
│   │   └── utils.ts        # 工具函数
│   ├── types/              # TypeScript类型定义
│   ├── constants/          # 常量定义
│   └── globals.css         # 全局样式
├── public/                 # 静态资源
└── package.json           # 项目配置
```

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
创建 `.env.local` 文件：
```bash
# Appwrite 配置
VITE_APPWRITE_URL=your_appwrite_url
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_STORAGE_ID=your_storage_id
VITE_APPWRITE_USER_COLLECTION_ID=your_user_collection_id
VITE_APPWRITE_POST_COLLECTION_ID=your_post_collection_id
VITE_APPWRITE_SAVES_COLLECTION_ID=your_saves_collection_id
VITE_APPWRITE_CHAT_COLLECTION_ID=your_chat_collection_id
VITE_APPWRITE_MESSAGE_COLLECTION_ID=your_message_collection_id
VITE_APPWRITE_COMMENT_COLLECTION_ID=your_comment_collection_id

# 开发调试配置
VITE_FORCE_LOGIN=true
```

### 3. 启动开发服务器
```bash
npm run dev
```

## 🔧 开发指南

### 强制登录（开发模式）
在 `.env.local` 中设置 `VITE_FORCE_LOGIN=true` 可以跳过认证，直接使用模拟用户数据。

### 代码规范
- 使用 TypeScript 进行类型检查
- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化

### 组件开发
- 新组件放在 `src/components/` 目录下
- 页面组件放在 `src/_root/pages/` 目录下
- 认证相关页面放在 `src/_auth/` 目录下

## 📋 开发计划

### 第一阶段：完善认证系统
- [ ] 手机号+验证码登录
- [ ] 学校邮箱验证
- [ ] 校区选择功能
- [ ] 条款勾选框

### 第二阶段：实现分类系统
- [ ] 顶部分类Tab
- [ ] 不同类型帖子支持
- [ ] 分类发布功能

### 第三阶段：开发即时通讯
- [ ] 聊天列表页面
- [ ] 聊天窗口组件
- [ ] 实时消息传输

### 第四阶段：添加评论系统
- [ ] 评论功能
- [ ] 二级评论支持
- [ ] 私信按钮

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 邮箱：your-email@example.com
- 项目Issues：[GitHub Issues](https://github.com/your-repo/campus-social-app/issues)
