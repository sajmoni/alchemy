const BASE_PATH = '../src/constant'

module.exports = {
  description: 'A constant',
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
        templateFile: './constant/template.hbs',
        abortOnFail: true,
      },
      {
        type: 'append',
        path: `${BASE_PATH}/index.js`,
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{pascalCase name}} from './{{camelCase name}}'`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: `${BASE_PATH}/index.js`,
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `  {{pascalCase name}},`,
      },
    ]
  },
}
