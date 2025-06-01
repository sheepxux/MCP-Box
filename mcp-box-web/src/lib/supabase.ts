import { createClient } from '@supabase/supabase-js';

// 通常这些值会从环境变量中获取
// 在生产环境中，请确保使用环境变量
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 类型定义
export type Tables = {
  projects: {
    id: string;
    name: string;
    title: string;
    description: string;
    repository_url: string | null;
    website_url: string | null;
    category: string;
    tags: string[];
    is_featured: boolean;
    status: 'active' | 'inactive' | 'pending';
    sort: number;
    created_at: string;
    updated_at: string;
  };
  server_tools: {
    id: string;
    project_id: string;
    name: string;
    description: string;
    type: 'resource' | 'tool' | 'prompt';
    uri_template: string | null;
    created_at: string;
    updated_at: string;
  };
  resources: {
    id: string;
    project_id: string;
    uri: string;
    type: string;
    content_type: string | null;
    size: number | null;
    created_at: string;
    updated_at: string;
  };
  health_checks: {
    id: string;
    project_id: string;
    status: 'up' | 'down' | 'degraded';
    response_time: number;
    last_checked_at: string;
    created_at: string;
  };
};
