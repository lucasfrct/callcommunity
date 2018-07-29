( function ( ) { 
    "use strict";
    // dependency: js MD5, js SHA1, js SHA3

    angular
        .module ( "callcommunity" )
        .service ( "servicesigin", [ "$http", "$timeout", ServiceSigIn ] );

    function ServiceSigIn ( $http, $timeout ) {
        var $serviceSigIn = this;

        $serviceSigIn.save = __save;

        function __save ( $user = { }, $callback = null ) {
            if ( $callback ) {

                $timeout ( function ( ) { 
                    var $data = "servive sigIn ok!";

                    $callback ( $data );

                }, 1000 );
            };
        };


    };

    function encripty ( $string = "" ) {
        return String ( sha3_512 ( base64Encode ( md5 ( sha1 ( String ( $string ).trim ( ) ) ) ) ) );
    };

} ) ( );