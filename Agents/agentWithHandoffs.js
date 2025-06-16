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

/**
 * Output in terminal:
 * Thank you for reaching out regarding your refund request. I’m here to help!

    Could you please provide your order number or the email address associated with your purchase? This will allow me to locate your order and process your refund as quickly as possible.

    If there’s anything specific about your purchase you’d like to mention, please let me know.
 */
