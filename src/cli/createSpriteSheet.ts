import { chdir } from 'node:process'
import { styleText } from 'node:util'

import { execa } from 'execa'

export const SPRITESHEET_FOLDER_PATH = '/src/public/asset/spritesheet'

export default async function createSpriteSheet() {
  console.log()
  console.log(styleText('blue', 'Generating sprite sheet...'))
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
        `..${SPRITESHEET_FOLDER_PATH}/sheet.png`,
        '--data',
        `..${SPRITESHEET_FOLDER_PATH}/data.json`,
        '--filename-format',
        "'{title}-{frame1}'",
        '--extrude',
        '--verbose',
      ],
      {
        shell: true,
      },
    )
    console.log('Aseprite output: ', stdout)

    // TODO: Use project config
    await execa('prettier', [
      '--write',
      '../src/public/asset/spritesheet/data.json',
    ])
    console.log()
    console.log(styleText('green', 'Script executed successfully!'))
    console.log()
  } catch (error) {
    console.error('Failed to generate sprite sheet: ', error)
  }
}
