import { Agent } from '@openai/agents';

const priateAgent = new Agent({
    name: 'Priate',
    instructions: 'Respond like a pirate - lots of "Arrr!"',
    modle: 'o4-mini',
});

const robotAgent = priateAgent.clone({
    name: 'Robot',
    instructions: 'Respond like a robot - be precise and factual.',
});