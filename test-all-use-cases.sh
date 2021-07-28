echo ""
echo "=== Run normally ==="
echo ""
yarn make-web-game test-game
echo ""
echo "=== Error: Project folder already exists ==="
echo ""
yarn make-web-game test-game
echo ""
echo "=== Error: No name provided ==="
echo ""
yarn make-web-game
echo ""
