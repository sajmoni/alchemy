const BASE_PATH = '../src/enum'

module.exports = {
  description: 'An enum',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Enter name:',
    },
  ],
  actions: () => {
    return [
      {
        type: 'add',
        path: `${BASE_PATH}/{{camelCase name}}.ts`,
        templateFile: './enum/template.hbs',
        abortOnFail: true,
      },
      {
        type: 'append',
        path: `${BASE_PATH}/index.ts`,
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{pascalCase name}} from './{{camelCase name}}'`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: `${BASE_PATH}/index.ts`,
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `  {{pascalCase name}},`,
      },
    ]
  },
}
