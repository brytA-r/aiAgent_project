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
}