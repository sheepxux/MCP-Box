import { MCPServerDiscovery, DiscoverySource } from '../types';

/**
 * GitHub仓库扫描器
 * 负责扫描GitHub仓库中的MCP服务器实现
 */
export class GithubScanner {
  private options: GithubScannerOptions;
  private isRunning: boolean = false;
  
  constructor(options?: Partial<GithubScannerOptions>) {
    this.options = {
      searchKeywords: ['mcp-server', 'model-context-protocol', 'mcp implementation'],
      repoLimit: 100,
      searchLanguages: ['typescript', 'javascript', 'python'],
      searchTopics: ['mcp', 'model-context-protocol', 'ai-tools'],
      includeForked: false,
      includeArchived: false,
      minStars: 0,
      ...options
    };
  }
  
  /**
   * 扫描GitHub仓库寻找MCP服务器实现
   */
  public async scan(): Promise<MCPServerDiscovery[]> {
    if (this.isRunning) {
      console.warn('GitHub scanner is already running');
      return [];
    }
    
    this.isRunning = true;
    console.log('Starting GitHub repository scan...');
    
    try {
      const discoveries: MCPServerDiscovery[] = [];
      
      // 为每个关键词构建查询
      for (const keyword of this.options.searchKeywords) {
        // 构建GitHub搜索查询
        const query = this.buildSearchQuery(keyword);
        
        // 模拟从GitHub API获取结果
        // 实际实现应该使用GitHub API或octokit
        const searchResults = await this.mockGithubApiSearch(query);
        
        // 处理搜索结果
        for (const repo of searchResults) {
          // 检查是否是MCP服务器实现
          if (await this.isMCPServerImplementation(repo)) {
            const discovery: MCPServerDiscovery = {
              name: repo.name,
              title: repo.description || repo.name,
              description: repo.description || '',
              url: repo.url,
              source: 'github' as DiscoverySource,
              sourceDetail: `GitHub Repository: ${repo.owner}/${repo.name}`,
              discoveredAt: new Date(),
              metadata: {
                stars: repo.stars,
                forks: repo.forks,
                owner: repo.owner,
                language: repo.language,
                topics: repo.topics,
                lastUpdated: repo.lastUpdated
              }
            };
            
            discoveries.push(discovery);
          }
        }
      }
      
      this.isRunning = false;
      console.log(`GitHub scan completed. Found ${discoveries.length} potential MCP servers.`);
      
      return discoveries;
    } catch (error) {
      this.isRunning = false;
      console.error('Error scanning GitHub repositories:', error);
      throw error;
    }
  }
  
  /**
   * 构建GitHub搜索查询
   */
  private buildSearchQuery(keyword: string): string {
    const parts = [keyword];
    
    // 添加语言过滤
    if (this.options.searchLanguages.length > 0) {
      parts.push(`language:${this.options.searchLanguages.join(' language:')}`);
    }
    
    // 添加主题过滤
    if (this.options.searchTopics.length > 0) {
      parts.push(`topic:${this.options.searchTopics.join(' topic:')}`);
    }
    
    // 星级过滤
    if (this.options.minStars > 0) {
      parts.push(`stars:>=${this.options.minStars}`);
    }
    
    // 排除归档的仓库
    if (!this.options.includeArchived) {
      parts.push('archived:false');
    }
    
    // 排除分叉的仓库
    if (!this.options.includeForked) {
      parts.push('fork:false');
    }
    
    return parts.join(' ');
  }
  
  /**
   * 模拟GitHub API搜索
   * 在实际实现中，这应该使用GitHub API或octokit客户端
   */
  private async mockGithubApiSearch(query: string): Promise<GitHubRepo[]> {
    console.log(`Searching GitHub with query: ${query}`);
    
    // 模拟一些示例仓库
    // 在实际实现中，这将来自GitHub API
    return [
      {
        name: 'mcp-server-reference',
        owner: 'mcp-org',
        description: 'Reference implementation of the Model Context Protocol server',
        url: 'https://github.com/mcp-org/mcp-server-reference',
        stars: 120,
        forks: 25,
        language: 'typescript',
        topics: ['mcp', 'ai', 'llm'],
        lastUpdated: '2025-05-20T12:00:00Z'
      },
      {
        name: 'file-system-mcp',
        owner: 'mcp-community',
        description: 'A file system MCP server implementation',
        url: 'https://github.com/mcp-community/file-system-mcp',
        stars: 85,
        forks: 12,
        language: 'typescript',
        topics: ['mcp', 'file-system'],
        lastUpdated: '2025-05-15T10:30:00Z'
      },
      {
        name: 'postgres-mcp-connector',
        owner: 'data-tools',
        description: 'PostgreSQL connector for MCP',
        url: 'https://github.com/data-tools/postgres-mcp-connector',
        stars: 67,
        forks: 8,
        language: 'typescript',
        topics: ['mcp', 'database', 'postgresql'],
        lastUpdated: '2025-05-10T15:45:00Z'
      },
      {
        name: 'mcp-web-navigator',
        owner: 'browser-tools',
        description: 'Web browsing capabilities for MCP',
        url: 'https://github.com/browser-tools/mcp-web-navigator',
        stars: 92,
        forks: 14,
        language: 'javascript',
        topics: ['mcp', 'web', 'browser'],
        lastUpdated: '2025-05-05T08:20:00Z'
      },
      {
        name: 'py-mcp-server',
        owner: 'python-ai',
        description: 'Python implementation of MCP server',
        url: 'https://github.com/python-ai/py-mcp-server',
        stars: 110,
        forks: 18,
        language: 'python',
        topics: ['mcp', 'ai', 'python'],
        lastUpdated: '2025-04-28T14:10:00Z'
      }
    ];
  }
  
  /**
   * 检查仓库是否实现了MCP服务器
   * 在实际实现中，这应该分析仓库内容或README
   */
  private async isMCPServerImplementation(repo: GitHubRepo): Promise<boolean> {
    // 简单检查：名称或描述包含MCP相关关键词
    const nameAndDesc = `${repo.name} ${repo.description || ''}`.toLowerCase();
    
    // MCP相关关键词
    const mcpKeywords = [
      'mcp',
      'model context protocol',
      'model-context-protocol',
      'mcp server',
      'mcp implementation'
    ];
    
    // 检查关键词是否存在
    const hasMcpKeyword = mcpKeywords.some(keyword => 
      nameAndDesc.includes(keyword.toLowerCase())
    );
    
    // 检查主题是否包含MCP相关标签
    const hasMcpTopic = repo.topics.some(topic => 
      topic.toLowerCase() === 'mcp' || 
      topic.toLowerCase() === 'model-context-protocol'
    );
    
    // 如果名称/描述有关键词或主题有MCP标签，认为是MCP实现
    return hasMcpKeyword || hasMcpTopic;
  }
  
  /**
   * 停止扫描过程
   */
  public stop(): void {
    if (!this.isRunning) {
      return;
    }
    
    this.isRunning = false;
    console.log('Stopping GitHub repository scan...');
  }
}

/**
 * GitHub扫描器配置选项
 */
export interface GithubScannerOptions {
  searchKeywords: string[];
  repoLimit: number;
  searchLanguages: string[];
  searchTopics: string[];
  includeForked: boolean;
  includeArchived: boolean;
  minStars: number;
}

/**
 * GitHub仓库信息
 */
interface GitHubRepo {
  name: string;
  owner: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  lastUpdated: string;
}

export default GithubScanner;
