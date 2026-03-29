import { streamText, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { firePlannerTool } from './tools/fire_planner';
import { taxWizardTool } from './tools/tax_wizard';
import { healthScoreTool } from './tools/health_score';

export async function runMoneyMentorAgent(messages: any[]) {
  const result = streamText({
    model: google('gemini-flash-latest'), // Using stable alias natively supported on this tier
    system: `You are the AI Money Mentor. Your job is to help Indian users with their personal financial planning. 
You are highly analytical, professional, and empathetic. 
When a user asks about retirement planning, FIRE, or SIP targets, ALWAYS use the 'fire_planner'. 
When a user asks about tax saving, Old vs New regime, Form 16, or salary deductions, ALWAYS use the 'tax_wizard'. 
When a user asks to evaluate their financial health, get a wellness score, or onboarding assessment, ALWAYS use the 'health_score_tool'.
IMPORTANT: ensure you parse inputs from users accurately. E.g 1 Lakh = 100000. Wrap numbers inside strings for tools.`,
    messages: await convertToModelMessages(messages),
    tools: {
      fire_planner: firePlannerTool,
      tax_wizard: taxWizardTool,
      health_score_tool: healthScoreTool,
    },
  });  // maxSteps: 5 - Removed due to unsupported type in this SDK version
  
  // Using toUIMessageStreamResponse to support Data Stream chunk format expected by DefaultChatTransport
  return result.toUIMessageStreamResponse();
}
