import { Agent, Runner } from '@openai/agents';

// create agent 'Assistant'
const agent = new Agent({
    name: 'Assistant',
    instructions: 'You are a helpful Assistant',
});

// custom runner
// you can pass custom configuration to the runner
const runner = new Runner();
const result = await runner.run(agent,
    'Write a haiku about recursion in programming.',
);

console.log(result.finalOutput);