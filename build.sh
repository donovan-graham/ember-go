#!/bin/bash
echo "---- Start ----"

echo "* Building ember app"
ember build --environment=production

echo "* Copying file: www/index.html"
rm ./cordova/www/index.html
cp ./dist/index.html ./cordova/www/index.html

echo "* Copying directory www/assets"
rm -rf ./cordova/www/assets
cp -rf ./dist/assets ./cordova/www

echo "* Remove ember-cli-live-reload.js script tag in www/index.html"
sed -i '' 's/<script src="\/ember-cli-live-reload.js" type="text\/javascript"><\/script>//g' ./cordova/www/index.html

echo "* Add cordova.js script tag to www/index.html"
sed -i '' '/<script src="assets\/vendor.js"><\/script>/i\
  <script src="cordova.js"><\/script>\
  ' ./cordova/www/index.html

echo "---- Finished ----"

# ./cordova/platforms/ios/cordova/run
# ./cordova/platforms/android/cordova/run --device