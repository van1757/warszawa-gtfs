module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'property',
        format: ['camelCase', 'UPPER_CASE', 'snake_case']
      }
    ],
    "max-len": [
      "error",
      {
        "code": 90,
        "tabWidth": 2,
        "ignoreComments": true,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true
      }
    ]
  }
}
