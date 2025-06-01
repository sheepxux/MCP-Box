# MCP-Box Monorepo 迁移计划

## 当前项目结构

```
mcp-box/                    # 项目根目录
├── mcp-box-web/           # 当前活跃开发目录(原mcp-box-next)
│   └── src/               # 源代码目录
│       ├── app/           # Next.js应用
│       ├── spider/        # 爬虫系统代码
│       └── ...
├── packages/              # Monorepo包目录
│   ├── mcp-web/          # 前端应用(未来迁移目标)
│   ├── mcp-spider/       # 爬虫系统(未来迁移目标)
│   ├── mcp-collector/    # MCP协议服务器
│   ├── mcp-sync/         # 数据同步系统
│   └── shared/           # 共享代码/类型/工具
└── ...                    # 其他配置文件
```

## 迁移计划

### 阶段1：建立基础结构(当前)

- [x] 创建monorepo基本目录结构
- [x] 设置根package.json与工作区配置
- [x] 创建共享类型库(shared包)
- [ ] 添加双轨开发脚本支持

### 阶段2：模块迁移(进行中)

- [ ] 将共享类型从mcp-box-web迁移到shared包
- [ ] 将爬虫系统从mcp-box-web迁移到mcp-spider包
- [ ] 将其他独立功能迁移到对应包

### 阶段3：完全切换(未来)

- [ ] 迁移Web界面到mcp-web包
- [ ] 更新所有内部引用
- [ ] 移除mcp-box-web目录
- [ ] 全面采用monorepo开发流程

## 开发指南

### 当前开发

在迁移完成前，继续在`mcp-box-web`目录中进行开发：

```bash
# 在mcp-box-web目录中开发
cd mcp-box-web
yarn dev

# 或使用根目录脚本
yarn dev:legacy
```

### 未来开发

迁移完成后，将使用工作区脚本进行开发：

```bash
# 开发整个项目
yarn dev

# 开发特定包
yarn workspace @mcp-box/mcp-web dev
yarn workspace @mcp-box/mcp-spider dev
```

## 注意事项

- 迁移过程采用渐进式策略，确保功能持续可用
- 在过渡期间，共享代码可能存在于多个位置，需注意同步更新
- 优先迁移独立性强的模块，如爬虫系统和共享类型
