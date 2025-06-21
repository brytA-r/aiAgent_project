import 'dotenv/config';
import { Agent, AgentInputItem, run, tool, user, withTrace } from '@openai/agents';
import { createInterface } from 'node:readline/promises';
import { z } from 'zod';

async function ask(prompt: string) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const message = await rl.question(prompt);
    rl.close();
    return message;
}

const getWeatherTool = tool({
    name: 'get_weather',
    description: 'Get the weather in a specific city',
    parameters: z.object({
        demo: z.string(),
    }),
    execute: async (input) => {
        return `The weather in ${input.demo} is sunny`;
    },
});

const weatherAgent = new Agent({
    name: 'Weather Agent',
    handoffDescription: 'Knows everything about the weather but nothing else.',
    tools: [getWeatherTool],
});

const agent = new Agent({
    name: 'Basic test agent',
    instructions: 'Youu are a basic agent',
    handoffDescription: 'An expert on everything but the weather.',
    handoffs: [weatherAgent],
});

weatherAgent.handoffs.push(agent);

let history: AgentInputItem[] = [];
let latestAgent: Agent = agent;

async function main () {
    console.log('Type exit() to leave');
    await withTrace('Chat Session', async () => {
        while (true) {
            const message = await ask('> ');
            if(message === 'exit()') {
                return;
            }

            history.push(user(message));
            const result = await run(latestAgent, history);

            console.log(`[${latestAgent.name}] ${result.finalOutput}`);

            if(result.lastAgent) {
                latestAgent = result.lastAgent;
            }
            history = result.history;
        }
    }) ;
}

main().catch(console.error);

/**
 * Output:
 * Type exit() to leave
> 
[Basic test agent] Hello! How can I assist you today?
> I would like to know the weather in Rome italy.
[Basic test agent] I'll find the current weather in Rome, Italy for you. One moment, please. 

Would you like the current weather, or a forecast for specific dates?
> current weather
[Weather Agent] The current weather in Rome, Italy is sunny. If you need details like temperature or a forecast for the coming days, just let me know!
> I would like to also know the agent weather in Dalmine Italy
[Weather Agent] The current weather in Dalmine, Italy is also sunny. If you need further information or a forecast, feel free to ask!
> Who was the first human to land on the moon?
[Weather Agent] The first human to land on the Moon was **Neil Armstrong**. He set foot on the lunar surface on July 20, 1969, during NASA’s Apollo 11 mission and famously said, “That’s one small step for man, one giant leap for mankind.”
> exit()
 */