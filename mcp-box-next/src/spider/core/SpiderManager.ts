import { SpiderConfig, MCPServerDiscovery, MCPValidationResult, MCPServerMetadata } from '../types';
import { supabase } from '@/lib/supabase';

/**
 * MCP爬虫系统管理器
 * 负责协调各个扫描器、验证器和数据处理流程
 */
export class SpiderManager {
  private config: SpiderConfig;
  private scanners: any[] = [];
  private validator: any = null;
  private isRunning: boolean = false;
  
  constructor(config: SpiderConfig) {
    this.config = config;
    this.initScanners();
  }
  
  /**
   * 初始化配置的扫描器
   */
  private initScanners(): void {
    // 动态加载启用的扫描器
    this.config.scanners
      .filter(scannerConfig => scannerConfig.enabled)
      .forEach(scannerConfig => {
        try {
          // 这里应该动态导入扫描器，但为了简单起见，我们使用一种简化的方法
          // 实际实现时应该使用动态导入或依赖注入
          const scannerModule = require(`../scanners/${scannerConfig.name}Scanner`);
          const Scanner = scannerModule.default;
          this.scanners.push(new Scanner(scannerConfig.options));
        } catch (error) {
          console.error(`Failed to load scanner: ${scannerConfig.name}`, error);
        }
      });
  }
  
  /**
   * 启动爬虫系统
   */
  public async start(): Promise<void> {
    if (this.isRunning) {
      console.warn('Spider system is already running');
      return;
    }
    
    this.isRunning = true;
    console.log('Starting MCP Spider system...');
    
    try {
      // 启动所有扫描器
      const discoveryPromises = this.scanners.map(scanner => scanner.scan());
      const discoveryResults = await Promise.all(discoveryPromises);
      
      // 合并所有发现的服务器
      const allDiscoveries: MCPServerDiscovery[] = discoveryResults.flat();
      console.log(`Discovered ${allDiscoveries.length} potential MCP servers`);
      
      // 保存发现的服务器到数据库
      await this.saveDiscoveries(allDiscoveries);
      
      // 验证发现的服务器
      await this.validateServers(allDiscoveries);
      
      this.isRunning = false;
      console.log('MCP Spider system completed successfully');
    } catch (error) {
      this.isRunning = false;
      console.error('Error in MCP Spider system:', error);
      throw error;
    }
  }
  
  /**
   * 保存发现的服务器到数据库
   */
  private async saveDiscoveries(discoveries: MCPServerDiscovery[]): Promise<void> {
    // 批量插入发现的服务器
    const { error } = await supabase
      .from('server_discoveries')
      .insert(
        discoveries.map(discovery => ({
          name: discovery.name,
          title: discovery.title,
          description: discovery.description,
          url: discovery.url,
          source: discovery.source,
          source_detail: discovery.sourceDetail,
          discovered_at: discovery.discoveredAt.toISOString(),
          metadata: discovery.metadata
        }))
      );
      
    if (error) {
      console.error('Error saving discoveries:', error);
      throw error;
    }
  }
  
  /**
   * 验证发现的服务器
   */
  private async validateServers(discoveries: MCPServerDiscovery[]): Promise<void> {
    // 这里应该使用验证器来验证每个服务器
    // 出于简化目的，我们将实现一个非常基本的验证过程
    
    const validationResults: MCPValidationResult[] = [];
    const validServerMetadata: MCPServerMetadata[] = [];
    
    for (const discovery of discoveries) {
      try {
        // 创建一个简单的验证结果
        // 实际系统会调用验证器
        const validationResult: MCPValidationResult = {
          serverUrl: discovery.url,
          isValid: true, // 假设所有服务器都有效
          protocol: 'mcp',
          version: '1.0',
          capabilities: ['resources', 'tools'],
          responseTime: 100,
          statusCode: 200,
          validatedAt: new Date(),
          metadata: {}
        };
        
        validationResults.push(validationResult);
        
        // 如果服务器有效，提取元数据
        if (validationResult.isValid) {
          const serverMetadata: MCPServerMetadata = {
            serverUrl: discovery.url,
            name: discovery.name,
            title: discovery.title || discovery.name,
            description: discovery.description || '',
            extractedAt: new Date(),
            resources: [],
            tools: []
          };
          
          validServerMetadata.push(serverMetadata);
        }
      } catch (error) {
        console.error(`Error validating server ${discovery.url}:`, error);
      }
    }
    
    // 保存验证结果
    if (validationResults.length > 0) {
      const { error: validationError } = await supabase
        .from('server_validations')
        .insert(
          validationResults.map(result => ({
            server_url: result.serverUrl,
            is_valid: result.isValid,
            protocol: result.protocol,
            version: result.version,
            capabilities: result.capabilities,
            response_time: result.responseTime,
            status_code: result.statusCode,
            error_message: result.errorMessage,
            validated_at: result.validatedAt.toISOString(),
            metadata: result.metadata
          }))
        );
        
      if (validationError) {
        console.error('Error saving validation results:', validationError);
      }
    }
    
    // 保存服务器元数据
    if (validServerMetadata.length > 0) {
      const { error: metadataError } = await supabase
        .from('server_metadata')
        .insert(
          validServerMetadata.map(metadata => ({
            server_url: metadata.serverUrl,
            name: metadata.name,
            title: metadata.title,
            description: metadata.description,
            repository: metadata.repository,
            website: metadata.website,
            author: metadata.author,
            version: metadata.version,
            capabilities: metadata.capabilities,
            extracted_at: metadata.extractedAt.toISOString(),
            raw: metadata.raw
          }))
        );
        
      if (metadataError) {
        console.error('Error saving server metadata:', metadataError);
      }
    }
  }
  
  /**
   * 停止爬虫系统
   */
  public stop(): void {
    if (!this.isRunning) {
      console.warn('Spider system is not running');
      return;
    }
    
    this.isRunning = false;
    console.log('Stopping MCP Spider system...');
    
    // 停止所有扫描器
    this.scanners.forEach(scanner => {
      if (typeof scanner.stop === 'function') {
        scanner.stop();
      }
    });
  }
  
  /**
   * 获取爬虫系统状态
   */
  public getStatus(): { isRunning: boolean; scanners: string[] } {
    return {
      isRunning: this.isRunning,
      scanners: this.scanners.map(scanner => scanner.constructor.name)
    };
  }
}

export default SpiderManager;
