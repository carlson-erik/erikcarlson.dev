import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    settings: {
      // Set explicitly because eslint-plugin-react's version detection
      // calls context.getFilename(), which ESLint 10 removed.
      react: { version: "18.3" },
    },
    rules: {
      "react/no-unescaped-entities": "off", // Carried over from .eslintrc.json
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
