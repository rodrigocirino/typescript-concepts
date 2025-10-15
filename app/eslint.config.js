// eslint.config.js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier/flat";


export default defineConfig([
  // Global ignores for files that should not be linted at all
  {
    ignores: ["dist/", "node_modules/", "build/"],
  },

  // Base configuration for all JavaScript files
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Define global variables here, e.g., for browser environments
        window: "readonly",
        document: "readonly",
      },
    },
    plugins: {
      js, // Include the default ESLint JavaScript plugin
      typescriptEslint,
    },
    extends: [
      js.configs.recommended, // Extend the recommended rules from @eslint/js
    ],
    rules: {
      // Custom rules or overrides
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "warn",
      semi: ["error", "always"],
    },
  },

  // Specific configuration for test files
  {
    files: ["tests/**/*.js"],
    rules: {
      "no-console": "off", // Allow console logs in test files
      "no-undef": "off", // Allow undefined variables for testing frameworks
    },
  },
  eslintConfigPrettier,
]);