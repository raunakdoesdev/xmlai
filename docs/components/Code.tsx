import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";

import { useAtomValue, useSetAtom, atom } from "jotai";

const languageAtom = atom<"python" | "ts">("python");

export function Python({ children }: { children: React.ReactNode }) {
  const language = useAtomValue(languageAtom);
  return language === "python" ? <div>{children}</div> : null;
}

export function Typescript({ children }: { children: React.ReactNode }) {
  const language = useAtomValue(languageAtom);
  return language === "ts" ? <div>{children}</div> : null;
}

/** Display code snipet with utilities for swapping languages */
export default function Code({ children }: { children: React.ReactNode }) {
  const language = useAtomValue(languageAtom);
  const setLanguage = useSetAtom(languageAtom);

  return (
    <div>
      <Select
        value={language}
        onValueChange={(v) => setLanguage(v as typeof language)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select a Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="ts">Typescript</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {children}
    </div>
  );
}
