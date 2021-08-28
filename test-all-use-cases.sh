echo ""
echo "=== Run normally ==="
echo ""
npx make-web-game test-game
echo ""
echo "=== Error: Project folder already exists ==="
echo ""
npx make-web-game test-game
echo ""
echo "=== Error: No name provided ==="
echo ""
npx make-web-game
echo ""
