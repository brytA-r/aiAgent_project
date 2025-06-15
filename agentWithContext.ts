import { Agent, run } from '@openai/agents';

interface Purchase {
    id: string;
    uid: string;
    deliveryStatus: string;
}

interface UserContext {
    uid: string;
    isProUser: Boolean;
    // this function can be used within tools
    fetchPurchases(): Promise <Purchase[]>;
}

const agent = new Agent<UserContext>({
    name: 'Personal shopper',
    instructions: 'Recommend products the user will love.',
});


async function main() {
const result = await run(agent, 'Find me a new pair of runnign shoes',{
    context: {
        uid: 'abc',
        isProUser: true,
        fetchPurchases: async () => []
    },
});
    console.log(result.finalOutput);
}

main().catch(console.error);