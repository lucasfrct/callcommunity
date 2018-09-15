( function ( ) { 
    "use strict";
    // dependency: js SHA1

    angular
        .module ( "callcommunity" )
        .service ( "servicetoken", ServiceToken );
    
    function ServiceToken ( ) {
        var $serviceToken = this;
        $serviceToken.source = 1010;
        $serviceToken.get = gerate;

        function gerate  ( ) {
            return sha1 ( String ( $serviceToken.source ) );
        };
    };

} ) ( );