( function ( ) { 
	"use strict";

	angular
		.module ( "callcommunity" )
		.service ( "servicelogin", [ "$http", "$timeout", ServiceLogin ] );
	
	function ServiceLogin ( $http, $timeout ) {

		var $serviceLogin = this;

		$serviceLogin.uri = "app/login/login.php";

		$serviceLogin.queryEmail = queryEmail;

		$serviceLogin.queryPassword = queryPassword;

		console.log ( )

		function queryEmail ( $email = null, $fn = null ) {
		
			var $data = { 
				action: "check-email",
				table: "user",
				data: { email: $email, },
				headers: { },
			};

			query ( $data, $fn );
		};

		function queryPassword ( $email = null, $password = null, $fn = null ) {
			
			var $data = { 
				action: "login", 
				table: "user",
				data: { email: $email },
				headers: { email: $email, password: $password },
			};

			query ( $data, $fn );
		};

		function query ( $data = null, $fn = null ) {

			var $headers = { 
				'Content-Type' : "application/x-www-form-urlencoded; charset=UTF-8",
				'Access-Control-Allow-Origin' : '*',
				'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
				'Access-Token': $TokenAplication,
				'Access-user': $data.headers.email || "",
				'Access-Password': $data.headers.password || "",
			};

			delete $data.headers;

			$http ( {
				url: $serviceLogin.uri,
				method: "POST",
				data: "callcommunity="+JSON.stringify ( $data ),
				headers : $headers,
				responseType: 'text',
			} )
			.then ( function ( $data ) {
				if ( null !== $fn ) {
					$timeout ( function ( ) {
						$fn ( $data.data );
					}, 500 );
				};
			}, function ( $error ) {
				if ( null !== $fn ) {
					$fn ( $error );
				};
			} );
		};
	};

} ) ( );