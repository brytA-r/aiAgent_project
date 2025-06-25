import { Agent, webSearchTool, fileSearchTool } from '@openai/agents';

const agent = new Agent({
    name: 'Travel Assistant',
    tools: [webSearchTool(), fileSearchTool('_ID')],
});