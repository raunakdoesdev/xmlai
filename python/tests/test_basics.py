from xmlai import parse_xml_prefix, generate_xml_prompt


def test_pares_xml_prefix_1():
    expected = {
        "cheese": "gouda",
        "title": "Hello",
        "content": "Blah",
    }
    assert (
        parse_xml_prefix(
            "<cheese>gouda</cheese> <title>Hello</title> <content>Blah</content>"
        )
        == expected
    )


def test_pares_xml_prefix_2():
    assert parse_xml_prefix("<cheese>gouda</cheese> <title>Hel") == {
        "cheese": "gouda",
        "title": "Hel",
    }


def test_pares_xml_prefix_3():
    assert parse_xml_prefix(
        "<paragraph><sentence>sdfsdfsdfsdfsdf</sentence></paragraph>"
    ) == {"paragraph": {"sentence": "sdfsdfsdfsdfsdf"}}


def test_generate_xml_prompt_case_1():
    input_dict = {"cheese": "gouda", "title": "Hello", "content": "Blah"}
    assert (
        generate_xml_prompt(input_dict)
        == "<cheese>gouda</cheese><title>Hello</title><content>Blah</content>"
    )


def test_generate_xml_prompt_case_2():
    input_dict = {"cheese": "gouda", "title": "Hel"}
    assert generate_xml_prompt(input_dict) == "<cheese>gouda</cheese><title>Hel</title>"


def test_generate_xml_prompt_case_3():
    input_dict = {"paragraph": {"sentence": "sdfsdfsdfsdfsdf"}}
    assert (
        generate_xml_prompt(input_dict)
        == "<paragraph><sentence>sdfsdfsdfsdfsdf</sentence></paragraph>"
    )
