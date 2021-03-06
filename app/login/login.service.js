( function ( ) { 
    "use strict";

	angular
        .module ( "callcommunity" )
        .service ( "$loginservice", [ "$http", "$timeout", LoginService ] );
	
	function LoginService ( $http, $timeout ) {

		var $serviceLogin = this;
		
		$serviceLogin.token = "1010";

		$serviceLogin.uri = "app/login/login.service.php";

		$serviceLogin.email = queryEmail;

		$serviceLogin.password = queryPassword;

		$serviceLogin.reset = resetPassword;

		function queryEmail ( $email = "", $callback = null ) {
			query ( { email : $email }, $callback );
		};

		function queryPassword ( $email = "", $password = "", $callback = null ) {
			query ( { email: $email }, $callback, $password );
		};

		function resetPassword ( $email = "", $callback = null ) {
			query ( { type: "reset", email : $email }, $callback );
		};

		function query ( $data = null, $callback = null, $password = "" ) {
			if ( null !== $data && null !== $callback ) {
	            $http ( {
	                url: $serviceLogin.uri,
	                method: "POST",
	                data: String ( "loginservice="+JSON.stringify ( $data ) ),
	                headers : { 
		                'Content-Type' : "application/x-www-form-urlencoded; charset=UTF-8",
		                'Access-Control-Allow-Origin' : '*',
		                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT, DELETE',
		                'Access-Token': $serviceLogin.token,
		                'Authentication': $password,
	            	},
	            } )
	            .then ( 
	            	function ( $data ) { $timeout ( function ( ) { $callback ( $data.data ); }, 1000 ); }
	            	, function ( $error ) { $callback ( $error ); } 
	            );
        	};
        };
	};

} ) ( );