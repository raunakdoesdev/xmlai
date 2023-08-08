from typing import List, Union
from . import generate_xml_prompt


def anthropic_prompt(prompt: dict, response_root_tag="response") -> dict:
    """
    This function generates a prompt for Anthropic's Claude API.

    Parameters:
        prompt (dict): The prompt to be generated. This should be a dictionary representation of the XML string.
        response_root_tag (str): The root tag of the response XML. Defaults to "response".
    Returns:
        dict: A dictionary containing the prompt and stop sequences, ready to be passed to the anthropic API.

    Example:
        >>> completion = anthropic.completions.create(
        ...     model="claude-2",
        ...     max_tokens_to_sample=300,
        ...     **claude_prompt(
        ...         {
        ...             "question": "what is the answer to the ultimate question of life?",
        ...             "reference": "The Hitchhiker's Guide to the Galaxy",
        ...         },
        ...         "answer",
        ...     ),
        ... )
        >>> completion.completion
        '42'
    """

    return {
        "prompt": f"\n\nHuman:{generate_xml_prompt(prompt)}\n\nAssistant:<{response_root_tag}>",
        "stop_sequences": [f"</{response_root_tag}>"],
    }


def openai_chat_prompt(
    messages: List[dict],
    response_root_tag="response",
    custom_system_prefix: Union[None, str] = None,
) -> dict:
    """
    This function generates a prompt for OpenAI's API.

    Parameters:
        messages (List[dict]): A list of messages in OpenAI format. Content is optional for system prompt.
        response_root_tag (str): The root tag of the response XML. Defaults to "response".

    Returns:
        dict: A dictionary containing the prompt and stop sequences, ready to be passed to the OpenAI API.
    """

    if custom_system_prefix is None:
        custom_system_prefix = f"Respond in XML. Your must start your responses with <{response_root_tag}>\n\n"

    for message in messages:
        if "content" in message and isinstance(message["content"], dict):
            message["content"] = generate_xml_prompt(message["content"])
        if message["role"] == "system":
            if "content" not in message:
                message["content"] = ""
            message["content"] = custom_system_prefix + message["content"]

    return {
        "messages": messages,
        "stop": [f"</{response_root_tag}>"],
    }
