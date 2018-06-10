echo "kill -9 $$; echo '' > stop.sh" > stop.sh
nohup node app.js  1>node.log 2>&1 &
