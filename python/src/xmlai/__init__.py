import re


def parse_xml_prefix(xml_prefix):
    """
    This function parses a (potentially unfinished) XML string and returns a dictionary
    representation of the XML.

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
