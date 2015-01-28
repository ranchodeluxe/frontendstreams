[![Build Status](https://travis-ci.org/thebigspoon/dom-delegation-stream.svg)](https://travis-ci.org/thebigspoon/frontendstreams)

###Front-End Streams

This is a series of examples that use NodeJS stream modules such as [through](https://www.npmjs.com/package/through) in front-end programming. The target audience is noobs. For more information about NodeJS stream modules check out [stream-handbook](https://github.com/substack/stream-handbook) and [stream-adventure](https://www.npmjs.com/package/stream-adventure). The NodeJS tooling used in these examples was inspired by [jessekeane](http://words.jessekeane.me/about/) in his front-end stream [post](http://words.jessekeane.me/front-end-streams/). The first three examples are from that original post. I've created solutions for them here because the post did not originally have solutions. The first tests in `test/index.js` show how to test some dependencies for [dom-delegation-stream](https://www.npmjs.com/package/dom-delegation-stream). Much thanks to [jessekeane](http://words.jessekeane.me/about/) for exposing these modules to me.


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

For those unfamiliar with [Browserify](https://www.npmjs.com/package/browserify), this section explains how to go from source javascript to builds we can use in the browser. 

The magic sauce is [Browserify](https://www.npmjs.com/package/browserify). Browserify will package up our NodeJS modules and all dependent `require()` modules into something that is usable in the browser. Below we explain that workflow in the context of [Example 1](https://thebigspoon.github.io/frontendstreams/example/ex_1.html).

The business logic for example one one is located in `/src/ex_1.js`:

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

Notice the `require()` statements and `module.exports` convention. This is a NodeJS module. In its raw form the browser cannot digest it. To use this in the browser we need a couple things. First we need something that will allow the browser to resolve our `require()` imports. Browserify makes this happen for us. Secondly, we need an entry point, a bridge, between the browser and the NodeJS modules. We need a way to link the browser context of `window` with the code in our modules. 

Notice that each example in `/src/` has a corresponding `/src/main_< example name >.js`. This is the bridge:

```javascript
var ex_1 = require('./ex_1.js')

App = window.App || {};
App.load_demo = ex_1;
```

Above we are importing our NodeJS example module, which Browserify will resolve for us, and binding it to `window.App`. After the html and and Browserified javascript is loaded in the browser we should have a global `App` variable and a `App.load_demo` function off of it. 

The html just needs to call this on load. There is a small `<script>` tag at the bottom of the html in `/example/ex_1.html` that does this:

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

The last thing we need to talk about is how to run Browserify. Notice the first script tag in the above code. We are importing one file called `main_ex_1.js`. Because of the similar name you might think this is the file located in `/src/`, but it's not. This is the Browserified ( or compiled ) file that is output to `/example/js/`.

We Browserify things using the `browserify` executable. For our examples this is handled in the [build script](https://github.com/thebigspoon/frontendstreams/blob/master/build.sh#L13) but can be called from the command line:

```bash
$ browserify main_input_file.js  >  output_file.js
```

The `browserify` command for example one would look like this:

```bash
$ browserify /absolute/path/to/src/main_ex_1.js > /absolute/path/to/example/js/main_ex_1.js
```

Note: that if you are using [ractive](https://www.npmjs.com/package/ractive) templates the `browserify` command needs an extra `transform` flag and another tool [ractify](https://www.npmjs.com/package/ractify) for precompiling the template. The third example uses a template and the [build script](https://github.com/thebigspoon/frontendstreams/blob/master/build.sh#L9) runs the `browserify` command with this in mind.

###ToDo
1. more examples

2. more tests

