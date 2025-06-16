import { Agent } from '@openai/agents';
import { z } from 'zod';

const calculatorTool = tool ({
    name: 'Calculator',
    description: 'Use this tool to answer questions about math problems.',
    parameters: z.object({ question: z.string() }),
    execute: async (input) => {
        throw new Error('TODO: implement this');
    },
});

const agent = new Agent({
    name: 'Strict tool user',
    instructions: 'Always answer using the calculator tool.',
    tools: [calculatorTool],
    modelSetting: { toolChoice: 'auto' },
});

/**
 * You can force tool use withh **modelSettings.tool_choice** :
 * 
 * 1- 'auto' (default) - the LLM decides whether to use a tool.
 * 2- 'required' - the LLM must call a tool (it can choose which one).
 * 3- 'none' - the LLM must not call a tool.
 * 4- A specific tool name, eg: 'Calculator' - the LLM must call that particular tool.
 */