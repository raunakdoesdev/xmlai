import { generateXmlPrompt } from ".";

/** JSON object with only strings as keys/values. */
export type StringJson = string | { [key: string]: StringJson };

type OpenAIMessage = {
  role: "system" | "user" | "assistant" | "function";
  content?: string;
  name?: string;
};

type OpenAIMessageJson = Omit<OpenAIMessage, "content"> & {
  content?: StringJson;
};

interface OpenAIPrompt {
  messages: OpenAIMessageJson[];
  response_root_tag?: string;
  custom_system_prefix?: string;
}

/**
 * Generates an Anthropic prompt for the given XML prompt and response root tag.
 *
 * @param prompt The XML prompt.
 * @param response_root_tag The root tag for the response.
 * @returns a JSON prompt and stop sequences that can be passed into Anthropic
 */
export function anthropicPrompt(
  prompt: StringJson,
  response_root_tag = "response"
) {
  return {
    prompt: `\n\nHuman:${generateXmlPrompt(
      prompt
    )}\n\nAssistant:<${response_root_tag}>`,
    stop_sequences: [`</${response_root_tag}>`],
  };
}

/**
 * Generate an OpenAI Chat Prompt from (optionally) JSON messages
 *
 * @param messages The array of OpenAIMessageJson objects. The content of these messages may be JSON.
 * @param response_root_tag The root tag for the response.
 * @param custom_system_prefix The custom system prefix for the response.
 * @returns The JSON prompt and stop sequences that can be passed into OpenAI.
 */
export function openaiChatPrompt({
  messages,
  response_root_tag = "response",
  custom_system_prefix,
}: OpenAIPrompt) {
  if (custom_system_prefix === undefined) {
    custom_system_prefix = `Respond in XML. Your must start your responses with <${response_root_tag}>\n\n`;
  }

  for (const message of messages) {
    if ("content" in message && typeof message["content"] === "object") {
      message["content"] = generateXmlPrompt(message["content"]);
    }
    if (message["role"] === "system") {
      if (!("content" in message)) {
        message["content"] = "";
      }
      message["content"] = custom_system_prefix + message["content"];
    }
  }

  return {
    messages: messages as OpenAIMessage[],
    stop: [`</${response_root_tag}>`],
  };
}
