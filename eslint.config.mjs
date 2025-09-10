import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore generated and build artifacts
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "src/generated/**",
    ],
  },

  // Base Next.js + TS config
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Relax a few strict rules for this codebase
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Heavily used across API routes and auth glue
      "@typescript-eslint/no-explicit-any": "off",
      // Generated code and some libs use require in JS interop
      "@typescript-eslint/no-require-imports": "off",
      // UI copy may include apostrophes without HTML entities
      "react/no-unescaped-entities": "off",
    },
  },
  {
    files: ["**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
