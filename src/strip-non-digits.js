var through = require( 'through' );

module.exports = through(
        function( str ) {
            this.queue( str.replace(/\D/g,'') );
        } ,
        function() {
            this.queue( null );
        })

