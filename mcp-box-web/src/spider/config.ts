import { SpiderConfig } from './types';

/**
 * MCP爬虫系统配置
 */
const spiderConfig: SpiderConfig = {
  scanners: [
    {
      name: 'Github',
      enabled: true,
      schedule: '0 0 */12 * * *', // 每12小时运行一次
      options: {
        searchKeywords: [
          'mcp-server', 
          'model-context-protocol', 
          'mcp implementation',
          'mcp client',
          'llm context provider'
        ],
        repoLimit: 100,
        searchLanguages: ['typescript', 'javascript', 'python', 'rust', 'go'],
        searchTopics: ['mcp', 'model-context-protocol', 'ai-tools', 'llm'],
        includeForked: false,
        includeArchived: false,
        minStars: 5
      }
    },
    {
      name: 'Website',
      enabled: true,
      schedule: '0 0 */24 * * *', // 每24小时运行一次
      options: {
        targetUrls: [
          'https://modelcontextprotocol.io',
          'https://mcp.so',
          'https://modelscope.cn/mcp',
          'https://aimcp.info'
        ],
        maxPagesToVisit: 200,
        maxDepth: 3,
        crawlDelay: 1000 // 1秒延迟
      }
    },
    {
      name: 'Official',
      enabled: true,
      schedule: '0 0 */6 * * *', // 每6小时运行一次
      options: {
        officialRepoUrl: 'https://github.com/model-context-protocol/registry',
        officialApiUrl: 'https://api.modelcontextprotocol.io/registry'
      }
    }
  ],
  validator: {
    timeout: 15000, // 15秒超时
    retries: 3,
    concurrency: 10
  },
  storage: {
    type: 'supabase',
    options: {
      // Supabase存储选项
    }
  }
};

export default spiderConfig;
