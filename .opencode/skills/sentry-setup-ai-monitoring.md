---
name: sentry-setup-ai-monitoring
description: Setup Sentry AI Agent Monitoring in any project. Use when asked to monitor LLM calls, track AI agents, track conversations, or instrument OpenAI/Anthropic/Vercel AI/LangChain/Google GenAI/Pydantic AI. Detects installed AI SDKs and configures appropriate integrations.
license: Apache-2.0
category: feature-setup
parent: sentry-feature-setup
disable-model-invocation: true
---

> [All Skills](../../SKILL_TREE.md) > [Feature Setup](../sentry-feature-setup/SKILL.md) > AI Monitoring

# Setup Sentry AI Agent Monitoring

Configure Sentry to track LLM calls, agent executions, tool usage, and token consumption.

## Invoke This Skill When

- User asks to "monitor AI/LLM calls" or "track OpenAI/Anthropic usage"
- User wants "AI observability" or "agent monitoring"
- User asks about token usage, model latency, or AI costs

## Prerequisites

AI monitoring requires **tracing enabled** (`tracesSampleRate > 0`).

## Detection First

Always detect installed AI SDKs before configuring.

## Supported SDKs

### JavaScript

| Package | Integration | Min Sentry SDK | Auto? |
|---------|-------------|----------------|-------|
| `openai` | `openAIIntegration()` | 10.53.0 | Yes |
| `@anthropic-ai/sdk` | `anthropicAIIntegration()` | 10.53.0 | Yes |
| `ai` (Vercel) | `vercelAIIntegration()` | 10.53.0 | Yes* |
| `@langchain/*` | `langChainIntegration()` | 10.53.0 | Yes |
| `@langchain/langgraph` | `langGraphIntegration()` | 10.53.0 | Yes |
| `@google/genai` | `googleGenAIIntegration()` | 10.53.0 | Yes |

### Python

Integrations auto-enable when the AI package is installed: `openai`, `anthropic`, `langchain`, `langgraph`, `huggingface_hub`, `google-genai`, `pydantic-ai`, `litellm` (explicit), `mcp`.

## JavaScript Configuration

### Node.js - auto-enabled integrations

```javascript
Sentry.init({
  dsn: "YOUR_DSN",
  tracesSampleRate: 1.0,
  streamGenAiSpans: true,
});
```

### Browser / Next.js OpenAI (manual wrapping required)

```javascript
const openai = Sentry.instrumentOpenAiClient(new OpenAI());
```

## Manual Instrumentation

Use when no supported SDK is detected.

### Span Types

| `op` | Span `name` pattern | Purpose |
|------|---------------------|---------|
| `gen_ai.{operation}` | `{operation} {model}` | Individual LLM call |
| `gen_ai.invoke_agent` | `invoke_agent {agent_name}` | Agent execution lifecycle |
| `gen_ai.execute_tool` | `execute_tool {tool_name}` | Tool/function call |
| `gen_ai.handoff` | `handoff from {source} to {target}` | Agent-to-agent transition |

## Verification

After configuring, make an LLM call and check the Sentry Traces dashboard.
