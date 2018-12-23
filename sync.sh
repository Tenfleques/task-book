
rsync -rRq --exclude sync.sh --exclude Docker --exclude run.sh --exclude .git --exclude README.md --exclude LICENSE  --exclude .gitignore --exclude docker-compose.yaml ./ tendai@flequesboard.com:~/task.book.ilearnfb.com/
