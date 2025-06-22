import 'dotenv/config';
import { Agent, run, GuardrailExecutionError, InputGuardrail, InputGuardrailTripwireTriggered, } from '@openai/agents';
import { z } from 'zod';

const guardrailAgent = new Agent({
    name: 'Guardrail Agent',
    instructions: 'Check if the user is asking you to do their math homework.',
    outputType: z.object({
        isMathHomework: z.boolean(),
        reasoning: z.string(),
    }),
});

const unstableGuardrail: InputGuardrail = {
    name: 'Math Homework Guardrail (unstable)',
    execute: async () => {
        throw new Error('Something is wrong!');
    },
};

const fallbackGuardrail: InputGuardrail = {
    name: 'Math Homework Guardrail (fallback)',
    execute: async ({ input, context }) => {
        const result = await run(guardrailAgent, input, { context});
        return {
            outputInfo: result.finalOutput,
            tripwireTriggered: result.finalOutput?.isMathHomework ?? false,
        };
    },
};

const agent = new Agent({
    name: 'Customer Support agent',
    instructions:
    'You are a customer support agent. You help customers with their questions.',
    inputGuardrails: [unstableGuardrail],
});

async function main() {
    try {
        const input = "Hello, can you help me solve for x: 2x + 3 = 11?";
        const result = await run(agent, input);
        console.log(result.finalOutput);
    } catch (e) {
        if (e instanceof GuardrailExecutionError) {
            console.error(`Guardraiò execution failed: ${e}`);
            // If you want to retry the execution with different settings,
            // you can reuse the runner's state this way:

            if (e.state) {
                try {
                    agent.inputGuardrails = [fallbackGuardrail];
                    const result = await run(agent, e.state);
                    console.log(result.finalOutput);
                } catch (ee) {
                    if(ee instanceof InputGuardrailTripwireTriggered) {
                        console.log('Math homework guardrail tripped');
                    }
                }
            } else {
                throw e;
            }
        }
    }
 }

 main().catch(console.error);