var write = require('dom-replace-html-stream') , 
    events = require('dom-delegation-stream') , 
    values = require('dom-value-stream');

module.exports = function () {
    var input = events(document.getElementById('input'), 'input').pipe(values())
    var output = write(document.getElementById('output'))
    input.pipe(output)
}

