const BASE_PATH = '../src/scene'

module.exports = {
  description: 'Render display objects',
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
        path: `${BASE_PATH}/{{camelCase name}}/index.ts`,
        templateFile: './scene/scene.hbs',
        abortOnFail: true,
      },
      {
        type: 'append',
        path: `../src/enum/scene.ts`,
        pattern: `/* PLOP_INJECT_SCENE */`,
        template: `  {{ constantCase name }} = '{{ camelCase name }}',`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: `../src/core/sceneHandler.ts`,
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{ camelCase name }} from '/scene/{{ camelCase name }}'`,
      },
      {
        type: 'append',
        path: `../src/core/sceneHandler.ts`,
        pattern: `/* PLOP_INJECT_SCENE */`,
        template: `  [Scene.{{ constantCase name }}]: {{ camelCase name }},`,
      },
    ]
  },
}
