var through = require( 'through' )

module.exports = through(
        function( str ) {
            this.queue( Boolean( str.match(/\d{3}(?=\d{2,3})|\d+/g) ) ? str.match(/\d{3}(?=\d{2,3})|\d+/g).join("-") : "" )
        },
        function() {
            this.queue( null )
        })
