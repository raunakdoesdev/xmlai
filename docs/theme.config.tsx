import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import Link from "next/link";

const config: DocsThemeConfig = {
  logo: <span>XML AI</span>,
  project: {
    link: "https://github.com/raunakdoesdev/xmlai",
  },
  docsRepositoryBase: "https://github.com/raunakdoesdev/xmlai/tree/main/docs",
  footer: {
    // text: "Built by Raunak(https://raunakdoes.dev)",
    component: (
      <div className="nx-mx-auto nx-flex nx-max-w-[90rem] nx-justify-center nx-py-12 nx-text-gray-600 dark:nx-text-gray-400 md:nx-justify-start nx-pl-[max(env(safe-area-inset-left),1.5rem)] nx-pr-[max(env(safe-area-inset-right),1.5rem)]">
        Built by{" "}
        <Link style={{ marginLeft: "3px" }} href="https://raunakdoes.dev">
          Raunak
        </Link>
      </div>
    ),
  },
};

export default config;
