var Ractive = require('ractive')
  , through = require('through')

module.exports = ractiveStream

function ractiveStream(el, template, _options) {
  var options = _options || {}
  var stream = through(write)

  options.el = el

  /*
  **  the ractify transform
  **  seems to make template
  **  an object so copy all props
  */
  //options.template = template
  for ( var i in template ) {
    if( template.hasOwnProperty( i ) ) {
        options[ i ] = template[ i ];
    }
  }

  var ractive = new Ractive(options)

  stream.view = ractive

  return stream

  function write(data) {
    ractive.reset(data)
  }
}
