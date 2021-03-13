const BASE_PATH = '../src/labs'

module.exports = {
  description: 'Experiments and prototyping',
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
        path: `${BASE_PATH}/lab/{{camelCase name}}.ts`,
        templateFile: './lab/template.hbs',
        abortOnFail: true,
      },
      {
        type: 'append',
        path: `${BASE_PATH}/index.ts`,
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{camelCase name}}Lab from './lab/{{camelCase name}}'`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: `${BASE_PATH}/index.ts`,
        pattern: `/* PLOP_INJECT_LAB */`,
        template: `  {{camelCase name}}: {{camelCase name}}Lab,`,
      },
    ]
  },
}
