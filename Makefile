install:
	npm install
start:
	node src/bin/brain-even.js
publish:
	npm publish --dry-run
lint:
	npx eslint .

# ** Configuration **

# Git
git-install:
	sudo apt install git
# Node.js
curl-install:
	sudo apt install curl
curl:
	curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
node:
	sudo apt install -y nodejs
# Babel 7
babel-install:
	npm i --save-dev @babel/core @babel/cli @babel/node @babel/preset-env
# Eslint
eslint-install:
	npm i --save-dev eslint eslint-config-airbnb-base eslint-plugin-import babel-eslint eslint-plugin-babel