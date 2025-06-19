import 'dotenv/config';
import { Agent, AgentInputItem, run } from '@openai/agents';

let thread: AgentInputItem[] = [];

const agent = new Agent({
    name: 'Assistant',
});

async function userSays(text: string) {
    const result = await run(agent,
        thread.concat({ role: 'user', content: text }),
    );

    thread = result.history;
    console.log(`User: ${text}`);
    console.log(`Assistant: ${result.finalOutput}`);
    return result.finalOutput;
}

await userSays('What city is the Golden Bridge in?');

await userSays('What state is it in?');