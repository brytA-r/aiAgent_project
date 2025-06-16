import { Agent, RunContext } from '@openai/agents';

interface UserContext {
    name: String;
}

function buildInstructions(runContext: RunContext<UserContext>) {
    return `The user's name is " ${runContext.context.name}". Be extra friendly!`;
}

const agent = new Agent<UserContext>({
    name: 'Personalized helper',
    instructions: buildInstructions,
});

