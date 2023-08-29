import { test, expect } from "vitest";
import { anthropic_prompt, openai_chat_prompt } from "./llm";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

test("anthropic test 1", async () => {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
  const prompt = anthropic_prompt(
    {
      question: "what is the answer to the ultimate question of life?",
      reference: "The Hitchhiker's Guide to the Galaxy",
    },
    "answer"
  );

  const completion = await anthropic.completions.create({
    model: "claude-instant-1",
    max_tokens_to_sample: 300,
    temperature: 0.1,
    ...prompt,
  });

  expect(completion.completion).includes("42");
});

test("openai chat test 1", async () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello world" }],
  });
  console.log(chatCompletion.data.choices[0].message);

  const prompt = openai_chat_prompt({
    messages: [
      { role: "system" },
      {
        role: "user",
        content: {
          question: "what is the answer to the ultimate question of life?",
          reference: "The Hitchhiker's Guide to the Galaxy",
        },
      },
    ],
    response_root_tag: "answer",
  });

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    ...prompt,
  });

  expect(completion.data.choices[0].message.content).includes("42");
});
