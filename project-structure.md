# AI Story Plotting Tool - 微服务架构设计

## 项目结构

```
story-plotting-tool/
├── frontend/                 # React前端应用
│   ├── src/
│   │   ├── components/      # UI组件
│   │   ├── services/        # API调用服务
│   │   └── pages/          # 页面组件
│   └── package.json
├── services/                # 微服务后端
│   ├── character-service/   # 角色创建服务
│   ├── plot-service/       # 情节生成服务
│   ├── scene-service/      # 场景描述服务
│   ├── dialogue-service/   # 对话生成服务
│   └── gateway/           # API网关
└── shared/                 # 共享工具和配置
    ├── prompts/           # AI提示词模板
    └── types/            # TypeScript类型定义
```

## 微服务API设计

### 1. 角色创建服务 (Character Service)
- `POST /characters/generate` - 生成角色
- `GET /characters/{id}` - 获取角色详情
- `PUT /characters/{id}` - 更新角色信息

### 2. 情节生成服务 (Plot Service)  
- `POST /plots/generate` - 生成故事大纲
- `POST /plots/{id}/branches` - 创建分支情节
- `GET /plots/{id}` - 获取情节详情

### 3. 场景描述服务 (Scene Service)
- `POST /scenes/generate` - 生成场景描述
- `PUT /scenes/{id}` - 更新场景内容

### 4. 对话生成服务 (Dialogue Service)
- `POST /dialogues/generate` - 生成角色对话
- `POST /dialogues/optimize` - 优化对话内容

## 技术栈选择

### 前端
- React + TypeScript
- Vite (构建工具)
- Tailwind CSS (样式)

### 后端
- Node.js + Express
- TypeScript
- 本地JSON存储 (开发阶段)

### 部署
- GitHub Pages (前端)
- Vercel/Netlify Functions (后端API)