const BASE_PATH = '../src/view'

const view = {
  description: 'Subscribes to state',
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
        templateFile: './view/template.hbs',
        abortOnFail: true,
      },
    ]
  },
}

export default view
