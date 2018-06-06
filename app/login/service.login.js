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

		function queryEmail ( $email = null, $fn = null ) {
		
			var $loginEmail = { 
				action: "login-email", 
				table: "user",
				data: {
					email: $email,
				},
			};

			var $headers = {
				user: "",
				password: "",
				token: "1234",
			};

			query ( $loginEmail, $fn, $headers );
		};

		function queryPassword ( $email = null, $password = null, $fn = null ) {
		
			var $headers = {
				user: $email,
				password: $password,
				token: "1234",
			};
			
			var $loginPassword = { 
				action: "login-email", 
				table: "user",
				data: { },
			};

			query ( $loginPassword, $fn, $headers );
		};

		function query ( $query = null, $fn = null, $headers = { token: "", user: "", password: "" } ) {
			$http ( {
				url: $serviceLogin.uri,
				method: "POST",
				data: "callcommunity="+JSON.stringify ( $query ),
				headers : { 
					'Content-Type' : "application/x-www-form-urlencoded; charset=UTF-8",
					'Access-Control-Allow-Origin' : '*',
					'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
					'Access-Token': $headers.token || "",
					'Access-user': $headers.user || "",
					'Access-Password': $headers.password || "",
				},
				responseType: 'text',
			} )
			.then ( function ( $data ) {
				if ( null !== $fn ) {
					$data = $data.data;
					if ( angular.isArray ( $data ) ) {
						$data = $data.map ( function ( $item, $index ) { 
							$item.index = $index;
							return $item;
						} );
					};

					$fn ( $data );
				};
			}, function ( $error ) {
				$fn ( $error );
			} );
		};
	};

} ) ( );