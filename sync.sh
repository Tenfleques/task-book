
rsync -rRq --exclude sync.sh --exclude Dockerfile --exclude run.sh --exclude .git --exclude README.md --exclude LICENSE  --exclude .gitignore --exclude docker-compose.yaml --exclude configs ./ tendai@flequesboard.com:~/task.book.ilearnfb.com/
