import { expect, test } from "vitest";
import { parseXmlPrefix, generateXmlPrompt } from ".";

test("parseXmlPrefix case 1", () => {
  const expected = {
    cheese: "gouda",
    title: "Hello",
    content: "Blah",
  };
  expect(
    parseXmlPrefix(
      "<cheese>gouda</cheese> <title>Hello</title> <content>Blah</content>"
    )
  ).toEqual(expected);
});

test("parseXmlPrefix case 2", () => {
  expect(parseXmlPrefix("<cheese>gouda</cheese> <title>Hel")).toEqual({
    cheese: "gouda",
    title: "Hel",
  });
});

test("parseXmlPrefix case 3", () => {
  expect(
    parseXmlPrefix(
      "<paragraph><sentence>sdfsdfsdfsdfsdf</sentence></paragraph>"
    )
  ).toEqual({
    paragraph: { sentence: "sdfsdfsdfsdfsdf" },
  });
});

test("parseXmlPrefix case 4", () => {
  expect(parseXmlPrefix("32")).toBe("32");
});

test("generateXmlPrompt case 1", () => {
  const inputDict = { cheese: "gouda", title: "Hello", content: "Blah" };
  expect(generateXmlPrompt(inputDict)).toBe(
    "<cheese>gouda</cheese><title>Hello</title><content>Blah</content>"
  );
});

test("generateXmlPrompt case 2", () => {
  const inputDict = { cheese: "gouda", title: "Hel" };
  expect(generateXmlPrompt(inputDict)).toBe(
    "<cheese>gouda</cheese><title>Hel</title>"
  );
});

test("generateXmlPrompt case 3", () => {
  const inputDict = { paragraph: { sentence: "sdfsdfsdfsdfsdf" } };
  expect(generateXmlPrompt(inputDict)).toBe(
    "<paragraph><sentence>sdfsdfsdfsdfsdf</sentence></paragraph>"
  );
});
