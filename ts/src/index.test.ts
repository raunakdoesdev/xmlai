import { expect, test } from "vitest";
import { parse_xml_prefix, generate_xml_prompt } from ".";

test("parseXmlPrefix case 1", () => {
  const expected = {
    cheese: "gouda",
    title: "Hello",
    content: "Blah",
  };
  expect(
    parse_xml_prefix(
      "<cheese>gouda</cheese> <title>Hello</title> <content>Blah</content>"
    )
  ).toEqual(expected);
});

test("parseXmlPrefix case 2", () => {
  expect(parse_xml_prefix("<cheese>gouda</cheese> <title>Hel")).toEqual({
    cheese: "gouda",
    title: "Hel",
  });
});

test("parseXmlPrefix case 3", () => {
  expect(
    parse_xml_prefix(
      "<paragraph><sentence>sdfsdfsdfsdfsdf</sentence></paragraph>"
    )
  ).toEqual({
    paragraph: { sentence: "sdfsdfsdfsdfsdf" },
  });
});

test("parseXmlPrefix case 4", () => {
  expect(parse_xml_prefix("32")).toBe("32");
});

test("generateXmlPrompt case 1", () => {
  const inputDict = { cheese: "gouda", title: "Hello", content: "Blah" };
  expect(generate_xml_prompt(inputDict)).toBe(
    "<cheese>gouda</cheese><title>Hello</title><content>Blah</content>"
  );
});

test("generateXmlPrompt case 2", () => {
  const inputDict = { cheese: "gouda", title: "Hel" };
  expect(generate_xml_prompt(inputDict)).toBe(
    "<cheese>gouda</cheese><title>Hel</title>"
  );
});

test("generateXmlPrompt case 3", () => {
  const inputDict = { paragraph: { sentence: "sdfsdfsdfsdfsdf" } };
  expect(generate_xml_prompt(inputDict)).toBe(
    "<paragraph><sentence>sdfsdfsdfsdfsdf</sentence></paragraph>"
  );
});
