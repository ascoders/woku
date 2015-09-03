#!/bin/bash

if [[ $1 == "install" ]]
then
  echo 'start download golang dependency packages..'
  go get -u github.com/ascoders/woku

  echo 'start install fis3..'
  npm install -g fis3

  echo 'start npm install..'
  npm install jshint
  npm install fis-parser-babelcore
  npm install fis-parser-less
fi

if [[ $1 == "ide" ]]
then
    /Applications//LiteIDE.app/Contents/MacOS/LiteIDE
fi

echo 'run fis3 dev mode..'
fis3 release -d static -r src -f fis-conf.js -w -l
