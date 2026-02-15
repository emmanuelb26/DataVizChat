import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { buildSystemPrompt } from "@/lib/prompt-builder";
import type { ChatRequest, ChatResponse } from "@/types";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const JSON_FORMAT_INSTRUCTIONS = `

CRITICAL FORMATTING RULE — YOU MUST FOLLOW THIS EXACTLY:
Your entire response must be a single, valid JSON object. Do NOT include any text, explanation, or markdown outside the JSON.
Do NOT wrap the JSON in code fences. Do NOT add any preamble or commentary.
Start your response with { and end it with }.

The JSON must have this exact structure:
{
  "answer": "A clear, helpful text explanation of the answer",
  "chart": null OR {
    "type": "Highcharts chart type (e.g. pie, column, line, bar, area, scatter)",
    "title": "Chart title",
    "options": { ...complete Highcharts options object... }
  }
}

Remember: your ENTIRE response is ONLY the JSON object. Nothing else.`;

/**
 * Extract a JSON object from a string that may contain surrounding text.
 * Finds the first { and the matching closing }, then parses that substring.
 */
function extractJSON(text: string): Record<string, unknown> {
  // Try direct parse first
  try {
    return JSON.parse(text);
  } catch {
    // ignore
  }

  // Try to extract JSON from code fences
  const fenceMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (fenceMatch) {
    try {
      return JSON.parse(fenceMatch[1].trim());
    } catch {
      // ignore
    }
  }

  // Find first { and last } to extract the JSON object
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end > start) {
    try {
      return JSON.parse(text.slice(start, end + 1));
    } catch {
      // ignore
    }
  }

  throw new Error("Could not extract valid JSON from the model response.");
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatRequest;
    const { message, files, activeFileId, activeSheetName } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No data files loaded. Please upload an Excel file first." },
        { status: 400 }
      );
    }

    const systemPrompt =
      buildSystemPrompt(files, activeFileId, activeSheetName) +
      JSON_FORMAT_INSTRUCTIONS;

    const { text } = await generateText({
      model: openrouter.chat("anthropic/claude-opus-4-6"),
      system: systemPrompt,
      prompt: message,
    });

    // Parse the JSON response from the model
    const parsed = extractJSON(text);

    const response: ChatResponse = {
      answer: (parsed.answer as string) ?? "Sorry, I could not generate a response.",
      chart: (parsed.chart as ChatResponse["chart"]) ?? null,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Chat API error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json(
      { error: `Failed to generate response: ${errorMessage}` },
      { status: 500 }
    );
  }
}
