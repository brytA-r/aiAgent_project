import { Agent, run } from '@openai/agents';

const bookingAgent = new Agent({
    name: 'Booking Agent',
    instructions: 'Help users with booking requests.',
});

const refundAgent = new Agent({
    name: 'Refund Agent',
    instructions: 'Process refund request politely and efficiently.',
});

const triageAgent = Agent.create({
    name: 'Triage Agent',
    instructions: [
        'Help the user with their questions.',
        'If the user asks about bookup, hand off to the booking agent.',
        'If the user asks about refunds, hand off to the refund agent.',
    ].join('\n'),
    handoffs: [bookingAgent, refundAgent],
});


async function main (){
    const result = await run(triageAgent, 'I would like a refund for my purchase.');
    console.log(result.finalOutput);
}

main().catch(console.error);


