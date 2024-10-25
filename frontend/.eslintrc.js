module.exports = {
    // Specify the environment
    env: {
        browser: true, // Enable browser globals
        es6: true,     // Enable ES6 features
    },
    // Specify the parser
    parser: "@babel/eslint-parser",
    parserOptions: {
        requireConfigFile: false, // Allow Babel without a config file
        ecmaVersion: 2020,         // Enable modern ECMAScript features
        sourceType: "module",      // Allow using imports
        ecmaFeatures: {
            jsx: true,             // Enable JSX support
        },
    },
    // Extend recommended configurations
    extends: [
        "eslint:recommended",      // Use recommended rules from ESLint
        "plugin:react/recommended", // Use recommended rules from the React plugin
    ],
    // Define additional rules
    rules: {
        "no-console": "warn",      // Warn on console.log statements
        "quotes": ["error", "single"], // Enforce single quotes for strings
        "semi": ["error", "always"],     // Require semicolons
        "react/prop-types": "off",  // Disable prop-types validation (if using TypeScript)
    },
    settings: {
        react: {
            version: "detect",     // Automatically detect the React version
        },
    },
};
