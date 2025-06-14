import 'dotenv/config';
import { Agent, run } from '@openai/agents';

const agent = new Agent({
    name: 'History Tutor',
    instructions: 'You provide assistance with history queries. Explain important events and context clearly.',
});

const result = await run(agent, 'When did Sharks first appear?');
console.log(result.finalOutput);




// Output: Sharks first appeared around 450 million years ago during the Silurian period. 
// You can run this code using Node.js with the command: node myFirstAgent.js
// Make sure to install the required packages first:
// npm install @openai/agents dotenv
// Note: Ensure you have your OpenAI API key set in your environment variables as OPENAI_API_KEY.
