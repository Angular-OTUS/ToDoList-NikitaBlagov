module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: [
          "tsconfig.*?.json",
          "e2e/tsconfig.json"
        ],
        createDefaultProgram: true
      },
      extends: [
				"plugin:prettier/recommended",
				"eslint:recommended",
				"plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates"

			],
      rules: {
        "comma-dangle": [2, "always-multiline"]
      }
    },
    {
      files: ["*.component.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {
        "max-len": ["error", { "code": 140 }]
      }
    },
    {
      files: ["*.component.ts"],
      extends: ["plugin:@angular-eslint/template/process-inline-templates"]
    }
  ]
}