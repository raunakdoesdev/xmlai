import { StringJson } from "./llm";

/**
 * Parses a (potentially unfinished) XML string and returns a dictionary
 * representation of the XML.
 *
 * @param {string} xmlPrefix The XML string to be parsed.
 * @return  A dictionary representation of the XML string. All keys/values are strings.
 */
export function parse_xml_prefix(xmlPrefix: string): any {
  const result: any = {};
  let anyMatch = false;
  const matches = xmlPrefix.matchAll(
    /<([^\/>]+)>(.*?)<\/\1>|<([^\/>]+)>([^<>]*)/g
  );

  for (const match of matches) {
    anyMatch = true;
    const [_, g1, g2, g3, g4] = match;
    if (g1) {
      result[g1] = g2.includes("<") ? parse_xml_prefix(g2) : g2;
    } else if (g3) {
      result[g3] = g4;
    }
  }

  if (!anyMatch) {
    return xmlPrefix;
  }

  return result;
}

/**
 * Converts a dictionary to an XML string for usage in a prompt.
 *
 * @param d The dictionary to be converted.
 * @return The XML string representation of the dictionary.
 */
export function generate_xml_prompt(d: StringJson) {
  let xmlStr = "";
  for (const [key, value] of Object.entries(d)) {
    xmlStr += `<${key}>`;
    if (typeof value === "object") {
      xmlStr += generate_xml_prompt(value);
    } else {
      xmlStr += value;
    }
    xmlStr += `</${key}>`;
  }
  return xmlStr;
}
