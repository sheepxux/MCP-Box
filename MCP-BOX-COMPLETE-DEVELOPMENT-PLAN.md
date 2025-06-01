# MCP-Box 开发计划

- **项目名称**: MCP-Box
- **版本**: 1.0.0
- **最后更新**: 2025-05-31
- **作者**: MCP-Box 团队

## 目录

1. [项目概述](#1-项目概述)
2. [技术栈选择](#2-技术栈选择)
3. [系统架构](#3-系统架构)
4. [开发阶段与时间线](#4-开发阶段与时间线)
5. [详细开发计划](#5-详细开发计划)
6. [资源需求](#6-资源需求)
7. [监控与成功指标](#7-监控与成功指标)
8. [风险评估与缓解策略](#8-风险评估与缓解策略)
9. [附录](#9-附录)

---

## 1. 项目概述

**MCP-Box** 将成为一个世界级的MCP服务器集合平台，整合自动爬取、协议兼容性验证、社区贡献和官方同步功能，为用户提供最全面、最新的MCP服务器资源。

### 1.1 核心目标

- 构建最大规模的MCP服务器索引库
- 提供高级搜索、分类和排名功能
- 实现全自动的服务器发现和验证
- 打造活跃的MCP开发者社区
- 确保平台安全性和数据可靠性

### 1.2 项目愿景

MCP-Box 旨在成为MCP生态系统的中央枢纽，连接服务器提供者和用户，促进MCP技术的创新和应用。通过提供全面的服务器索引、高质量的元数据和活跃的社区，MCP-Box将大大降低发现和使用MCP服务器的门槛，推动AI工具和服务的普及应用。

### 1.3 业务价值

- **对用户**: 一站式发现和访问所有MCP服务器，提高工作效率
- **对开发者**: 增加MCP服务器的曝光度，获取用户反馈
- **对生态系统**: 推动标准化和最佳实践，促进MCP生态系统发展
- **对社区**: 建立知识分享和协作平台，加速创新

## 2. 技术栈选择

### 2.1 前端

- **框架**: Next.js 14+ (App Router)
- **语言**: TypeScript
- **UI库**: React 19
- **样式**: Tailwind CSS
- **状态管理**: React Context + SWR/React Query
- **组件库**: Headless UI/Radix UI
- **图表与可视化**: Chart.js/D3.js
- **认证UI**: NextAuth.js
- **表单处理**: React Hook Form + Zod

### 2.2 后端

- **框架**: Next.js API Routes + Node.js
- **数据库**: Supabase (PostgreSQL)
- **认证**: NextAuth.js
- **API**: REST + tRPC
- **缓存**: Redis
- **搜索引擎**: Elasticsearch/Meilisearch
- **文件存储**: Supabase Storage
- **消息队列**: Redis/Bull

### 2.3 爬虫系统

- **框架**: Node.js
- **爬虫工具**: Playwright
- **调度**: Temporal.io
- **数据处理**: Node-stream
- **HTML解析**: Cheerio
- **代理管理**: Bright Data/Oxylabs
- **限速控制**: Bottleneck
- **分布式处理**: Redis/Bull

### 2.4 部署与运维

- **前端部署**: Vercel
- **后端/API**: Vercel Serverless Functions
- **爬虫服务**: AWS EC2 或 Docker + Kubernetes
- **监控**: Sentry + Vercel Analytics
- **CI/CD**: GitHub Actions
- **域名与DNS**: Cloudflare
- **CDN**: Cloudflare/Vercel Edge Network
- **SSL**: Let's Encrypt/Cloudflare

## 3. 系统架构

MCP-Box 将由四个核心系统组成，各系统之间通过API和消息队列集成：

### 3.1 MCP爬虫系统 (MCP-Spider)

负责自动发现、验证和索引网络中的MCP服务器。

**核心组件**:
- **种子管理器**: 维护已知MCP服务器起始列表
- **探索爬虫**: 基于Playwright的网页爬取和服务器发现
- **GitHub集成器**: 监控并提取GitHub上的MCP服务器仓库
- **验证引擎**: 验证发现的服务器是否符合MCP协议
- **元数据提取器**: 提取服务器能力、工具列表等详细信息
- **调度系统**: 管理爬虫任务的优先级和频率
- **错误处理**: 处理爬取过程中的异常和重试逻辑

### 3.2 MCP收集器服务器 (MCP-Collector)

实现MCP协议的专用服务器，用于与其他MCP服务器通信和数据收集。

**核心组件**:
- **MCP客户端库**: 实现MCP协议的客户端
- **服务器探测器**: 主动连接并验证MCP服务器
- **能力索引器**: 记录服务器支持的能力和工具
- **健康监视器**: 监控服务器在线状态和性能
- **资源索引器**: 收集和索引服务器提供的资源
- **工具索引器**: 收集和索引服务器提供的工具
- **版本跟踪器**: 跟踪服务器版本变更

### 3.3 Web平台 (MCP-Web)

用户访问的主要网站，提供服务器浏览、搜索和社区功能。

**核心组件**:
- **服务器目录**: 浏览和搜索MCP服务器
- **详情页面**: 展示服务器详细信息和能力
- **用户认证**: 账户注册和管理
- **社区提交**: 开发者提交新服务器的界面
- **评分和评论**: 用户反馈系统
- **API接口**: 供第三方应用调用的API
- **文档系统**: MCP协议和服务器使用指南
- **通知系统**: 更新和事件通知
- **管理后台**: 内容审核和系统管理

### 3.4 数据同步系统 (MCP-Sync)

确保与官方MCP仓库和其他来源的数据同步。

**核心组件**:
- **官方同步器**: 与modelcontextprotocol/servers仓库同步
- **冲突解决器**: 处理数据冲突和版本控制
- **变更监控**: 监控官方规范和实现的变化
- **数据清洗**: 确保数据质量和一致性
- **批量导入/导出**: 支持数据批量操作
- **历史记录**: 维护数据变更历史
- **备份系统**: 定期数据备份

### 3.5 系统集成图

```
+----------------+        +----------------+
| MCP-Spider     |<------>| MCP-Collector  |
| (爬虫系统)      |        | (收集器服务器)  |
+----------------+        +----------------+
        |                         |
        v                         v
+----------------+        +----------------+
| 消息队列/数据库 |<------>| MCP-Sync      |
|                |        | (数据同步系统)  |
+----------------+        +----------------+
        ^                         ^
        |                         |
        v                         v
+--------------------------------------------------+
|                   MCP-Web                        |
|              (Web平台和API)                      |
+--------------------------------------------------+
                    ^
                    |
                    v
+--------------------------------------------------+
|                   用户                           |
+--------------------------------------------------+
```

## 4. 开发阶段与时间线

项目计划在22周内完成从启动到正式发布，分为四个主要阶段：

### 4.1 阶段一：基础设施与核心功能 (8周)

#### 周1-2：项目启动与设置
- 建立代码仓库和开发环境
- 设计数据库模式
- 实现基本的项目结构和CI/CD
- 完成技术栈选型确认和基础架构设计

#### 周3-4：MCP爬虫原型
- 开发基础爬虫框架
- 实现GitHub仓库扫描
- 开发服务器验证逻辑
- 构建种子管理器和任务调度系统

#### 周5-6：Web平台基础
- 实现用户认证
- 开发服务器列表和详情页
- 构建基本搜索功能
- 设计并实现核心UI组件

#### 周7-8：MCP收集器服务器
- 实现MCP协议客户端
- 开发服务器探测功能
- 集成数据提取和存储
- 实现基本的健康监控

### 4.2 阶段二：功能扩展与集成 (8周)

#### 周9-10：高级爬虫功能
- 实现智能发现算法
- 开发分布式爬取系统
- 实现深度元数据提取
- 构建错误处理和重试机制

#### 周11-12：社区功能
- 开发服务器提交界面
- 实现评分和评论系统
- 构建用户资料和贡献记录
- 开发通知和事件系统

#### 周13-14：数据同步系统
- 实现官方仓库同步
- 开发冲突解决机制
- 构建数据清洗管道
- 实现变更历史和版本控制

#### 周15-16：API与集成
- 设计并实现REST API
- 开发tRPC端点
- 构建第三方集成示例
- 开发API文档和客户端SDK

### 4.3 阶段三：优化与发布 (4周)

#### 周17-18：性能优化
- 数据库查询优化
- 前端性能优化
- 爬虫效率提升
- 缓存策略实现

#### 周19-20：安全与测试
- 安全审计
- 负载测试
- 用户验收测试
- 漏洞扫描和修复

#### 周21：文档与教程
- API文档
- 开发者指南
- 用户手册
- 视频教程和示例

#### 周22：公开发布
- 产品发布准备
- 营销材料
- 社区宣传
- 发布会和公告

### 4.4 阶段四：持续改进 (持续)
- 根据用户反馈添加新功能
- 扩展支持新的MCP协议版本
- 改进数据质量和覆盖范围
- 扩展合作伙伴和集成

### 4.5 项目里程碑

| 里程碑 | 时间点 | 交付物 |
|-------|-------|-------|
| M1: 项目启动 | 周2末 | 仓库设置、数据库设计、项目规划 |
| M2: 爬虫原型 | 周4末 | 基础爬虫系统、数据采集演示 |
| M3: 平台原型 | 周6末 | 基础Web界面、认证系统 |
| M4: 收集器原型 | 周8末 | MCP协议客户端、服务器探测 |
| M5: 功能完善 | 周16末 | 完整功能集、API、集成 |
| M6: 产品准备就绪 | 周20末 | 优化系统、通过测试 |
| M7: 公开发布 | 周22末 | 产品发布、文档、推广 |

## 5. 详细开发计划

### 5.1 MCP爬虫系统 (MCP-Spider)

#### 5.1.1 核心功能
1. **多源数据采集**
   - GitHub仓库爬取（官方和社区）
   - 网站扫描（已知MCP服务器提供商）
   - 现有目录同步（如mcp.so）
   - 社区提交处理

2. **智能服务器发现**
   - 链接分析和跟踪
   - 关键词和模式识别
   - 服务器指纹识别
   - 历史数据分析

3. **验证与分类**
   - MCP协议兼容性测试
   - 能力和工具提取
   - 自动分类和标签生成
   - 质量评分

#### 5.1.2 技术实现

**Playwright爬虫架构**
```typescript
// playwright爬虫示例架构
import { chromium, Browser, Page } from 'playwright';
import { DatabaseService } from '../services/database';
import { ServerValidator } from '../validators/server-validator';
import { ServerMetadataExtractor } from '../extractors/metadata-extractor';
import { config } from '../config';

export class MCPSpider {
  private browser: Browser | null = null;
  private db: DatabaseService;
  private validator: ServerValidator;
  private extractor: ServerMetadataExtractor;
  
  constructor() {
    this.db = new DatabaseService();
    this.validator = new ServerValidator();
    this.extractor = new ServerMetadataExtractor();
  }
  
  async initialize(): Promise<void> {
    this.browser = await chromium.launch({ 
      headless: true,
      timeout: config.browserTimeout,
      args: config.browserArgs
    });
    console.log('Browser initialized');
  }
  
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
  
  async discoverServers(seedUrl: string): Promise<MCPServerInfo[]> {
    console.log(`Starting discovery from: ${seedUrl}`);
    const page = await this.browser!.newPage();
    
    try {
      await page.goto(seedUrl, { 
        waitUntil: 'networkidle',
        timeout: config.pageLoadTimeout 
      });
      
      // 实现服务器发现逻辑
      const potentialServers = await this.extractPotentialServers(page);
      console.log(`Found ${potentialServers.length} potential servers`);
      
      // 验证发现的服务器
      const validatedServers = await Promise.all(
        potentialServers.map(server => this.validateAndEnrichServer(server))
      );
      
      const validServers = validatedServers.filter(server => server.isValid);
      console.log(`${validServers.length} servers validated successfully`);
      
      // 保存到数据库
      await this.saveServers(validServers);
      
      return validServers;
    } catch (error) {
      console.error(`Error discovering servers from ${seedUrl}:`, error);
      return [];
    } finally {
      await page.close();
    }
  }
  
  private async extractPotentialServers(page: Page): Promise<PotentialServerInfo[]> {
    // 从页面提取潜在的MCP服务器URL和初步信息
    const links = await page.$$eval('a[href]', (elements) => {
      return elements.map(el => ({
        url: el.getAttribute('href'),
        text: el.textContent?.trim() || '',
        context: el.closest('.card, .item, article')?.textContent?.trim() || ''
      }));
    });
    
    // 过滤和处理链接，识别可能的MCP服务器
    return links
      .filter(link => this.isPotentialMCPServer(link))
      .map(link => this.createPotentialServerInfo(link));
  }
  
  private isPotentialMCPServer(link: { url?: string, text: string, context: string }): boolean {
    if (!link.url) return false;
    
    // 判断URL是否可能是MCP服务器
    const url = link.url.toLowerCase();
    const text = link.text.toLowerCase();
    const context = link.context.toLowerCase();
    
    // URL模式匹配
    const urlPatterns = [
      /mcp[-.]?server/,
      /api\..*\/mcp/,
      /modelcontextprotocol/,
      /\/mcp[-_]?api\//
    ];
    
    // 文本内容匹配
    const textPatterns = [
      /mcp server/,
      /model context protocol/,
      /mcp compatible/,
      /mcp api/
    ];
    
    return (
      urlPatterns.some(pattern => pattern.test(url)) ||
      textPatterns.some(pattern => pattern.test(text) || pattern.test(context))
    );
  }
  
  private async validateAndEnrichServer(
    server: PotentialServerInfo
  ): Promise<MCPServerInfo> {
    try {
      // 验证是否符合MCP协议
      const validationResult = await this.validator.validate(server.url);
      
      if (!validationResult.isValid) {
        return { 
          ...server, 
          isValid: false, 
          validationError: validationResult.error 
        };
      }
      
      // 提取服务器元数据
      const metadata = await this.extractor.extract(server.url);
      
      return {
        ...server,
        ...metadata,
        isValid: true,
        lastChecked: new Date(),
        status: 'online'
      };
    } catch (error) {
      console.error(`Error validating server ${server.url}:`, error);
      return {
        ...server,
        isValid: false,
        validationError: error.message,
        lastChecked: new Date(),
        status: 'error'
      };
    }
  }
  
  private async saveServers(servers: MCPServerInfo[]): Promise<void> {
    for (const server of servers) {
      await this.db.upsertServer(server);
    }
  }
}

// 类型定义
interface PotentialServerInfo {
  url: string;
  name?: string;
  description?: string;
  source: string;
  discoveredAt: Date;
}

interface MCPServerInfo extends PotentialServerInfo {
  isValid: boolean;
  validationError?: string;
  serverInfo?: {
    name: string;
    version: string;
    description?: string;
  };
  capabilities?: Record<string, any>;
  tools?: any[];
  resources?: any[];
  status: 'online' | 'offline' | 'error';
  lastChecked: Date;
}
```

**GitHub仓库扫描器**
```typescript
import { Octokit } from '@octokit/rest';
import { PaginateInterface } from '@octokit/plugin-paginate-rest';
import { DatabaseService } from '../services/database';
import { config } from '../config';

export class GitHubScanner {
  private octokit: Octokit;
  private db: DatabaseService;
  
  constructor(githubToken: string) {
    this.octokit = new Octokit({ auth: githubToken });
    this.db = new DatabaseService();
  }
  
  async scanOfficialRepo(): Promise<void> {
    console.log('Scanning official MCP server repository');
    
    try {
      // 获取官方仓库内容
      const { data: contents } = await this.octokit.repos.getContent({
        owner: 'modelcontextprotocol',
        repo: 'servers',
        path: 'src'
      });
      
      if (!Array.isArray(contents)) {
        throw new Error('Expected directory contents array');
      }
      
      // 处理每个服务器目录
      for (const item of contents) {
        if (item.type === 'dir') {
          await this.processServerDirectory(item.name, item.path);
        }
      }
      
      console.log('Official repository scan completed');
    } catch (error) {
      console.error('Error scanning official repository:', error);
    }
  }
  
  async searchMCPRepositories(): Promise<void> {
    console.log('Searching GitHub for MCP server repositories');
    
    const searchQueries = [
      'mcp-server',
      'model context protocol server',
      'mcp server implementation',
      'modelcontextprotocol'
    ];
    
    for (const query of searchQueries) {
      try {
        await this.searchAndProcessRepos(query);
      } catch (error) {
        console.error(`Error searching for "${query}":`, error);
      }
    }
    
    console.log('GitHub repository search completed');
  }
  
  private async searchAndProcessRepos(query: string): Promise<void> {
    const paginate: PaginateInterface = this.octokit.paginate as any;
    
    const searchResults = await paginate(
      this.octokit.search.repos,
      {
        q: query,
        sort: 'updated',
        per_page: 100
      }
    );
    
    console.log(`Found ${searchResults.length} repositories for query "${query}"`);
    
    for (const repo of searchResults) {
      await this.processRepository(repo.owner.login, repo.name);
    }
  }
  
  private async processRepository(owner: string, repo: string): Promise<void> {
    console.log(`Processing repository: ${owner}/${repo}`);
    
    try {
      // 检查仓库是否为MCP服务器实现
      const isMCPServer = await this.checkIfMCPServer(owner, repo);
      
      if (!isMCPServer) {
        console.log(`Repository ${owner}/${repo} is not an MCP server implementation`);
        return;
      }
      
      // 提取服务器信息
      const serverInfo = await this.extractServerInfo(owner, repo);
      
      // 保存到数据库
      await this.db.upsertServer({
        url: `https://github.com/${owner}/${repo}`,
        name: serverInfo.name || repo,
        description: serverInfo.description,
        source: 'github',
        discoveredAt: new Date(),
        isValid: true,
        serverInfo,
        status: 'unknown',
        lastChecked: new Date()
      });
      
      console.log(`Saved server info for ${owner}/${repo}`);
    } catch (error) {
      console.error(`Error processing repository ${owner}/${repo}:`, error);
    }
  }
  
  private async checkIfMCPServer(owner: string, repo: string): Promise<boolean> {
    // 检查package.json是否包含MCP相关依赖
    try {
      const { data } = await this.octokit.repos.getContent({
        owner,
        repo,
        path: 'package.json'
      });
      
      if ('content' in data) {
        const content = Buffer.from(data.content, 'base64').toString();
        const packageJson = JSON.parse(content);
        
        const dependencies = {
          ...packageJson.dependencies,
          ...packageJson.devDependencies
        };
        
        const mcpDependencies = Object.keys(dependencies).filter(dep => 
          dep.includes('modelcontextprotocol') || 
          dep.includes('mcp-') || 
          dep === 'mcp'
        );
        
        if (mcpDependencies.length > 0) {
          return true;
        }
      }
    } catch (error) {
      // package.json可能不存在，继续检查其他文件
    }
    
    // 检查README.md是否提及MCP
    try {
      const { data } = await this.octokit.repos.getContent({
        owner,
        repo,
        path: 'README.md'
      });
      
      if ('content' in data) {
        const content = Buffer.from(data.content, 'base64').toString();
        
        if (
          content.includes('Model Context Protocol') || 
          content.includes('MCP server') ||
          content.includes('modelcontextprotocol')
        ) {
          return true;
        }
      }
    } catch (error) {
      // README.md可能不存在
    }
    
    // 搜索仓库代码
    const searchResult = await this.octokit.search.code({
      q: `repo:${owner}/${repo} "Model Context Protocol" OR "MCP server" OR "modelcontextprotocol"`,
      per_page: 1
    });
    
    return searchResult.data.total_count > 0;
  }
  
  private async extractServerInfo(owner: string, repo: string): Promise<any> {
    // 从仓库提取服务器信息
    const info: any = {
      name: repo,
      description: '',
      version: 'unknown'
    };
    
    // 获取仓库信息
    const { data: repoData } = await this.octokit.repos.get({
      owner,
      repo
    });
    
    info.description = repoData.description || '';
    
    // 尝试从package.json获取版本
    try {
      const { data } = await this.octokit.repos.getContent({
        owner,
        repo,
        path: 'package.json'
      });
      
      if ('content' in data) {
        const content = Buffer.from(data.content, 'base64').toString();
        const packageJson = JSON.parse(content);
        
        info.version = packageJson.version || 'unknown';
      }
    } catch (error) {
      // 忽略错误
    }
    
    return info;
  }
}
```

#### 5.1.3 数据流程

1. **发现阶段**
   - 从种子URL和GitHub开始爬取
   - 识别潜在的MCP服务器链接
   - 将候选服务器加入验证队列

2. **验证阶段**
   - 尝试与服务器建立MCP连接
   - 验证协议兼容性
   - 提取服务器元数据

3. **丰富阶段**
   - 提取服务器支持的能力和工具
   - 分析服务器性能特征
   - 自动生成分类和标签

4. **存储阶段**
   - 将验证通过的服务器保存到数据库
   - 更新现有服务器的信息
   - 记录验证历史

#### 5.1.4 实现计划

| 周次 | 主要任务 | 具体实现 |
|-----|---------|---------|
| 周3 | 基础框架 | 设置项目结构、实现种子管理器、基本爬虫框架 |
| 周4 | GitHub集成 | 实现GitHub API集成、仓库扫描逻辑 |
| 周9 | 智能发现 | 实现链接分析、模式识别、指纹识别 |
| 周10 | 分布式系统 | 实现任务队列、错误处理、并行爬取 |
| 周17 | 性能优化 | 爬虫效率提升、资源使用优化 |

### 5.2 MCP收集器服务器 (MCP-Collector)

#### 5.2.1 核心功能

1. **MCP协议实现**
   - 客户端连接管理
   - 消息序列化/反序列化
   - 错误处理和重试
   - 协议版本兼容性

2. **服务器探测**
   - 连接尝试和超时管理
   - 能力协商
   - 健康检查
   - 性能指标收集

3. **数据收集**
   - 元数据提取
   - 工具和资源清单
   - 服务质量评估
   - 安全性评估

#### 5.2.2 技术实现

**MCP客户端核心**
```typescript
import { McpClient, ServerCapabilities } from '@modelcontextprotocol/client';
import { DatabaseService } from '../services/database';
import { Logger } from '../utils/logger';
import { config } from '../config';

export class MCPCollector {
  private db: DatabaseService;
  private logger: Logger;
  
  constructor() {
    this.db = new DatabaseService();
    this.logger = new Logger('MCPCollector');
  }
  
  async probeServer(serverUrl: string): Promise<ServerProbeResult> {
    this.logger.info(`Probing server at ${serverUrl}`);
    
    const client = new McpClient({ 
      transport: 'http', 
      serverUrl,
      timeout: config.mcpClientTimeout
    });
    
    try {
      await client.connect();
      this.logger.info(`Connected to server at ${serverUrl}`);
      
      // 获取服务器信息
      const serverInfo = await client.getServerInfo();
      
      // 获取服务器能力
      const capabilities = await client.getCapabilities();
      this.logger.info(`Server capabilities: ${JSON.stringify(capabilities)}`);
      
      // 收集工具和资源信息
      const collectResults = await this.collectServerData(client, capabilities);
      
      // 评估服务器质量
      const qualityScore = this.evaluateServerQuality(
        serverInfo,
        capabilities, 
        collectResults
      );
      
      const result: ServerProbeResult = {
        serverUrl,
        serverInfo,
        capabilities,
        ...collectResults,
        qualityScore,
        status: 'online',
        lastChecked: new Date(),
        error: null
      };
      
      // 保存到数据库
      await this.db.upsertServerProbe(result);
      
      return result;
    } catch (error) {
      this.logger.error(`Error probing server at ${serverUrl}:`, error);
      
      const errorResult: ServerProbeResult = {
        serverUrl,
        status: 'error',
        lastChecked: new Date(),
        error: error.message
      };
      
      // 保存错误记录
      await this.db.upsertServerProbe(errorResult);
      
      return errorResult;
    } finally {
      try {
        await client.disconnect();
      } catch (error) {
        this.logger.warn(`Error disconnecting from ${serverUrl}:`, error);
      }
    }
  }
  
  private async collectServerData(
    client: McpClient,
    capabilities: ServerCapabilities
  ): Promise<ServerCollectResults> {
    const results: ServerCollectResults = {
      tools: [],
      resources: [],
      prompts: []
    };
    
    // 如果支持工具，获取工具列表
    if (capabilities.tools) {
      try {
        results.tools = await client.listTools();
        this.logger.info(`Collected ${results.tools.length} tools`);
      } catch (error) {
        this.logger.warn('Error listing tools:', error);
      }
    }
    
    // 如果支持资源，获取资源列表
    if (capabilities.resources) {
      try {
        results.resources = await client.listResources();
        this.logger.info(`Collected ${results.resources.length} resources`);
      } catch (error) {
        this.logger.warn('Error listing resources:', error);
      }
    }
    
    // 如果支持提示，获取提示列表
    if (capabilities.prompts) {
      try {
        results.prompts = await client.listPrompts();
        this.logger.info(`Collected ${results.prompts.length} prompts`);
      } catch (error) {
        this.logger.warn('Error listing prompts:', error);
      }
    }
    
    return results;
  }
  
  private evaluateServerQuality(
    serverInfo: any,
    capabilities: ServerCapabilities,
    collectResults: ServerCollectResults
  ): number {
    let score = 0;
    
    // 根据能力评分
    if (capabilities.tools) score += 1;
    if (capabilities.resources) score += 1;
    if (capabilities.prompts) score += 1;
    if (capabilities.logging) score += 0.5;
    
    // 根据数据丰富度评分
    if (collectResults.tools?.length > 0) score += Math.min(3, collectResults.tools.length / 5);
    if (collectResults.resources?.length > 0) score += Math.min(3, collectResults.resources.length / 5);
    if (collectResults.prompts?.length > 0) score += Math.min(1, collectResults.prompts.length / 3);
    
    // 服务器信息完整性评分
    if (serverInfo?.name) score += 0.5;
    if (serverInfo?.version) score += 0.5;
    if (serverInfo?.description) score += 0.5;
    
    return Math.min(10, score);
  }
}

// 类型定义
interface ServerCollectResults {
  tools: any[];
  resources: any[];
  prompts: any[];
}

interface ServerProbeResult {
  serverUrl: string;
  serverInfo?: any;
  capabilities?: ServerCapabilities;
  tools?: any[];
  resources?: any[];
  prompts?: any[];
  qualityScore?: number;
  status: 'online' | 'offline' | 'error';
  lastChecked: Date;
  error: string | null;
}
```

**健康监控器**
```typescript
import { DatabaseService } from '../services/database';
import { MCPCollector } from './mcp-collector';
import { Logger } from '../utils/logger';
import { config } from '../config';

export class HealthMonitor {
  private db: DatabaseService;
  private collector: MCPCollector;
  private logger: Logger;
  
  constructor() {
    this.db = new DatabaseService();
    this.collector = new MCPCollector();
    this.logger = new Logger('HealthMonitor');
  }
  
  async monitorAllServers(): Promise<void> {
    this.logger.info('Starting health monitoring for all servers');
    
    // 获取所有服务器
    const servers = await this.db.getAllServers();
    this.logger.info(`Found ${servers.length} servers to monitor`);
    
    // 并行监控，但限制并发数
    const batchSize = config.healthMonitorConcurrency;
    for (let i = 0; i < servers.length; i += batchSize) {
      const batch = servers.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(server => this.monitorServer(server.url))
      );
      
      this.logger.info(`Completed monitoring batch ${i/batchSize + 1}/${Math.ceil(servers.length/batchSize)}`);
    }
    
    this.logger.info('Health monitoring completed');
  }
  
  async monitorServer(serverUrl: string): Promise<void> {
    this.logger.info(`Monitoring server health: ${serverUrl}`);
    
    try {
      // 使用收集器探测服务器
      const result = await this.collector.probeServer(serverUrl);
      
      // 更新服务器健康状态
      await this.db.updateServerHealth({
        serverUrl,
        status: result.status,
        lastChecked: result.lastChecked,
        responseTime: result.responseTime,
        error: result.error
      });
      
      this.logger.info(`Server ${serverUrl} status: ${result.status}`);
      
      // 如果状态变化，记录历史
      await this.recordStatusChange(serverUrl, result);
    } catch (error) {
      this.logger.error(`Error monitoring server ${serverUrl}:`, error);
      
      // 记录错误状态
      await this.db.updateServerHealth({
        serverUrl,
        status: 'error',
        lastChecked: new Date(),
        error: error.message
      });
    }
  }
  
  private async recordStatusChange(serverUrl: string, result: any): Promise<void> {
    // 获取上一次状态
    const lastStatus = await this.db.getLastServerStatus(serverUrl);
    
    // 如果状态变化，记录历史
    if (lastStatus && lastStatus !== result.status) {
      await this.db.addStatusHistory({
        serverUrl,
        previousStatus: lastStatus,
        newStatus: result.status,
        changedAt: result.lastChecked
      });
      
      this.logger.info(`Server ${serverUrl} status changed: ${lastStatus} -> ${result.status}`);
    }
  }
}
```

#### 5.2.3 工作流程

1. **服务发现阶段**
   - 从数据库获取待探测服务器列表
   - 设置探测优先级和频率
   - 准备探测参数和配置

2. **探测阶段**
   - 建立MCP连接
   - 检查协议兼容性
   - 提取服务器信息和能力

3. **数据收集阶段**
   - 获取服务器提供的工具和资源
   - 测试关键功能的可用性
   - 评估服务质量指标

4. **健康监控阶段**
   - 定期检查服务器健康状态
   - 记录状态变化和性能指标
   - 更新服务器评分和排名

#### 5.2.4 实现计划

| 周次 | 主要任务 | 具体实现 |
|-----|---------|---------|
| 周7 | MCP客户端 | 实现MCP协议客户端、连接管理 |
| 周8 | 服务器探测 | 实现服务器探测逻辑、能力提取 |
| 周13 | 服务质量评估 | 实现质量评分算法、性能测试 |
| 周14 | 健康监控 | 实现服务器健康监控、状态记录 |
| 周18 | 性能优化 | 优化连接管理、缓存策略 |

### 5.3 Web平台 (MCP-Web)

#### 5.3.1 核心功能

1. **服务器目录**
   - 分页列表视图
   - 高级过滤和排序
   - 分类浏览
   - 搜索功能

2. **服务器详情**
   - 元数据和能力展示
   - 工具和资源列表
   - 使用示例和教程
   - 健康状态和历史

3. **社区功能**
   - 用户认证和资料
   - 服务器提交和审核
   - 评分和评论系统
   - 讨论和问答

4. **API 和集成**
   - REST API
   - tRPC端点
   - 文档和示例
   - SDK和客户端库

#### 5.3.2 技术实现

**Next.js应用结构**
```
/app
  /api                 # API路由
    /servers           # 服务器相关API
    /auth              # 认证API
    /community         # 社区功能API
  /(routes)            # 页面路由
    /page.tsx          # 首页
    /servers           # 服务器目录
      /page.tsx
      /[id]/page.tsx   # 服务器详情页
    /submit            # 提交服务器
    /account           # 用户账户
    /docs              # 文档

/components            # React组件
  /ui                  # 基础UI组件
  /servers             # 服务器相关组件
  /layout              # 布局组件
  /forms               # 表单组件

/lib                   # 工具库
  /api                 # API客户端
  /auth                # 认证逻辑
  /db                  # 数据库访问
  /utils               # 通用工具

/types                 # TypeScript类型定义

/public                # 静态资源
```

**服务器目录页面实现**
```tsx
// app/servers/page.tsx
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMCPServers } from '@/lib/api'
import { ServerCard } from '@/components/servers/ServerCard'
import { FilterPanel } from '@/components/servers/FilterPanel'
import { SearchBar } from '@/components/servers/SearchBar'
import { Pagination } from '@/components/ui/Pagination'

export default function ServerDirectory() {
  // 使用React Query管理服务器数据
  const [filters, setFilters] = useState({
    category: 'all',
    capability: '',
    sortBy: 'popularity',
    page: 1,
    perPage: 12
  })
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['servers', filters],
    queryFn: () => getMCPServers(filters),
    keepPreviousData: true
  })
  
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1 // 重置页码
    }))
  }
  
  const handlePageChange = (page) => {
    setFilters(prev => ({
      ...prev,
      page
    }))
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">MCP服务器目录</h1>
      
      {/* 搜索栏 */}
      <div className="mb-6">
        <SearchBar 
          onSearch={(query) => handleFilterChange({ query })} 
        />
      </div>
      
      {/* 过滤和排序控件 */}
      <div className="mb-6">
        <FilterPanel 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
      </div>
      
      {/* 服务器列表 */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 rounded-lg border border-red-300 bg-red-50">
          加载失败: {error.message}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.servers.map(server => (
              <ServerCard key={server.id} server={server} />
            ))}
          </div>
          
          {/* 分页 */}
          {data?.totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination 
                currentPage={filters.page}
                totalPages={data.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
```

**服务器卡片组件**
```tsx
// components/servers/ServerCard.tsx
import React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import { ServerStatusBadge } from '@/components/servers/ServerStatusBadge'

interface ServerCardProps {
  server: {
    id: string
    name: string
    title: string
    description: string
    capabilities: string[]
    category: string
    status: 'online' | 'offline' | 'error'
    rating: number
    isFeatured: boolean
  }
}

export const ServerCard: React.FC<ServerCardProps> = ({ server }) => {
  return (
    <div className="relative border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* 精选标记 */}
      {server.isFeatured && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-bl-lg">
          精选
        </div>
      )}
      
      <div className="p-4">
        {/* 状态指示器 */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold truncate">
            <Link href={`/servers/${server.id}`} className="hover:text-blue-600">
              {server.title || server.name}
            </Link>
          </h3>
          <ServerStatusBadge status={server.status} />
        </div>
        
        {/* 描述 */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {server.description || '暂无描述'}
        </p>
        
        {/* 能力标签 */}
        <div className="mb-3 flex flex-wrap gap-1">
          {server.capabilities.slice(0, 3).map(cap => (
            <Badge key={cap} variant="outline" className="text-xs">
              {cap}
            </Badge>
          ))}
          {server.capabilities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{server.capabilities.length - 3}
            </Badge>
          )}
        </div>
        
        {/* 分类和评分 */}
        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="text-gray-500">
            {server.category}
          </span>
          <StarRating rating={server.rating} />
        </div>
      </div>
    </div>
  )
}
```

**服务器详情页**
```tsx
// app/servers/[id]/page.tsx
import { notFound } from 'next/navigation'
import { getServerById } from '@/lib/api'
import { ServerHeader } from '@/components/servers/ServerHeader'
import { ServerDetails } from '@/components/servers/ServerDetails'
import { ServerTools } from '@/components/servers/ServerTools'
import { ServerResources } from '@/components/servers/ServerResources'
import { ServerHealth } from '@/components/servers/ServerHealth'
import { ServerComments } from '@/components/servers/ServerComments'

interface ServerDetailPageProps {
  params: {
    id: string
  }
}

export default async function ServerDetailPage({ params }: ServerDetailPageProps) {
  const server = await getServerById(params.id)
  
  if (!server) {
    notFound()
  }
  
  return (
    <div className="container mx-auto py-8">
      <ServerHeader server={server} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          <ServerDetails server={server} />
          
          {server.tools && server.tools.length > 0 && (
            <ServerTools tools={server.tools} />
          )}
          
          {server.resources && server.resources.length > 0 && (
            <ServerResources resources={server.resources} />
          )}
          
          <ServerComments serverId={params.id} />
        </div>
        
        <div className="space-y-8">
          <ServerHealth server={server} />
          
          {/* 相关服务器、文档链接等边栏内容 */}
        </div>
      </div>
    </div>
  )
}

// 生成静态路径
export async function generateStaticParams() {
  const servers = await getTopServers(100) // 获取热门服务器预渲染
  
  return servers.map(server => ({
    id: server.id
  }))
}
```

**API实现**
```typescript
// lib/api/servers.ts
import { supabase } from '@/lib/supabase'

export async function getMCPServers(filters) {
  const {
    category = 'all',
    capability = '',
    sortBy = 'popularity',
    query = '',
    page = 1,
    perPage = 12
  } = filters
  
  // 构建查询
  let dbQuery = supabase
    .from('projects')
    .select('*', { count: 'exact' })
  
  // 应用分类过滤
  if (category !== 'all') {
    dbQuery = dbQuery.eq('category', category)
  }
  
  // 应用能力过滤
  if (capability) {
    dbQuery = dbQuery.contains('capabilities', [capability])
  }
  
  // 应用搜索
  if (query) {
    dbQuery = dbQuery.or(`name.ilike.%${query}%, description.ilike.%${query}%`)
  }
  
  // 应用排序
  if (sortBy === 'popularity') {
    dbQuery = dbQuery.order('rating', { ascending: false })
  } else if (sortBy === 'newest') {
    dbQuery = dbQuery.order('created_at', { ascending: false })
  } else if (sortBy === 'alphabetical') {
    dbQuery = dbQuery.order('name')
  }
  
  // 应用分页
  const from = (page - 1) * perPage
  const to = from + perPage - 1
  dbQuery = dbQuery.range(from, to)
  
  // 执行查询
  const { data, error, count } = await dbQuery
  
  if (error) {
    throw new Error(`Error fetching servers: ${error.message}`)
  }
  
  return {
    servers: data,
    totalCount: count || 0,
    totalPages: Math.ceil((count || 0) / perPage)
  }
}

export async function getServerById(id) {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      tools:server_tools(*),
      resources:server_resources(*),
      health:server_health(*)
    `)
    .eq('id', id)
    .single()
  
  if (error) {
    if (error.code === 'PGRST116') {
      return null // 未找到
    }
    throw new Error(`Error fetching server: ${error.message}`)
  }
  
  return data
}

export async function submitServer(serverData) {
  const { data, error } = await supabase
    .from('projects')
    .insert(serverData)
    .select()
  
  if (error) {
    throw new Error(`Error submitting server: ${error.message}`)
  }
  
  return data[0]
}

export async function rateServer(serverId, userId, rating, comment = '') {
  const { data, error } = await supabase
    .from('server_ratings')
    .upsert({
      server_id: serverId,
      user_id: userId,
      rating,
      comment,
      updated_at: new Date()
    })
    .select()
  
  if (error) {
    throw new Error(`Error rating server: ${error.message}`)
  }
  
  // 更新服务器平均评分
  await updateServerAverageRating(serverId)
  
  return data[0]
}

async function updateServerAverageRating(serverId) {
  // 获取所有评分
  const { data: ratings, error } = await supabase
    .from('server_ratings')
    .select('rating')
    .eq('server_id', serverId)
  
  if (error) {
    throw new Error(`Error updating average rating: ${error.message}`)
  }
  
  // 计算平均评分
  const avg = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
  
  // 更新服务器表
  await supabase
    .from('projects')
    .update({ rating: avg })
    .eq('id', serverId)
}
```

#### 5.3.3 页面与功能

**主要页面**:
1. **首页**: 精选服务器、统计数据、新加入服务器
2. **服务器目录**: 所有服务器的列表，支持过滤和搜索
3. **服务器详情**: 单个服务器的详细信息和功能
4. **服务器提交**: 开发者提交新服务器的表单
5. **用户资料**: 用户信息和活动历史
6. **文档**: 平台使用指南和API文档

**核心功能**:
1. **服务器探索**: 分类浏览、搜索、过滤、排序
2. **服务器评估**: 查看详情、评分、评论、健康状态
3. **服务器提交**: 表单提交、验证、审核流程
4. **社区互动**: 讨论、问答、反馈
5. **API访问**: 程序化访问平台数据

#### 5.3.4 实现计划

| 周次 | 主要任务 | 具体实现 |
|-----|---------|---------|
| 周5 | 用户认证 | 实现认证系统、用户资料 |
| 周6 | 基础UI | 实现服务器列表、详情页面 |
| 周11 | 社区功能 | 实现评分、评论、讨论 |
| 周12 | 提交系统 | 实现服务器提交和审核 |
| 周15 | API实现 | 设计和实现REST API |
| 周16 | API文档 | 创建API文档和示例 |
| 周17 | 前端优化 | 性能优化、UX改进 |

### 5.4 数据同步系统 (MCP-Sync)

#### 5.4.1 核心功能

1. **多源数据同步**
   - 官方仓库同步
   - 第三方目录同步
   - 手动提交处理
   - 解决数据冲突

2. **数据清洗与验证**
   - 格式标准化
   - 数据完整性检查
   - 重复数据合并
   - 异常数据处理

3. **定时更新机制**
   - 调度系统
   - 增量更新
   - 失败重试
   - 通知机制

4. **数据版本控制**
   - 历史记录
   - 变更追踪
   - 回滚机制
   - 数据备份

#### 5.4.2 技术实现

**官方仓库同步器**
```typescript
import axios from 'axios';
import { parse } from 'yaml';
import { DatabaseService } from '../services/database';
import { Logger } from '../utils/logger';
import { config } from '../config';

export class OfficialRepoSynchronizer {
  private db: DatabaseService;
  private logger: Logger;
  
  constructor() {
    this.db = new DatabaseService();
    this.logger = new Logger('OfficialRepoSynchronizer');
  }
  
  async synchronize(): Promise<SyncResult> {
    this.logger.info('Starting official repository synchronization');
    
    const result: SyncResult = {
      added: 0,
      updated: 0,
      unchanged: 0,
      failed: 0,
      errors: []
    };
    
    try {
      // 获取官方仓库目录文件
      const directoryContent = await this.fetchOfficialDirectoryContent();
      
      // 解析目录内容
      const servers = this.parseDirectoryContent(directoryContent);
      this.logger.info(`Found ${servers.length} servers in official directory`);
      
      // 同步每个服务器
      for (const server of servers) {
        try {
          const syncStatus = await this.syncServer(server);
          
          // 更新统计信息
          if (syncStatus === 'added') {
            result.added++;
          } else if (syncStatus === 'updated') {
            result.updated++;
          } else if (syncStatus === 'unchanged') {
            result.unchanged++;
          }
        } catch (error) {
          this.logger.error(`Error syncing server ${server.name}:`, error);
          result.failed++;
          result.errors.push({
            server: server.name,
            error: error.message
          });
        }
      }
      
      this.logger.info('Official repository synchronization completed', result);
      return result;
    } catch (error) {
      this.logger.error('Error during official repository synchronization:', error);
      throw error;
    }
  }
  
  private async fetchOfficialDirectoryContent(): Promise<string> {
    try {
      const response = await axios.get(config.officialDirectoryUrl);
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching official directory:', error);
      throw new Error(`Failed to fetch official directory: ${error.message}`);
    }
  }
  
  private parseDirectoryContent(content: string): OfficialServerInfo[] {
    try {
      const data = parse(content);
      
      if (!Array.isArray(data)) {
        throw new Error('Expected array of servers');
      }
      
      return data.map(item => this.normalizeServerInfo(item));
    } catch (error) {
      this.logger.error('Error parsing directory content:', error);
      throw new Error(`Failed to parse directory content: ${error.message}`);
    }
  }
  
  private normalizeServerInfo(rawInfo: any): OfficialServerInfo {
    // 标准化和验证服务器信息
    if (!rawInfo.name) {
      throw new Error('Server missing required name field');
    }
    
    return {
      name: rawInfo.name,
      title: rawInfo.title || rawInfo.name,
      description: rawInfo.description || '',
      url: rawInfo.url,
      category: rawInfo.category || 'uncategorized',
      capabilities: rawInfo.capabilities || [],
      source: 'official'
    };
  }
  
  private async syncServer(server: OfficialServerInfo): Promise<SyncStatus> {
    // 检查服务器是否已存在
    const existingServer = await this.db.findServerByUrl(server.url);
    
    if (!existingServer) {
      // 添加新服务器
      await this.db.createServer({
        ...server,
        isVerified: true,
        dateAdded: new Date(),
        lastUpdated: new Date()
      });
      
      this.logger.info(`Added new server: ${server.name}`);
      return 'added';
    }
    
    // 检查是否需要更新
    if (this.isServerChanged(existingServer, server)) {
      // 更新服务器信息
      await this.db.updateServer(existingServer.id, {
        ...server,
        isVerified: true,
        lastUpdated: new Date()
      });
      
      // 记录变更历史
      await this.db.addServerHistory({
        serverId: existingServer.id,
        changeType: 'update',
        sourceType: 'official',
        previousData: JSON.stringify(existingServer),
        newData: JSON.stringify(server),
        timestamp: new Date()
      });
      
      this.logger.info(`Updated server: ${server.name}`);
      return 'updated';
    }
    
    this.logger.info(`Server unchanged: ${server.name}`);
    return 'unchanged';
  }
  
  private isServerChanged(existing: any, updated: OfficialServerInfo): boolean {
    // 检查关键字段是否有变化
    return (
      existing.title !== updated.title ||
      existing.description !== updated.description ||
      existing.category !== updated.category ||
      !this.areArraysEqual(existing.capabilities, updated.capabilities)
    );
  }
  
  private areArraysEqual(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) return false;
    
    const sorted1 = [...arr1].sort();
    const sorted2 = [...arr2].sort();
    
    return sorted1.every((item, index) => item === sorted2[index]);
  }
}

// 类型定义
interface OfficialServerInfo {
  name: string;
  title: string;
  description: string;
  url: string;
  category: string;
  capabilities: string[];
  source: 'official';
}

type SyncStatus = 'added' | 'updated' | 'unchanged';

interface SyncResult {
  added: number;
  updated: number;
  unchanged: number;
  failed: number;
  errors: { server: string; error: string }[];
}
```

**第三方目录同步器**
```typescript
import axios from 'axios';
import { DatabaseService } from '../services/database';
import { ServerValidator } from '../validators/server-validator';
import { Logger } from '../utils/logger';
import { config } from '../config';

export class ThirdPartyDirectorySynchronizer {
  private db: DatabaseService;
  private validator: ServerValidator;
  private logger: Logger;
  
  constructor() {
    this.db = new DatabaseService();
    this.validator = new ServerValidator();
    this.logger = new Logger('ThirdPartyDirectorySynchronizer');
  }
  
  async synchronize(directoryUrl: string): Promise<SyncResult> {
    this.logger.info(`Starting synchronization with ${directoryUrl}`);
    
    const result: SyncResult = {
      added: 0,
      updated: 0,
      unchanged: 0,
      failed: 0,
      errors: []
    };
    
    try {
      // 获取第三方目录数据
      const directoryData = await this.fetchDirectoryData(directoryUrl);
      
      // 处理每个服务器
      for (const serverData of directoryData) {
        try {
          // 验证服务器数据
          if (!this.isValidServerData(serverData)) {
            throw new Error('Invalid server data format');
          }
          
          // 验证服务器是否符合MCP协议
          const validationResult = await this.validator.validate(serverData.url);
          
          if (!validationResult.isValid) {
            this.logger.warn(`Server ${serverData.name} validation failed: ${validationResult.error}`);
            result.failed++;
            result.errors.push({
              server: serverData.name,
              error: `Validation failed: ${validationResult.error}`
            });
            continue;
          }
          
          // 同步服务器数据
          const syncStatus = await this.syncServer({
            ...serverData,
            isVerified: validationResult.isValid,
            source: 'third_party'
          });
          
          // 更新统计信息
          if (syncStatus === 'added') {
            result.added++;
          } else if (syncStatus === 'updated') {
            result.updated++;
          } else if (syncStatus === 'unchanged') {
            result.unchanged++;
          }
        } catch (error) {
          this.logger.error(`Error syncing server ${serverData.name}:`, error);
          result.failed++;
          result.errors.push({
            server: serverData.name,
            error: error.message
          });
        }
      }
      
      this.logger.info(`Synchronization with ${directoryUrl} completed`, result);
      return result;
    } catch (error) {
      this.logger.error(`Error during synchronization with ${directoryUrl}:`, error);
      throw error;
    }
  }
  
  private async fetchDirectoryData(url: string): Promise<any[]> {
    try {
      const response = await axios.get(url);
      
      if (!Array.isArray(response.data)) {
        throw new Error('Expected array of servers in response');
      }
      
      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching directory data from ${url}:`, error);
      throw new Error(`Failed to fetch directory data: ${error.message}`);
    }
  }
  
  private isValidServerData(data: any): boolean {
    // 验证服务器数据格式
    return (
      data &&
      typeof data === 'object' &&
      typeof data.name === 'string' &&
      typeof data.url === 'string'
    );
  }
  
  private async syncServer(server: ThirdPartyServerInfo): Promise<SyncStatus> {
    // 检查服务器是否已存在
    const existingServer = await this.db.findServerByUrl(server.url);
    
    if (!existingServer) {
      // 添加新服务器
      await this.db.createServer({
        ...server,
        dateAdded: new Date(),
        lastUpdated: new Date()
      });
      
      // 记录新增历史
      await this.db.addServerHistory({
        serverId: (await this.db.findServerByUrl(server.url)).id,
        changeType: 'add',
        sourceType: 'third_party',
        newData: JSON.stringify(server),
        timestamp: new Date()
      });
      
      this.logger.info(`Added new server from third-party: ${server.name}`);
      return 'added';
    }
    
    // 检查是否需要更新
    if (this.isServerChanged(existingServer, server)) {
      // 如果现有服务器来自官方源，且当前为第三方源，保留官方标记
      const finalData = {
        ...server,
        isVerified: existingServer.source === 'official' ? true : server.isVerified,
        source: existingServer.source === 'official' ? 'official' : 'third_party',
        lastUpdated: new Date()
      };
      
      // 更新服务器信息
      await this.db.updateServer(existingServer.id, finalData);
      
      // 记录变更历史
      await this.db.addServerHistory({
        serverId: existingServer.id,
        changeType: 'update',
        sourceType: 'third_party',
        previousData: JSON.stringify(existingServer),
        newData: JSON.stringify(finalData),
        timestamp: new Date()
      });
      
      this.logger.info(`Updated server from third-party: ${server.name}`);
      return 'updated';
    }
    
    this.logger.info(`Server from third-party unchanged: ${server.name}`);
    return 'unchanged';
  }
  
  private isServerChanged(existing: any, updated: ThirdPartyServerInfo): boolean {
    // 检查关键字段是否有变化
    const fieldsToCompare = [
      'name', 'title', 'description', 'category',
      'capabilities', 'tools', 'resources'
    ];
    
    for (const field of fieldsToCompare) {
      if (field === 'capabilities' || field === 'tools' || field === 'resources') {
        if (!this.areArraysEqual(existing[field] || [], updated[field] || [])) {
          return true;
        }
      } else if (existing[field] !== updated[field]) {
        return true;
      }
    }
    
    return false;
  }
  
  private areArraysEqual(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) return false;
    
    const sorted1 = [...arr1].sort();
    const sorted2 = [...arr2].sort();
    
    return sorted1.every((item, index) => {
      if (typeof item === 'object' && typeof sorted2[index] === 'object') {
        return JSON.stringify(item) === JSON.stringify(sorted2[index]);
      }
      return item === sorted2[index];
    });
  }
}

// 类型定义
interface ThirdPartyServerInfo {
  name: string;
  title?: string;
  description?: string;
  url: string;
  category?: string;
  capabilities?: string[];
  tools?: any[];
  resources?: any[];
  isVerified: boolean;
  source: 'third_party';
}
```

**数据冲突解决器**
```typescript
import { DatabaseService } from '../services/database';
import { Logger } from '../utils/logger';

export class ConflictResolver {
  private db: DatabaseService;
  private logger: Logger;
  
  constructor() {
    this.db = new DatabaseService();
    this.logger = new Logger('ConflictResolver');
  }
  
  async resolveConflicts(): Promise<ResolveResult> {
    this.logger.info('Starting conflict resolution');
    
    const result: ResolveResult = {
      resolved: 0,
      skipped: 0,
      failed: 0,
      errors: []
    };
    
    try {
      // 获取所有待解决的冲突
      const conflicts = await this.db.getPendingConflicts();
      this.logger.info(`Found ${conflicts.length} pending conflicts`);
      
      // 处理每个冲突
      for (const conflict of conflicts) {
        try {
          // 解析冲突
          const resolution = await this.resolveConflict(conflict);
          
          // 应用解决方案
          await this.applyResolution(conflict, resolution);
          
          // 更新冲突状态
          await this.db.updateConflictStatus(conflict.id, 'resolved');
          
          result.resolved++;
        } catch (error) {
          this.logger.error(`Error resolving conflict ${conflict.id}:`, error);
          result.failed++;
          result.errors.push({
            conflictId: conflict.id,
            error: error.message
          });
        }
      }
      
      this.logger.info('Conflict resolution completed', result);
      return result;
    } catch (error) {
      this.logger.error('Error during conflict resolution:', error);
      throw error;
    }
  }
  
  private async resolveConflict(conflict: ServerConflict): Promise<Resolution> {
    this.logger.info(`Resolving conflict ${conflict.id} for server ${conflict.serverId}`);
    
    const sourceA = conflict.sourceA;
    const sourceB = conflict.sourceB;
    const dataA = JSON.parse(conflict.dataA);
    const dataB = JSON.parse(conflict.dataB);
    
    // 应用冲突解决规则
    
    // 规则1: 官方源优先
    if (sourceA === 'official' && sourceB !== 'official') {
      return {
        winner: 'A',
        reason: 'Official source takes precedence'
      };
    }
    
    if (sourceB === 'official' && sourceA !== 'official') {
      return {
        winner: 'B',
        reason: 'Official source takes precedence'
      };
    }
    
    // 规则2: 验证过的服务器优先
    if (dataA.isVerified && !dataB.isVerified) {
      return {
        winner: 'A',
        reason: 'Verified server takes precedence'
      };
    }
    
    if (dataB.isVerified && !dataA.isVerified) {
      return {
        winner: 'B',
        reason: 'Verified server takes precedence'
      };
    }
    
    // 规则3: 合并不冲突的字段
    const mergedData = this.mergeServerData(dataA, dataB);
    
    return {
      winner: 'merged',
      reason: 'Merged non-conflicting fields',
      mergedData
    };
  }
  
  private mergeServerData(dataA: any, dataB: any): any {
    // 基础信息优先使用更完整的数据
    const merged = { ...dataA };
    
    // 标题和描述取较长的
    if (dataB.title && (!dataA.title || dataB.title.length > dataA.title.length)) {
      merged.title = dataB.title;
    }
    
    if (dataB.description && (!dataA.description || dataB.description.length > dataA.description.length)) {
      merged.description = dataB.description;
    }
    
    // 合并数组类型字段
    for (const field of ['capabilities', 'tools', 'resources']) {
      if (Array.isArray(dataB[field])) {
        if (!Array.isArray(merged[field])) {
          merged[field] = [];
        }
        
        // 合并去重
        const existingItems = new Set(merged[field].map(item => 
          typeof item === 'object' ? JSON.stringify(item) : item
        ));
        
        for (const item of dataB[field]) {
          const stringified = typeof item === 'object' ? JSON.stringify(item) : item;
          
          if (!existingItems.has(stringified)) {
            merged[field].push(item);
            existingItems.add(stringified);
          }
        }
      }
    }
    
    // 保留验证状态和来源
    merged.isVerified = dataA.isVerified || dataB.isVerified;
    merged.source = dataA.source === 'official' || dataB.source === 'official' ? 'official' : dataA.source;
    
    return merged;
  }
  
  private async applyResolution(conflict: ServerConflict, resolution: Resolution): Promise<void> {
    const serverId = conflict.serverId;
    
    if (resolution.winner === 'A') {
      // 应用A的数据
      await this.db.updateServer(serverId, JSON.parse(conflict.dataA));
    } else if (resolution.winner === 'B') {
      // 应用B的数据
      await this.db.updateServer(serverId, JSON.parse(conflict.dataB));
    } else if (resolution.winner === 'merged') {
      // 应用合并的数据
      await this.db.updateServer(serverId, resolution.mergedData);
    }
    
    // 记录解决历史
    await this.db.addConflictResolution({
      conflictId: conflict.id,
      resolution: resolution.winner,
      reason: resolution.reason,
      timestamp: new Date()
    });
    
    this.logger.info(`Applied resolution for conflict ${conflict.id}: ${resolution.winner} (${resolution.reason})`);
  }
}

// 类型定义
interface ServerConflict {
  id: string;
  serverId: string;
  sourceA: string;
  sourceB: string;
  dataA: string;
  dataB: string;
  status: 'pending' | 'resolved' | 'ignored';
  createdAt: Date;
}

interface Resolution {
  winner: 'A' | 'B' | 'merged';
  reason: string;
  mergedData?: any;
}

interface ResolveResult {
  resolved: number;
  skipped: number;
  failed: number;
  errors: { conflictId: string; error: string }[];
}
```

#### 5.4.3 调度与同步机制

1. **定时任务调度**
   - 使用Temporal.io管理工作流和定时任务
   - 支持配置不同源的同步频率
   - 实现失败重试和超时处理
   - 提供任务执行日志和状态监控

2. **增量同步策略**
   - 记录上次同步时间和状态
   - 优先同步更新频率高的源
   - 支持强制全量同步功能
   - 针对不同来源使用不同的同步策略

3. **冲突检测与报告**
   - 实时检测数据冲突
   - 自动应用冲突解决规则
   - 记录冲突解决历史
   - 提供人工干预界面

4. **通知与警报**
   - 同步状态通知
   - 异常情况警报
   - 新服务器发现提醒
   - 系统状态报告

#### 5.4.4 实现计划

| 周次 | 主要任务 | 具体实现 |
|-----|---------|---------|
| 周19 | 官方同步 | 实现官方仓库同步器 |
| 周20 | 第三方同步 | 实现第三方目录同步 |
| 周21 | 冲突解决 | 实现冲突检测和解决 |
| 周22 | 调度系统 | 实现定时任务和通知 |

## 6. 数据库设计

### 6.1 主要表结构

#### 项目表 (projects)
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  description TEXT,
  url VARCHAR(512) NOT NULL UNIQUE,
  category VARCHAR(128),
  source VARCHAR(50) NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'unknown',
  sort INTEGER DEFAULT 0,
  capabilities JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 服务器工具表 (server_tools)
```sql
CREATE TABLE server_tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  server_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  schema JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(server_id, name)
);
```

#### 服务器资源表 (server_resources)
```sql
CREATE TABLE server_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  server_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  uri_template VARCHAR(512) NOT NULL,
  description TEXT,
  content_type VARCHAR(128),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(server_id, uri_template)
);
```

#### 服务器健康状态表 (server_health)
```sql
CREATE TABLE server_health (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  server_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  response_time INTEGER,
  last_checked TIMESTAMP WITH TIME ZONE NOT NULL,
  error TEXT,
  UNIQUE(server_id)
);
```

#### 服务器状态历史表 (server_status_history)
```sql
CREATE TABLE server_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  server_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  previous_status VARCHAR(50) NOT NULL,
  new_status VARCHAR(50) NOT NULL,
  changed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 用户表 (users)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  avatar_url VARCHAR(512),
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 服务器评分表 (server_ratings)
```sql
CREATE TABLE server_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  server_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(server_id, user_id)
);
```

#### 服务器提交表 (server_submissions)
```sql
CREATE TABLE server_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  server_data JSONB NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  reviewer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  review_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 数据冲突表 (data_conflicts)
```sql
CREATE TABLE data_conflicts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  server_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  source_a VARCHAR(50) NOT NULL,
  source_b VARCHAR(50) NOT NULL,
  data_a JSONB NOT NULL,
  data_b JSONB NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 6.2 数据关系图

```
                          +----------------+
                          |    projects    |
                          +----------------+
                          | id             |
                          | name           |
                          | description    |
                          | url            |
                          | ...            |
                          +----------------+
                                 |
                                 |
           +--------------------+|+---------------------+
           |                    ||                      |
+----------v----------+ +-------v-----------+ +---------v---------+
| server_tools        | | server_resources   | | server_health     |
+---------------------+ +--------------------+ +-------------------+
| id                  | | id                 | | id                |
| server_id           | | server_id          | | server_id         |
| name                | | uri_template       | | status            |
| ...                 | | ...                | | ...               |
+---------------------+ +--------------------+ +-------------------+

      +----------------+        +------------------+
      |     users      |        | server_ratings   |
      +----------------+        +------------------+
      | id             |--------| id               |
      | email          |        | server_id        |
      | ...            |        | user_id          |
      +----------------+        | ...              |
            |                   +------------------+
            |
            |
      +-----v--------------+
      | server_submissions |
      +--------------------+
      | id                 |
      | user_id            |
      | server_data        |
      | ...                |
      +--------------------+
```

### 6.3 索引和性能优化

为确保数据库操作性能，计划建立以下索引：

1. **服务器查询优化**
   ```sql
   CREATE INDEX idx_projects_category ON projects(category);
   CREATE INDEX idx_projects_rating ON projects(rating DESC);
   CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
   CREATE INDEX idx_projects_status ON projects(status);
   CREATE INDEX idx_projects_is_featured ON projects(is_featured) WHERE is_featured = true;
   ```

2. **全文搜索**
   ```sql
   CREATE EXTENSION IF NOT EXISTS pg_trgm;
   CREATE INDEX idx_projects_name_trgm ON projects USING GIN (name gin_trgm_ops);
   CREATE INDEX idx_projects_description_trgm ON projects USING GIN (description gin_trgm_ops);
   ```

3. **关联查询优化**
   ```sql
   CREATE INDEX idx_server_tools_server_id ON server_tools(server_id);
   CREATE INDEX idx_server_resources_server_id ON server_resources(server_id);
   CREATE INDEX idx_server_ratings_server_id ON server_ratings(server_id);
   CREATE INDEX idx_server_ratings_user_id ON server_ratings(user_id);
   ```

4. **状态监控优化**
   ```sql
   CREATE INDEX idx_server_health_status ON server_health(status);
   CREATE INDEX idx_server_health_last_checked ON server_health(last_checked);
   CREATE INDEX idx_server_status_history_server_id ON server_status_history(server_id);
   CREATE INDEX idx_server_status_history_changed_at ON server_status_history(changed_at DESC);
   ```

## 7. 安全措施

### 7.1 身份验证与授权

1. **用户认证**
   - 使用NextAuth.js实现多提供商认证（GitHub、Google等）
   - 实现基于JWT的会话管理
   - 防止会话固定和会话劫持

2. **权限控制**
   - 基于角色的访问控制（RBAC）
   - 细粒度的资源权限管理
   - API端点的权限验证中间件

3. **OAuth集成**
   - 支持OAuth 2.0授权码流程
   - 实现PKCE增强安全性
   - 严格的重定向URI验证

### 7.2 数据保护

1. **数据加密**
   - 传输层加密（HTTPS）
   - 敏感数据存储加密
   - API密钥和令牌安全管理

2. **输入验证与清理**
   - 服务器端严格验证所有输入
   - 防止SQL注入和XSS攻击
   - 内容安全策略（CSP）实施

3. **安全漏洞防护**
   - 定期依赖项安全审计
   - CSRF防护
   - 速率限制和防DDoS措施

### 7.3 MCP协议安全

1. **令牌验证**
   - 严格验证令牌有效性和目标受众
   - 防止令牌直通攻击
   - 实现令牌最小权限原则

2. **服务器验证**
   - 验证MCP服务器身份和合法性
   - 防止恶意服务器注入
   - 实现服务器能力沙箱

3. **资源访问控制**
   - 资源URI安全验证
   - 防止服务器端请求伪造（SSRF）
   - 实现跨域资源共享（CORS）保护

### 7.4 安全监控与审计

1. **日志记录**
   - 全面的安全事件日志
   - 用户活动审计跟踪
   - 异常行为检测

2. **漏洞管理**
   - 定期安全扫描
   - 漏洞披露政策
   - 安全补丁管理流程

3. **事件响应**
   - 安全事件响应计划
   - 数据泄露通知流程
   - 恢复和业务连续性计划

## 8. 未来展望

### 8.1 短期增强

1. **服务器统计与分析**
   - 提供服务器使用统计
   - 流行工具和资源分析
   - 性能趋势图表

2. **开发者工具集**
   - MCP服务器调试工具
   - 兼容性测试工具
   - 集成示例和模板

3. **移动应用支持**
   - 响应式设计优化
   - 渐进式Web应用（PWA）
   - 移动端特定功能

### 8.2 中期发展

1. **高级搜索功能**
   - 语义搜索
   - 能力和工具筛选
   - 相似服务器推荐

2. **社区生态系统**
   - 开发者论坛
   - 知识库和教程
   - 用户贡献内容管理

3. **企业功能**
   - 私有服务器目录
   - 单点登录集成
   - 自定义品牌和域名

### 8.3 长期愿景

1. **MCP协议扩展**
   - 参与协议标准制定
   - 提供实现参考
   - 推动新功能采用

2. **AI增强功能**
   - 智能服务器推荐
   - 自动工具和资源分类
   - 异常检测和预警

3. **全球化与本地化**
   - 多语言支持
   - 区域性服务器节点
   - 文化适应的界面和内容

## 9. 总结

MCP-Box项目旨在建立一个世界领先的MCP服务器导航站，通过创新的技术方案和系统架构，整合自动化爬虫、协议兼容性验证、社区贡献和官方同步，打造最全面、最可靠的MCP服务器索引库。

本开发计划详细阐述了项目的四大核心系统：MCP爬虫系统、MCP收集器服务器、Web平台和数据同步系统，并提供了完整的技术实现方案、数据库设计、安全措施和未来展望。

通过严格遵循22周的时间线和资源规划，MCP-Box将分阶段实现从基础设施搭建到功能开发、优化发布和持续改进的全过程，最终为AI应用开发者和MCP生态参与者提供一个功能完善、数据丰富且安全可靠的服务平台。

项目的成功将极大促进MCP协议的普及和应用，推动AI应用与各类数据源和工具的标准化连接，为人工智能生态系统的繁荣发展做出重要贡献。
