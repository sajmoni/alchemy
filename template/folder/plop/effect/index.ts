const BASE_PATH = '../src/effect'

const effect = {
  description: 'Animate your display objects',
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
        templateFile: './effect/template.hbs',
        abortOnFail: true,
      },
    ]
  },
}

export default effect
