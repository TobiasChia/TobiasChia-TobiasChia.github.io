# AI故事情节工具 (AI Story Plotting Tool)

一个基于微服务架构的智能故事创作辅助工具，帮助作家和创作者生成角色、情节、场景和对话。

## 🌟 功能特色

- **角色创建器**: 生成详细的角色背景、性格特征和人际关系
- **情节生成器**: 创建完整的故事大纲和分支情节
- **场景描述器**: 生成生动的环境和氛围描述  
- **对话生成器**: 创建符合角色性格的自然对话
- **智能提示词**: 经过优化的AI提示词模板，可直接复制使用
- **即时预览**: 实时生成和预览内容，支持一键复制

## 🚀 快速开始

### 在线使用
直接访问 [https://tobiachia-tobiachia.github.io](https://tobiachia-tobiachia.github.io) 开始使用

### 本地部署
```bash
# 克隆项目
git clone https://github.com/TobiasChia/TobiasChia-TobiasChia.github.io.git

# 进入项目目录
cd TobiasChia-TobiasChia.github.io

# 直接用浏览器打开 index.html 或启动本地服务器
python -m http.server 8000
# 或
npx serve .
```

## 📖 使用指南

### 1. 角色创建
1. 选择角色类型（主角、反派、配角、导师）
2. 选择故事类型（奇幻、科幻、言情、悬疑、历史）
3. 输入角色背景描述
4. 点击"生成提示词"
5. 复制生成的提示词，粘贴到AI对话工具（如ChatGPT、Claude等）

### 2. 情节生成
1. 输入故事主题
2. 选择故事长度
3. 描述核心冲突
4. 生成并复制提示词到AI工具

### 3. 场景描述
1. 选择场景类型和时间设定
2. 描述场景要素
3. 生成优化的场景描述提示词

### 4. 对话生成
1. 选择对话类型和参与人数
2. 描述角色设定和对话目标
3. 获取专业的对话写作提示词

## 🔧 技术架构

### 前端技术栈
- **Vue.js 3**: 响应式UI框架
- **Tailwind CSS**: 现代CSS框架
- **原生JavaScript**: 轻量级实现

### 设计特点
- **无服务器架构**: 纯前端实现，GitHub Pages部署
- **响应式设计**: 支持桌面和移动设备
- **组件化设计**: 模块化的功能组件
- **即时反馈**: 实时生成和预览

### 微服务架构设计
```
story-plotting-tool/
├── frontend/                 # Vue.js前端应用
│   ├── components/          # UI组件
│   ├── services/           # API调用服务
│   └── pages/             # 页面组件
├── services/               # 微服务后端（未来扩展）
│   ├── character-service/  # 角色创建服务
│   ├── plot-service/      # 情节生成服务
│   ├── scene-service/     # 场景描述服务
│   └── dialogue-service/  # 对话生成服务
└── shared/                # 共享资源
    ├── prompts/          # AI提示词模板库
    └── types/           # TypeScript类型定义
```

## 📚 提示词模板

项目包含精心设计的AI提示词模板，存储在 `shared/prompts/` 目录中：

- **角色创建模板**: 支持基础和高级心理分析两种级别
- **情节生成模板**: 包含三幕结构和分支情节设计
- **场景描述模板**: 感官描述和情绪导向两种类型
- **对话生成模板**: 基础对话和冲突对话专用模板

## 🔮 未来规划

### Phase 1: AI集成 (开发中)
- [ ] OpenAI API集成
- [ ] Claude API集成  
- [ ] 自定义API配置
- [ ] 批量生成功能

### Phase 2: 高级功能
- [ ] 角色关系图生成
- [ ] 情节时间线管理
- [ ] 多语言支持
- [ ] 协作编辑功能

### Phase 3: 社区功能
- [ ] 用户账户系统
- [ ] 作品分享社区
- [ ] 模板市场
- [ ] AI模型训练

## 🤖 AI API集成预留

项目已预留AI API集成接口，支持：

```javascript
// API配置接口
const aiConfig = {
  provider: 'openai' | 'anthropic' | 'custom',
  apiKey: 'your-api-key',
  model: 'gpt-4' | 'claude-3' | 'custom-model',
  baseUrl: 'custom-endpoint' // 可选
}

// 统一调用接口
async function generateContent(type, params) {
  // 根据type选择对应的提示词模板
  // 调用相应的AI API
  // 返回格式化结果
}
```

### 支持的AI服务提供商
- **OpenAI**: GPT-4, GPT-3.5-turbo
- **Anthropic**: Claude-3 系列
- **自定义API**: 兼容OpenAI格式的本地部署模型

## 🛠️ 开发指南

### 提示词优化
1. 查看 `shared/prompts/prompt-templates.md` 了解模板结构
2. 测试提示词效果并收集反馈
3. 根据反馈迭代优化模板

### 添加新功能
1. 在前端创建新的服务组件
2. 设计对应的提示词模板
3. 更新用户界面
4. 测试功能完整性

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交Issue和Pull Request来帮助改进这个项目！

### 贡献方式
1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📞 联系

- 项目地址: [https://github.com/TobiasChia/TobiasChia-TobiasChia.github.io](https://github.com/TobiasChia/TobiasChia-TobiasChia.github.io)
- 在线演示: [https://tobiachia-tobiachia.github.io](https://tobiachia-tobiachia.github.io)

---

**让AI成为你的创作伙伴，而不是替代者！** 🎭✨