import { Agent } from '@openai/agents';

const summarizer = new Agent({
    name: 'Summarizer',
    instructions: 'Generate a concise summary of the supplied text',
});
