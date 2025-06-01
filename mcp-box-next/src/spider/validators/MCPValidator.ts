import { MCPValidationResult } from '../types';

/**
 * MCP协议验证器
 * 负责验证服务器是否实现了MCP协议及其兼容性
 */
export class MCPValidator {
  private options: MCPValidatorOptions;
  
  constructor(options?: Partial<MCPValidatorOptions>) {
    this.options = {
      timeout: 10000, // 10秒超时
      retries: 3,     // 重试3次
      concurrency: 5, // 同时验证5个服务器
      ...options
    };
  }
  
  /**
   * 验证单个MCP服务器
   */
  public async validateServer(serverUrl: string): Promise<MCPValidationResult> {
    console.log(`Validating MCP server: ${serverUrl}`);
    
    const startTime = Date.now();
    let attempts = 0;
    
    while (attempts < this.options.retries) {
      attempts++;
      
      try {
        // 检查是否实现了MCP协议的基本能力
        const isValid = await this.checkMCPCompatibility(serverUrl);
        const responseTime = Date.now() - startTime;
        
        if (isValid) {
          // 如果有效，获取服务器能力和版本
          const capabilities = await this.getMCPCapabilities(serverUrl);
          const version = await this.getMCPVersion(serverUrl);
          
          return {
            serverUrl,
            isValid: true,
            protocol: 'mcp',
            version,
            capabilities,
            responseTime,
            statusCode: 200,
            validatedAt: new Date(),
            metadata: {}
          };
        } else {
          return {
            serverUrl,
            isValid: false,
            protocol: 'unknown',
            responseTime,
            statusCode: 404,
            errorMessage: 'Not a valid MCP server',
            validatedAt: new Date(),
            metadata: {}
          };
        }
      } catch (error) {
        console.error(`Attempt ${attempts} failed for ${serverUrl}:`, error);
        
        // 最后一次尝试失败，返回错误结果
        if (attempts >= this.options.retries) {
          return {
            serverUrl,
            isValid: false,
            protocol: 'unknown',
            responseTime: Date.now() - startTime,
            statusCode: 500,
            errorMessage: error instanceof Error ? error.message : String(error),
            validatedAt: new Date(),
            metadata: {}
          };
        }
        
        // 等待一段时间再重试
        await this.delay(1000 * attempts); // 逐渐增加重试间隔
      }
    }
    
    // 这里不应该到达，但为了类型安全添加
    throw new Error('Unexpected validation flow');
  }
  
  /**
   * 批量验证多个服务器
   */
  public async validateServers(serverUrls: string[]): Promise<MCPValidationResult[]> {
    console.log(`Validating ${serverUrls.length} MCP servers with concurrency ${this.options.concurrency}`);
    
    const results: MCPValidationResult[] = [];
    const chunks = this.chunkArray(serverUrls, this.options.concurrency);
    
    for (const chunk of chunks) {
      const chunkPromises = chunk.map(url => this.validateServer(url));
      const chunkResults = await Promise.all(chunkPromises);
      results.push(...chunkResults);
    }
    
    return results;
  }
  
  /**
   * 检查服务器是否实现了MCP协议
   * 这是一个模拟实现，实际应该发送MCP请求并检查响应
   */
  private async checkMCPCompatibility(serverUrl: string): Promise<boolean> {
    // 模拟实现：检查服务器的MCP兼容性
    // 在实际实现中，应该发送MCP握手请求并验证响应
    
    // 由于这是演示，我们假设带有mcp的URL都是有效的
    return serverUrl.includes('mcp') || Math.random() > 0.3;
  }
  
  /**
   * 获取MCP服务器支持的能力
   * 这是一个模拟实现，实际应该查询服务器的能力
   */
  private async getMCPCapabilities(serverUrl: string): Promise<string[]> {
    // 模拟实现：返回一些常见的MCP能力
    const commonCapabilities = ['resources', 'tools', 'prompts'];
    const extraCapabilities = ['sampling', 'logging'];
    
    // 随机选择一些能力
    return commonCapabilities.concat(
      extraCapabilities.filter(() => Math.random() > 0.5)
    );
  }
  
  /**
   * 获取MCP服务器的协议版本
   * 这是一个模拟实现，实际应该查询服务器的版本
   */
  private async getMCPVersion(serverUrl: string): Promise<string> {
    // 模拟实现：返回一个版本号
    const versions = ['1.0', '1.1', '1.2'];
    return versions[Math.floor(Math.random() * versions.length)];
  }
  
  /**
   * 辅助方法：延迟执行
   */
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * 辅助方法：将数组分成多个小数组
   */
  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}

/**
 * MCP验证器配置选项
 */
export interface MCPValidatorOptions {
  timeout: number;
  retries: number;
  concurrency: number;
}

export default MCPValidator;
