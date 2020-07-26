const BASE_PATH = '../src/main/scene'

module.exports = {
  description: 'Render display objects',
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
      {
        type: 'append',
        path: `../src/constant/scene.js`,
        pattern: `/* PLOP_INJECT_SCENE */`,
        template: `  {{ constantCase name }}: '{{ camelCase name }}',`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: `${BASE_PATH}/index.ts`,
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{ camelCase name }} from './{{ camelCase name }}'`,
      },
      {
        type: 'append',
        path: `${BASE_PATH}/index.ts`,
        pattern: `/* PLOP_INJECT_SCENE */`,
        template: `  [Scene.{{ constantCase name }}]: {{ camelCase name }},`,
      },
    ]
  },
}