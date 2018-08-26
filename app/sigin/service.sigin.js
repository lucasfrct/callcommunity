( function ( ) { 
    "use strict";
    // dependency: js MD5, js SHA1, js SHA3

    angular
        .module ( "callcommunity" )
        .service ( "servicesigin", [ "$http", "$timeout", ServiceSigIn ] );

    function ServiceSigIn ( $http, $timeout ) {
        var $serviceSigIn = this;

        $serviceSigIn.uri = "app/sigin/ServiceSigin.php";

        $serviceSigIn.save = __save;

        function __save ( $user = { }, $callback = null ) {
            if ( null != $callback ) {

                var $data = { 
                    action: "sigin",
                    table: "login",
                    data: { name: $user.name, email: $user.email },
                    headers: { authenticate: String ( $user.email ) + ':' + String ( $user.password ) },
                };
                
                query ( $data, $callback );
            };
        };

        function query ( $data = null, $callback = null ) {

            var $headers = { 
                'Content-Type' : "application/x-www-form-urlencoded; charset=UTF-8",
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
                'Access-Token': $TokenAplication,
                'Authenticate': encripty ( $data.headers.authenticate ),
            };

            delete $data.headers;

            $http ( {
                url: String ( $serviceSigIn.uri ),
                method: "POST",
                data: String ( "callcommunity="+JSON.stringify ( $data ) ),
                headers : $headers,
                responseType: "text",
            } )
            .then ( function ( $data ) {
                if ( null !== $callback ) {
                    $callback ( $data.data.trim ( ) );
                };
            }, function ( $error ) {
                if ( null !== $callback ) {
                    $callback ( $error );
                };
            } );
        };
    };

} ) ( );