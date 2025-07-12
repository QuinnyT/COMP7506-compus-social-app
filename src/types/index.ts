// 导航链接类型
export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

// 用户相关类型
export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
  campus?: string; // 校区
  phone?: string; // 手机号
};

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
  campus?: string;
  phone?: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
  campus?: string;
  phone?: string;
};

// 帖子相关类型
export type PostType = 'share' | 'event' | 'marketplace';

export type INewPost = {
  userId: string;
  type: PostType;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
  // 活动相关字段
  eventTitle?: string;
  eventTime?: string;
  eventLocation?: string;
  eventCapacity?: number;
  // 二手交易相关字段
  itemName?: string;
  itemPrice?: number;
  itemCondition?: string;
  itemDescription?: string;
};

export type IUpdatePost = {
  postId: string;
  type: PostType;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
  // 活动相关字段
  eventTitle?: string;
  eventTime?: string;
  eventLocation?: string;
  eventCapacity?: number;
  // 二手交易相关字段
  itemName?: string;
  itemPrice?: number;
  itemCondition?: string;
  itemDescription?: string;
};

// 聊天相关类型
export type IMessage = {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image';
  timestamp: Date;
  isRead: boolean;
};

export type IChat = {
  id: string;
  participants: string[];
  lastMessage?: IMessage;
  unreadCount: number;
  updatedAt: Date;
};

// 评论相关类型
export type IComment = {
  id: string;
  postId: string;
  userId: string;
  content: string;
  parentId?: string; // 二级评论
  timestamp: Date;
};

// 校区类型
export type ICampus = {
  id: string;
  name: string;
  code: string;
}; 