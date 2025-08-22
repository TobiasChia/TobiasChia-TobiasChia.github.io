/**
 * AI API集成接口设计
 * 为未来的AI服务集成预留统一接口
 */

// AI服务配置类型定义
class AIConfig {
    constructor(options = {}) {
        this.provider = options.provider || 'manual'; // 'openai', 'anthropic', 'custom', 'manual'
        this.apiKey = options.apiKey || '';
        this.model = options.model || '';
        this.baseUrl = options.baseUrl || '';
        this.temperature = options.temperature || 0.7;
        this.maxTokens = options.maxTokens || 2000;
    }
}

// AI服务管理器
class AIServiceManager {
    constructor() {
        this.config = new AIConfig();
        this.services = {
            openai: new OpenAIService(),
            anthropic: new AnthropicService(),
            custom: new CustomAIService(),
            manual: new ManualService()
        };
    }

    // 配置AI服务
    configure(config) {
        this.config = new AIConfig(config);
        return this;
    }

    // 获取当前服务实例
    getCurrentService() {
        return this.services[this.config.provider];
    }

    // 统一内容生成接口
    async generateContent(type, params) {
        const service = this.getCurrentService();
        return await service.generate(type, params, this.config);
    }

    // 批量生成
    async generateBatch(requests) {
        const service = this.getCurrentService();
        return await service.generateBatch(requests, this.config);
    }
}

// OpenAI服务实现
class OpenAIService {
    async generate(type, params, config) {
        if (config.provider === 'manual') {
            return this.generateManualPrompt(type, params);
        }

        const prompt = this.buildPrompt(type, params);
        
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${config.apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: config.model || 'gpt-4',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: config.temperature,
                    max_tokens: config.maxTokens
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error?.message || '生成失败');
            }

            return this.formatResponse(data.choices[0].message.content, type);
        } catch (error) {
            console.error('OpenAI API调用失败:', error);
            // 降级到手动模式
            return this.generateManualPrompt(type, params);
        }
    }

    async generateBatch(requests, config) {
        const results = [];
        for (const request of requests) {
            const result = await this.generate(request.type, request.params, config);
            results.push({ id: request.id, result });
        }
        return results;
    }

    buildPrompt(type, params) {
        const templates = {
            character: this.buildCharacterPrompt(params),
            plot: this.buildPlotPrompt(params),
            scene: this.buildScenePrompt(params),
            dialogue: this.buildDialoguePrompt(params)
        };
        return templates[type] || '';
    }

    buildCharacterPrompt(params) {
        return `你是一个专业的故事创作助手。请根据以下信息创建一个详细的角色：

角色类型：${params.type || '未指定'}
故事类型：${params.genre || '未指定'}
背景描述：${params.background || '无特殊背景'}

请为这个角色生成以下内容：
1. 基本信息（姓名、年龄、外貌特征）
2. 性格特点（至少3个主要特质）
3. 背景故事（成长经历、重要事件）
4. 动机和目标（角色的驱动力）
5. 弱点和恐惧（角色的脆弱面）
6. 特殊技能或能力
7. 人际关系（与其他角色的关系）

请确保角色有血有肉，富有立体感和可信度。`;
    }

    buildPlotPrompt(params) {
        return `你是一个经验丰富的故事架构师。请根据以下信息创建一个完整的故事大纲：

故事主题：${params.theme || '未指定'}
故事长度：${params.length || '未指定'}
核心冲突：${params.conflict || '未描述'}

请创建包含以下元素的故事大纲：
1. 故事背景设定
2. 主要角色介绍
3. 三幕结构：
   - 第一幕：开端和冲突建立
   - 第二幕：发展和高潮
   - 第三幕：解决和结局
4. 关键转折点（至少3个）
5. 子情节线索
6. 主题深化方式

确保情节逻辑清晰，节奏把控得当，能够引起读者的情感共鸣。`;
    }

    buildScenePrompt(params) {
        return `你是一个擅长环境描写的作家。请根据以下信息创建一个生动的场景描述：

场景类型：${params.type || '未指定'}
时间设定：${params.time || '未指定'}
场景要素：${params.elements || '无特殊要求'}

请创建一个详细的场景描述，包含：
1. 视觉描述（颜色、光线、形状）
2. 听觉描述（声音、音效）
3. 嗅觉和触觉描述
4. 氛围营造
5. 场景中的关键物品或标志
6. 场景如何影响角色的情绪
7. 场景与故事情节的关联

描述要生动具体，让读者仿佛身临其境。避免过于抽象的表达，多用具体的细节。`;
    }

    buildDialoguePrompt(params) {
        return `你是一个对话写作专家。请根据以下信息创建自然流畅的角色对话：

对话类型：${params.type || '未指定'}
参与人数：${params.participants}
角色设定：${params.characters || '未描述'}
对话目标：${params.goal || '未明确'}

请创建符合以下要求的对话：
1. 每个角色都有独特的说话方式
2. 对话推进情节发展
3. 体现角色之间的关系动态
4. 包含潜台词和情感层次
5. 自然的对话节奏和停顿
6. 适当的肢体动作和表情描述
7. 符合角色性格的用词和语调

对话要听起来真实可信，避免过于说教或刻意。每句话都应该有其存在的意义。`;
    }

    generateManualPrompt(type, params) {
        return {
            type: 'manual',
            prompt: this.buildPrompt(type, params),
            copyText: this.buildPrompt(type, params),
            instructions: '请复制上面的提示词，粘贴到您选择的AI工具中（如ChatGPT、Claude等）。'
        };
    }

    formatResponse(content, type) {
        return {
            type: 'generated',
            content: content,
            timestamp: new Date().toISOString(),
            source: 'openai'
        };
    }
}

// Anthropic服务实现
class AnthropicService {
    async generate(type, params, config) {
        if (config.provider === 'manual') {
            return this.generateManualPrompt(type, params);
        }

        const prompt = this.buildPrompt(type, params);
        
        try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'x-api-key': config.apiKey,
                    'Content-Type': 'application/json',
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: config.model || 'claude-3-sonnet-20240229',
                    max_tokens: config.maxTokens,
                    messages: [{ role: 'user', content: prompt }]
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error?.message || '生成失败');
            }

            return this.formatResponse(data.content[0].text, type);
        } catch (error) {
            console.error('Anthropic API调用失败:', error);
            return this.generateManualPrompt(type, params);
        }
    }

    buildPrompt(type, params) {
        // 复用OpenAI的提示词构建逻辑
        const openaiService = new OpenAIService();
        return openaiService.buildPrompt(type, params);
    }

    generateManualPrompt(type, params) {
        const openaiService = new OpenAIService();
        return openaiService.generateManualPrompt(type, params);
    }

    formatResponse(content, type) {
        return {
            type: 'generated',
            content: content,
            timestamp: new Date().toISOString(),
            source: 'anthropic'
        };
    }
}

// 自定义AI服务实现
class CustomAIService {
    async generate(type, params, config) {
        if (config.provider === 'manual') {
            return this.generateManualPrompt(type, params);
        }

        const prompt = this.buildPrompt(type, params);
        
        try {
            const response = await fetch(config.baseUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${config.apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: config.model,
                    messages: [{ role: 'user', content: prompt }],
                    temperature: config.temperature,
                    max_tokens: config.maxTokens
                })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error('自定义API调用失败');
            }

            // 假设返回格式与OpenAI兼容
            return this.formatResponse(data.choices[0].message.content, type);
        } catch (error) {
            console.error('自定义API调用失败:', error);
            return this.generateManualPrompt(type, params);
        }
    }

    buildPrompt(type, params) {
        const openaiService = new OpenAIService();
        return openaiService.buildPrompt(type, params);
    }

    generateManualPrompt(type, params) {
        const openaiService = new OpenAIService();
        return openaiService.generateManualPrompt(type, params);
    }

    formatResponse(content, type) {
        return {
            type: 'generated',
            content: content,
            timestamp: new Date().toISOString(),
            source: 'custom'
        };
    }
}

// 手动模式服务（当前默认模式）
class ManualService {
    async generate(type, params, config) {
        return this.generateManualPrompt(type, params);
    }

    generateManualPrompt(type, params) {
        const openaiService = new OpenAIService();
        return openaiService.generateManualPrompt(type, params);
    }

    async generateBatch(requests, config) {
        const results = [];
        for (const request of requests) {
            const result = await this.generate(request.type, request.params, config);
            results.push({ id: request.id, result });
        }
        return results;
    }
}

// 导出AI服务管理器实例
const aiService = new AIServiceManager();

// 使用示例：
/*
// 配置AI服务（未来功能）
aiService.configure({
    provider: 'openai',
    apiKey: 'your-api-key',
    model: 'gpt-4',
    temperature: 0.7
});

// 生成角色
const character = await aiService.generateContent('character', {
    type: 'hero',
    genre: 'fantasy',
    background: '一个失去记忆的年轻战士'
});

// 批量生成
const batch = await aiService.generateBatch([
    { id: '1', type: 'character', params: {...} },
    { id: '2', type: 'plot', params: {...} }
]);
*/

// 当前手动模式的集成（与现有前端代码兼容）
window.aiService = aiService;