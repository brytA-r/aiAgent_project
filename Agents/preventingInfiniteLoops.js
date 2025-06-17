const agent = new Agent({
    toolUseBehavior: 'stop_on_first_tool',
});

/**
 * After a tool call, the SDK automatically resets **tool_choice** back to 'auto'.
 * This prevents the model from entering an infinite loop where it repeatedly tries to call the tool.
 * You can override this behavior via the **resetToolChoice** flag or by configuring **toolUseBehavior**:
 * - 'run_llm_again' (default) - run the LLM again with the tool result.
 * - 'stop_on_first_tool' - treat the first tool result as the final answer.
 * - { stopAtToolNames: ['my_tool'] } - stop when any of the listed tools is called.
 * - (context, toolResults) => ... - custom function returning whether the run should finish.
 */