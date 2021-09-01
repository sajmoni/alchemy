const BASE_PATH = '../src/fragment'

const fragment = {
  description: 'Reusable UI component',
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
        templateFile: './fragment/template.hbs',
        abortOnFail: true,
      },
      {
        type: 'append',
        path: `${BASE_PATH}/index.ts`,
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{camelCase name}} from './{{camelCase name}}'`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: `${BASE_PATH}/index.ts`,
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `  {{camelCase name}},`,
      },
    ]
  },
}

export default fragment
