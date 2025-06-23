import 'dotenv/config';
import { Agent, run } from '@openai/agents';
import { z } from 'zod';

const refundAgent = new Agent({
    name: 'Refund Agent',
    instructions: 
    'You are a refund agent. You are responsible for refunding customers.',
    outputType: z.object({
        refundApproved: z.boolean,
    }),
});

