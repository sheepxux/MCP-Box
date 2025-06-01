import { supabase } from '@/lib/supabase';
import { MCPServer, ServerCategory, ServerStatus } from '@/types';

/**
 * MCP服务器数据服务
 */
export const ServerService = {
  /**
   * 获取所有服务器
   */
  async getAllServers(): Promise<MCPServer[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort', { ascending: false })
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching servers:', error);
      return [];
    }
    
    return data.map(mapServerFromDB);
  },
  
  /**
   * 获取精选服务器
   */
  async getFeaturedServers(): Promise<MCPServer[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_featured', true)
      .order('sort', { ascending: false })
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching featured servers:', error);
      return [];
    }
    
    return data.map(mapServerFromDB);
  },
  
  /**
   * 按分类获取服务器
   */
  async getServersByCategory(category: ServerCategory): Promise<MCPServer[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('category', category)
      .order('sort', { ascending: false })
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error(`Error fetching servers by category ${category}:`, error);
      return [];
    }
    
    return data.map(mapServerFromDB);
  },
  
  /**
   * 通过ID获取服务器
   */
  async getServerById(id: string): Promise<MCPServer | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error(`Error fetching server with ID ${id}:`, error);
      return null;
    }
    
    return mapServerFromDB(data);
  },
  
  /**
   * 搜索服务器
   */
  async searchServers(query: string): Promise<MCPServer[]> {
    // 注意：这需要在Supabase中设置全文搜索索引
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .or(`name.ilike.%${query}%,title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('sort', { ascending: false })
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error(`Error searching servers with query "${query}":`, error);
      return [];
    }
    
    return data.map(mapServerFromDB);
  },
  
  /**
   * 创建新服务器
   */
  async createServer(server: Omit<MCPServer, 'id' | 'createdAt' | 'updatedAt'>): Promise<MCPServer | null> {
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        name: server.name,
        title: server.title,
        description: server.description,
        repository_url: server.repositoryUrl,
        website_url: server.websiteUrl,
        category: server.category,
        tags: server.tags,
        is_featured: server.isFeatured,
        status: server.status,
        sort: server.sort
      }])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating server:', error);
      return null;
    }
    
    return mapServerFromDB(data);
  },
  
  /**
   * 更新服务器
   */
  async updateServer(id: string, updates: Partial<MCPServer>): Promise<MCPServer | null> {
    const updateData: any = {};
    
    // 映射驼峰命名到下划线命名
    if (updates.name) updateData.name = updates.name;
    if (updates.title) updateData.title = updates.title;
    if (updates.description) updateData.description = updates.description;
    if (updates.repositoryUrl !== undefined) updateData.repository_url = updates.repositoryUrl;
    if (updates.websiteUrl !== undefined) updateData.website_url = updates.websiteUrl;
    if (updates.category) updateData.category = updates.category;
    if (updates.tags) updateData.tags = updates.tags;
    if (updates.isFeatured !== undefined) updateData.is_featured = updates.isFeatured;
    if (updates.status) updateData.status = updates.status;
    if (updates.sort !== undefined) updateData.sort = updates.sort;
    
    const { data, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error(`Error updating server with ID ${id}:`, error);
      return null;
    }
    
    return mapServerFromDB(data);
  }
};

/**
 * 将数据库记录映射到应用类型
 */
function mapServerFromDB(dbRecord: any): MCPServer {
  return {
    id: dbRecord.id,
    name: dbRecord.name,
    title: dbRecord.title,
    description: dbRecord.description,
    repositoryUrl: dbRecord.repository_url,
    websiteUrl: dbRecord.website_url,
    category: dbRecord.category,
    tags: dbRecord.tags,
    isFeatured: dbRecord.is_featured,
    status: dbRecord.status as ServerStatus,
    sort: dbRecord.sort,
    createdAt: dbRecord.created_at,
    updatedAt: dbRecord.updated_at
  };
}

export default ServerService;
