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
    ]
  },
}

export default fragment
