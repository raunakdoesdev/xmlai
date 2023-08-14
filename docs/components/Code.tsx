import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { atom, useAtom } from "jotai";
import { ClipboardCopy } from "lucide-react";

type Language = "python" | "ts";

export function Python({
  children,
  language,
}: {
  children: React.ReactNode;
  language: Language;
}) {
  return language === "python" ? <div>{children}</div> : null;
}

export function Typescript({
  children,
  language,
}: {
  children: React.ReactNode;
  language: Language;
}) {
  return language === "ts" ? <div>{children}</div> : null;
}

import React, { useState } from "react";

const languageAtom = atom<Language>("python");

/** Display code snipet with utilities for swapping languages */
export default function Code({ children }: { children: React.ReactNode }) {
  //   const [language, setLanguage] = useState<"python" | "ts">("python");
  const [language, setLanguage] = useAtom(languageAtom);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { language } as any);
    }
    return child;
  });

  return (
    <>
      <div className="flex flex-row justify-end items-center">
        <Select
          value={language}
          onValueChange={(v) => {
            setLanguage(v as typeof language);
          }}
        >
          <SelectTrigger className="w-[120px] border-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="ts">Typescript</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {childrenWithProps}
    </>
  );
}
