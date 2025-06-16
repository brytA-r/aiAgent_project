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

/**
 * Output
Assistant
I’d love to help you pick out a great new pair of running shoes! To give you the best recommendations, could you let me know a couple of things?

What kind of running do you do? (Road, trail, treadmill, races, casual/jogging, etc.)
Any specific brand or style preferences? (Nike, Brooks, HOKA, minimalist, maximalist, etc.)
Do you have any foot needs? (Wide/narrow feet, arch support, past injuries, etc.)
What’s your budget?
If you’re not sure, here are some universally loved running shoes for different needs:

All-Around Road Running
Brooks Ghost 15 – Cushioned, reliable, fits most foot types.
Nike Pegasus 40 – Versatile, good for everyday runs and faster workouts.
ASICS Gel-Nimbus 26 – Great for premium cushioning and long distances.
HOKA Clifton 9 – Plush and lightweight, excellent for everyday comfort.
For Speed/Workouts
Saucony Endorphin Speed 3 – Snappy and fun for faster runs.
Nike ZoomX Vaporfly NEXT% – For races and ultimate performance.
For Trail Running
Salomon Speedcross 6 – Incredible grip and protection.
Altra Lone Peak – Roomy toe box, zero-drop for natural running.
Budget Pick
New Balance 880 v13 – Durable, good value all-purpose shoe.
Saucony Ride 16 – Another excellent, affordable neutral trainer.
Let me know your preferences, and I can narrow it down and find the perfect pair for you!
 * 
 */