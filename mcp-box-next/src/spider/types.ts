/**
 * MCP爬虫系统类型定义
 */

export interface MCPServerDiscovery {
  name: string;
  title?: string;
  description?: string;
  url: string;
  source: DiscoverySource;
  sourceDetail: string;
  discoveredAt: Date;
  metadata?: Record<string, any>;
}

export interface MCPValidationResult {
  serverUrl: string;
  isValid: boolean;
  protocol: string;
  version?: string;
  capabilities?: string[];
  responseTime?: number;
  statusCode?: number;
  errorMessage?: string;
  validatedAt: Date;
  metadata?: Record<string, any>;
}

export interface MCPServerMetadata {
  serverUrl: string;
  name?: string;
  title?: string;
  description?: string;
  repository?: string;
  website?: string;
  author?: string;
  version?: string;
  capabilities?: string[];
  resources?: MCPResource[];
  tools?: MCPTool[];
  prompts?: MCPPrompt[];
  extractedAt: Date;
  raw?: Record<string, any>;
}

export interface MCPResource {
  uri: string;
  type: string;
  contentType?: string;
  size?: number;
}

export interface MCPTool {
  name: string;
  description?: string;
  parameters?: Record<string, any>;
}

export interface MCPPrompt {
  name: string;
  description?: string;
  template?: string;
}

export type DiscoverySource = 
  | 'github'
  | 'website'
  | 'api'
  | 'community'
  | 'manual'
  | 'official';

export interface ScannerConfig {
  name: string;
  enabled: boolean;
  schedule: string; // cron表达式
  options?: Record<string, any>;
}

export interface ValidatorConfig {
  timeout: number;
  retries: number;
  concurrency: number;
}

export interface SpiderConfig {
  scanners: ScannerConfig[];
  validator: ValidatorConfig;
  storage: {
    type: 'supabase' | 'local';
    options?: Record<string, any>;
  };
}
