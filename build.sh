#!/bin/bash

for file in ./src/main_*.js; do
    filename=$(basename $file)
    name="${filename%.*}"
    if [[ $file == *"ractify"* ]]; then
        echo "Transforming ractive dependent files..."
        echo $file
        ./node_modules/.bin/browserify -t ractify $(pwd)/src/$filename > $(pwd)/example/js/$name'.js'
    else
        echo "Browserifying files..."
        echo $file
        ./node_modules/.bin/browserify $(pwd)/src/$filename > $(pwd)/example/js/$name'.js'
    fi
done
