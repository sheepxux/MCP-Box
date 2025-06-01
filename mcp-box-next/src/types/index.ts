export interface MCPServer {
  id: string;
  name: string;
  title: string;
  description: string;
  repositoryUrl: string | null;
  websiteUrl: string | null;
  category: string;
  tags: string[];
  isFeatured: boolean;
  status: 'active' | 'inactive' | 'pending';
  sort: number;
  createdAt: string;
  updatedAt: string;
}

export interface ServerTool {
  id: string;
  projectId: string;
  name: string;
  description: string;
  type: 'resource' | 'tool' | 'prompt';
  uriTemplate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  projectId: string;
  uri: string;
  type: string;
  contentType: string | null;
  size: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface HealthCheck {
  id: string;
  projectId: string;
  status: 'up' | 'down' | 'degraded';
  responseTime: number;
  lastCheckedAt: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  role: 'user' | 'admin' | 'moderator';
  createdAt: string;
}

export interface Rating {
  id: string;
  userId: string;
  projectId: string;
  score: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export type ServerCategory = 
  | 'file-system'
  | 'database'
  | 'development'
  | 'ai'
  | 'productivity'
  | 'communication'
  | 'search'
  | 'other';

export type ServerStatus = 'active' | 'inactive' | 'pending' | 'deprecated';

export type ServerSortOption = 
  | 'featured'
  | 'newest'
  | 'oldest'
  | 'highest-rated'
  | 'most-popular';
