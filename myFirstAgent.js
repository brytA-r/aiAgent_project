import { Agent, run } from '@openai/agents';

const agent = new Agent({
    name: 'History Tutor',
    instructions: 'You provide assistance with history queries. Explain important events and context clearly.',
});


const result = await run(agent, 'When did Sharks first appear?');
console.log(result.finalOutput);