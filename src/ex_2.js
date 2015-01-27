var write = require('dom-replace-html-stream') , 
    events = require('dom-delegation-stream') , 
    values = require('dom-value-stream') ,
    objectState = require('objectstate');


module.exports = function () {

    var input = events(document.getElementById('input'), 'input').pipe(values());
    var output = write(document.getElementById('output'));
    input.pipe(output);

    var ostate = objectState();
    ostate.listen(input, 'userInput');
    ostate.on( 'data', function( state ){ document.getElementById( 'ostate_output' ).innerHTML = JSON.stringify( state ) } );

}

