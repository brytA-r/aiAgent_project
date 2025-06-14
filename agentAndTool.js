import 'dotenv/config';
import { z } from 'zod';
import { Agent, run }  from '@openai/agents';


const historyTutorAgent = new Agent({
    name: 'History Tutor',
    instructions: 'You provide assistance with historical queries. Explain important events and context clearly.',
});

const mathTutorAgent = new Agent({
    name: 'Math Tutor',
    instructions: 
    'You provide help with math problems. Explain your reasoning at each step and include examples.',
});

    // Handoffs
const triageAgent = Agent.create({
    name: 'Triage Agent',
    instructions: 
    "You determine which agent to use based on the user's homework question ",
    handoffs: [historyTutorAgent, mathTutorAgent],
});

async function main() {
    const result = await run (triageAgent, 'What is 2/6?');
    console.log(result.finalOutput);
}

main().catch((err) => console.error(err));
// Output: The capital of France is Paris.

