import 'dotenv/config';
import { z } from 'zod';
import {Agent, tool }  from '@openai/agents';

const historyFunFact = tool ({
    // The name of the tool will be used by the agent to tell what tool to use.
    name: 'history_fun_fact',
    // The description is used to describe **where** to use the tool by telling it **what** it does.
    description: 'Give a fun fact about a historical event',
    inputType: z.object({}),
    execute: async () => {
        // The output will be returned to the agent to use.
        return 'Sharks are older than trees.';
    },
});
const agent = new Agent({
    name: 'History Tutor',
    instructions: 'You provide assistance with historical queries. Explain important events and context clearly.',
    // Adding the tool to the agent.
    tools: [historyFunFact],
})