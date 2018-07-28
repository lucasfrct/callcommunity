( function ( ) { 
    "use strict";
    // dependency: js MD5, js SHA1, js SHA3

    angular
        .module ( "callcommunity" )
        .servive ( "servicesigin", [ "$http", "$timeout", ServiceSigIn ] );

    function ServiceSigIn ( ) {

    };

    function encripty ( $string = "" ) {
        return String ( sha3_512 ( base64Encode ( md5 ( sha1 ( String ( $string ).trim ( ) ) ) ) ) );
    };

} ) ( );