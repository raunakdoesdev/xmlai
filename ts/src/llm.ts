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

export function anthropic_prompt(
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

export function openai_chat_prompt({
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
