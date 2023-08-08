import re


def parse_xml_prefix(xml_prefix):
    """
    This function parses a (potentially unfinished) XML string and returns a dictionary representation of the XML.

    Parameters:
    xml_prefix (str): The XML string to be parsed.

    Returns:
    dict: A dictionary representation of the XML string. All keys/values are strings.
    """

    result = {}
    for match in re.finditer(r"<([^\/>]+)>(.*?)<\/\1>|<([^\/>]+)>([^<>]*)", xml_prefix):
        g1, g2, g3, g4 = match.groups()
        if g1:
            result[g1] = parse_xml_prefix(g2) if "<" in g2 else g2
        elif g3:
            result[g3] = g4
    return result


def test_parse_1():
    assert parse_xml_prefix("<cheese>gouda</cheese> <title>Hello</title> <content>Blah</content>") == {
        "cheese": "gouda",
        "title": "Hello",
        "content": "Blah",
    }


def test_parse_2():
    assert parse_xml_prefix("<cheese>gouda</cheese> <title>Hel") == {"cheese": "gouda", "title": "Hel"}


def test_parse_3():
    assert parse_xml_prefix("<paragraph><sentence>sdfsdfsdfsdfsdf</sentence></paragraph>") == {
        "paragraph": {"sentence": "sdfsdfsdfsdfsdf"}
    }


def generate_xml_prompt(d: dict) -> str:
    """
    This function converts a dictionary to an XML string for usage in a prompt.

    Parameters:
    d (dict): The dictionary to be converted.

    Returns:
    str: The XML string representation of the dictionary.
    """

    xml_str = ""
    for key, value in d.items():
        xml_str += f"<{key}>"
        if isinstance(value, dict):
            xml_str += generate_xml_prompt(value)
        else:
            xml_str += str(value)
        xml_str += f"</{key}>"
    return xml_str


def test_dict_to_xml_case_1():
    input_dict = {"cheese": "gouda", "title": "Hello", "content": "Blah"}
    assert generate_xml_prompt(input_dict) == "<cheese>gouda</cheese><title>Hello</title><content>Blah</content>"


def test_dict_to_xml_case_2():
    input_dict = {"cheese": "gouda", "title": "Hel"}
    assert generate_xml_prompt(input_dict) == "<cheese>gouda</cheese><title>Hel</title>"


def test_dict_to_xml_case_3():
    input_dict = {"paragraph": {"sentence": "sdfsdfsdfsdfsdf"}}
    assert generate_xml_prompt(input_dict) == "<paragraph><sentence>sdfsdfsdfsdfsdf</sentence></paragraph>"
