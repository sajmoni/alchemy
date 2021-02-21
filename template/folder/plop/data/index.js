const BASE_PATH = '../src/data'

module.exports = {
  description: 'Data',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Enter name (camelCase):',
    },
  ],
  actions: () => {
    return [
      {
        type: 'add',
        path: `${BASE_PATH}/{{camelCase name}}.ts`,
        templateFile: './data/template.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `${BASE_PATH}/{{camelCase name}}Type.ts`,
        templateFile: `./data/type.hbs`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: `${BASE_PATH}/index.js`,
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{pascalCase name}}Type from './{{camelCase name}}Type'`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: `${BASE_PATH}/index.js`,
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `  {{pascalCase name}}Type,`,
      },
    ]
  },
}
