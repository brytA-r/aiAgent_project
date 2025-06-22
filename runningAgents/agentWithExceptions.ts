import 'dotenv/config';
import { Agent, run, GuadrailExecutionError, InputGuadrail, InputGuardrailTripwireTriggered, } from '@openai/agents';
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

