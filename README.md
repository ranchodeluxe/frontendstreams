[![Build Status](https://travis-ci.org/thebigspoon/dom-delegation-stream.svg)](https://travis-ci.org/thebigspoon/frontendstreams)

###Front-End Streams

This is a series of front-end stream examples. The first three examples were created by [jessekeane](http://words.jessekeane.me/about/) in his front-end stream [post](http://words.jessekeane.me/front-end-streams/). I've created solutions for them here because the post did not originally have solutions. Some of the tests in `test/index.js` give a sense for how to reason about the dependencies for libs like [dom-delegation-stream](https://www.npmjs.com/package/dom-delegation-stream). Much thanks to [jessekeane](http://words.jessekeane.me/about/) for exposing these modules to me.


###Getting Started

Assuming you have `node` and `npm` installed:

```bash
$ npm install

$ npm run build  # to build example JS

$ npm serve  # then go localhost:3000 to and look at /examples

$ npm test  # to run the tests
```

###Examples

[Example 1](https://thebigspoon.github.io/frontendstreams/example/ex_1.html): stream changes from a text input to an output element

[Example 2](https://thebigspoon.github.io/frontendstreams/example/ex_2.html): stream changes from a text input to an output element and have [objectState](https://www.npmjs.com/package/objectstate) listen to those changes too

[Example 3](https://thebigspoon.github.io/frontendstreams/example/ex_3.html): like example one and two, but this time have [objectState](https://www.npmjs.com/package/objectstate) work with and rerender a [ractive](https://www.npmjs.com/package/ractive) template


###ToDo
1. more examples

2. more tests

