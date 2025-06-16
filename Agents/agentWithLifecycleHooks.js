import { Agent } from '@openai/agents';

const agent = new Agent({
    name: 'Verbose agent',
    instructions: 'Explain things thoroughly',
});

agent.on('agent_start', (ctx, agent) => {
    console.log(`[${agent.name}] started`);
});

agent.on('agent_end', (cts, output) =>{
    console.log(`[agent] produced:`, output);
});