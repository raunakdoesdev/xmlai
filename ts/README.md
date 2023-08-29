# XML AI

XML AI is the fastest and most ergonomic way to get structured input and output out of your large language model.

Just write your prompt in JSON and we'll autoconvert it to XML that the model can work with. The best part? You can stream the response back as a JSON object in real time. No more sacrificing streaming for function calling or schema following capabilities. Built and optimized for Anthropic's Claude models, but also including OpenAI support.


The library is designed to be as lightweight as possible, and with nearly identical APIs whether you are operating in Python or Javascript/Typescript.


## Python

### Installation
```bash
pip install xmlai
```

### Getting Started

```python
from xmlai.llm import anthropic_prompt

prompt = anthropic_prompt(
    {
        "question": "what is the answer to the ultimate question of life?",
        "reference": "The Hitchhiker's Guide to the Galaxy",
    },
    response_root_tag="answer",
)

completion = anthropic.completions.create(
    model="claude-instant-1",
    max_tokens_to_sample=300,
    temperature=0.1,
    **prompt,
)

completion.completion # 42
```

## Typescript

### Installation
```bash
pnpm install xmlai
```

### Getting Started

```typescript
import { anthropic_prompt } from "xmlai/llm";

const prompt = anthropic_prompt(
    {
        question: "what is the answer to the ultimate question of life?",
        reference: "The Hitchhiker's Guide to the Galaxy",
    },
    response_root_tag="answer"
);

const completion = await anthropic.completions.create({
    model: "claude-instant-1",
    max_tokens_to_sample: 300,
    temperature: 0.1,
    ...prompt,
});

completion.completion // 42
```

The generated prompts look like this:
```json
{
   "prompt":"\n\nHuman:<question>what is the answer to the ultimate question of life?</question>
   <reference>The Hitchhiker's Guide to the Galaxy</reference>\n\nAssistant:<answer>",
   "stop_sequences":[
      "</answer>"
   ]
}
```

Note that we feed the opening tag to the beginning of the assistant's response! This combined with the closing tag as the stop token almost always ensures that the response is valid XML.


## Why another prompting library?
Anthropic's LLM Claude is trained on lots and lots of XML data. It is quite good at following XML schemas. In fact at the [Anthropic Hackathon](https://twitter.com/sauhaarda/status/1685892051043508224?s=20), the prompting workshop specifically presented some extra tips on how to get the best out of Claude when it comes to XML. I incorporated those tricks into this library to make it easier for others to take advantage of.

Also, [the regex for dealing with XML streams](https://github.com/raunakdoesdev/xmlai/blob/9a558d855e6b4e64f933599a249a0864c41eb273/python/src/xmlai/__init__.py#L17C41-L17C41) is surprisingly grotesque. I figured I'd limit the monstrosity to one codebase where it can be tested and maintained.
