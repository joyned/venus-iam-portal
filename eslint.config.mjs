import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["src/**/*.ts"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
];
