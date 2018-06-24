( function ( ) { 
	"use strict";
	// dependency: js MD5, js SHA1, js SHA3

	angular
		.module ( "callcommunity" )
		.service ( "servicelogin", [ "$http", "$timeout", ServiceLogin ] );
	
	function ServiceLogin ( $http, $timeout ) {

		var $serviceLogin = this;

		$serviceLogin.uri = "app/login/login.php";

		$serviceLogin.queryEmail = queryEmail;

		$serviceLogin.queryPassword = queryPassword;

		$serviceLogin.reset = resetPassword;

		function resetPassword ( $email = "", $fn = null ) {

			var $data = { 
				action: "login-reset",
				table: "user",
				data: { },
				headers: { email: String ( $email ) },
			};

			query ( $data, $fn );
		};

		function queryEmail ( $email = null, $fn = null ) {
		
			var $data = { 
				action: "login-check-email",
				table: "user",
				data: { },
				headers: { email: String ( $email ) },
			};

			query ( $data, $fn );
		};

		function queryPassword ( $email = null, $password = null, $fn = null ) {
			
			var $data = { 
				action: "login-check-password", 
				table: "user",
				data: { },
				headers: { email: $email, password: encripty ( String ( $password ) ) },
			};

			query ( $data, $fn );
		};

		function encripty ( $string = "" ) {
			return String ( sha3_512 ( base64Encode ( md5 ( sha1 ( String ( $string ).trim ( ) ) ) ) ) );
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
				url: String ( $serviceLogin.uri ),
				method: "POST",
				data: String ( "callcommunity="+JSON.stringify ( $data ) ),
				headers : $headers,
				responseType: "text",
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