set -e

alias aseprite="$HOME/Library/Application\ Support/Steam/steamapps/common/Aseprite/Aseprite.app/Contents/MacOS/aseprite"
aseprite -b sprite/*.ase --sheet src/public/asset/spritesheet/sheet.png --data src/public/asset/spritesheet/data.json --filename-format '{title}-{frame1}'
prettier --write src/public/asset/spritesheet/data.json
echo "Spritesheet generated!"
