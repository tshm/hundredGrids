.PHONY: publish page

publish: index.html main.js
	npm install
	npm run bower
	rm -rf out
	mkdir out
	cd out; make -f ../Makefile page

page:
	cp -r ../index.html ../main.js ../bower_components ./
	git init
	git config user.name "Travis IC"
	git config user.email "2sm@csc.jp"
	git add .
	git commit -m "Deploy to GitHub pages"
	git push --force --quiet "https://${GH_TOKEN}@github.com/tshm/hundredGrids.git" master:gh-pages > /dev/null 2>&1

