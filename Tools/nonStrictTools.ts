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
    },

    execute: async (input) => {
        // because strict is false we need to do our own verification
        if(typeof input !== 'object' || input === null || !('text' in input)) {
            return 'Invalid input. Please try again';
        }
        return (input as LooseToolInput).text;
    },
});