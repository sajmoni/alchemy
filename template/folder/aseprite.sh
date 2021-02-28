set -e

alias aseprite="$HOME/Library/Application\ Support/Steam/steamapps/common/Aseprite/Aseprite.app/Contents/MacOS/aseprite"
aseprite -b sprite/*.ase --sheet public/asset/spritesheet/sheet.png --data public/asset/spritesheet/data.json --filename-format '{title}-{frame}.png'
echo "Spritesheet generated!"
