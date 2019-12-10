BRANCH=$(git rev-parse --abbrev-ref HEAD)
·echo "$BRANCH  $1"
git add .
git commit -m"AUTO PUSH"
git push
