var events = require('dom-delegation-stream')
  , values = require('dom-value-stream')
  , objectState = require('objectstate')

var ractiveStream = require('./ractive-stream')
  , cardTemplate = require('./template.ract')
  , stripNonDigits = require( './strip-non-digits.js' )
  , addDashes = require( './add-dashes.js' )

module.exports = cardWidget

function cardWidget(el) {
  var ractive = ractiveStream(el, cardTemplate)
    , state = objectState()

  // DOM events -> values, assign `name` to the values stream
  // we select on the `name` attribute, because it is not typically subject to
  // change as frequently as class or ID.
  var name = events(el, 'input', '[name=full-name]')
    .pipe(values())

  // DOM events -> values -> strip non-digits -> add dashes, assign `cardNumber`
  // to the dashes stream
  // " 123 45678,91011a12" -> "123456789101112" -> "1234-5678-9101-112"
  var cardNumber = events(el, 'input', '[name=card-number]')
    .pipe(values())
    .pipe(stripNonDigits)
    .pipe(addDashes)

  state.listen(name, 'fullName')
    .listen(cardNumber, 'cardNumber')
  state.on( 'data', function( state ){ console.log( "[ STATE ]: ", state ) } );

  state.pipe(ractive)
}
