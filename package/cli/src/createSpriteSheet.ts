import { chdir } from 'node:process'

import chalk from 'chalk'
import { execa } from 'execa'

export default async function createSpriteSheet() {
  console.log()
  console.log(chalk.blue('Generating sprite sheet...'))
  console.log()
  try {
    // Change directory so that "sprite" is not included in the texture name
    chdir('./sprite')
    const { stdout } = await execa(
      `$HOME/Library/Application\\ Support/Steam/steamapps/common/Aseprite/Aseprite.app/Contents/MacOS/aseprite`,
      [
        '--batch',
        '*.{png,ase}',
        '**/*.{png,ase}',
        '--sheet',
        '../src/public/asset/spritesheet/sheet.png',
        '--data',
        '../src/public/asset/spritesheet/data.json',
        '--filename-format',
        "'{path}/{title}-{frame1}'",
        '--extrude',
      ],
      {
        shell: true,
      },
    )
    console.log(stdout)

    await execa('prettier', [
      '--write',
      '../src/public/asset/spritesheet/data.json',
    ])
    console.log()
    console.log(chalk.green('Script executed successfully'))
    console.log()
  } catch (error) {
    console.error('Failed to generate sprite sheet: ', error)
  }
}
