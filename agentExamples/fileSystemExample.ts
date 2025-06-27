import 'dotenv/config';
import { Agent, run, MCPServerStdio, withTrace } from '@openai/agents';
import * as path from 'node:path';

async function main() {
    // Create a new agent with the file system example
    const sampleDir = path.join(__dirname, 'sample_files');
    // The agent will have access to the files in this directory
    const mcpServer = new MCPServerStdio({
        name :'file_system-example',
        fullCommand: `npx -y @modelcontextprotocol/mcp_server ${sampleDir}`,
    });
    //
    await mcpServer.connect(); // Connect to the MCP server

    try {
        await withTrace('MCP filesystem Example', async () => { // Run the agent with tracing enabled
            const agent = new Agent({ 
                name: 'MCP Assistant',
                instructions:
                'Use the tools to read the filesystem and answer questions based on those files. If you are unable to find any Files, you can say so instead of assuming they existsSync.',
                mcpServers: [mcpServer],
            });
            // Run the agent with a specific message
            let message = 'Read the file "sample.txt" and summarize it.';
            console.log(`Running: ${message}`); 
        
            let result = await run(agent, message);
            console.log(result.finalOutput); // Output the final result
        })
    }
}