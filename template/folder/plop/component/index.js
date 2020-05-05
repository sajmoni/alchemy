const BASE_PATH = '../src/main/GUI'

module.exports = {
  description: 'Reusable visual component',
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
        templateFile: './component/component.hbs',
        abortOnFail: true,
      },
    ]
  },
}
