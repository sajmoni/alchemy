const BASE_PATH = '../src/main/scene'

module.exports = {
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
        templateFile: './scene/scene.hbs',
        abortOnFail: true,
      },
    ]
  },
}
