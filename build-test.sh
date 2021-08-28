set -e

runCommand() {
  echo "=== $1 ==="
  $1
  echo ""
}

runCommand "npm run clean"
runCommand "npm run build"
runCommand "npx preview"
runCommand "npx make-web-game test-game"
runCommand "cd test-game"
# runCommand "git remote add origin https://github.com/sajmoni/make-web-game-test-repo.git"
runCommand "npm start"
