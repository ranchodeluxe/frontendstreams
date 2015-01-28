[![Build Status](https://travis-ci.org/thebigspoon/dom-delegation-stream.svg)](https://travis-ci.org/thebigspoon/frontendstreams)

###Front-End Streams

This is a series of examples that use NodeJS stream modules such as [through](https://www.npmjs.com/package/through) in front-end programming. The target audience is noobs. For more information about NodeJS stream modules check out the [stream handbook](https://github.com/substack/stream-handbook) and [stream-adventure](https://www.npmjs.com/package/stream-adventure). These examples and the NodeJS tooling we'll be using were inspired by [jessekeane](http://words.jessekeane.me/about/) in his front-end stream [post](http://words.jessekeane.me/front-end-streams/). The first three examples are from that original post. I've created solutions for them here because the post did not originally have solutions. The first tests in `test/index.js` give a sense for how to reason about the dependencies for [dom-delegation-stream](https://www.npmjs.com/package/dom-delegation-stream). Much thanks to [jessekeane](http://words.jessekeane.me/about/) for exposing these modules to me.


###Getting Started

Assuming you have `node` and `npm` installed:

```bash
$ npm install

$ npm run serve  # open the browser at localhost:3000 and look at /examples directory

$ npm test  # to run the tests
```

###Examples

[Example 1](https://thebigspoon.github.io/frontendstreams/example/ex_1.html): stream changes from a text input to an output element

[Example 2](https://thebigspoon.github.io/frontendstreams/example/ex_2.html): stream changes from a text input to an output element and have [objectState](https://www.npmjs.com/package/objectstate) listen to those changes too

[Example 3](https://thebigspoon.github.io/frontendstreams/example/ex_3.html): like example one and two, but this time have [objectState](https://www.npmjs.com/package/objectstate) work with a [ractive](https://www.npmjs.com/package/ractive) template and rerender it on state change


###Browserify and the Build Sequence

This section explains the workflow on how to go from the source javascript to the built version we can use in the browser. 

The magic sauce is the [browserify](https://www.npmjs.com/package/browserify) tool. Browserify will package up our NodeJS modules and all dependent `require()` modules into something that is usable in the browser. Here we explain that workflow in the context of [Example 1](https://thebigspoon.github.io/frontendstreams/example/ex_1.html).

The source code for example one is located in `/src/ex_1.js`. All the business logic for the example is located in this module:

```javascript
var write = require('dom-replace-html-stream') , 
    events = require('dom-delegation-stream') , 
    values = require('dom-value-stream');

module.exports = function () {
    var input = events(document.getElementById('input'), 'input').pipe(values())
    var output = write(document.getElementById('output'))
    input.pipe(output)
}
```

Notice the `require()` statements and `module.exports` convention. This is a NodeJS module and in its raw form the browser cannot digest it. To use this in the browser we need a couple things. First we need some magic that will allow the browser to resolve our `require()` imports. Browserify is this magic as mentioned before. Secondly, we need an entry point, a bridge, between the browser and the modules. We need a way to link the browser scope of `window` to our NodeJS modules. 

Notice that each example in `/src/` has a corresponding `/src/main_< example name >.js`. This is the bridge:

```javascript
var ex_1 = require('./ex_1.js')

App = window.App || {};
App.load_demo = ex_1;
```

Here we are importing our NodeJS module, which Browserify will resolve for us, and binding it to the `window.App` scope. After the html and and browserified version of our javascript are loaded into the browser we should have a reference to an `App.load_demo` function in the console. 

All the html needs is a way to automatically call this on load. And so we have a small `<script>` tag at the bottom of the html in `/example/ex_1.html`. Note the last script tag:

```html
<html>
    <head></head>

    <body>
        <input id="input" type="text" placeholder="type some stuff here"/>
        <p id="output"></p>
    </body>
    <script type="text/javascript" src="./js/main_ex_1.js"></script>
    <script type="text/javascript">
        (function(){
            App.load_demo();
        })()
    </script>
</html>
```

The last thing we need to talk about is how to run browserify. Notice the first script tag in the above code. We are importing one file called `main_ex_1.js`. Because of the similar name you might think this is the file located in `/src/` but it's not. This is the browserified or built version of that file that is output in `/example/js/`.

We browserify things using the browserify executable. For the examples this is handled in the [build script](https://github.com/thebigspoon/frontendstreams/blob/master/build.sh#L13) but can be called in the command line:

```bash
$ browserify main_input_file.js  >  output_file.js
```

Note: that if you are using [ractive](https://www.npmjs.com/package/ractive) templates the browserify command needs an extra `transform` flag and another tool [ractify](https://www.npmjs.com/package/ractify) for precompiling the template. The third example uses a template and the [build script](https://github.com/thebigspoon/frontendstreams/blob/master/build.sh#L9) runs the browserify command with this in mind.

###ToDo
1. more examples

2. more tests

