import { tool } from '@openai/agents';

interface LooseToolInput {
    text: String;
}

const looseTool = tool({
    description: 'Echo input; be forgiving about types',
    strict: false,
    parameters: {
        type: 'object',
        properties: { text: { type: 'string' }},
        required: ['text'],
        additionalProperties: true,
    }
});