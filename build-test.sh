set -e

runCommand() {
  echo "=== $1 ==="
  $1
  echo ""
}

runCommand "yarn clean"
runCommand "yarn build"
runCommand "yarn preview"
runCommand "yarn make-web-game test-game"
runCommand "cd test-game"
# runCommand "git remote add origin https://github.com/sajmoni/make-web-game-test-repo.git"
runCommand "yarn start"
