import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { atom, useAtomValue, useSetAtom } from "jotai";

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

/** Display code snipet with utilities for swapping languages */
export default function Code({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<"python" | "ts">("python");

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { language } as any);
    }
    return child;
  });

  return (
    <div>
      <Select
        value={language}
        onValueChange={(v) => {
          setLanguage(v as typeof language);
        }}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue
            className="text-xl p-1"
            placeholder="Select a Language"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="ts">Typescript</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {childrenWithProps}
    </div>
  );
}
