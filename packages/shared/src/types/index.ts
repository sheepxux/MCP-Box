/**
 * MCP服务器接口定义
 */
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

/**
 * MCP服务器工具接口
 */
export interface MCPTool {
  id: string;
  serverId: string;
  name: string;
  description: string;
  schema: Record<string, any>;
}

/**
 * MCP服务器资源接口
 */
export interface MCPResource {
  id: string;
  serverId: string;
  uri: string;
  type: string;
  metadata: Record<string, any>;
}

/**
 * 爬虫系统配置接口
 */
export interface SpiderConfig {
  scanners: ScannerConfig[];
}

/**
 * 扫描器配置接口
 */
export interface ScannerConfig {
  name: string;
  enabled: boolean;
  schedule: string;
  options: Record<string, any>;
}

/**
 * 扫描结果接口
 */
export interface ScanResult {
  scannerId: string;
  timestamp: string;
  foundServers: MCPServer[];
  stats: {
    totalFound: number;
    newFound: number;
    updatedServers: number;
    errors: number;
  };
}
