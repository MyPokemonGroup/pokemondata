rm -rf ./lib
mkdir ./lib
cp ./src/config.json lib && ./node_modules/.bin/babel src --out-dir lib