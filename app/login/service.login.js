( function ( ) { 
	"use strict";
	// dependency: js MD5, js SHA1, js SHA3

	angular
		.module ( "callcommunity" )
		.service ( "servicelogin", [ "$http", "$timeout", "servicetoken", ServiceLogin ] );
	
	function ServiceLogin ( $http, $timeout, $serviceToken ) {

		var $serviceLogin = this;

		$serviceLogin.uri = "app/login/ServiceLogin.php";

		$serviceLogin.queryEmail = queryEmail;

		$serviceLogin.queryPassword = queryPassword;

		$serviceLogin.reset = resetPassword;

		function queryEmail ( $email = null, $callback = null ) {
		
			var $data = { 
				action: "read-login",
				table: "login",
				data: { email: String ( $email ) },
				headers: {  },
			};

			query ( $data, $callback );
		};

		function queryPassword ( $email = null, $password = null, $callback = null ) {
			
			var $data = { 
				action: "login", 
				table: "login",
				data: { email: $email },
                headers: { authenticate: String ( $email ) + ':' + String ( $password ) },
			};

			query ( $data, $callback );
		};

		function resetPassword ( $email = "", $fn = null ) {

			var $data = { 
				action: "reset",
				table: "user",
				data: { email: String ( $email ) },
			};

			query ( $data, $fn );
		};

		function query ( $data = null, $callback = null ) {

            var $headers = { 
                'Content-Type' : "application/x-www-form-urlencoded; charset=UTF-8",
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT, DELETE',
                'Access-Token': $serviceToken.get ( ),
                'Authenticate': encripty ( $data.headers.authenticate ),
            };

            delete $data.headers;

            $http ( {
                url: String ( $serviceLogin.uri ),
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