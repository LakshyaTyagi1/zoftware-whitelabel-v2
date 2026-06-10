import { convertToModelMessages, streamText, stepCountIs, type UIMessage } from 'ai';
import { catalogTools } from '@/lib/ai/catalog-tools';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { getProviderConfigError, getZainGeminiModelId, getZainLanguageModel } from '@/lib/ai/providers';
import { ZAIN_SYSTEM_PROMPT } from '@/lib/ai/zain-system-prompt';

export const maxDuration = 30;
export const runtime = 'nodejs';

const isChatTelemetryEnabled =
  process.env.ZAIN_CHAT_TELEMETRY === 'true' ||
  process.env.LANGSMITH_TRACING === 'true' ||
  process.env.LANGCHAIN_TRACING_V2 === 'true';
const shouldRecordChatTraceContent = process.env.ZAIN_CHAT_TRACE_CONTENT === 'true';

export async function POST(req: Request) {
  const configError = getProviderConfigError();
  if (configError) {
    return Response.json(
      { error: configError },
      { status: 500 },
    );
  }

  const { messages }: { messages: UIMessage[] } = await req.json();
  const modelId = getZainGeminiModelId();

  const result = streamText({
    model: getZainLanguageModel(DEFAULT_CHAT_MODEL),
    system: ZAIN_SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    tools: catalogTools,
    stopWhen: stepCountIs(5),
    experimental_telemetry: {
      isEnabled: isChatTelemetryEnabled,
      recordInputs: shouldRecordChatTraceContent,
      recordOutputs: shouldRecordChatTraceContent,
      functionId: 'zain-whitelabel-chat',
      metadata: {
        route: '/api/chat',
        provider: 'vertex',
        model: modelId,
        messageCount: messages.length,
      },
    },
    onStepFinish({ toolCalls, finishReason, usage }) {
      if (process.env.DEBUG) {
        const toolNames = toolCalls.map(toolCall => toolCall.toolName).join(', ') || 'none';
        console.log(
          `[Zain Chat] model=${modelId} finish=${finishReason} tools=[${toolNames}] inputTokens=${usage.inputTokens ?? '?'} outputTokens=${usage.outputTokens ?? '?'}`,
        );
      }
    },
  });

  return result.toUIMessageStreamResponse({
    onError(error) {
      console.error('Zain chat stream failed', error);
      return 'Zain could not complete that response. Please try again.';
    },
  });
}
