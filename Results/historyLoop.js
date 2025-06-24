import 'dotenv/config';
import {Agent, AgentInputItem, usesr, run } from '@openai/agents';

const agent = new Agent({
    name: 'Assistant',
    instructions: 
    'You are helpful assistant knowledgeable about recent AGI research.',
});

let hsitory: AgentInputItem[] =[
    // initial message
    user('Are we there yet?')
];

