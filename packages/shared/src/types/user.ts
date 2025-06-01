/**
 * 用户接口定义
 */
export interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

/**
 * 用户角色枚举
 */
export type UserRole = 'admin' | 'moderator' | 'user' | 'guest';

/**
 * 用户偏好设置
 */
export interface UserPreferences {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: boolean;
  serverListView: 'grid' | 'list';
}

/**
 * 用户评分接口
 */
export interface UserRating {
  id: string;
  userId: string;
  serverId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: string;
  updatedAt: string;
}
